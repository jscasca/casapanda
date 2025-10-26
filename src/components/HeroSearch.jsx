// src/components/HeroSearch.jsx
import React, { useState } from "react";
import "./HeroSearch.css";
import { useNavigate } from "react-router-dom";
import coloniasData from "../data/colonias_cdmx.json";

const HeroSearch = () => {
  const [activeTab, setActiveTab] = useState("compra");
  const [colonia, setColonia] = useState("");
  const [pill, setPill] = useState("");
  const [tipoVivienda, setTipoVivienda] = useState(""); // Nuevo estado
  const [sugerencias, setSugerencias] = useState([]);

  const navigate = useNavigate();

  const normalize = (str) =>
    str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  const handleChange = (e) => {
    const valor = e.target.value;
    setColonia(valor);

    if (valor.length > 1) {
      const coincidencias = coloniasData.filter((c) =>
        normalize(c.colonia).includes(normalize(valor))
      );
      setSugerencias(coincidencias.slice(0, 8));
    } else {
      setSugerencias([]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && colonia.trim() !== "") {
      seleccionarColonia(colonia.trim());
    }
  };

  const seleccionarColonia = (nombre) => {
    setPill(nombre);
    setColonia("");
    setSugerencias([]);
  };

  const handleRemove = () => {
    setPill("");
  };

  const redirigirResultados = () => {
    const params = new URLSearchParams();
    params.append("operacion", activeTab);
    if (pill) params.append("colonia", pill);
    if (tipoVivienda && tipoVivienda !== "Tipo de vivienda") {
      params.append("tipo", tipoVivienda);
    }

    navigate(`/resultados?${params.toString()}`);
  };

  return (
    <div className="hero-search-container">
      <div className="container-xl">
        <div className="hero-search-wrapper">
          {/* Tabs */}
          <div className="tabs">
            <button
              className={`tab ${activeTab === "compra" ? "active" : ""}`}
              onClick={() => setActiveTab("compra")}
            >
              Compra
            </button>
            <button
              className={`tab ${activeTab === "renta" ? "active" : ""}`}
              onClick={() => setActiveTab("renta")}
            >
              Renta
            </button>
          </div>

          {/* Formulario */}
          <div className="search-form">
            <div className="tipo-vivienda">
              <select
                className="dropdown-select"
                value={tipoVivienda}
                onChange={(e) => setTipoVivienda(e.target.value)}
              >
                <option>Tipo de vivienda</option>
                <option value="Departamento">Departamento</option>
                <option value="Casa">Casa</option>
                <option value="Loft">Loft</option>
              </select>
            </div>

            <div className="divider-line"></div>

            <div className="colonia-box">
              {pill ? (
                <div className="pill">
                  {pill}
                  <span className="pill-remove" onClick={handleRemove}>
                    ×
                  </span>
                </div>
              ) : (
                <>
                  <input
                    className="input-colonia"
                    placeholder="Escribe colonia de CDMX"
                    value={colonia}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                  />
                  {sugerencias.length > 0 && (
                    <ul className="suggestions-dropdown">
                      {sugerencias.map((s, index) => (
                        <li key={index} onClick={() => seleccionarColonia(s.colonia)}>
                          {s.colonia}
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}
            </div>

            <button className="search-button" onClick={redirigirResultados}>
              Encuentra mi casa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSearch;
