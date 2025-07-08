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

export default {
  formatarData,
  formatarDataHora
};
