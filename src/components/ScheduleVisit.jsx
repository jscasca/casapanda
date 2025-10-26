import React, { useState } from "react";
import db from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const ScheduleVisit = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    fecha: "",
    hora: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "visitas"), formData);
      alert(`Visita agendada para ${formData.nombre} el ${formData.fecha} a las ${formData.hora}`);
    } catch (error) {
      console.error("Error al guardar visita:", error);
      alert("Hubo un error al agendar la visita.");
    }

    setFormData({
      nombre: "",
      email: "",
      telefono: "",
      fecha: "",
      hora: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px", marginTop: "1rem" }}>
      <input type="text" name="nombre" placeholder="Tu nombre" value={formData.nombre} onChange={handleChange} required />
      <input type="email" name="email" placeholder="Correo electrónico" value={formData.email} onChange={handleChange} required />
      <input type="tel" name="telefono" placeholder="Teléfono (WhatsApp)" value={formData.telefono} onChange={handleChange} required />
      <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} required />
      <input type="time" name="hora" value={formData.hora} onChange={handleChange} required />
      <button type="submit">Agendar visita</button>
    </form>
  );
};

export default ScheduleVisit;