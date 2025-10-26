import React from 'react';
import './Footer.css';
import logo from '../assets/logo2.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <section className="footer-section">
      <div className="container-xl">
        <div className="footer-box">

          {/* Columna 1: Logo + legal */}
          <div className="footer-column">
            <div className="footer-logo">
              <img src={logo} alt="Logo EnCasa" />
              <p className="footer-legal">EnCasa® 2024. Todos los derechos reservados</p>
            </div>
          </div>

          {/* Columnas alineadas horizontalmente */}
          <div className="footer-columns">
            {/* Ayuda y contacto */}
            <div className="footer-column">
              <h4>Ayuda y contacto</h4>
              <ul>
                <li>Teléfono: 55 8905 6696</li>
                <li>Email: hola@EnCasa.com</li>
                <li>
                  WhatsApp: <a href="https://wa.me/message/QMETA5P75QGUM1" target="_blank" rel="noopener noreferrer">Haz clic aquí</a>
                </li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Vende tu casa</h4>
              <ul>
                <li>Propietarios</li>
                <li>Desarrollos</li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Obtén tu casa</h4>
              <ul>
                <li>Casas</li>
                <li>Departamentos</li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>¡Síguenos en redes!</h4>
              <div className="social-icons">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faFacebookF} className='icon-size' />
                </a>
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faLinkedinIn} className='icon-size' />
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faInstagram} className='icon-size' />
                </a>
              </div>
              <p className="privacy-link">Aviso de privacidad</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Footer;