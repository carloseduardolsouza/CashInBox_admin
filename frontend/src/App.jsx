// src/App.jsx (versão simplificada para início)
import React, { useState, useEffect } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  useLocation,
} from "react-router-dom";
import {
  RiMenu2Fill,
  RiCloseFill,
  RiHomeLine,
  RiHomeFill,
  RiMoneyDollarCircleLine,
  RiMoneyDollarCircleFill,
  RiUserLine,
  RiUserFill,
  RiPriceTagLine,
  RiPriceTagFill,
  RiFileTextLine,
  RiFileTextFill,
  RiSettingsLine,
  RiSettingsFill,
  RiSunLine,
  RiMoonLine,
} from "react-icons/ri";
import "./App.css";

import Usuarios from "./pages/Usuarios/Usuarios";
import Planos from "./pages/Planos/Planos";
import Boletos from "./pages/Boletos/Boletos";
import Configuracoes from "./pages/Configuracoes/Configuracoes";
import Assinaturas from "./pages/Assinaturas/Assinaturas"
import Home from "./pages/Home/Home"

// Componente de Loading simples
const LoadingSpinner = ({ text = "Carregando..." }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "200px",
      gap: "1rem",
    }}
  >
    <div
      style={{
        width: "40px",
        height: "40px",
        border: "3px solid var(--accent-primary)",
        borderTop: "3px solid transparent",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
      }}
    ></div>
    <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
      {text}
    </p>
  </div>
);

// Componente Sidebar
const Sidebar = ({ theme, toggleTheme }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  const navigationItems = [
    { path: "/", label: "Home", icon: RiHomeLine, activeIcon: RiHomeFill },
    {
      path: "/assinaturas",
      label: "Assinaturas",
      icon: RiMoneyDollarCircleLine,
      activeIcon: RiMoneyDollarCircleFill,
    },
    {
      path: "/usuarios",
      label: "Usuários",
      icon: RiUserLine,
      activeIcon: RiUserFill,
    },
    {
      path: "/planos",
      label: "Planos",
      icon: RiPriceTagLine,
      activeIcon: RiPriceTagFill,
    },
    {
      path: "/boletos",
      label: "Boletos",
      icon: RiFileTextLine,
      activeIcon: RiFileTextFill,
    },
  ];

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: 99,
          }}
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        style={{
          position: "fixed",
          top: "1rem",
          left: "1rem",
          zIndex: 101,
          display: "none",
          width: "44px",
          height: "44px",
          borderRadius: "var(--radius-md)",
          backgroundColor: "var(--bg-primary)",
          border: "1px solid var(--border-primary)",
          boxShadow: "var(--shadow-md)",
          alignItems: "center",
          justifyContent: "center",
        }}
        className="mobile-menu-button"
      >
        {isMobileOpen ? <RiCloseFill size={20} /> : <RiMenu2Fill size={20} />}
      </button>

      {/* Sidebar */}
      <nav
        className={`sidebar ${isExpanded ? "expanded" : ""} ${
          isMobileOpen ? "mobile-open" : ""
        }`}
        onMouseEnter={() => window.innerWidth > 640 && setIsExpanded(true)}
        onMouseLeave={() => window.innerWidth > 640 && setIsExpanded(false)}
      >
        {/* Header */}
        <div className="sidebar__header">
          <button
            className="sidebar__toggle"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <RiMenu2Fill />
          </button>
          <h1 className="sidebar__logo">Cash In Box</h1>
        </div>

        {/* Navigation */}
        <div className="sidebar__nav">
          {navigationItems.map((item) => {
            const Icon = isActive(item.path) ? item.activeIcon : item.icon;

            return (
              <div key={item.path} className="nav-item">
                <Link
                  to={item.path}
                  className={`nav-item__link ${
                    isActive(item.path) ? "active" : ""
                  }`}
                  onClick={() => setIsMobileOpen(false)}
                >
                  <Icon className="nav-item__icon" />
                  <span className="nav-item__text">{item.label}</span>
                </Link>
                {!isExpanded && (
                  <div className="nav-item__tooltip">{item.label}</div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="sidebar__footer">
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === "light" ? <RiMoonLine /> : <RiSunLine />}
            <span className="theme-toggle__text">
              {theme === "light" ? "Modo Escuro" : "Modo Claro"}
            </span>
          </button>

          <div className="nav-item">
            <Link to="/configuracoes" className="nav-item__link">
              <RiSettingsLine className="nav-item__icon" />
              <span className="nav-item__text">Configurações</span>
            </Link>
          </div>

          <div className="user-profile">
            <div className="user-profile__avatar">A</div>
            <div className="user-profile__info">
              <div className="user-profile__name">Admin</div>
              <div className="user-profile__role">Administrador</div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

// Páginas simples

const NotFound = () => (
  <div style={{ textAlign: "center", padding: "2rem" }}>
    <h1>404 - Página não encontrada</h1>
    <p>A página que você está procurando não existe.</p>
    <Link to="/" style={{ color: "var(--accent-primary)" }}>
      Voltar para o início
    </Link>
  </div>
);

// Layout principal
const Layout = ({ children, theme, toggleTheme }) => (
  <div className="app-layout">
    <Sidebar theme={theme} toggleTheme={toggleTheme} />
    <main className="main-content">
      <div className="content-wrapper">{children}</div>
    </main>
  </div>
);

// App principal
function App() {
  const [theme, setTheme] = useState("light");

  // Carregar tema do localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setTheme(prefersDark ? "dark" : "light");
    }
  }, []);

  // Aplicar tema ao documento
  useEffect(() => {
    document.documentElement.className = theme === "dark" ? "dark-theme" : "";
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout theme={theme} toggleTheme={toggleTheme}>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/assinaturas"
          element={
            <Layout theme={theme} toggleTheme={toggleTheme}>
              <Assinaturas />
            </Layout>
          }
        />
        <Route
          path="/usuarios"
          element={
            <Layout theme={theme} toggleTheme={toggleTheme}>
              <Usuarios />
            </Layout>
          }
        />
        <Route
          path="/planos"
          element={
            <Layout theme={theme} toggleTheme={toggleTheme}>
              <Planos />
            </Layout>
          }
        />
        <Route
          path="/boletos"
          element={
            <Layout theme={theme} toggleTheme={toggleTheme}>
              <Boletos />
            </Layout>
          }
        />
        <Route
          path="/configuracoes"
          element={
            <Layout theme={theme} toggleTheme={toggleTheme}>
              <Configuracoes />
            </Layout>
          }
        />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
