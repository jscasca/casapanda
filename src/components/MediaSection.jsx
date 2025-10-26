// src/components/MediaSection.jsx
import React from 'react';
import './MediaSection.css';
import expansion from '../assets/expansion-seeklogo.svg';
import economista from '../assets/El_Economista_(Mexico)_logo.svg';

const MediaSection = () => {
  return (
    <section className="media-section">
      <div className="container-xl">
        <h2 className="media-title">EnCasa, en los medios</h2>
        <p className="media-subtitle">Esto dicen de nosotros y no pueden equivocarse</p>
        <div className="media-logos">
          <div className="media-logo-item">
            <img src={expansion} alt="Expansión" />
          </div>
          <div className="media-logo-item">
            <img src={economista} alt="El Economista" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MediaSection;