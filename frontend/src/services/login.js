const url = `https://cashinbox.shop/auth`;

const credenciais = {
  email: "contact.carlossouzadev@gmail.com",
  senha: "Didicadu123",
};

export const pegarToken = async () => {
  try {
    const response = await fetch(`${url}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credenciais),
    });

    const data = await response.json();
    return data.token;
  } catch (error) {
    console.error("Erro ao pegar token:", error);
    return null;
  }
};
