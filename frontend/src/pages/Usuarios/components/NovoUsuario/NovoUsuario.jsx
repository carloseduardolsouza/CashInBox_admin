import { useState } from "react";
import "./NovoUsuario.css";
import usuarioFetch from "../../../../api/usuarioFetch";

function NovoUsuario({ fechar, atualizar }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [role, setRole] = useState("");
  const [rua, setRua] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [cpfCnpj, setCpfCnpj] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const novoUsuario = {
      nome,
      email,
      senha,
      role,
      rua,
      cidade,
      estado,
      cpf_cnpj: cpfCnpj,
    };

    await usuarioFetch.cadastrarUsuarios(novoUsuario);
    atualizar();
    fechar(null);
  };

  return (
    <div className="blurModal">
      <div id="NovoUsuario">
        <h2>Novo Usuário</h2>
        <form id="form_novo_usuario" onSubmit={handleSubmit}>
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
            <span>Senha:</span>
            <input
              type="password"
              required
              placeholder="Digite a senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </label>

          <label>
            <span>Tipo de Acesso:</span>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="" disabled>
                Selecione o tipo de acesso
              </option>
              <option value="user">Usuário</option>
              <option value="admin">Administrador</option>
            </select>
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
              Criar Usuário
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NovoUsuario;
