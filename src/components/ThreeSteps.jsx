// src/components/ThreeSteps.jsx
import React from 'react';
import './ThreeSteps.css';
import buscaImg from '../assets/busca.png';
import visitaImg from '../assets/visita.png';
import compraImg from '../assets/compra.png';

const ThreeSteps = () => {
  return (
    <section className="three-steps">
      <div className="container-xl">
        <div className="steps-wrapper">
          <h2 className="steps-title">Hogar dulce hogar en 3 pasos</h2>
          <p className="steps-subtitle">
            Queremos que encuentres la casa de tus sueños de la forma más fácil
          </p>

          <div className="steps-container">
            {/* Paso 1 */}
            <div className="step-item">
              <img src={buscaImg} alt="Busca" className="step-image" />
              <h3 className="step-heading">Busca</h3>
              <p className="step-description">
                Tenemos +500 propiedades en todo México para ti. Seguro encuentras.
              </p>
            </div>

            {/* Paso 2 */}
            <div className="step-item">
              <img src={visitaImg} alt="Visita" className="step-image" />
              <h3 className="step-heading">Visita</h3>
              <p className="step-description">
                Queremos que conozcas y vivas tu próximo hogar, agenda tu cita para sentirte EnCasa.
              </p>
            </div>

            {/* Paso 3 */}
            <div className="step-item">
              <img src={compraImg} alt="Compra" className="step-image" />
              <h3 className="step-heading">Compra</h3>
              <p className="step-description">
                Te ayudamos a tener tu casa, olvídate del papeleo y trámites engorrosos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThreeSteps;