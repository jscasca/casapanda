// src/components/Modal.jsx
import React from 'react';

const Modal = ({ property, onClose }) => {
  if (!property) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{property.title}</h2>
        <img src={property.image} alt={property.title} />
        <p>{property.price}</p>
        <p>Detalles adicionales de la propiedad...</p>
      </div>
    </div>
  );
};

export default Modal;