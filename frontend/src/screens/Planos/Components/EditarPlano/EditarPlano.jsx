import { useState } from "react";
import "./EditarPlano.css";
import planoFetch from "../../../../api/planoFetch";

function EditarPlano({ dados, fechar, atualizar }) {
  const [nomeEdit, setNomeEdit] = useState(dados.nome);
  const [valorEdit, setValorEdit] = useState(dados.valor);
  const [nivelDeAcesso, setNivelDeAcesso] = useState(dados.tarefas_inclusas);

  const editarPlano = async (e) => {
    let data = {
      nome: nomeEdit,
      valor: valorEdit,
      tarefas_inclusas: nivelDeAcesso,
    };
    e.preventDefault();
    await planoFetch.editarPlanos(dados.id, data);
    atualizar();
    fechar(null);
  };

  const deletarPlano = async () => {
    await planoFetch.excluirPlanos(dados.id);
    atualizar();
    fechar(null);
  };
  return (
    <div className="blurModal">
      <div id="EditarPlano">
        <div>
          <h2>Editar Plano "{dados.nome}"</h2>
          <button onClick={() => fechar(null)}>X</button>
        </div>

        <form id="form_novo_plano" onSubmit={(e) => editarPlano(e)}>
          <label>
            <span>Nome do plano:</span>
            <input
              type="text"
              value={nomeEdit}
              onChange={(e) => setNomeEdit(e.target.value)}
            />
          </label>

          <label>
            <span>Valor do plano:</span>
            <input
              type="number"
              value={valorEdit}
              onChange={(e) => setValorEdit(e.target.value)}
            />
          </label>

          <label>
            <span>Nível da acesso:</span>
            <input
              type="number"
              value={nivelDeAcesso}
              onChange={(e) => setNivelDeAcesso(e.target.value)}
            />
          </label>

          <div className="novo_plano_buttons">
            <button
              style={{ backgroundColor: "red", color: "white" }}
              onClick={() => deletarPlano()}
            >
              Deletar Plano
            </button>
            <button
              style={{ backgroundColor: "#0295ff", color: "white" }}
              type="submit"
            >
              Salvar Plano
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditarPlano;
