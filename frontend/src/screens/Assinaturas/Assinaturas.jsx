import "./Assinaturas.css";
import assinaturaFetch from "../../api/assinaturaFetch";
import formatacao from "../../services/formatacao";
import { useEffect, useState } from "react";

function Assinaturas() {
  const [assinaturas, setAssinaturas] = useState([]);

  const listarAssinaturas = async () => {
    const response = await assinaturaFetch.listarAssinaturas();
    console.log(response);
    setAssinaturas(response);
  };

  useEffect(() => {
    listarAssinaturas();
  }, []);

  return (
    <div id="Assinaturas">
      <h2>Assinaturas</h2>
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
            {assinaturas.map((dados) => {
              return (
                <tr>
                  <td>{dados.status}</td>
                  <td>{dados.usuario.nome}</td>
                  <td>{dados.plano.nome}</td>
                  <td>{formatacao.formatarData(dados.vencimento_em)}</td>
                  <td>
                    <button className="bttEditarAssinatura">Editar</button>
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
