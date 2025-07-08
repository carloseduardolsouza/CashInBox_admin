import "./Boletos.css";

//Icones
import { FaSearch } from "react-icons/fa";

function Boletos() {
  return (
    <div id="Assinaturas">
      <h2>Boletos</h2>
      <article className="ArticleClientes">
        <form>
          <button className="AddCliente" type="button">
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
              <th>Status</th>
              <th>Usuário</th>
              <th>Plano</th>
              <th>Vencimento</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ativo</td>
              <td>carlos</td>
              <td>dev</td>
              <td>10/10/2005</td>
              <td>
                <button className="bttEditarAssinatura">Editar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default Boletos;
