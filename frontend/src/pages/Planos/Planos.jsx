// src/pages/Planos/Planos.jsx
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  RiSearchLine, 
  RiAddLine, 
  RiDeleteBinLine, 
  RiEditLine,
  RiDownloadLine,
  RiRefreshLine,
  RiPriceTagLine,
  RiCloseLine,
  RiStarLine,
  RiStarFill
} from 'react-icons/ri';
import planoFetch from '../../api/planoFetch';
import formatacao from '../../services/formatacao';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import ConfirmDialog from '../../components/UI/ConfirmDialog';
import './Planos.css';

// Componente Modal para Novo Plano
const NovoPlano = ({ fechar, atualizar }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    valor: '',
    tarefas_inclusas: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nome.trim()) newErrors.nome = 'Nome é obrigatório';
    if (!formData.valor || formData.valor <= 0) newErrors.valor = 'Valor deve ser maior que zero';
    if (!formData.tarefas_inclusas || formData.tarefas_inclusas <= 0) newErrors.tarefas_inclusas = 'Nível de acesso deve ser maior que zero';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      await planoFetch.cadastrarPlanos({
        nome: formData.nome,
        valor: parseFloat(formData.valor),
        tarefas_inclusas: parseInt(formData.tarefas_inclusas)
      });
      atualizar();
      fechar(null);
    } catch (error) {
      console.error('Erro ao criar plano:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && fechar(null)}>
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">Novo Plano</h2>
          <button className="modal-close" onClick={() => fechar(null)} disabled={loading}>
            <RiCloseLine />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="novo-plano-form">
          <div className="modal-content">
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">
                  Nome do Plano <span className="required">*</span>
                </label>
                <input
                  type="text"
                  className={`form-input ${errors.nome ? 'form-input--error' : ''}`}
                  placeholder="Ex: Plano Básico"
                  value={formData.nome}
                  onChange={(e) => handleChange('nome', e.target.value)}
                />
                {errors.nome && <span className="form-error">{errors.nome}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">
                  Valor (R$) <span className="required">*</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  className={`form-input ${errors.valor ? 'form-input--error' : ''}`}
                  placeholder="0,00"
                  value={formData.valor}
                  onChange={(e) => handleChange('valor', e.target.value)}
                />
                {errors.valor && <span className="form-error">{errors.valor}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">
                  Nível de Acesso <span className="required">*</span>
                </label>
                <input
                  type="number"
                  min="1"
                  className={`form-input ${errors.tarefas_inclusas ? 'form-input--error' : ''}`}
                  placeholder="Ex: 1, 2, 3..."
                  value={formData.tarefas_inclusas}
                  onChange={(e) => handleChange('tarefas_inclusas', e.target.value)}
                />
                {errors.tarefas_inclusas && <span className="form-error">{errors.tarefas_inclusas}</span>}
                <p className="form-help">Defina o nível de acesso (1 = básico, números maiores = mais recursos)</p>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn--secondary"
              onClick={() => fechar(null)}
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={`btn btn--primary ${loading ? 'btn--loading' : ''}`}
              disabled={loading}
            >
              {!loading && 'Criar Plano'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Componente Modal para Editar Plano
const EditarPlano = ({ dados, fechar, atualizar }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: dados.nome || '',
    valor: dados.valor || '',
    tarefas_inclusas: dados.tarefas_inclusas || ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nome.trim()) newErrors.nome = 'Nome é obrigatório';
    if (!formData.valor || formData.valor <= 0) newErrors.valor = 'Valor deve ser maior que zero';
    if (!formData.tarefas_inclusas || formData.tarefas_inclusas <= 0) newErrors.tarefas_inclusas = 'Nível de acesso deve ser maior que zero';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      await planoFetch.editarPlanos(dados.id, {
        nome: formData.nome,
        valor: parseFloat(formData.valor),
        tarefas_inclusas: parseInt(formData.tarefas_inclusas)
      });
      atualizar();
      fechar(null);
    } catch (error) {
      console.error('Erro ao editar plano:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && fechar(null)}>
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">Editar Plano</h2>
          <button className="modal-close" onClick={() => fechar(null)} disabled={loading}>
            <RiCloseLine />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="novo-plano-form">
          <div className="modal-content">
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">
                  Nome do Plano <span className="required">*</span>
                </label>
                <input
                  type="text"
                  className={`form-input ${errors.nome ? 'form-input--error' : ''}`}
                  placeholder="Ex: Plano Básico"
                  value={formData.nome}
                  onChange={(e) => handleChange('nome', e.target.value)}
                />
                {errors.nome && <span className="form-error">{errors.nome}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">
                  Valor (R$) <span className="required">*</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  className={`form-input ${errors.valor ? 'form-input--error' : ''}`}
                  placeholder="0,00"
                  value={formData.valor}
                  onChange={(e) => handleChange('valor', e.target.value)}
                />
                {errors.valor && <span className="form-error">{errors.valor}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">
                  Nível de Acesso <span className="required">*</span>
                </label>
                <input
                  type="number"
                  min="1"
                  className={`form-input ${errors.tarefas_inclusas ? 'form-input--error' : ''}`}
                  placeholder="Ex: 1, 2, 3..."
                  value={formData.tarefas_inclusas}
                  onChange={(e) => handleChange('tarefas_inclusas', e.target.value)}
                />
                {errors.tarefas_inclusas && <span className="form-error">{errors.tarefas_inclusas}</span>}
                <p className="form-help">Defina o nível de acesso (1 = básico, números maiores = mais recursos)</p>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn--secondary"
              onClick={() => fechar(null)}
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={`btn btn--primary ${loading ? 'btn--loading' : ''}`}
              disabled={loading}
            >
              {!loading && 'Salvar Alterações'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Componente Principal
const Planos = () => {
  const [planos, setPlanos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [modalAtiva, setModalAtiva] = useState(null);
  const [dadosPlano, setDadosPlano] = useState({});
  const [sortOrder, setSortOrder] = useState('asc');
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [error, setError] = useState(null);

  const listarPlanos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await planoFetch.listarPlanos();
      setPlanos(response || []);
    } catch (error) {
      console.error('Erro ao listar planos:', error);
      setError('Erro ao carregar planos. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    listarPlanos();
  }, [listarPlanos]);

  // Filtrar e ordenar planos
  const filteredPlanos = useMemo(() => {
    let filtered = planos.filter(plano => {
      const matchesSearch = 
        plano.nome?.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesSearch;
    });

    // Ordenar por valor
    filtered.sort((a, b) => {
      const valueA = parseFloat(a.valor) || 0;
      const valueB = parseFloat(b.valor) || 0;
      return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
    });

    return filtered;
  }, [planos, searchTerm, sortOrder]);

  const handleSearch = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleSelectAll = useCallback((e) => {
    if (e.target.checked) {
      setSelectedIds(filteredPlanos.map(item => item.id));
    } else {
      setSelectedIds([]);
    }
  }, [filteredPlanos]);

  const handleSelectItem = useCallback((id) => {
    setSelectedIds(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  }, []);

  const chamarModal = useCallback((dados) => {
    setDadosPlano(dados);
    setModalAtiva('EditarPlano');
  }, []);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await Promise.all(
        selectedIds.map(id => planoFetch.excluirPlanos(id))
      );
      await listarPlanos();
      setSelectedIds([]);
      setShowConfirmDelete(false);
    } catch (error) {
      console.error('Erro ao excluir planos:', error);
      setError('Erro ao excluir planos. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const exportData = () => {
    const csvContent = [
      ['Nome', 'Valor', 'Nível de Acesso'],
      ...filteredPlanos.map(item => [
        item.nome || '',
        item.valor || '',
        item.tarefas_inclusas || ''
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `planos_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const renderModal = () => {
    switch (modalAtiva) {
      case 'NovoPlano':
        return (
          <NovoPlano
            fechar={setModalAtiva}
            atualizar={listarPlanos}
          />
        );
      case 'EditarPlano':
        return (
          <EditarPlano
            fechar={setModalAtiva}
            atualizar={listarPlanos}
            dados={dadosPlano}
          />
        );
      default:
        return null;
    }
  };

  const getAccessLevelStars = (level) => {
    const maxStars = 5;
    const stars = [];
    const filledStars = Math.min(level, maxStars);
    
    for (let i = 0; i < maxStars; i++) {
      if (i < filledStars) {
        stars.push(<RiStarFill key={i} className="star-filled" />);
      } else {
        stars.push(<RiStarLine key={i} className="star-empty" />);
      }
    }
    
    return stars;
  };

  if (loading && planos.length === 0) {
    return <LoadingSpinner text="Carregando planos..." />;
  }

  return (
    <div className="planos-page">
      <div className="page-header">
        <h1 className="page-header__title">Planos</h1>
        <p className="page-header__subtitle">
          Gerencie todos os planos de assinatura
        </p>
        
        <div className="page-header__actions">
          <button
            className="btn btn--primary"
            onClick={() => setModalAtiva('NovoPlano')}
          >
            <RiAddLine />
            Novo Plano
          </button>
          
          <button
            className="btn btn--secondary"
            onClick={exportData}
            disabled={filteredPlanos.length === 0}
          >
            <RiDownloadLine />
            Exportar
          </button>
          
          <button
            className="btn btn--secondary"
            onClick={listarPlanos}
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
                placeholder="Buscar por nome do plano..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            
            <div className="filter-group">
              <select
                className="form-select"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="asc">Menor preço</option>
                <option value="desc">Maior preço</option>
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
                      checked={selectedIds.length === filteredPlanos.length && filteredPlanos.length > 0}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th>Plano</th>
                  <th>Valor</th>
                  <th>Nível de Acesso</th>
                  <th>Avaliação</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredPlanos.map((plano) => (
                  <tr
                    key={plano.id}
                    className={selectedIds.includes(plano.id) ? 'selected' : ''}
                  >
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(plano.id)}
                        onChange={() => handleSelectItem(plano.id)}
                      />
                    </td>
                    <td>
                      <div className="plan-info">
                        <div className="plan-info__name">
                          <RiPriceTagLine />
                          {plano.nome || 'N/A'}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="price-info">
                        {plano.valor ? 
                          formatacao.formatarPreco(plano.valor) : 
                          'Gratuito'
                        }
                      </div>
                    </td>
                    <td>
                      <div className="access-level">
                        <span className="access-level__number">
                          Nível {plano.tarefas_inclusas || 0}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="star-rating">
                        {getAccessLevelStars(plano.tarefas_inclusas || 0)}
                      </div>
                    </td>
                    <td>
                      <div className="actions">
                        <button
                          className="btn btn--ghost btn--sm"
                          onClick={() => chamarModal(plano)}
                          title="Editar plano"
                        >
                          <RiEditLine />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredPlanos.length === 0 && !loading && (
              <div className="empty-state">
                <div className="empty-state__icon">🏷️</div>
                <h3 className="empty-state__title">Nenhum plano encontrado</h3>
                <p className="empty-state__message">
                  {searchTerm
                    ? 'Tente ajustar os filtros de busca'
                    : 'Comece criando seu primeiro plano'
                  }
                </p>
                {!searchTerm && (
                  <button
                    className="btn btn--primary"
                    onClick={() => setModalAtiva('NovoPlano')}
                  >
                    <RiAddLine />
                    Criar Plano
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {loading && planos.length > 0 && (
        <div className="overlay-loading">
          <LoadingSpinner size="sm" />
        </div>
      )}

      {renderModal()}

      {showConfirmDelete && (
        <ConfirmDialog
          title="Excluir Planos"
          message={`Tem certeza que deseja excluir ${selectedIds.length} plano(s)? Esta ação não pode ser desfeita.`}
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

export default Planos;