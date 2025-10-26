// src/components/InfoCards.jsx
import React from 'react';
import './InfoCards.css';
import imgCompra from '../assets/comocomprartucasa.png';
import imgMujer from '../assets/mujercabeza.png';
import imgPaso from '../assets/elprimerpaso.png';

const InfoCards = () => {
  return (
    <section className="info-cards">
      <div className="container-xl">
        <h2 className="info-title">Hay algo que tienes que saber</h2>
        <div className="cards-grid">
          {/* Izquierda grande */}
          <div className="card-large">
            <img src={imgCompra} alt="Cómo comprar tu casa" />
            <div className="card-text">
              <h3>Como comprar tu casa antes de los 30</h3>
              <span className="arrow">→</span>
            </div>
          </div>

          {/* Derecha en columna */}
          <div className="card-column">
            <div className="card-rect">
              <img src={imgMujer} alt="Mujer cabeza del hogar" />
              <div className="card-text">
                <h3>Mujer, cabeza del hogar y madre</h3>
                <span className="arrow">→</span>
              </div>
            </div>

            <div className="card-rect">
              <img src={imgPaso} alt="El primer paso para tu casa" />
              <div className="card-text">
                <h3>El primer paso para tener tu casa.</h3>
                <span className="arrow">→</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoCards;