// src/pages/Usuarios/Usuarios.jsx
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  RiSearchLine, 
  RiAddLine, 
  RiDeleteBinLine, 
  RiEditLine,
  RiFilterLine,
  RiDownloadLine,
  RiRefreshLine,
  RiUserLine,
  RiAdminLine,
  RiCloseLine
} from 'react-icons/ri';
import usuarioFetch from '../../api/usuarioFetch';
import formatacao from '../../services/formatacao';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import ConfirmDialog from '../../components/UI/ConfirmDialog';
import './Usuarios.css';

// Componente Modal para Novo Usuário
const NovoUsuario = ({ fechar, atualizar }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    role: 'user',
    rua: '',
    cidade: '',
    estado: '',
    cpf_cnpj: ''
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
    if (!formData.email.trim()) newErrors.email = 'Email é obrigatório';
    if (!formData.senha.trim()) newErrors.senha = 'Senha é obrigatória';
    if (!formData.role) newErrors.role = 'Tipo de acesso é obrigatório';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      await usuarioFetch.cadastrarUsuarios(formData);
      atualizar();
      fechar(null);
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && fechar(null)}>
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">Novo Usuário</h2>
          <button className="modal-close" onClick={() => fechar(null)} disabled={loading}>
            <RiCloseLine />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="nova-usuario-form">
          <div className="modal-content">
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">
                  Nome <span className="required">*</span>
                </label>
                <input
                  type="text"
                  className={`form-input ${errors.nome ? 'form-input--error' : ''}`}
                  placeholder="Digite o nome completo"
                  value={formData.nome}
                  onChange={(e) => handleChange('nome', e.target.value)}
                />
                {errors.nome && <span className="form-error">{errors.nome}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">
                  Email <span className="required">*</span>
                </label>
                <input
                  type="email"
                  className={`form-input ${errors.email ? 'form-input--error' : ''}`}
                  placeholder="Digite o email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                />
                {errors.email && <span className="form-error">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">
                  Senha <span className="required">*</span>
                </label>
                <input
                  type="password"
                  className={`form-input ${errors.senha ? 'form-input--error' : ''}`}
                  placeholder="Digite a senha"
                  value={formData.senha}
                  onChange={(e) => handleChange('senha', e.target.value)}
                />
                {errors.senha && <span className="form-error">{errors.senha}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">
                  Tipo de Acesso <span className="required">*</span>
                </label>
                <select
                  className={`form-select ${errors.role ? 'form-select--error' : ''}`}
                  value={formData.role}
                  onChange={(e) => handleChange('role', e.target.value)}
                >
                  <option value="user">Usuário</option>
                  <option value="admin">Administrador</option>
                </select>
                {errors.role && <span className="form-error">{errors.role}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">CPF/CNPJ</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Digite o CPF ou CNPJ"
                  value={formData.cpf_cnpj}
                  onChange={(e) => handleChange('cpf_cnpj', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Rua</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Ex: Rua das Flores, 123"
                  value={formData.rua}
                  onChange={(e) => handleChange('rua', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Cidade</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Ex: Goiânia"
                  value={formData.cidade}
                  onChange={(e) => handleChange('cidade', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Estado</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Ex: Goiás"
                  value={formData.estado}
                  onChange={(e) => handleChange('estado', e.target.value)}
                />
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
              {!loading && 'Criar Usuário'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Componente Modal para Editar Usuário
const EditarUsuario = ({ dados, fechar, atualizar }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: dados.nome || '',
    email: dados.email || '',
    rua: dados.rua || '',
    cidade: dados.cidade || '',
    estado: dados.estado || '',
    cpf_cnpj: dados.cpf_cnpj || ''
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
    if (!formData.email.trim()) newErrors.email = 'Email é obrigatório';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      await usuarioFetch.editarUsuarios(dados.id, formData);
      atualizar();
      fechar(null);
    } catch (error) {
      console.error('Erro ao editar usuário:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && fechar(null)}>
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">Editar Usuário</h2>
          <button className="modal-close" onClick={() => fechar(null)} disabled={loading}>
            <RiCloseLine />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="nova-usuario-form">
          <div className="modal-content">
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">
                  Nome <span className="required">*</span>
                </label>
                <input
                  type="text"
                  className={`form-input ${errors.nome ? 'form-input--error' : ''}`}
                  placeholder="Digite o nome completo"
                  value={formData.nome}
                  onChange={(e) => handleChange('nome', e.target.value)}
                />
                {errors.nome && <span className="form-error">{errors.nome}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">
                  Email <span className="required">*</span>
                </label>
                <input
                  type="email"
                  className={`form-input ${errors.email ? 'form-input--error' : ''}`}
                  placeholder="Digite o email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                />
                {errors.email && <span className="form-error">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">CPF/CNPJ</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Digite o CPF ou CNPJ"
                  value={formData.cpf_cnpj}
                  onChange={(e) => handleChange('cpf_cnpj', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Rua</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Ex: Rua das Flores, 123"
                  value={formData.rua}
                  onChange={(e) => handleChange('rua', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Cidade</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Ex: Goiânia"
                  value={formData.cidade}
                  onChange={(e) => handleChange('cidade', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Estado</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Ex: Goiás"
                  value={formData.estado}
                  onChange={(e) => handleChange('estado', e.target.value)}
                />
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
const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [modalAtiva, setModalAtiva] = useState(null);
  const [dadosUsuario, setDadosUsuario] = useState({});
  const [roleFilter, setRoleFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [error, setError] = useState(null);

  const listarUsuarios = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await usuarioFetch.listarUsuarios();
      setUsuarios(response || []);
    } catch (error) {
      console.error('Erro ao listar usuários:', error);
      setError('Erro ao carregar usuários. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    listarUsuarios();
  }, [listarUsuarios]);

  // Filtrar e ordenar usuários
  const filteredUsuarios = useMemo(() => {
    let filtered = usuarios.filter(usuario => {
      const matchesSearch = 
        usuario.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        usuario.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        usuario.cpf_cnpj?.includes(searchTerm);
      
      const matchesRole = 
        roleFilter === 'all' || 
        usuario.role === roleFilter;

      return matchesSearch && matchesRole;
    });

    // Ordenar por último acesso
    filtered.sort((a, b) => {
      const dateA = new Date(a.ultimo_acesso);
      const dateB = new Date(b.ultimo_acesso);
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });

    return filtered;
  }, [usuarios, searchTerm, roleFilter, sortOrder]);

  const handleSearch = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleSelectAll = useCallback((e) => {
    if (e.target.checked) {
      setSelectedIds(filteredUsuarios.map(item => item.id));
    } else {
      setSelectedIds([]);
    }
  }, [filteredUsuarios]);

  const handleSelectItem = useCallback((id) => {
    setSelectedIds(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  }, []);

  const chamarModal = useCallback((dados) => {
    setDadosUsuario(dados);
    setModalAtiva('EditarUsuario');
  }, []);

  const handleDelete = async () => {
    try {
      setLoading(true);
      
      // Verificar se o usuário admin (id: 5) está sendo excluído
      if (selectedIds.includes(5)) {
        setError('Não é possível excluir o usuário administrador principal.');
        setShowConfirmDelete(false);
        return;
      }

      await Promise.all(
        selectedIds.map(id => usuarioFetch.excluirUsuarios(id))
      );
      await listarUsuarios();
      setSelectedIds([]);
      setShowConfirmDelete(false);
    } catch (error) {
      console.error('Erro ao excluir usuários:', error);
      setError('Erro ao excluir usuários. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const exportData = () => {
    const csvContent = [
      ['Nome', 'Email', 'CPF/CNPJ', 'Último Acesso', 'Tipo'],
      ...filteredUsuarios.map(item => [
        item.nome || '',
        item.email || '',
        item.cpf_cnpj || '',
        formatacao.formatarDataHora(item.ultimo_acesso),
        item.role === 'admin' ? 'Administrador' : 'Usuário'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `usuarios_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const renderModal = () => {
    switch (modalAtiva) {
      case 'NovoUsuario':
        return (
          <NovoUsuario
            fechar={setModalAtiva}
            atualizar={listarUsuarios}
          />
        );
      case 'EditarUsuario':
        return (
          <EditarUsuario
            fechar={setModalAtiva}
            atualizar={listarUsuarios}
            dados={dadosUsuario}
          />
        );
      default:
        return null;
    }
  };

  const getRoleBadge = (role) => {
    return role === 'admin' ? 'warning' : 'info';
  };

  const getRoleIcon = (role) => {
    return role === 'admin' ? <RiAdminLine /> : <RiUserLine />;
  };

  if (loading && usuarios.length === 0) {
    return <LoadingSpinner text="Carregando usuários..." />;
  }

  return (
    <div className="usuarios-page">
      <div className="page-header">
        <h1 className="page-header__title">Usuários</h1>
        <p className="page-header__subtitle">
          Gerencie todos os usuários do sistema
        </p>
        
        <div className="page-header__actions">
          <button
            className="btn btn--primary"
            onClick={() => setModalAtiva('NovoUsuario')}
          >
            <RiAddLine />
            Novo Usuário
          </button>
          
          <button
            className="btn btn--secondary"
            onClick={exportData}
            disabled={filteredUsuarios.length === 0}
          >
            <RiDownloadLine />
            Exportar
          </button>
          
          <button
            className="btn btn--secondary"
            onClick={listarUsuarios}
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
                placeholder="Buscar por nome, email ou CPF/CNPJ..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            
            <div className="filter-group">
              <select
                className="form-select"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value="all">Todos os tipos</option>
                <option value="user">Usuários</option>
                <option value="admin">Administradores</option>
              </select>
              
              <select
                className="form-select"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="desc">Último acesso recente</option>
                <option value="asc">Último acesso antigo</option>
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
                      checked={selectedIds.length === filteredUsuarios.length && filteredUsuarios.length > 0}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th>Usuário</th>
                  <th>CPF/CNPJ</th>
                  <th>Último Acesso</th>
                  <th>Tipo</th>
                  <th>Localização</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsuarios.map((usuario) => (
                  <tr
                    key={usuario.id}
                    className={selectedIds.includes(usuario.id) ? 'selected' : ''}
                  >
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(usuario.id)}
                        onChange={() => handleSelectItem(usuario.id)}
                        disabled={usuario.id === 5} // Proteger admin principal
                      />
                    </td>
                    <td>
                      <div className="user-info">
                        <div className="user-info__name">
                          {usuario.nome || 'N/A'}
                        </div>
                        <div className="user-info__email">
                          {usuario.email || ''}
                        </div>
                      </div>
                    </td>
                    <td>
                      {usuario.cpf_cnpj ? 
                        formatacao.formatarCpfCnpj(usuario.cpf_cnpj) : 
                        'Não informado'
                      }
                    </td>
                    <td>
                      <div className="date-info">
                        {usuario.ultimo_acesso ? 
                          formatacao.formatarDataHora(usuario.ultimo_acesso) : 
                          'Nunca'
                        }
                      </div>
                    </td>
                    <td>
                      <span className={`status status--${getRoleBadge(usuario.role)}`}>
                        {getRoleIcon(usuario.role)}
                        {usuario.role === 'admin' ? 'Administrador' : 'Usuário'}
                      </span>
                    </td>
                    <td>
                      <div className="location-info">
                        {[usuario.cidade, usuario.estado].filter(Boolean).join(', ') || 'Não informado'}
                      </div>
                    </td>
                    <td>
                      <div className="actions">
                        <button
                          className="btn btn--ghost btn--sm"
                          onClick={() => chamarModal(usuario)}
                          title="Editar usuário"
                        >
                          <RiEditLine />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredUsuarios.length === 0 && !loading && (
              <div className="empty-state">
                <div className="empty-state__icon">👤</div>
                <h3 className="empty-state__title">Nenhum usuário encontrado</h3>
                <p className="empty-state__message">
                  {searchTerm || roleFilter !== 'all'
                    ? 'Tente ajustar os filtros de busca'
                    : 'Comece criando seu primeiro usuário'
                  }
                </p>
                {(!searchTerm && roleFilter === 'all') && (
                  <button
                    className="btn btn--primary"
                    onClick={() => setModalAtiva('NovoUsuario')}
                  >
                    <RiAddLine />
                    Criar Usuário
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {loading && usuarios.length > 0 && (
        <div className="overlay-loading">
          <LoadingSpinner size="sm" />
        </div>
      )}

      {renderModal()}

      {showConfirmDelete && (
        <ConfirmDialog
          title="Excluir Usuários"
          message={`Tem certeza que deseja excluir ${selectedIds.length} usuário(s)? Esta ação não pode ser desfeita.`}
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

export default Usuarios;