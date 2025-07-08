import "./Planos.css";
import { useState, useEffect } from "react";
import planoFetch from "../../api/planoFetch";

//Componentes
import NovoPlano from "./Components/NovoPlano/NovoPlano";
import EditarPlano from "./Components/EditarPlano/EditarPlano";

//Icones
import { FaSearch } from "react-icons/fa";

function Planos() {
  const [planos, setPlanos] = useState([]);
  const [modalAtiva, setModalAtiva] = useState(null);
  const [dadosPlano, setDadosPlano] = useState({});

  const listarPlanos = async () => {
    const response = await planoFetch.listarPlanos();
    setPlanos(response);
  };

  useEffect(() => {
    listarPlanos();
  }, []);

  const passarDados = (dados) => {
    setDadosPlano(dados);
    setModalAtiva("EditarPlano");
  };

  const renderModal = () => {
    switch (modalAtiva) {
      case "NovoPlano":
        return <NovoPlano fechar={setModalAtiva} atualizar={listarPlanos} />;
      case "EditarPlano":
        return (
          <EditarPlano
            fechar={setModalAtiva}
            atualizar={listarPlanos}
            dados={dadosPlano}
          />
        );
      case null:
        return null;
    }
  };
  return (
    <div id="Assinaturas">
      {renderModal()}
      <h2>Planos</h2>
      <article className="ArticleClientes">
        <form>
          <button
            className="AddCliente"
            type="button"
            onClick={() => setModalAtiva("NovoPlano")}
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
      </article>
      <main>
        <table className="table">
          <thead>
            <tr>
              <th>id</th>
              <th>Nome</th>
              <th>Nivel de aceso</th>
              <th>valor</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
            {planos.map((dados) => {
              return (
                <tr>
                  <td>{dados.id}</td>
                  <td>{dados.nome}</td>
                  <td>{dados.tarefas_inclusas}</td>
                  <td>{dados.valor}</td>
                  <td>
                    <button
                      className="bttEditarAssinatura"
                      onClick={() => passarDados(dados)}
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

export default Planos;
