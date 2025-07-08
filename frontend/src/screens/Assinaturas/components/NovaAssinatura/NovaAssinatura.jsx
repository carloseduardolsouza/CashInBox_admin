import "./NovaAssinatura.css";
import { useState, useEffect } from "react";
import Select from "react-select";
import planoFetch from "../../../../api/planoFetch";
import usuarioFetch from "../../../../api/usuarioFetch";
import assinaturaFetch from "../../../../api/assinaturaFetch";

function NovaAssinatura({ fechar, atualizar }) {
  const [usuarios, setUsuarios] = useState([]);
  const [planos, setPlanos] = useState([]);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
  const [planoSelecionado, setPlanoSelecionado] = useState(null);
  const [vencimento_em, setVencimentoEm] = useState("");
  const [statusSelecionado, setStatusSelecionado] = useState({
    value: "1",
    label: "Ativo",
  });
  const [statusPagamentoSelecionado, setStatusPagamentoSelecionado] = useState({
    value: "pendente",
    label: "Pendente",
  });

  const buscarInformacoes = async () => {
    const responsePlanos = await planoFetch.listarPlanos();
    setPlanos(responsePlanos);
    const responseUsuarios = await usuarioFetch.listarUsuarios();
    setUsuarios(responseUsuarios);
  };

  useEffect(() => {
    buscarInformacoes();
  }, []);

  const cadastrarAssinatura = async () => {
    if (!usuarioSelecionado || !planoSelecionado) {
      alert("Seleciona usuário e plano, velho!");
      return;
    }

    const dados = {
      usuario_id: usuarioSelecionado.value,
      plano_id: planoSelecionado.value,
      vencimento_em,
      status: statusSelecionado.value,
      status_pagamento: statusPagamentoSelecionado.value,
    };

    await assinaturaFetch.cadastrarAssinaturas(dados);
    fechar(null);
    atualizar()
  };

  // Mapear dados para react-select
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
        <h3 className="nova-assinatura__title">Nova Assinatura</h3>

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
            onClick={cadastrarAssinatura}
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}

export default NovaAssinatura;
