import "./Usuarios.css";
import { useState, useEffect } from "react";
import usuarioFetch from "../../api/usuarioFetch";
import formatacao from "../../services/formatacao";

//components
import NovoUsuario from "./components/NovoUsuario/NovoUsuario";
import EditarUsuario from "./components/EditarUsuario/EditarUsuario";

//Icones
import { FaSearch } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [modalAtiva, setModalAtiva] = useState(null);

  const [dadosUsuario, setDadosUsuario] = useState({});

  const [arraySelect, setArraySelect] = useState([]);

  const listarUsuarios = async () => {
    const response = await usuarioFetch.listarUsuarios();
    setUsuarios(response);
    console.log(response);
  };

  useEffect(() => {
    listarUsuarios();
  }, []);

  const chamarModal = (dados) => {
    setDadosUsuario(dados);
    setModalAtiva("EditarUsuario");
  };

  const renderModal = () => {
    switch (modalAtiva) {
      case "NovoUsuario":
        return (
          <NovoUsuario fechar={setModalAtiva} atualizar={listarUsuarios} />
        );
      case "EditarUsuario":
        return (
          <EditarUsuario
            dados={dadosUsuario}
            fechar={setModalAtiva}
            atualizar={listarUsuarios}
          />
        );
      case null:
        return null;
    }
  };

  const toggleArraySelect = (id) => {
    if (arraySelect.includes(id)) {
      setArraySelect(arraySelect.filter((item) => item !== id));
    } else {
      setArraySelect([...arraySelect, id]);
    }
  };

  const deletarUsuarios = async (id) => {
    if (id === 5) {
      window.alert("voce não pode deletar esse usuario");
      return;
    }
    if (arraySelect.length === 0) return;

    await Promise.all(
      arraySelect.map((id) => usuarioFetch.excluirUsuarios(id))
    );
    await listarUsuarios();
    setArraySelect([]);
  };
  return (
    <div id="Assinaturas">
      {renderModal()}
      <h2>Usuários</h2>
      <article className="ArticleClientes">
        <form>
          <button
            className="AddCliente"
            type="button"
            onClick={() => setModalAtiva("NovoUsuario")}
          >
            +
          </button>
          <input
            type="text"
            className="InputClientes"
            placeholder="Procurar por usuário..."
          />
          <button className="Search" type="submit">
            <FaSearch />
          </button>
        </form>
        <button
          onClick={() => deletarUsuarios()}
          id="MdDeleteForever"
          disabled={arraySelect.length === 0}
        >
          {" "}
          <MdDeleteForever />
        </button>
      </article>
      <main>
        <table className="table">
          <thead>
            <tr>
              <th>*</th>
              <th>Nome</th>
              <th>Email</th>
              <th>CPF/CNPJ</th>
              <th>Ultimo acesso</th>
              <th>Role</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((dados) => {
              return (
                <tr
                  key={dados.id}
                  className={arraySelect.includes(dados.id) ? "ativo" : ""}
                >
                  <td>
                    <input
                      type="checkbox"
                      onChange={() => toggleArraySelect(dados.id)}
                    />
                  </td>
                  <td>{dados.nome}</td>
                  <td>{dados.email}</td>
                  <td>{formatacao.formatarCpfCnpj(dados.cpf_cnpj)}</td>
                  <td>{formatacao.formatarDataHora(dados.ultimo_acesso)}</td>
                  <td>{dados.role}</td>
                  <td>
                    <button
                      className="bttEditarAssinatura"
                      onClick={() => chamarModal(dados)}
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default Usuarios;
