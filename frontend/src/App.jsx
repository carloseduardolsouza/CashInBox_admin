import { useState } from "react";
import "./Menu.css"
import "./App.css";

//Home
import { GoHome } from "react-icons/go";
import { GoHomeFill } from "react-icons/go";

//configurações
import { BsGear } from "react-icons/bs";
import { BsGearFill } from "react-icons/bs";

//menu
import { RiMenu2Fill } from "react-icons/ri";

//vendas
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { RiMoneyDollarCircleLine } from "react-icons/ri";

//clientes
import { FaUser } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa6";

//produtos
import { MdSell } from "react-icons/md";
import { MdOutlineSell } from "react-icons/md";

//boletos
import { MdAccountBalanceWallet } from "react-icons/md";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";

//telas
import Home from "./screens/Home/Home";
import Assinaturas from "./screens/Assinaturas/Assinaturas";

import { HashRouter as Router, Link, Route, Routes } from "react-router-dom";

function App() {
  //Status do menu
  const [statusMenu, setStatusMenu] = useState("home");

  //Define o tamanho e se o texto ira aparecer
  const [windowWidth, setWindowWidth] = useState("45px");
  const [windowDisplay, setWindowDisplay] = useState("none");

  const style = {
    display: windowDisplay,
  };

  //controla de forma geral como o menu deve se comportar
  const menuOpen = (params) => {
    if (params == false) {
      setWindowDisplay("none");
      setWindowWidth("45px");
    }

    if (params == true) {
      setWindowWidth("160px");

      setTimeout(() => {
        setWindowDisplay("block");
      }, 190);
    }
  };

  //verifica se o menu esta aberto ou fechado
  const VerificarStatusMenu = () => {
    if (windowWidth == "45px") {
      menuOpen(true);
    } else menuOpen(false);
  };

  return (
    <div className="App">
      <Router>
        <div className="MenuLateralBoxArea" style={{ width: windowWidth }}>
          <div className="MenuLateralBox Outline" onClick={VerificarStatusMenu}>
            <RiMenu2Fill className="iconsMenuLateral" />
          </div>
          <Link
            to="/"
            className="MenuLateralBox"
            onClick={() => setStatusMenu("home")}
          >
            {(statusMenu === "home" && (
              <GoHomeFill className="iconsMenuLateral" />
            )) || <GoHome className="iconsMenuLateral" />}
            <p style={style}>Home</p>
          </Link>
          <Link
            to="/assinaturas"
            className="MenuLateralBox"
            onClick={() => setStatusMenu("assinaturas")}
          >
            {(statusMenu === "assinaturas" && (
              <RiMoneyDollarCircleFill className="iconsMenuLateral" />
            )) || <RiMoneyDollarCircleLine className="iconsMenuLateral" />}
            <p style={style}>Assinaturas</p>
          </Link>
          <Link
            to="/clientes"
            className="MenuLateralBox"
            onClick={() => setStatusMenu("clientes")}
          >
            {(statusMenu === "clientes" && (
              <FaUser className="iconsMenuLateral" />
            )) || <FaRegUser className="iconsMenuLateral" />}
            <p style={style}>Usuários</p>
          </Link>
          <Link
            to="/produtos"
            className="MenuLateralBox"
            onClick={() => setStatusMenu("produtos")}
          >
            {(statusMenu === "produtos" && (
              <MdSell className="iconsMenuLateral" />
            )) || <MdOutlineSell className="iconsMenuLateral" />}
            <p style={style}>Planos</p>
          </Link>

           <Link
            to="/boletos"
            className="MenuLateralBox"
            onClick={() => setStatusMenu("boletos")}
          >
            {(statusMenu === "boletos" && (
              <MdAccountBalanceWallet className="iconsMenuLateral" />
            )) || <MdOutlineAccountBalanceWallet className="iconsMenuLateral" />}
            <p style={style}>Boletos</p>
          </Link>

          <Link
            to="/configurações"
            className="MenuLateralBox Preferencias"
            onClick={() => setStatusMenu("configurações")}
          >
            {(statusMenu === "configurações" && (
              <BsGearFill className="iconsMenuLateral" />
            )) || <BsGear className="iconsMenuLateral" />}
            <p style={style}>Preferencias</p>
          </Link>
          <div className="MenuLateralBox"></div>
        </div>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/assinaturas" Component={Assinaturas} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
