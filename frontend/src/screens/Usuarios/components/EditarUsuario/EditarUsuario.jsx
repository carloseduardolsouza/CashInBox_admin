import "./EditarUsuario.css";
import usuarioFetch from "../../../../api/usuarioFetch";
import { useState } from "react";

function EditarUsuario({ dados, atualizar, fechar }) {
  const [nome, setNome] = useState(dados.nome);
  const [email, setEmail] = useState(dados.email);
  const [rua, setRua] = useState(dados.rua);
  const [cidade, setCidade] = useState(dados.cidade);
  const [estado, setEstado] = useState(dados.estado);
  const [cpfCnpj, setCpfCnpj] = useState(dados.cpf_cnpj);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const novoUsuario = {
      nome,
      email,
      rua,
      cidade,
      estado,
      cpf_cnpj: cpfCnpj,
    };

    await usuarioFetch.editarUsuarios(dados.id, novoUsuario);
    atualizar();
    fechar(null);
  };

  return (
    <div className="blurModal">
      <div id="NovoUsuario">
        <h2>Editar Usuário</h2>
        <form id="form_novo_usuario" onSubmit={(e) => handleSubmit(e)}>
          <label>
            <span>Nome:</span>
            <input
              type="text"
              placeholder="Digite o nome completo"
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </label>

          <label>
            <span>Email:</span>
            <input
              type="email"
              placeholder="Digite o email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label>
            <span>Rua:</span>
            <input
              type="text"
              placeholder="Ex: Rua das Flores, 123"
              value={rua}
              onChange={(e) => setRua(e.target.value)}
            />
          </label>

          <label>
            <span>Cidade:</span>
            <input
              type="text"
              placeholder="Ex: Goiânia"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
            />
          </label>

          <label>
            <span>Estado:</span>
            <input
              type="text"
              placeholder="Ex: Goiás"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
            />
          </label>

          <label>
            <span>CPF/CNPJ:</span>
            <input
              type="text"
              placeholder="Digite o CPF ou CNPJ"
              value={cpfCnpj}
              onChange={(e) => setCpfCnpj(e.target.value)}
            />
          </label>

          <div className="area_buttons_new_user">
            <button type="button" onClick={() => fechar(null)}>
              Cancelar
            </button>
            <button
              type="submit"
              style={{ backgroundColor: "#0295ff", color: "white" }}
            >
              Salvar Usuário
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditarUsuario;
