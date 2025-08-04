// src/pages/Configuracoes/Configuracoes.jsx
import React, { useState, useEffect } from 'react';
import {
  RiSettingsLine,
  RiUserLine,
  RiLockLine,
  RiNotificationLine,
  RiPaletteLine,
  RiGlobalLine,
  RiShieldLine,
  RiDatabaseLine,
  RiMailLine,
  RiKeyLine,
  RiSaveLine,
  RiRefreshLine,
  RiEyeLine,
  RiEyeOffLine,
  RiCheckLine,
  RiCloseLine,
  RiAlertLine 
} from 'react-icons/ri';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import ConfirmDialog from '../../components/UI/ConfirmDialog';
import './Configuracoes.css';

// Componente para Seção de Configurações
const ConfigSection = ({ title, icon: Icon, children, isOpen, onToggle }) => (
  <div className="config-section">
    <button className="config-section__header" onClick={onToggle}>
      <div className="config-section__title">
        <Icon className="config-section__icon" />
        <span>{title}</span>
      </div>
      <span className={`config-section__toggle ${isOpen ? 'open' : ''}`}>▼</span>
    </button>
    {isOpen && (
      <div className="config-section__content">
        {children}
      </div>
    )}
  </div>
);

// Componente Principal
const Configuracoes = () => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [openSections, setOpenSections] = useState({
    perfil: true,
    seguranca: false,
    notificacoes: false,
    aparencia: false,
    sistema: false,
    integracao: false
  });
  const [showConfirmReset, setShowConfirmReset] = useState(false);
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Estados dos formulários
  const [perfilData, setPerfilData] = useState({
    nome: 'Administrator',
    email: 'admin@cashinbox.shop',
    telefone: '',
    empresa: 'Cash In Box',
    cargo: 'Administrador'
  });

  const [senhaData, setSenhaData] = useState({
    senhaAtual: '',
    novaSenha: '',
    confirmarSenha: ''
  });

  const [notificacoesData, setNotificacoesData] = useState({
    emailAssinaturas: true,
    emailPagamentos: true,
    emailRelatorios: false,
    pushNotifications: true,
    smsNotifications: false
  });

  const [aparenciaData, setAparenciaData] = useState({
    tema: 'light',
    idioma: 'pt-BR',
    timezone: 'America/Sao_Paulo',
    formato24h: true
  });

  const [sistemaData, setSistemaData] = useState({
    manutencao: false,
    logLevel: 'info',
    backupAutomatico: true,
    retencaoDados: '365'
  });

  const [integracaoData, setIntegracaoData] = useState({
    apiKey: '••••••••••••••••',
    webhookUrl: '',
    emailProvider: 'smtp',
    smtpHost: '',
    smtpPort: '587',
    smtpUser: '',
    smtpPassword: ''
  });

  useEffect(() => {
    // Carregar configurações do usuário
    carregarConfiguracoes();
  }, []);

  const carregarConfiguracoes = async () => {
    try {
      setLoading(true);
      // Simular carregamento de configurações
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Aqui você faria a chamada real para a API
    } catch (error) {
      console.error('Erro ao carregar configurações:', error);
      setErrorMessage('Erro ao carregar configurações.');
    } finally {
      setLoading(false);
    }
  };

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleSave = async (section) => {
    try {
      setSaving(true);
      
      // Simular salvamento
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Aqui você faria a chamada real para a API
      console.log(`Salvando ${section}:`, getData(section));
      
      setSuccessMessage('Configurações salvas com sucesso!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Erro ao salvar:', error);
      setErrorMessage('Erro ao salvar configurações.');
      setTimeout(() => setErrorMessage(''), 3000);
    } finally {
      setSaving(false);
    }
  };

  const getData = (section) => {
    switch (section) {
      case 'perfil': return perfilData;
      case 'senha': return senhaData;
      case 'notificacoes': return notificacoesData;
      case 'aparencia': return aparenciaData;
      case 'sistema': return sistemaData;
      case 'integracao': return integracaoData;
      default: return {};
    }
  };

  const handleResetSystem = async () => {
    try {
      setSaving(true);
      // Implementar reset do sistema
      await new Promise(resolve => setTimeout(resolve, 2000));
      setShowConfirmReset(false);
      setSuccessMessage('Sistema resetado com sucesso!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setErrorMessage('Erro ao resetar sistema.');
      setTimeout(() => setErrorMessage(''), 3000);
    } finally {
      setSaving(false);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const generateApiKey = () => {
    const newKey = 'sk_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    setIntegracaoData(prev => ({ ...prev, apiKey: newKey }));
  };

  if (loading) {
    return <LoadingSpinner text="Carregando configurações..." />;
  }

  return (
    <div className="configuracoes-page">
      <div className="page-header">
        <h1 className="page-header__title">Configurações</h1>
        <p className="page-header__subtitle">
          Gerencie as configurações do sistema e sua conta
        </p>
      </div>

      {successMessage && (
        <div className="alert alert--success">
          <RiCheckLine />
          <span>{successMessage}</span>
          <button onClick={() => setSuccessMessage('')}>×</button>
        </div>
      )}

      {errorMessage && (
        <div className="alert alert--error">
          <RiAlertLine  />
          <span>{errorMessage}</span>
          <button onClick={() => setErrorMessage('')}>×</button>
        </div>
      )}

      <div className="config-container">
        {/* Seção Perfil */}
        <ConfigSection
          title="Perfil do Usuário"
          icon={RiUserLine}
          isOpen={openSections.perfil}
          onToggle={() => toggleSection('perfil')}
        >
          <div className="config-form">
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Nome Completo</label>
                <input
                  type="text"
                  className="form-input"
                  value={perfilData.nome}
                  onChange={(e) => setPerfilData(prev => ({ ...prev, nome: e.target.value }))}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-input"
                  value={perfilData.email}
                  onChange={(e) => setPerfilData(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Telefone</label>
                <input
                  type="tel"
                  className="form-input"
                  placeholder="(11) 99999-9999"
                  value={perfilData.telefone}
                  onChange={(e) => setPerfilData(prev => ({ ...prev, telefone: e.target.value }))}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Empresa</label>
                <input
                  type="text"
                  className="form-input"
                  value={perfilData.empresa}
                  onChange={(e) => setPerfilData(prev => ({ ...prev, empresa: e.target.value }))}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Cargo</label>
                <input
                  type="text"
                  className="form-input"
                  value={perfilData.cargo}
                  onChange={(e) => setPerfilData(prev => ({ ...prev, cargo: e.target.value }))}
                />
              </div>
            </div>

            <div className="config-actions">
              <button
                className={`btn btn--primary ${saving ? 'btn--loading' : ''}`}
                onClick={() => handleSave('perfil')}
                disabled={saving}
              >
                <RiSaveLine />
                {!saving && 'Salvar Perfil'}
              </button>
            </div>
          </div>
        </ConfigSection>

        {/* Seção Segurança */}
        <ConfigSection
          title="Segurança"
          icon={RiShieldLine}
          isOpen={openSections.seguranca}
          onToggle={() => toggleSection('seguranca')}
        >
          <div className="config-form">
            <h3>Alterar Senha</h3>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Senha Atual</label>
                <div className="password-input">
                  <input
                    type={showPassword.current ? 'text' : 'password'}
                    className="form-input"
                    value={senhaData.senhaAtual}
                    onChange={(e) => setSenhaData(prev => ({ ...prev, senhaAtual: e.target.value }))}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => togglePasswordVisibility('current')}
                  >
                    {showPassword.current ? <RiEyeOffLine /> : <RiEyeLine />}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Nova Senha</label>
                <div className="password-input">
                  <input
                    type={showPassword.new ? 'text' : 'password'}
                    className="form-input"
                    value={senhaData.novaSenha}
                    onChange={(e) => setSenhaData(prev => ({ ...prev, novaSenha: e.target.value }))}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => togglePasswordVisibility('new')}
                  >
                    {showPassword.new ? <RiEyeOffLine /> : <RiEyeLine />}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Confirmar Nova Senha</label>
                <div className="password-input">
                  <input
                    type={showPassword.confirm ? 'text' : 'password'}
                    className="form-input"
                    value={senhaData.confirmarSenha}
                    onChange={(e) => setSenhaData(prev => ({ ...prev, confirmarSenha: e.target.value }))}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => togglePasswordVisibility('confirm')}
                  >
                    {showPassword.confirm ? <RiEyeOffLine /> : <RiEyeLine />}
                  </button>
                </div>
              </div>
            </div>

            <div className="config-actions">
              <button
                className={`btn btn--primary ${saving ? 'btn--loading' : ''}`}
                onClick={() => handleSave('senha')}
                disabled={saving || !senhaData.senhaAtual || !senhaData.novaSenha || senhaData.novaSenha !== senhaData.confirmarSenha}
              >
                <RiLockLine />
                {!saving && 'Alterar Senha'}
              </button>
            </div>
          </div>
        </ConfigSection>

        {/* Seção Notificações */}
        <ConfigSection
          title="Notificações"
          icon={RiNotificationLine}
          isOpen={openSections.notificacoes}
          onToggle={() => toggleSection('notificacoes')}
        >
          <div className="config-form">
            <div className="form-grid">
              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={notificacoesData.emailAssinaturas}
                    onChange={(e) => setNotificacoesData(prev => ({ ...prev, emailAssinaturas: e.target.checked }))}
                  />
                  <span>Email para novas assinaturas</span>
                </label>
              </div>

              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={notificacoesData.emailPagamentos}
                    onChange={(e) => setNotificacoesData(prev => ({ ...prev, emailPagamentos: e.target.checked }))}
                  />
                  <span>Email para pagamentos</span>
                </label>
              </div>

              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={notificacoesData.emailRelatorios}
                    onChange={(e) => setNotificacoesData(prev => ({ ...prev, emailRelatorios: e.target.checked }))}
                  />
                  <span>Email para relatórios semanais</span>
                </label>
              </div>

              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={notificacoesData.pushNotifications}
                    onChange={(e) => setNotificacoesData(prev => ({ ...prev, pushNotifications: e.target.checked }))}
                  />
                  <span>Notificações push</span>
                </label>
              </div>

              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={notificacoesData.smsNotifications}
                    onChange={(e) => setNotificacoesData(prev => ({ ...prev, smsNotifications: e.target.checked }))}
                  />
                  <span>Notificações por SMS</span>
                </label>
              </div>
            </div>

            <div className="config-actions">
              <button
                className={`btn btn--primary ${saving ? 'btn--loading' : ''}`}
                onClick={() => handleSave('notificacoes')}
                disabled={saving}
              >
                <RiSaveLine />
                {!saving && 'Salvar Notificações'}
              </button>
            </div>
          </div>
        </ConfigSection>

        {/* Seção Aparência */}
        <ConfigSection
          title="Aparência"
          icon={RiPaletteLine}
          isOpen={openSections.aparencia}
          onToggle={() => toggleSection('aparencia')}
        >
          <div className="config-form">
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Tema</label>
                <select
                  className="form-select"
                  value={aparenciaData.tema}
                  onChange={(e) => setAparenciaData(prev => ({ ...prev, tema: e.target.value }))}
                >
                  <option value="light">Claro</option>
                  <option value="dark">Escuro</option>
                  <option value="auto">Automático</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Idioma</label>
                <select
                  className="form-select"
                  value={aparenciaData.idioma}
                  onChange={(e) => setAparenciaData(prev => ({ ...prev, idioma: e.target.value }))}
                >
                  <option value="pt-BR">Português (Brasil)</option>
                  <option value="en-US">English (US)</option>
                  <option value="es-ES">Español</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Fuso Horário</label>
                <select
                  className="form-select"
                  value={aparenciaData.timezone}
                  onChange={(e) => setAparenciaData(prev => ({ ...prev, timezone: e.target.value }))}
                >
                  <option value="America/Sao_Paulo">Brasília (GMT-3)</option>
                  <option value="America/New_York">New York (GMT-5)</option>
                  <option value="Europe/London">London (GMT+0)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={aparenciaData.formato24h}
                    onChange={(e) => setAparenciaData(prev => ({ ...prev, formato24h: e.target.checked }))}
                  />
                  <span>Formato 24 horas</span>
                </label>
              </div>
            </div>

            <div className="config-actions">
              <button
                className={`btn btn--primary ${saving ? 'btn--loading' : ''}`}
                onClick={() => handleSave('aparencia')}
                disabled={saving}
              >
                <RiSaveLine />
                {!saving && 'Salvar Aparência'}
              </button>
            </div>
          </div>
        </ConfigSection>

        {/* Seção Sistema */}
        <ConfigSection
          title="Sistema"
          icon={RiDatabaseLine}
          isOpen={openSections.sistema}
          onToggle={() => toggleSection('sistema')}
        >
          <div className="config-form">
            <div className="form-grid">
              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={sistemaData.manutencao}
                    onChange={(e) => setSistemaData(prev => ({ ...prev, manutencao: e.target.checked }))}
                  />
                  <span>Modo de manutenção</span>
                </label>
                <p className="form-help">Quando ativado, apenas administradores podem acessar o sistema</p>
              </div>

              <div className="form-group">
                <label className="form-label">Nível de Log</label>
                <select
                  className="form-select"
                  value={sistemaData.logLevel}
                  onChange={(e) => setSistemaData(prev => ({ ...prev, logLevel: e.target.value }))}
                >
                  <option value="error">Erro</option>
                  <option value="warn">Aviso</option>
                  <option value="info">Informação</option>
                  <option value="debug">Debug</option>
                </select>
              </div>

              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={sistemaData.backupAutomatico}
                    onChange={(e) => setSistemaData(prev => ({ ...prev, backupAutomatico: e.target.checked }))}
                  />
                  <span>Backup automático diário</span>
                </label>
              </div>

              <div className="form-group">
                <label className="form-label">Retenção de dados (dias)</label>
                <input
                  type="number"
                  className="form-input"
                  value={sistemaData.retencaoDados}
                  onChange={(e) => setSistemaData(prev => ({ ...prev, retencaoDados: e.target.value }))}
                />
              </div>
            </div>

            <div className="config-actions">
              <button
                className={`btn btn--primary ${saving ? 'btn--loading' : ''}`}
                onClick={() => handleSave('sistema')}
                disabled={saving}
              >
                <RiSaveLine />
                {!saving && 'Salvar Sistema'}
              </button>
              
              <button
                className="btn btn--danger"
                onClick={() => setShowConfirmReset(true)}
              >
                <RiRefreshLine />
                Resetar Sistema
              </button>
            </div>
          </div>
        </ConfigSection>

        {/* Seção Integração */}
        <ConfigSection
          title="Integração & API"
          icon={RiGlobalLine}
          isOpen={openSections.integracao}
          onToggle={() => toggleSection('integracao')}
        >
          <div className="config-form">
            <h3>API Configuration</h3>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">API Key</label>
                <div className="api-key-input">
                  <input
                    type="text"
                    className="form-input"
                    value={integracaoData.apiKey}
                    readOnly
                  />
                  <button
                    type="button"
                    className="btn btn--secondary btn--sm"
                    onClick={generateApiKey}
                  >
                    <RiKeyLine />
                    Gerar Nova
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Webhook URL</label>
                <input
                  type="url"
                  className="form-input"
                  placeholder="https://seu-site.com/webhook"
                  value={integracaoData.webhookUrl}
                  onChange={(e) => setIntegracaoData(prev => ({ ...prev, webhookUrl: e.target.value }))}
                />
              </div>
            </div>

            <h3>Configuração de Email</h3>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Provedor de Email</label>
                <select
                  className="form-select"
                  value={integracaoData.emailProvider}
                  onChange={(e) => setIntegracaoData(prev => ({ ...prev, emailProvider: e.target.value }))}
                >
                  <option value="smtp">SMTP</option>
                  <option value="sendgrid">SendGrid</option>
                  <option value="mailgun">Mailgun</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">SMTP Host</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="smtp.gmail.com"
                  value={integracaoData.smtpHost}
                  onChange={(e) => setIntegracaoData(prev => ({ ...prev, smtpHost: e.target.value }))}
                />
              </div>

              <div className="form-group">
                <label className="form-label">SMTP Port</label>
                <input
                  type="number"
                  className="form-input"
                  value={integracaoData.smtpPort}
                  onChange={(e) => setIntegracaoData(prev => ({ ...prev, smtpPort: e.target.value }))}
                />
              </div>

              <div className="form-group">
                <label className="form-label">SMTP Usuário</label>
                <input
                  type="email"
                  className="form-input"
                  value={integracaoData.smtpUser}
                  onChange={(e) => setIntegracaoData(prev => ({ ...prev, smtpUser: e.target.value }))}
                />
              </div>

              <div className="form-group">
                <label className="form-label">SMTP Senha</label>
                <input
                  type="password"
                  className="form-input"
                  value={integracaoData.smtpPassword}
                  onChange={(e) => setIntegracaoData(prev => ({ ...prev, smtpPassword: e.target.value }))}
                />
              </div>
            </div>

            <div className="config-actions">
              <button
                className={`btn btn--primary ${saving ? 'btn--loading' : ''}`}
                onClick={() => handleSave('integracao')}
                disabled={saving}
              >
                <RiSaveLine />
                {!saving && 'Salvar Integração'}
              </button>
            </div>
          </div>
        </ConfigSection>
      </div>

      {showConfirmReset && (
        <ConfirmDialog
          title="Resetar Sistema"
          message="Tem certeza que deseja resetar todas as configurações do sistema? Esta ação não pode ser desfeita e todos os dados serão perdidos."
          confirmText="Resetar"
          cancelText="Cancelar"
          onConfirm={handleResetSystem}
          onCancel={() => setShowConfirmReset(false)}
          type="danger"
        />
      )}
    </div>
  );
};

export default Configuracoes;