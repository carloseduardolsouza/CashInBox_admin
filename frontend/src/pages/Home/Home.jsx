// src/pages/Home/Home.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  RiUserLine,
  RiMoneyDollarCircleLine,
  RiPriceTagLine,
  RiFileTextLine,
  RiBarChartLine,          // substituto possível
  RiLineChartLine,         // substituto possível
  RiTrendingDownLine,
  RiArrowRightLine
} from 'react-icons/ri';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import './Home.css';

const Home = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Dados mockados para demonstração
  const mockStats = {
    totalUsers: 1250,
    activeSubscriptions: 950,
    totalRevenue: 48500.75,
    pendingBoletos: 23,
    growthRate: 12.5,
    churnRate: 2.1
  };

  const revenueData = [
    { name: 'Jan', value: 35000 },
    { name: 'Fev', value: 42000 },
    { name: 'Mar', value: 38000 },
    { name: 'Abr', value: 45000 },
    { name: 'Mai', value: 48500 },
    { name: 'Jun', value: 52000 }
  ];

  const subscriptionData = [
    { name: 'Básico', value: 45, color: '#3b82f6' },
    { name: 'Premium', value: 35, color: '#10b981' },
    { name: 'Enterprise', value: 20, color: '#f59e0b' }
  ];

  useEffect(() => {
    // Simular carregamento de dados
    const loadData = async () => {
      try {
        setLoading(true);
        // Aqui você faria a chamada real para a API
        await new Promise(resolve => setTimeout(resolve, 1000));
        setStats(mockStats);
      } catch (err) {
        setError('Erro ao carregar dados do dashboard');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <LoadingSpinner text="Carregando dashboard..." />;
  }

  if (error) {
    return (
      <div className="error-state">
        <p className="error-message">{error}</p>
        <button 
          className="btn btn--primary" 
          onClick={() => window.location.reload()}
        >
          Tentar Novamente
        </button>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total de Usuários',
      value: stats.totalUsers.toLocaleString(),
      icon: RiUserLine,
      change: '+8.2%',
      positive: true,
      link: '/usuarios'
    },
    {
      title: 'Assinaturas Ativas',
      value: stats.activeSubscriptions.toLocaleString(),
      icon: RiMoneyDollarCircleLine,
      change: '+12.5%',
      positive: true,
      link: '/assinaturas'
    },
    {
      title: 'Receita Total',
      value: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(stats.totalRevenue),
      icon: RiBarChartLine,
      change: '+15.3%',
      positive: true,
      link: '/assinaturas'
    },
    {
      title: 'Boletos Pendentes',
      value: stats.pendingBoletos.toString(),
      icon: RiFileTextLine,
      change: '-5.1%',
      positive: false,
      link: '/boletos'
    }
  ];

  return (
    <div className="home-page">
      <div className="page-header">
        <h1 className="page-header__title">Dashboard</h1>
        <p className="page-header__subtitle">
          Visão geral do seu negócio
        </p>
      </div>

      {/* Estatísticas principais */}
      <div className="stats-grid">
        {statCards.map((stat, index) => (
          <Link
            key={index}
            to={stat.link}
            className="stat-card"
          >
            <div className="stat-card__header">
              <div className="stat-card__icon">
                <stat.icon />
              </div>
              <div className={`stat-card__change ${stat.positive ? 'positive' : 'negative'}`}>
                {stat.positive ? <RiBarChartLine /> : <RiBarChartLine />}
                {stat.change}
              </div>
            </div>
            <div className="stat-card__content">
              <h3 className="stat-card__value">{stat.value}</h3>
              <p className="stat-card__title">{stat.title}</p>
            </div>
            <div className="stat-card__footer">
              <span>Ver detalhes</span>
              <RiArrowRightLine />
            </div>
          </Link>
        ))}
      </div>

      {/* Gráficos */}
      <div className="charts-grid">
        {/* Gráfico de receita */}
        <div className="card chart-card">
          <div className="card__header">
            <h2 className="card__title">Receita dos Últimos 6 Meses</h2>
            <p className="card__subtitle">Crescimento mensal da receita</p>
          </div>
          <div className="card__content">
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis 
                    tickFormatter={(value) => 
                      new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                        minimumFractionDigits: 0
                      }).format(value)
                    }
                  />
                  <Tooltip 
                    formatter={(value) => [
                      new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      }).format(value),
                      'Receita'
                    ]}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="var(--accent-primary)" 
                    strokeWidth={3}
                    dot={{ fill: 'var(--accent-primary)', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Gráfico de distribuição de planos */}
        <div className="card chart-card">
          <div className="card__header">
            <h2 className="card__title">Distribuição de Planos</h2>
            <p className="card__subtitle">Percentual por tipo de plano</p>
          </div>
          <div className="card__content">
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={subscriptionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {subscriptionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Participação']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="chart-legend">
              {subscriptionData.map((item, index) => (
                <div key={index} className="legend-item">
                  <div 
                    className="legend-color" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span>{item.name}: {item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Ações rápidas */}
      <div className="card">
        <div className="card__header">
          <h2 className="card__title">Ações Rápidas</h2>
          <p className="card__subtitle">Acesso rápido às principais funcionalidades</p>
        </div>
        <div className="card__content">
          <div className="quick-actions">
            <Link to="/usuarios" className="quick-action">
              <RiUserLine />
              <span>Novo Usuário</span>
            </Link>
            <Link to="/assinaturas" className="quick-action">
              <RiMoneyDollarCircleLine />
              <span>Nova Assinatura</span>
            </Link>
            <Link to="/planos" className="quick-action">
              <RiPriceTagLine />
              <span>Novo Plano</span>
            </Link>
            <Link to="/boletos" className="quick-action">
              <RiFileTextLine />
              <span>Gerar Boleto</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;