import { pegarToken } from "../services/login";
const url = `http://localhost:7777`;

const listarUsuarios = async () => {
    const token = await pegarToken();

    if (!token) throw new Error("Token não encontrado.");

    const response = await fetch(`${url}/admin/listarUsuarios`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return await response.json();
};

const editarUsuarios = async (id, dados) => {
  try {
    const token = await pegarToken();

    const response = await fetch(`${url}/admin/editarUsuarios/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    });

    if (!response.ok) throw new Error(`Erro: ${response.status}`);
    return await response.json();

  } catch (error) {
    console.error("Erro ao editar assinatura:", error);
    return null;
  }
};

const excluirUsuarios = async (id) => {
  try {
    const token = await pegarToken();

    const response = await fetch(`${url}/admin/exluirUsuarios/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error(`Erro: ${response.status}`);
    return await response.json();

  } catch (error) {
    console.error("Erro ao excluir assinatura:", error);
    return null;
  }
};

const cadastrarUsuarios = async (dados) => {
  try {
    const token = await pegarToken();

    const response = await fetch(`${url}/admin/cadastrarUsuarios`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    });

    if (!response.ok) throw new Error(`Erro: ${response.status}`);
    return await response.json();

  } catch (error) {
    console.error("Erro ao cadastrar assinatura:", error);
    return null;
  }
};

export default {
  listarUsuarios,
  editarUsuarios,
  excluirUsuarios,
  cadastrarUsuarios,
};
