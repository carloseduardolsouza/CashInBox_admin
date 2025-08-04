// src/pages/Boletos/Boletos.jsx
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  RiSearchLine, 
  RiAddLine, 
  RiDeleteBinLine, 
  RiEditLine,
  RiDownloadLine,
  RiRefreshLine,
  RiFileTextLine,
  RiCalendarLine,
  RiMoneyDollarCircleLine,
  RiEyeLine,
  RiPrinterFill ,
  RiMailLine
} from 'react-icons/ri';
import formatacao from '../../services/formatacao';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import ConfirmDialog from '../../components/UI/ConfirmDialog';
import './Boletos.css';

// Mock data para demonstração (substitua pela integração real com a API)
const mockBoletos = [
  {
    id: 1,
    numero: '00001',
    usuario: { nome: 'João Silva', email: 'joao@email.com' },
    plano: { nome: 'Plano Premium', valor: 99.90 },
    valor: 99.90,
    vencimento: '2024-12-15',
    emissao: '2024-11-15',
    status: 'pendente',
    linha_digitavel: '12345.67890 12345.678901 12345.678901 1 12340000009990'
  },
  {
    id: 2,
    numero: '00002',
    usuario: { nome: 'Maria Santos', email: 'maria@email.com' },
    plano: { nome: 'Plano Básico', valor: 49.90 },
    valor: 49.90,
    vencimento: '2024-12-10',
    emissao: '2024-11-10',
    status: 'pago',
    linha_digitavel: '12345.67890 12345.678901 12345.678901 2 12340000004990'
  },
  {
    id: 3,
    numero: '00003',
    usuario: { nome: 'Carlos Oliveira', email: 'carlos@email.com' },
    plano: { nome: 'Plano Enterprise', valor: 199.90 },
    valor: 199.90,
    vencimento: '2024-12-05',
    emissao: '2024-11-05',
    status: 'vencido',
    linha_digitavel: '12345.67890 12345.678901 12345.678901 3 12340000019990'
  },
  {
    id: 4,
    numero: '00004',
    usuario: { nome: 'Ana Costa', email: 'ana@email.com' },
    plano: { nome: 'Plano Premium', valor: 99.90 },
    valor: 99.90,
    vencimento: '2024-12-20',
    emissao: '2024-11-20',
    status: 'pendente',
    linha_digitavel: '12345.67890 12345.678901 12345.678901 4 12340000009990'
  }
];

// Componente Modal para Visualizar Boleto
const VisualizarBoleto = ({ boleto, fechar }) => {
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Implementar download do PDF do boleto
    console.log('Download boleto:', boleto.numero);
  };

  const handleSendEmail = () => {
    // Implementar envio por email
    console.log('Enviar por email:', boleto.numero);
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && fechar(null)}>
      <div className="modal-container modal-container--large">
        <div className="modal-header">
          <h2 className="modal-title">Boleto #{boleto.numero}</h2>
          <div className="modal-header__actions">
            <button className="btn btn--ghost btn--sm" onClick={handlePrint} title="Imprimir">
              <RiPrinterFill />
            </button>
            <button className="btn btn--ghost btn--sm" onClick={handleDownload} title="Download PDF">
              <RiDownloadLine />
            </button>
            <button className="btn btn--ghost btn--sm" onClick={handleSendEmail} title="Enviar por email">
              <RiMailLine />
            </button>
            <button className="modal-close" onClick={() => fechar(null)}>
              ×
            </button>
          </div>
        </div>

        <div className="modal-content">
          <div className="boleto-preview">
            <div className="boleto-header">
              <div className="bank-info">
                <h3>Banco Digital</h3>
                <p>001-1</p>
              </div>
              <div className="boleto-number">
                <span>Boleto: {boleto.numero}</span>
              </div>
            </div>

            <div className="boleto-line">
              <strong>Linha Digitável:</strong>
              <span className="linha-digitavel">{boleto.linha_digitavel}</span>
            </div>

            <div className="boleto-details">
              <div className="detail-row">
                <div className="detail-item">
                  <label>Beneficiário:</label>
                  <span>Cash In Box Ltda</span>
                </div>
                <div className="detail-item">
                  <label>CNPJ:</label>
                  <span>12.345.678/0001-99</span>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-item">
                  <label>Pagador:</label>
                  <span>{boleto.usuario.nome}</span>
                </div>
                <div className="detail-item">
                  <label>Email:</label>
                  <span>{boleto.usuario.email}</span>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-item">
                  <label>Descrição:</label>
                  <span>{boleto.plano.nome}</span>
                </div>
                <div className="detail-item">
                  <label>Valor:</label>
                  <span className="valor-boleto">{formatacao.formatarPreco(boleto.valor)}</span>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-item">
                  <label>Data de Emissão:</label>
                  <span>{formatacao.formatarData(boleto.emissao)}</span>
                </div>
                <div className="detail-item">
                  <label>Data de Vencimento:</label>
                  <span>{formatacao.formatarData(boleto.vencimento)}</span>
                </div>
              </div>
            </div>

            <div className="boleto-instructions">
              <h4>Instruções:</h4>
              <ul>
                <li>Pagamento pode ser efetuado em qualquer banco até a data de vencimento</li>
                <li>Após o vencimento, cobrar multa de 2% e juros de 1% ao mês</li>
                <li>Em caso de dúvidas, entre em contato conosco</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button
            className="btn btn--secondary"
            onClick={() => fechar(null)}
          >
            Fechar
          </button>
          <button
            className="btn btn--primary"
            onClick={handlePrint}
          >
            <RiPrinterFill />
            Imprimir
          </button>
        </div>
      </div>
    </div>
  );
};

// Componente Principal
const Boletos = () => {
  const [boletos, setBoletos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [modalAtiva, setModalAtiva] = useState(null);
  const [boletoSelecionado, setBoletoSelecionado] = useState({});
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [error, setError] = useState(null);

  const listarBoletos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      // Simular chamada API
      await new Promise(resolve => setTimeout(resolve, 1000));
      setBoletos(mockBoletos);
    } catch (error) {
      console.error('Erro ao listar boletos:', error);
      setError('Erro ao carregar boletos. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    listarBoletos();
  }, [listarBoletos]);

  // Filtrar e ordenar boletos
  const filteredBoletos = useMemo(() => {
    let filtered = boletos.filter(boleto => {
      const matchesSearch = 
        boleto.numero?.includes(searchTerm) ||
        boleto.usuario?.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        boleto.usuario?.email?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = 
        statusFilter === 'all' || 
        boleto.status === statusFilter;

      let matchesDate = true;
      if (dateFilter !== 'all') {
        const today = new Date();
        const vencimento = new Date(boleto.vencimento);
        
        switch (dateFilter) {
          case 'hoje':
            matchesDate = vencimento.toDateString() === today.toDateString();
            break;
          case 'semana':
            const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
            matchesDate = vencimento >= today && vencimento <= nextWeek;
            break;
          case 'mes':
            const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
            matchesDate = vencimento >= today && vencimento <= nextMonth;
            break;
          case 'vencidos':
            matchesDate = vencimento < today && boleto.status === 'vencido';
            break;
        }
      }

      return matchesSearch && matchesStatus && matchesDate;
    });

    // Ordenar por data de vencimento
    filtered.sort((a, b) => {
      const dateA = new Date(a.vencimento);
      const dateB = new Date(b.vencimento);
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });

    return filtered;
  }, [boletos, searchTerm, statusFilter, dateFilter, sortOrder]);

  const handleSearch = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleSelectAll = useCallback((e) => {
    if (e.target.checked) {
      setSelectedIds(filteredBoletos.map(item => item.id));
    } else {
      setSelectedIds([]);
    }
  }, [filteredBoletos]);

  const handleSelectItem = useCallback((id) => {
    setSelectedIds(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  }, []);

  const visualizarBoleto = useCallback((boleto) => {
    setBoletoSelecionado(boleto);
    setModalAtiva('VisualizarBoleto');
  }, []);

  const handleDelete = async () => {
    try {
      setLoading(true);
      // Implementar exclusão via API
      console.log('Excluir boletos:', selectedIds);
      await listarBoletos();
      setSelectedIds([]);
      setShowConfirmDelete(false);
    } catch (error) {
      console.error('Erro ao excluir boletos:', error);
      setError('Erro ao excluir boletos. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const exportData = () => {
    const csvContent = [
      ['Número', 'Cliente', 'Plano', 'Valor', 'Vencimento', 'Status'],
      ...filteredBoletos.map(item => [
        item.numero,
        item.usuario?.nome || '',
        item.plano?.nome || '',
        item.valor,
        formatacao.formatarData(item.vencimento),
        item.status
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `boletos_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const renderModal = () => {
    switch (modalAtiva) {
      case 'VisualizarBoleto':
        return (
          <VisualizarBoleto
            boleto={boletoSelecionado}
            fechar={setModalAtiva}
          />
        );
      default:
        return null;
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      'pago': 'success',
      'pendente': 'warning',
      'vencido': 'danger',
      'cancelado': 'neutral'
    };
    return statusMap[status] || 'neutral';
  };

  const getStatusText = (status) => {
    const statusMap = {
      'pago': 'Pago',
      'pendente': 'Pendente',
      'vencido': 'Vencido',
      'cancelado': 'Cancelado'
    };
    return statusMap[status] || status;
  };

  if (loading && boletos.length === 0) {
    return <LoadingSpinner text="Carregando boletos..." />;
  }

  return (
    <div className="boletos-page">
      <div className="page-header">
        <h1 className="page-header__title">Boletos</h1>
        <p className="page-header__subtitle">
          Gerencie todos os boletos do sistema
        </p>
        
        <div className="page-header__actions">
          <button
            className="btn btn--primary"
            onClick={() => console.log('Gerar novo boleto')}
          >
            <RiAddLine />
            Gerar Boleto
          </button>
          
          <button
            className="btn btn--secondary"
            onClick={exportData}
            disabled={filteredBoletos.length === 0}
          >
            <RiDownloadLine />
            Exportar
          </button>
          
          <button
            className="btn btn--secondary"
            onClick={listarBoletos}
            disabled={loading}
          >
            <RiRefreshLine />
            Atualizar
          </button>
        </div>
      </div>

      {error && (
        <div className="alert alert--error">
          <span>{error}</span>
          <button onClick={() => setError(null)}>×</button>
        </div>
      )}

      <div className="card">
        <div className="card__header">
          <div className="filters-container">
            <div className="search-container">
              <RiSearchLine className="search-icon" />
              <input
                type="text"
                className="search-input"
                placeholder="Buscar por número, cliente ou email..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            
            <div className="filter-group">
              <select
                className="form-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">Todos os status</option>
                <option value="pendente">Pendente</option>
                <option value="pago">Pago</option>
                <option value="vencido">Vencido</option>
                <option value="cancelado">Cancelado</option>
              </select>
              
              <select
                className="form-select"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              >
                <option value="all">Todas as datas</option>
                <option value="hoje">Vencem hoje</option>
                <option value="semana">Próximos 7 dias</option>
                <option value="mes">Próximo mês</option>
                <option value="vencidos">Vencidos</option>
              </select>
              
              <select
                className="form-select"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="desc">Mais recente</option>
                <option value="asc">Mais antigo</option>
              </select>
            </div>
          </div>
          
          {selectedIds.length > 0 && (
            <div className="bulk-actions">
              <span className="bulk-counter">
                {selectedIds.length} item(s) selecionado(s)
              </span>
              <button
                className="btn btn--danger btn--sm"
                onClick={() => setShowConfirmDelete(true)}
              >
                <RiDeleteBinLine />
                Excluir Selecionados
              </button>
            </div>
          )}
        </div>

        <div className="card__content">
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      checked={selectedIds.length === filteredBoletos.length && filteredBoletos.length > 0}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th>Número</th>
                  <th>Cliente</th>
                  <th>Plano</th>
                  <th>Valor</th>
                  <th>Vencimento</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredBoletos.map((boleto) => (
                  <tr
                    key={boleto.id}
                    className={selectedIds.includes(boleto.id) ? 'selected' : ''}
                  >
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(boleto.id)}
                        onChange={() => handleSelectItem(boleto.id)}
                      />
                    </td>
                    <td>
                      <div className="boleto-number">
                        <RiFileTextLine />
                        #{boleto.numero}
                      </div>
                    </td>
                    <td>
                      <div className="user-info">
                        <div className="user-info__name">
                          {boleto.usuario?.nome || 'N/A'}
                        </div>
                        <div className="user-info__email">
                          {boleto.usuario?.email || ''}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="plan-info">
                        <div className="plan-info__name">
                          {boleto.plano?.nome || 'N/A'}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="price-info">
                        {formatacao.formatarPreco(boleto.valor)}
                      </div>
                    </td>
                    <td>
                      <div className="date-info">
                        <RiCalendarLine />
                        {formatacao.formatarData(boleto.vencimento)}
                      </div>
                    </td>
                    <td>
                      <span className={`status status--${getStatusBadge(boleto.status)}`}>
                        <span className="status__dot"></span>
                        {getStatusText(boleto.status)}
                      </span>
                    </td>
                    <td>
                      <div className="actions">
                        <button
                          className="btn btn--ghost btn--sm"
                          onClick={() => visualizarBoleto(boleto)}
                          title="Visualizar boleto"
                        >
                          <RiEyeLine />
                        </button>
                        <button
                          className="btn btn--ghost btn--sm"
                          onClick={() => console.log('Editar boleto:', boleto.id)}
                          title="Editar boleto"
                        >
                          <RiEditLine />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredBoletos.length === 0 && !loading && (
              <div className="empty-state">
                <div className="empty-state__icon">📄</div>
                <h3 className="empty-state__title">Nenhum boleto encontrado</h3>
                <p className="empty-state__message">
                  {searchTerm || statusFilter !== 'all' || dateFilter !== 'all'
                    ? 'Tente ajustar os filtros de busca'
                    : 'Comece gerando seu primeiro boleto'
                  }
                </p>
                {(!searchTerm && statusFilter === 'all' && dateFilter === 'all') && (
                  <button
                    className="btn btn--primary"
                    onClick={() => console.log('Gerar boleto')}
                  >
                    <RiAddLine />
                    Gerar Boleto
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {loading && boletos.length > 0 && (
        <div className="overlay-loading">
          <LoadingSpinner size="sm" />
        </div>
      )}

      {renderModal()}

      {showConfirmDelete && (
        <ConfirmDialog
          title="Excluir Boletos"
          message={`Tem certeza que deseja excluir ${selectedIds.length} boleto(s)? Esta ação não pode ser desfeita.`}
          confirmText="Excluir"
          cancelText="Cancelar"
          onConfirm={handleDelete}
          onCancel={() => setShowConfirmDelete(false)}
          type="danger"
        />
      )}
    </div>
  );
};

export default Boletos;