import { pegarToken } from "../services/login";
const url = `https://cashinbox.shop`;

const listarAssinaturas = async () => {
    const token = await pegarToken();

    if (!token) throw new Error("Token não encontrado.");

    const response = await fetch(`${url}/admin/listarAssinaturas`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return await response.json();
};

const editarAssinaturas = async (id, dados) => {
  try {
    const token = await pegarToken();

    const response = await fetch(`${url}/admin/editarAssinaturas/${id}`, {
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

const excluirAssinaturas = async (id) => {
  try {
    const token = await pegarToken();

    const response = await fetch(`${url}/admin/exluirAssinaturas/${id}`, {
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

const cadastrarAssinaturas = async (dados) => {
  try {
    const token = await pegarToken();

    const response = await fetch(`${url}/admin/cadastrarAssinatura`, {
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
  listarAssinaturas,
  editarAssinaturas,
  excluirAssinaturas,
  cadastrarAssinaturas,
};
