const formatarData = (dataISO) => {
  const data = new Date(dataISO);
  const dia = String(data.getDate()).padStart(2, "0");
  const mes = String(data.getMonth() + 1).padStart(2, "0"); // Janeiro = 0
  const ano = data.getFullYear();
  return `${dia}/${mes}/${ano}`;
};

const formatarDataHora = (dataISO) => {
  const data = new Date(dataISO);

  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const horas = String(data.getHours()).padStart(2, '0');
  const minutos = String(data.getMinutes()).padStart(2, '0');

  return `${dia}/${mes} - ${horas}:${minutos}`;
};

function formatarCpfCnpj(valor) {
  if (!valor) return "";
  
  const numeros = valor.replace(/\D/g, "");
  
  if (numeros.length <= 11) {
    // CPF: 000.000.000-00
    return numeros
      .replace(/^(\d{3})(\d)/, "$1.$2")
      .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d{1,2})$/, "$1.$2.$3-$4");
  } else {
    // CNPJ: 00.000.000/0000-00
    return numeros
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3/$4")
      .replace(/^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d{1,2})$/, "$1.$2.$3/$4-$5");
  }
}

function formatarPreco(valor) {
  const numero = parseFloat(valor) || 0;
  return numero.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}


export default {
  formatarData,
  formatarDataHora,
  formatarCpfCnpj,
  formatarPreco
};
