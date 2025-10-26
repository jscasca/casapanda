// src/pages/PropertyDetail.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../components/PropertyDetail.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import imgMain from "../assets/propiedad-mock.jpg";
import imgThumb1 from "../assets/propiedad-mock1.jpg";
import imgThumb2 from "../assets/propiedad-mock2.jpg";
import imgThumb3 from "../assets/propiedad-mock3.jpg";
import imgThumb4 from "../assets/propiedad-mock4.jpg";

const PropertyDetail = () => {

  const { id } = useParams();
  console.log('id: ', id);
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [mostrarCalendario, setMostrarCalendario] = useState("");
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [horaSeleccionada, setHoraSeleccionada] = useState(null);
  const [fechasDisponibles, setFechasDisponibles] = useState([]);
  const [horasDisponibles, setHorasDisponibles] = useState([]);
  const [mostrarPopupHoras, setMostrarPopupHoras] = useState(false);
  const [mensajeAgendado, setMensajeAgendado] = useState("");

  const [modalAbierto, setModalAbierto] = useState(false);
  const [imagenActual, setImagenActual] = useState(0);

  const navigate = useNavigate();

  const imagenes = [imgMain, imgThumb1, imgThumb2, imgThumb3, imgThumb4];

  const esFormularioValido =
    nombre.trim() !== "" &&
    correo.includes("@") &&
    telefono.replace(/\D/g, "").length >= 10;

  useEffect(() => {
    generarFechasDisponibles();
  }, []);

  const generarFechasDisponibles = () => {
    const hoy = new Date();
    const fechas = [];
    for (let i = 0; i < 7; i++) {
      const fecha = new Date(hoy);
      fecha.setDate(hoy.getDate() + i);
      fechas.push(fecha);
    }
    setFechasDisponibles(fechas);
  };

  const generarHorasDisponibles = (fecha) => {
    const horas = [];
    const diaSemana = fecha.getDay();
    let inicio = 9;
    let fin = (diaSemana === 0 || diaSemana === 6) ? 14 : 18;

    for (let h = inicio; h < fin; h++) {
      horas.push(`${h.toString().padStart(2, "0")}:00`);
      horas.push(`${h.toString().padStart(2, "0")}:30`);
    }
    setHorasDisponibles(horas);
  };

  const seleccionarFecha = (fecha) => {
    setFechaSeleccionada(fecha);
    generarHorasDisponibles(fecha);
    setHoraSeleccionada(null);
    setMostrarPopupHoras(true);
  };

  const seleccionarHora = (hora) => {
    setHoraSeleccionada(hora);
  };

  const cerrarPopup = () => {
    setMostrarPopupHoras(false);
  };

  const agendar = () => {
    if (fechaSeleccionada && horaSeleccionada) {
      setMensajeAgendado(
        `¡Cita programada para el ${fechaSeleccionada.toLocaleDateString()} a las ${horaSeleccionada}!`
      );
      cerrarPopup();
      setFechaSeleccionada(null);
      setHoraSeleccionada(null);
      setMostrarCalendario("");
    }
  };

  const irACalculadoraHipoteca = () => {
    navigate("/hipoteca");
  };

  const abrirModal = (index) => {
    setImagenActual(index);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
  };

  const imagenSiguiente = () => {
    setImagenActual((prev) => (prev + 1) % imagenes.length);
  };

  const imagenAnterior = () => {
    setImagenActual((prev) => (prev - 1 + imagenes.length) % imagenes.length);
  };

  const agendarDesdeModal = (tipo) => {
    cerrarModal();
    setMostrarCalendario(tipo);
    setFechaSeleccionada(null);
    setHoraSeleccionada(null);
  };

  const tituloCalendario =
    mostrarCalendario === "visita"
      ? "¿Cuándo quieres visitar?"
      : "¿Cuándo te contactamos?";

  const diasSemana = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"];

  const [ loading, setLoading ] = useState(true);
  const [ property, setProperty ] = useState({});

  useEffect(() => {
    const getProperty = async () => {
      setLoading(true);
      try {
        const r = await apiFetch(`/v1/property/${id}`);
        console.log(r);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getProperty();
  }, [ id ]);

  return (
    <>
      <Header />

      <div className="resultados-header-fondo">
        <div className="container-xl">
          <div className="barra-morada"></div>
        </div>
      </div>

      <section className="property-container container-xl">
        {/* Galería */}
        <div className="gallery-grid">
          <div className="gallery-main">
            <img
              src={imagenes[0]}
              alt="Propiedad principal"
              onClick={() => abrirModal(0)}
              className="hoverable"
            />
          </div>
          <div className="gallery-thumbnails">
            {imagenes.slice(1).map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Foto ${i + 1}`}
                onClick={() => abrirModal(i + 1)}
                className="hoverable"
              />
            ))}
          </div>
        </div>

        <div className="property-content">
          <div className="property-main">
            <h1>Departamento moderno en Narvarte</h1>
            <div className="property-icons">
              2 habitaciones · 2 baños · 1 estacionamiento · 80 m²
            </div>

            <div className="property-description">
              <p>Espacioso departamento con excelente ubicación.</p>
            </div>

            <div className="property-amenities">
              <h3>Servicios</h3>
              <ul>
                <li>Seguridad 24/7</li>
                <li>Elevador</li>
                <li>Gimnasio</li>
                <li>Área infantil</li>
              </ul>
            </div>

            <div className="property-map">
              <h3>Ubicación</h3>
              <img src={imgMain} alt="Mapa" />
            </div>
          </div>

          <div className="property-contact">
            <div className="contact-form">
              <h3>Contáctanos o agenda una visita</h3>
              <input
                type="text"
                placeholder="Nombre completo"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
              <input
                type="email"
                placeholder="Correo electrónico"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
              <input
                type="tel"
                placeholder="Teléfono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />

              <div className="contact-buttons">
                <button
                  className={
                    !esFormularioValido
                      ? "btn-inactivo"
                      : mostrarCalendario === "llamada"
                      ? "btn-activo"
                      : mostrarCalendario === "visita"
                      ? "btn-inactivo"
                      : "btn-coral"
                  }
                  onClick={() => {
                    setMostrarCalendario("llamada");
                    setFechaSeleccionada(null);
                    setHoraSeleccionada(null);
                  }}
                  disabled={!esFormularioValido}
                >
                  Agendar llamada
                </button>

                <button
                  className={
                    !esFormularioValido
                      ? "btn-inactivo"
                      : mostrarCalendario === "visita"
                      ? "btn-activo"
                      : mostrarCalendario === "llamada"
                      ? "btn-inactivo"
                      : "btn-coral"
                  }
                  onClick={() => {
                    setMostrarCalendario("visita");
                    setFechaSeleccionada(null);
                    setHoraSeleccionada(null);
                  }}
                  disabled={!esFormularioValido}
                >
                  Agendar visita
                </button>
              </div>

              {mostrarCalendario && (
                <div className="calendar-mini">
                  <h4>{tituloCalendario}</h4>

                  <div className="calendar-grid-2col">
                    <div className="calendar-section">
                      <div className="calendar-header">
                        {diasSemana.map((day, idx) => (
                          <div key={idx} className="calendar-header-day">
                            {day}
                          </div>
                        ))}
                      </div>

                      <div className="calendar-dates-grid">
                        {fechasDisponibles.map((fecha, idx) => (
                          <button
                            key={idx}
                            className={`calendar-day ${
                              fechaSeleccionada?.toDateString() === fecha.toDateString()
                                ? "selected"
                                : ""
                            }`}
                            onClick={() => seleccionarFecha(fecha)}
                          >
                            {fecha.getDate()}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {mensajeAgendado && (
              <div className="mensaje-agendado">{mensajeAgendado}</div>
            )}

            <div className="mortgage-button">
              <button onClick={irACalculadoraHipoteca}>
                Calcula tu hipoteca
              </button>
            </div>
          </div>
        </div>

        {mostrarPopupHoras && (
          <div className="popup-horas-overlay">
            <div className="popup-horas">
              <button className="close-popup" onClick={cerrarPopup}>
                X
              </button>
              <h4>¿Qué horario prefieres?</h4>
              <div className="popup-horas-list">
                {horasDisponibles.map((hora, idx) => (
                  <button
                    key={idx}
                    className={`popup-hora ${
                      horaSeleccionada === hora ? "selected" : ""
                    }`}
                    onClick={() => seleccionarHora(hora)}
                  >
                    {hora}
                  </button>
                ))}
              </div>
              {horaSeleccionada && (
                <div className="confirmar-cita-popup">
                  <button onClick={agendar}>Confirmar cita</button>
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      {/* Modal */}
      {modalAbierto && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal" onClick={cerrarModal}>X</button>
            <img src={imagenes[imagenActual]} alt="Vista ampliada" className="fade-in" />
            <div className="modal-buttons">
              <button onClick={imagenAnterior}>{"<"}</button>
              <button onClick={imagenSiguiente}>{">"}</button>
            </div>
            <div className="modal-info">
              <h2>Departamento moderno en Narvarte</h2>
              <p>$5,000,000</p>
              <div className="modal-actions">
                <button onClick={() => agendarDesdeModal("llamada")}>
                  Agendar llamada
                </button>
                <button onClick={() => agendarDesdeModal("visita")}>
                  Agendar visita
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default PropertyDetail;