import { useState, useEffect } from "react";
import "./EditarAssinatura.css";
import Select from "react-select";
import planoFetch from "../../../../api/planoFetch";
import usuarioFetch from "../../../../api/usuarioFetch";
import assinaturaFetch from "../../../../api/assinaturaFetch";

function EditarAssinatura({ dados, fechar, atualizar }) {
  const [usuarios, setUsuarios] = useState([]);
  const [planos, setPlanos] = useState([]);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
  const [planoSelecionado, setPlanoSelecionado] = useState(null);
  const [vencimento_em, setVencimentoEm] = useState("");
  const [statusSelecionado, setStatusSelecionado] = useState(null);
  const [statusPagamentoSelecionado, setStatusPagamentoSelecionado] = useState(null);

  useEffect(() => {
    buscarInformacoes();
    preencherCampos();
  }, []);

  const buscarInformacoes = async () => {
    const responsePlanos = await planoFetch.listarPlanos();
    setPlanos(responsePlanos);

    const responseUsuarios = await usuarioFetch.listarUsuarios();
    setUsuarios(responseUsuarios);
  };

  const preencherCampos = () => {
    if (dados) {
      const usuario = { value: dados.usuario_id, label: dados.usuario.nome };
      const plano = { value: dados.plano_id, label: dados.plano.nome };
      const status = dados.status === "ativa"
        ? { value: "1", label: "Ativo" }
        : { value: "2", label: "Inativo" };
      const statusPagamento = dados.status_pagamento === "pago"
        ? { value: "pago", label: "Pago" }
        : { value: "pendente", label: "Pendente" };

      setUsuarioSelecionado(usuario);
      setPlanoSelecionado(plano);
      setStatusSelecionado(status);
      setStatusPagamentoSelecionado(statusPagamento);
      setVencimentoEm(dados.vencimento_em ? dados.vencimento_em.split('T')[0] : "");
    }
  };

  console.log(dados)

  const editarAssinatura = async () => {
    if (!usuarioSelecionado || !planoSelecionado) {
      alert("Seleciona usuário e plano, velho!");
      return;
    }

    const data = {
      usuario_id: usuarioSelecionado.value,
      plano_id: planoSelecionado.value,
      vencimento_em,
      status: statusSelecionado?.value,
      status_pagamento: statusPagamentoSelecionado?.value,
    };

    await assinaturaFetch.editarAssinaturas(dados.id, data);
    fechar(null);
    atualizar();
  };

  const usuarioOptions = usuarios.map((u) => ({ value: u.id, label: u.nome }));
  const planoOptions = planos.map((p) => ({ value: p.id, label: p.nome }));
  const statusOptions = [
    { value: "1", label: "Ativo" },
    { value: "2", label: "Inativo" },
  ];
  const statusPagamentoOptions = [
    { value: "pendente", label: "Pendente" },
    { value: "pago", label: "Pago" },
  ];

  return (
    <div className="nova-assinatura__blur-modal">
      <div className="nova-assinatura__container">
        <h3 className="nova-assinatura__title">Editar Assinatura</h3>

        <div className="nova-assinatura__field">
          <label className="nova-assinatura__label">Usuário</label>
          <Select
            options={usuarioOptions}
            value={usuarioSelecionado}
            onChange={setUsuarioSelecionado}
            classNamePrefix="nova-assinatura__select"
            placeholder="Selecione um usuário"
            isClearable
          />
        </div>

        <div className="nova-assinatura__field">
          <label className="nova-assinatura__label">Plano</label>
          <Select
            options={planoOptions}
            value={planoSelecionado}
            onChange={setPlanoSelecionado}
            classNamePrefix="nova-assinatura__select"
            placeholder="Selecione um plano"
            isClearable
          />
        </div>

        <div className="nova-assinatura__field">
          <label className="nova-assinatura__label">Data de Vencimento</label>
          <input
            type="date"
            className="nova-assinatura__input"
            value={vencimento_em}
            onChange={(e) => setVencimentoEm(e.target.value)}
          />
        </div>

        <div className="nova-assinatura__field">
          <label className="nova-assinatura__label">Status</label>
          <Select
            options={statusOptions}
            value={statusSelecionado}
            onChange={setStatusSelecionado}
            classNamePrefix="nova-assinatura__select"
            placeholder="Selecione status"
          />
        </div>

        <div className="nova-assinatura__field nova-assinatura__field--last">
          <label className="nova-assinatura__label">Status do Pagamento</label>
          <Select
            options={statusPagamentoOptions}
            value={statusPagamentoSelecionado}
            onChange={setStatusPagamentoSelecionado}
            classNamePrefix="nova-assinatura__select"
            placeholder="Selecione status do pagamento"
          />
        </div>

        <div className="nova-assinatura__actions">
          <button
            className="nova-assinatura__button nova-assinatura__button--cancel"
            onClick={fechar}
          >
            Cancelar
          </button>
          <button
            className="nova-assinatura__button nova-assinatura__button--save"
            onClick={editarAssinatura}
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditarAssinatura;
