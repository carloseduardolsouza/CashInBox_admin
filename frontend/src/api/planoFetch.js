import { pegarToken } from "../services/login";
const url = `https://cashinbox.shop`;

const listarPlanos = async () => {
    const token = await pegarToken();

    if (!token) throw new Error("Token não encontrado.");

    const response = await fetch(`${url}/admin/listarPlanos`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return await response.json();
};

const editarPlanos = async (id, dados) => {
  try {
    const token = await pegarToken();

    const response = await fetch(`${url}/admin/editarPlanos/${id}`, {
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

const excluirPlanos = async (id) => {
  try {
    const token = await pegarToken();

    const response = await fetch(`${url}/admin/exluirPlanos/${id}`, {
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

const cadastrarPlanos = async (dados) => {
  try {
    const token = await pegarToken();

    const response = await fetch(`${url}/admin/cadastrarPlanos`, {
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
    console.error("Erro ao cadastrar novo plano:", error);
    return null;
  }
};

export default {
  listarPlanos,
  editarPlanos,
  excluirPlanos,
  cadastrarPlanos,
};
