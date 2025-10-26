import React from "react";
import { useNavigate } from "react-router-dom";

export const ResultCard = ({ result, op }) => {
  const navigate = useNavigate();

  const precio = op === 'compra' ? result.sale.price : op === 'renta' ? result.rent.price : '-';

  return (
    <div
      key={result._id}
      onClick={() => navigate(`/property/${result._id}`)}
      style={{ cursor: "pointer" }}
      className="card">
      <img src={result.pictures.length > 0 ? result.pictures[0].url : '/no_image.jpg'} alt={`${result.street} ${result.exterior} ${result.interior}`} />
      <div className="card-info">
        <h5>{ result.development ? `${result.development} ${result.interior}` : `${result.street} ${result.exterior}`}</h5>
        <p>{result.suburb}</p>
        <p>
          {result.rooms} hab · {result.bathrooms} baños ·{" "}
          {result.parking} est. · {result.sqft} m²
        </p>
        <p className="precio">${precio.toLocaleString()}</p>
      </div>
    </div>
  );
};
/*
<div
                  className="card"
                  key={index}
                  onClick={() => navigate(`/property/${p.id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <img src={p.imagen} alt={p.titulo} />
                  <div className="card-info">
                    <h5>{p.titulo}</h5>
                    <p>{p.colonia}</p>
                    <p>
                      {p.habitaciones} hab · {p.banos} baños ·{" "}
                      {p.estacionamiento} est. · {p.m2} m²
                    </p>
                    <p className="precio">${p.precio.toLocaleString()}</p>
                  </div>
                </div>
                */