// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc, updateDoc, setDoc } from "firebase/firestore";
import db from "../firebase";

const AdminDashboard = () => {
  const [visitas, setVisitas] = useState([]);
  const [filtro, setFiltro] = useState("pendientes"); // Filtro de visitas (pendientes, atendidas, canceladas)
  const [fechaFiltro, setFechaFiltro] = useState(""); // Filtro por fecha

  // Cargar las visitas desde la base de datos
  const obtenerVisitas = async () => {
    const visitasCollection = collection(db, "visitas");
    const visitasSnapshot = await getDocs(visitasCollection);
    const visitasData = visitasSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setVisitas(visitasData);
  };

  useEffect(() => {
    obtenerVisitas();
  }, []);

  // Eliminar una visita
  const eliminarVisita = async (id) => {
    const confirmacion = window.confirm("¿Estás seguro de eliminar esta visita?");
    if (confirmacion) {
      await deleteDoc(doc(db, "visitas", id));
      obtenerVisitas();
    }
  };

  // Marcar visita como atendida
  const marcarComoAtendida = async (id) => {
    await updateDoc(doc(db, "visitas", id), { atendida: true });
    obtenerVisitas();
  };

  // Cancelar una visita (mover a la colección de visitas canceladas)
  const cancelarVisita = async (id) => {
    const visita = visitas.find((v) => v.id === id);
    
    // Mover la visita a la colección de visitas canceladas
    await setDoc(doc(db, "visitas_canceladas", id), {
      ...visita,
      cancelada: true,
    });
    
    // Eliminar la visita de la colección original
    await deleteDoc(doc(db, "visitas", id));
    
    obtenerVisitas();
  };

  // Filtrar visitas según el filtro y la fecha
  const visitasFiltradas = visitas.filter((visita) => {
    const fechaValida = fechaFiltro ? visita.fecha === fechaFiltro : true;
    if (filtro === "pendientes") {
      return !visita.atendida && !visita.cancelada && fechaValida;
    } else if (filtro === "atendidas") {
      return visita.atendida && fechaValida;
    } else if (filtro === "canceladas") {
      return visita.cancelada && fechaValida;
    }
    return fechaValida; // Si no hay filtro específico
  });

  return (
    <div style={{ padding: "20px" }}>
      <h2>Visitas Agendadas</h2>

      {/* Filtros */}
      <div style={{ marginBottom: "20px" }}>
        <label>Filtrar por estado: </label>
        <select onChange={(e) => setFiltro(e.target.value)} value={filtro}>
          <option value="pendientes">Visitas Pendientes</option>
          <option value="atendidas">Visitas Atendidas</option>
          <option value="canceladas">Visitas Canceladas</option>
        </select>
        
        <label style={{ marginLeft: "20px" }}>Filtrar por fecha: </label>
        <input
          type="date"
          value={fechaFiltro}
          onChange={(e) => setFechaFiltro(e.target.value)}
        />
      </div>

      {visitasFiltradas.length === 0 ? (
        <p>No hay visitas que coincidan con los filtros seleccionados.</p>
      ) : (
        <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Status</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {visitasFiltradas.map((visita) => (
              <tr key={visita.id} style={{ backgroundColor: visita.atendida ? "#e0ffe0" : "white" }}>
                <td>{visita.nombre}</td>
                <td>{visita.email}</td>
                <td>{visita.telefono}</td>
                <td>{visita.fecha}</td>
                <td>{visita.hora}</td>
                <td>{visita.atendida ? "Atendida" : visita.cancelada ? "Cancelada" : "Pendiente"}</td>
                <td>
                  {!visita.atendida && !visita.cancelada && (
                    <>
                      <button onClick={() => marcarComoAtendida(visita.id)}>Marcar como atendida</button>
                      <button onClick={() => cancelarVisita(visita.id)} style={{ color: "orange" }}>
                        Cancelar
                      </button>
                    </>
                  )}
                  <button onClick={() => eliminarVisita(visita.id)} style={{ color: "red" }}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboard;