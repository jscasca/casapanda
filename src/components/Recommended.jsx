// src/components/Recommended.jsx
import React from 'react';
import './Recommended.css';
import property1 from '../assets/PortadaPropiedad.png';
import property2 from '../assets/PortadaPropiedad.png';
import property3 from '../assets/PortadaPropiedad.png';
import property4 from '../assets/PortadaPropiedad.png';

const mockProperties = [
  {
    img: property1,
    title: 'Departamento en Polanco',
    price: '$3,500,000 MXN',
    area: '85m²',
    rooms: '2 Rec',
    baths: '2 Baños',
    parking: '1 Estac'
  },
  {
    img: property2,
    title: 'Casa en Condesa',
    price: '$5,200,000 MXN',
    area: '120m²',
    rooms: '3 Rec',
    baths: '2.5 Baños',
    parking: '2 Estac'
  },
  {
    img: property3,
    title: 'Loft en Roma Norte',
    price: '$2,800,000 MXN',
    area: '60m²',
    rooms: '1 Rec',
    baths: '1 Baño',
    parking: 'Sin Estac'
  },
  {
    img: property4,
    title: 'Penthouse en Santa Fe',
    price: '$7,500,000 MXN',
    area: '200m²',
    rooms: '4 Rec',
    baths: '4 Baños',
    parking: '3 Estac'
  },
  {
    img: property1,
    title: 'Departamento en Delvalle',
    price: '$7,500,000 MXN',
    area: '150m²',
    rooms: '3 Rec',
    baths: '2 Baños',
    parking: '3 Estac'
  },
  {
    img: property1,
    title: 'Loft en Narvarte',
    price: '$6,500,000 MXN',
    area: '55m²',
    rooms: '1 Rec',
    baths: '1 Baños',
    parking: '1 Estac'
  }
];

const Recommended = () => {
  return (
    <section className="recommended-carousel">
      <div className="container-xl">
        <h2 className="recommended-title">Nuestros recomendados para ti</h2>
        <p className="recommended-subtitle">Basado en tus preferencias y búsquedas recientes</p>
        <div className="recommended-carousel">
          {mockProperties.map((prop, index) => (
            <div className="property-card" key={index}>
              <img src={prop.img} alt={prop.title} className="property-image" />
              <div className="property-info">
                <h3 className="property-title">{prop.title}</h3>
                <p className="property-price">{prop.price}</p>
                <div className="property-details">
                  <span>{prop.area}</span>
                  <span>{prop.rooms}</span>
                  <span>{prop.baths}</span>
                  <span>{prop.parking}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Recommended;