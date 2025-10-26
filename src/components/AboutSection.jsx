// src/components/AboutSection.jsx
import React from 'react';
import './AboutSection.css';
import aboutImg from '../assets/about.png';

const AboutSection = () => {
  return (
    <section className="about-section">
      <div className="container-xl">
        <div className="about-box">
          <img src={aboutImg} alt="EnCasa pareja" className="about-image" />
          <div className="about-content">
            <h2 className="about-title">
              En <span className="highlight-orange">Casa</span> te ayudamos a encontrar <span className="highlight-pink">tu hogar ideal</span>
            </h2>
            <p className="about-description">
              Te facilitamos la búsqueda y compra de tu vivienda, simplificando cada paso del proceso inmobiliario.
              Nos enfocamos en ofrecerte una experiencia eficiente, segura y adaptada a tus necesidades, para que
              encuentres el hogar que siempre has deseado.
            </p>
            <p className="about-description">
              Con nuestros valores de integridad, innovación y excelencia, te garantizamos una experiencia de búsqueda
              que superará tus expectativas. <strong>No solo encontrarás una casa, encontrarás tu hogar ideal.</strong>
            </p>
            <button className="about-button">Conoce más de en casa</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;