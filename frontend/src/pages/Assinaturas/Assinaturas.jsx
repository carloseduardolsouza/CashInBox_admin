// src/pages/Assinaturas/Assinaturas.jsx
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  RiSearchLine, 
  RiAddLine, 
  RiDeleteBinLine, 
  RiEditLine,
  RiFilterLine,
  RiDownloadLine,
  RiRefreshLine
} from 'react-icons/ri';
import assinaturaFetch from '../../api/assinaturaFetch';
import formatacao from '../../services/formatacao';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import NovaAssinatura from './components/NovaAssinatura/NovaAssinatura';
import EditarAssinatura from './components/EditarAssinatura/EditarAssinatura';
import ConfirmDialog from '../../components/UI/ConfirmDialog';
import './Assinaturas.css';

const Assinaturas = () => {
  const [assinaturas, setAssinaturas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [modalAtiva, setModalAtiva] = useState(null);
  const [dadosAssinatura, setDadosAssinatura] = useState({});
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [error, setError] = useState(null);

  const listarAssinaturas = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await assinaturaFetch.listarAssinaturas();
      setAssinaturas(response || []);
    } catch (error) {
      console.error('Erro ao listar assinaturas:', error);
      setError('Erro ao carregar assinaturas. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    listarAssinaturas();
  }, [listarAssinaturas]);

  // Filtrar e ordenar assinaturas
  const filteredAssinaturas = useMemo(() => {
    let filtered = assinaturas.filter(assinatura => {
      const matchesSearch = 
        assinatura.usuario?.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        assinatura.plano?.nome?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = 
        statusFilter === 'all' || 
        assinatura.status === statusFilter;

      return matchesSearch && matchesStatus;
    });

    // Ordenar por data de vencimento
    filtered.sort((a, b) => {
      const dateA = new Date(a.vencimento_em);
      const dateB = new Date(b.vencimento_em);
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });

    return filtered;
  }, [assinaturas, searchTerm, statusFilter, sortOrder]);

  const handleSearch = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleSelectAll = useCallback((e) => {
    if (e.target.checked) {
      setSelectedIds(filteredAssinaturas.map(item => item.id));
    } else {
      setSelectedIds([]);
    }
  }, [filteredAssinaturas]);

  const handleSelectItem = useCallback((id) => {
    setSelectedIds(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  }, []);

  const chamarModal = useCallback((dados) => {
    setDadosAssinatura(dados);
    setModalAtiva('EditarAssinatura');
  }, []);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await Promise.all(
        selectedIds.map(id => assinaturaFetch.excluirAssinaturas(id))
      );
      await listarAssinaturas();
      setSelectedIds([]);
      setShowConfirmDelete(false);
    } catch (error) {
      console.error('Erro ao excluir assinaturas:', error);
      setError('Erro ao excluir assinaturas. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const exportData = () => {
    // Implementar exportação CSV/Excel
    const csvContent = [
      ['Status', 'Usuário', 'Plano', 'Vencimento', 'Status Pagamento'],
      ...filteredAssinaturas.map(item => [
        item.status,
        item.usuario?.nome || '',
        item.plano?.nome || '',
        formatacao.formatarData(item.vencimento_em),
        item.status_pagamento
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `assinaturas_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const renderModal = () => {
    switch (modalAtiva) {
      case 'NovaAssinatura':
        return (
          <NovaAssinatura
            fechar={setModalAtiva}
            atualizar={listarAssinaturas}
          />
        );
      case 'EditarAssinatura':
        return (
          <EditarAssinatura
            fechar={setModalAtiva}
            atualizar={listarAssinaturas}
            dados={dadosAssinatura}
          />
        );
      default:
        return null;
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      'ativa': 'success',
      'inativa': 'danger',
      'pendente': 'warning',
      'cancelada': 'neutral'
    };
    return statusMap[status] || 'neutral';
  };

  const getPaymentStatusBadge = (status) => {
    const statusMap = {
      'pago': 'success',
      'pendente': 'warning',
      'vencido': 'danger'
    };
    return statusMap[status] || 'neutral';
  };

  if (loading && assinaturas.length === 0) {
    return <LoadingSpinner text="Carregando assinaturas..." />;
  }

  return (
    <div className="assinaturas-page">
      <div className="page-header">
        <h1 className="page-header__title">Assinaturas</h1>
        <p className="page-header__subtitle">
          Gerencie todas as assinaturas do sistema
        </p>
        
        <div className="page-header__actions">
          <button
            className="btn btn--primary"
            onClick={() => setModalAtiva('NovaAssinatura')}
          >
            <RiAddLine />
            Nova Assinatura
          </button>
          
          <button
            className="btn btn--secondary"
            onClick={exportData}
            disabled={filteredAssinaturas.length === 0}
          >
            <RiDownloadLine />
            Exportar
          </button>
          
          <button
            className="btn btn--secondary"
            onClick={listarAssinaturas}
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
                placeholder="Buscar por usuário ou plano..."
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
                <option value="ativa">Ativo</option>
                <option value="inativa">Inativo</option>
                <option value="pendente">Pendente</option>
                <option value="cancelada">Cancelado</option>
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
                      checked={selectedIds.length === filteredAssinaturas.length && filteredAssinaturas.length > 0}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th>Status</th>
                  <th>Usuário</th>
                  <th>Plano</th>
                  <th>Vencimento</th>
                  <th>Pagamento</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredAssinaturas.map((assinatura) => (
                  <tr
                    key={assinatura.id}
                    className={selectedIds.includes(assinatura.id) ? 'selected' : ''}
                  >
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(assinatura.id)}
                        onChange={() => handleSelectItem(assinatura.id)}
                      />
                    </td>
                    <td>
                      <span className={`status status--${getStatusBadge(assinatura.status)}`}>
                        <span className="status__dot"></span>
                        {assinatura.status}
                      </span>
                    </td>
                    <td>
                      <div className="user-info">
                        <div className="user-info__name">
                          {assinatura.usuario?.nome || 'N/A'}
                        </div>
                        <div className="user-info__email">
                          {assinatura.usuario?.email || ''}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="plan-info">
                        <div className="plan-info__name">
                          {assinatura.plano?.nome || 'N/A'}
                        </div>
                        <div className="plan-info__price">
                          {assinatura.plano?.valor ? 
                            formatacao.formatarPreco(assinatura.plano.valor) : 
                            ''
                          }
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="date-info">
                        {formatacao.formatarData(assinatura.vencimento_em)}
                      </div>
                    </td>
                    <td>
                      <span className={`status status--${getPaymentStatusBadge(assinatura.status_pagamento)}`}>
                        <span className="status__dot"></span>
                        {assinatura.status_pagamento}
                      </span>
                    </td>
                    <td>
                      <div className="actions">
                        <button
                          className="btn btn--ghost btn--sm"
                          onClick={() => chamarModal(assinatura)}
                          title="Editar assinatura"
                        >
                          <RiEditLine />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredAssinaturas.length === 0 && !loading && (
              <div className="empty-state">
                <div className="empty-state__icon">📋</div>
                <h3 className="empty-state__title">Nenhuma assinatura encontrada</h3>
                <p className="empty-state__message">
                  {searchTerm || statusFilter !== 'all'
                    ? 'Tente ajustar os filtros de busca'
                    : 'Comece criando sua primeira assinatura'
                  }
                </p>
                {(!searchTerm && statusFilter === 'all') && (
                  <button
                    className="btn btn--primary"
                    onClick={() => setModalAtiva('NovaAssinatura')}
                  >
                    <RiAddLine />
                    Criar Assinatura
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {loading && assinaturas.length > 0 && (
        <div className="overlay-loading">
          <LoadingSpinner size="sm" />
        </div>
      )}

      {renderModal()}

      {showConfirmDelete && (
        <ConfirmDialog
          title="Excluir Assinaturas"
          message={`Tem certeza que deseja excluir ${selectedIds.length} assinatura(s)? Esta ação não pode ser desfeita.`}
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

export default Assinaturas;