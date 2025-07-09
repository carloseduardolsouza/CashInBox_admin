import "./Assinaturas.css";
import assinaturaFetch from "../../api/assinaturaFetch";
import formatacao from "../../services/formatacao";
import { useEffect, useState } from "react";

//Icones
import { FaSearch } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

//components
import NovaAssinatura from "./components/NovaAssinatura/NovaAssinatura";
import EditarAssinatura from "./components/EditarAssinatura/EditarAssinatura";

function Assinaturas() {
  const [assinaturas, setAssinaturas] = useState([]);
  const [modalAtiva, setModalAtiva] = useState(null);
  const [dadosAssinatura, setDadosAssinatura] = useState({});

  const [arraySelect, setArraySelect] = useState([]);

  const listarAssinaturas = async () => {
    const response = await assinaturaFetch.listarAssinaturas();
    console.log(response);
    setAssinaturas(response);
  };

  useEffect(() => {
    listarAssinaturas();
  }, []);

  const chamarModal = (dados) => {
    setDadosAssinatura(dados);
    setModalAtiva("EditarAssinatura");
  };

  const renderModal = () => {
    switch (modalAtiva) {
      case "NovaAssinatura":
        return (
          <NovaAssinatura
            fechar={setModalAtiva}
            atualizar={listarAssinaturas}
          />
        );
      case "EditarAssinatura":
        return (
          <EditarAssinatura
            fechar={setModalAtiva}
            atualizar={listarAssinaturas}
            dados={dadosAssinatura}
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

  const excluirAssinaturasSelecionadas = async () => {
    if (arraySelect.length === 0) return;

    await Promise.all(
      arraySelect.map((id) => assinaturaFetch.excluirAssinaturas(id))
    );
    await listarAssinaturas();
    setArraySelect([]);
  };

  return (
    <div id="Assinaturas">
      <h2>Assinaturas</h2>
      {renderModal()}
      <article className="ArticleClientes">
        <form>
          <button
            className="AddCliente"
            type="button"
            onClick={() => setModalAtiva("NovaAssinatura")}
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
          onClick={() => excluirAssinaturasSelecionadas()}
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
              <th>Status</th>
              <th>Usuário</th>
              <th>Plano</th>
              <th>Vencimento</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
            {assinaturas.map((dados) => {
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
                  <td>{dados.status}</td>
                  <td>{dados.usuario.nome}</td>
                  <td>{dados.plano.nome}</td>
                  <td>{formatacao.formatarData(dados.vencimento_em)}</td>
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

export default Assinaturas;
