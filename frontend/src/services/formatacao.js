const formatarData = (dataISO) => {
  const data = new Date(dataISO);
  const dia = String(data.getDate()).padStart(2, "0");
  const mes = String(data.getMonth() + 1).padStart(2, "0"); // Janeiro = 0
  const ano = data.getFullYear();
  return `${dia}/${mes}/${ano}`;
};

export default {
  formatarData,
};
