import "./NovoPlano.css";
import planoFetch from "../../../../api/planoFetch";
import { useState } from "react";

function NovoPlano({ fechar, atualizar }) {
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const [nivel_acesso, setNivel_acesso] = useState("");

  const criarNovoPlano = async (e) => {
    e.preventDefault();

    const dados = {
      nome,
      valor,
      tarefas_inclusas: nivel_acesso,
    };

    try {
      const response = await planoFetch.cadastrarPlanos(dados);
      atualizar();
      fechar(null);
    } catch (error) {
      console.error("Falha ao criar plano:", error);
    }
  };

  return (
    <div className="blurModal">
      <div id="NovoPlano">
        <h2>Criar Plano</h2>
        <form id="form_novo_plano" onSubmit={(e) => criarNovoPlano(e)}>
          <label>
            <span>Nome do plano:</span>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </label>

          <label>
            <span>Valor do plano:</span>
            <input
              type="number"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
            />
          </label>

          <label>
            <span>Nível da acesso:</span>
            <input
              type="number"
              value={nivel_acesso}
              onChange={(e) => setNivel_acesso(e.target.value)}
            />
          </label>

          <div className="novo_plano_buttons">
            <button onClick={() => fechar(null)}>Cancelar</button>
            <button
              style={{ backgroundColor: "#0295ff", color: "white" }}
              type="submit"
            >
              Criar Plano
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NovoPlano;
