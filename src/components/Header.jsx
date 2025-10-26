// src/components/Header.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import logo from "../assets/logo-encasa-blanco.svg";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="header-wrapper">
      <div className="container-xl encasa-header">
        <div className="header-left">
          <img
            src={logo}
            alt="Logo EnCasa"
            className="logo"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          />
        </div>

        <nav className="header-nav">
          <a onClick={() => navigate("/resultados?operacion=compra")}>Compra</a>
          <a onClick={() => navigate("/resultados?operacion=renta")}>Renta</a>
          <a onClick={() => navigate("/vende")}>Vende</a>

          <div className="dropdown">
            <span>
              Tipo de propiedad{" "}
              <span style={{ fontSize: "20px", marginLeft: "4px" }}>▾</span>
            </span>
            <div className="dropdown-menu">
              <a onClick={() => navigate("/resultados?tipo=Departamento")}>Departamento</a>
              <a onClick={() => navigate("/resultados?tipo=Casa")}>Casa</a>
              <a onClick={() => navigate("/resultados?tipo=Loft")}>Loft</a>
            </div>
          </div>

          <div className="dropdown">
            <span>
              Blog <span style={{ fontSize: "20px", marginLeft: "4px" }}>▾</span>
            </span>
            <div className="dropdown-menu">
              <a onClick={() => navigate("/blog#consejos")}>Consejos</a>
              <a onClick={() => navigate("/blog#historias")}>Historias</a>
              <a onClick={() => navigate("/blog#noticias")}>Noticias</a>
            </div>
          </div>
        </nav>

        <div className="header-buttons">
          <button className="btn-register" onClick={() => navigate("/registro")}>
            Regístrate
          </button>
          <button className="btn-login" onClick={() => navigate("/login")}>
            Iniciar sesión
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;