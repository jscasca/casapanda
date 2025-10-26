// src/pages/Resultados.jsx
import React, { useEffect, useMemo, useState } from "react";
import "../components/Resultados/Resultados.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Testimonials from "../components/Testimonials";
import propiedades from "../data/propiedades_mock.json";
import colonias from "../data/colonias_cdmx.json";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

// Imágenes de zonas
import cuauImg from "../assets/cuau.png";
import bjImg from "../assets/bj.png";
import aoImg from "../assets/ao.png";
import { apiFetch } from "../util/apiFetch";
import { ResultCard } from "../components/ResultCard";

const normalize = (str) =>
  str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

const Resultados = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);

  const operacionInicial = query.get("operacion") || "compra";
  const tipoInicial = query.get("tipo") || "";
  const ubicacionInicial = query.get("ubicacion") || "";

  const [operacion, setOperacion] = useState(operacionInicial);

  const [filtros, setFiltros] = useState({
    tipo: tipoInicial,
    ubicacion: ubicacionInicial,
    precioMin: "",
    precioMax: "",
    habitaciones: "",
    banos: "",
    estacionamientos: "",
    m2Min: "",
    m2Max: "",
  });

  const [sugerencias, setSugerencias] = useState([]);
  const [mostrarTodas, setMostrarTodas] = useState(true);
  const [filtradas, setFiltradas] = useState([]);
  const [limite, setLimite] = useState(12);

  const propiedadesFiltradas = mostrarTodas ? propiedades : filtradas;
  const propiedadesMostradas = propiedadesFiltradas.slice(0, limite);

  useEffect(() => {
    aplicarFiltros();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiltros((prev) => ({ ...prev, [name]: value }));

    if (name === "ubicacion" && value.length > 1) {
      const matches = colonias
        .filter((c) => normalize(c.colonia).includes(normalize(value)))
        .slice(0, 10);
      setSugerencias(matches);
    } else {
      setSugerencias([]);
    }
  };

  const aplicarFiltros = () => {
    const resultados = propiedades.filter((p) => {
      const matchOperacion = p.operacion === operacion;

      const matchTipo = !filtros.tipo || p.tipo === filtros.tipo;

      const matchUbicacion =
        !filtros.ubicacion ||
        normalize(p.colonia).includes(normalize(filtros.ubicacion)) ||
        normalize(filtros.ubicacion).includes(normalize(p.colonia));

      const precio = parseFloat(p.precio);
      const matchPrecioMin =
        !filtros.precioMin || precio >= parseFloat(filtros.precioMin);
      const matchPrecioMax =
        !filtros.precioMax || precio <= parseFloat(filtros.precioMax);

      const matchHabitaciones =
        !filtros.habitaciones ||
        (filtros.habitaciones === "+3" && p.habitaciones >= 4) ||
        parseInt(filtros.habitaciones) === p.habitaciones;

      const matchBanos =
        !filtros.banos ||
        (filtros.banos === "+3" && p.banos >= 4) ||
        parseInt(filtros.banos) === p.banos;

      const matchEstacionamiento =
        !filtros.estacionamientos ||
        (filtros.estacionamientos === "+3" && p.estacionamiento >= 4) ||
        parseInt(filtros.estacionamientos) === p.estacionamiento;

      const matchM2Min = !filtros.m2Min || p.m2 >= parseInt(filtros.m2Min);
      const matchM2Max = !filtros.m2Max || p.m2 <= parseInt(filtros.m2Max);

      return (
        matchOperacion &&
        matchTipo &&
        matchUbicacion &&
        matchPrecioMin &&
        matchPrecioMax &&
        matchHabitaciones &&
        matchBanos &&
        matchEstacionamiento &&
        matchM2Min &&
        matchM2Max
      );
    });

    setFiltradas(resultados);
    setLimite(12);
    setMostrarTodas(false);
    setSugerencias([]);
  };

  const limpiarFiltros = () => {
    setFiltros({
      tipo: "",
      ubicacion: "",
      precioMin: "",
      precioMax: "",
      habitaciones: "",
      banos: "",
      estacionamientos: "",
      m2Min: "",
      m2Max: "",
    });
    setMostrarTodas(true);
    setLimite(12);
  };

  const verMas = () => {
    setLimite((prev) => prev + 12);
  };

  const irAZona = (zona) => {
    navigate(`/zona/${zona.toLowerCase()}`);
  };

  const [searchParams] = useSearchParams();

  const memoQuery = useMemo(() => {
    const obj = {};
    console.log(searchParams)
    for (const [key, value] of searchParams.entries()) {
      console.log(key, value)
      obj[key] = value
    }
    return obj
  }, [ searchParams ]);

  const [ loading, setLoading ] = useState(true);
  const [ results, setResults ] = useState([]);

  useEffect(() => {
    let cancelled = false;
    const getResults = async () => {
      setLoading(true);
      // setError(null)
      try {
        const r = await apiFetch('/v1/search', { params: memoQuery });
        console.log(r);
        if (!cancelled) setResults(r.data);
      } catch (err) {
        if (!cancelled) {
          console.log('err: ', err);
          // setError(err)
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    getResults();
    return () => {
      cancelled = true;
    };
  }, [JSON.stringify(memoQuery)]);

  return (
    <>
      <Header />

      <div className="resultados-header-fondo">
        <div className="container-xl">
          <div className="barra-morada"></div>
        </div>
      </div>

      <section className="resultados-container container-xl">
        <div className="resultados-wrapper">
          <aside className="filtros">
            <div className="tabs-operacion">
              <button
                className={operacion === "compra" ? "active" : ""}
                onClick={() => setOperacion("compra")}
              >
                Compra
              </button>
              <button
                className={operacion === "renta" ? "active" : ""}
                onClick={() => setOperacion("renta")}
              >
                Renta
              </button>
            </div>

            <select name="tipo" value={filtros.tipo} onChange={handleChange}>
              <option value="">Tipo de propiedad</option>
              <option value="Departamento">Departamento</option>
              <option value="Casa">Casa</option>
            </select>

            <label>Ubicación</label>
            <input
              type="text"
              placeholder="Colonia"
              name="ubicacion"
              value={filtros.ubicacion}
              onChange={handleChange}
              autoComplete="off"
            />
            {sugerencias.length > 0 && (
              <ul className="sugerencias-dropdown">
                {sugerencias.map((s, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setFiltros((prev) => ({
                        ...prev,
                        ubicacion: s.colonia,
                      }));
                      setSugerencias([]);
                    }}
                  >
                    {s.colonia}
                  </li>
                ))}
              </ul>
            )}

            <label>Precio (millones)</label>
            <div className="precio-box">
              <input
                type="text"
                placeholder="Min"
                name="precioMin"
                value={filtros.precioMin}
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Max"
                name="precioMax"
                value={filtros.precioMax}
                onChange={handleChange}
              />
            </div>

            <label>Habitaciones</label>
            <select
              name="habitaciones"
              value={filtros.habitaciones}
              onChange={handleChange}
            >
              <option value="">Todas</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="+3">+3</option>
            </select>

            <label>Baños</label>
            <select
              name="banos"
              value={filtros.banos}
              onChange={handleChange}
            >
              <option value="">Todos</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="+3">+3</option>
            </select>

            <label>Estacionamiento</label>
            <select
              name="estacionamientos"
              value={filtros.estacionamientos}
              onChange={handleChange}
            >
              <option value="">Todos</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="+3">+3</option>
            </select>

            <label>M2 Habitables</label>
            <div className="precio-box">
              <input
                type="text"
                placeholder="Desde"
                name="m2Min"
                value={filtros.m2Min}
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Hasta"
                name="m2Max"
                value={filtros.m2Max}
                onChange={handleChange}
              />
            </div>

            <div className="filtro-botones">
              <button onClick={aplicarFiltros}>Aplicar</button>
              <button className="boton-limpiar" onClick={limpiarFiltros}>
                Limpiar
              </button>
            </div>
          </aside>

          <div className="resultados-listado">
            { loading ? (<p>loading</p>) : 
              results.length === 0 ? (<p className="no-result">😢 No se encontraron propiedades</p>) : 
                (results.map((p, index) => (
                  <ResultCard result={p} op={'compra'} />
                )))}
          </div>
        </div>
      </section>

      {propiedadesMostradas.length < propiedadesFiltradas.length && (
        <div className="container-xl">
          <div className="ver-mas-wrapper">
            <button className="ver-mas-btn" onClick={verMas}>
              Ver más
            </button>
          </div>
        </div>
      )}

      <section className="zonas-destacadas container-xl">
        <h3>En estas zonas hay algo para ti</h3>
        <div className="zona-cards">
          <div className="zona-card" onClick={() => irAZona("cuauhtemoc")}>
            <img src={cuauImg} alt="Cuauhtémoc" />
            <p>Cuauhtémoc</p>
          </div>
          <div className="zona-card" onClick={() => irAZona("benito-juarez")}>
            <img src={bjImg} alt="Benito Juárez" />
            <p>Benito Juárez</p>
          </div>
          <div className="zona-card" onClick={() => irAZona("alvaro-obregon")}>
            <img src={aoImg} alt="Álvaro Obregón" />
            <p>Álvaro Obregón</p>
          </div>
        </div>
      </section>

      <Testimonials />
      <Footer />
    </>
  );
};

export default Resultados;