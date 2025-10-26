// src/Components/PropertyCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./PropertyCard.css";

const PropertyCard = ({ property }) => {
  return (
    <div className="property-card">
      <img src={property.image} alt={property.title} />
      <h3>{property.title}</h3>
      <p className="description">{property.description}</p>
      <p className="price">${property.price.toLocaleString()}</p>
      <Link to={`/property/${property.id}`} className="view-link">
        Ver más
      </Link>
    </div>
  );
};

export default PropertyCard;