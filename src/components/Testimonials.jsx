// src/components/Testimonials.jsx
import React from 'react';
import './Testimonials.css';

const testimonialsMock = [
  {
    name: 'Andrea López',
    text: '¡Me ayudaron a encontrar mi depa ideal! Todo fue rápido y sin estrés.',
    rating: 5
  },
  {
    name: 'Carlos Méndez',
    text: 'Muy buen servicio y seguimiento constante. Recomendados.',
    rating: 4
  },
  {
    name: 'Valeria Torres',
    text: 'Tenía muchas dudas y me las resolvieron todas. Estoy feliz con mi compra.',
    rating: 5
  },
  {
    name: 'Juan Rivera',
    text: 'Los asesores súper atentos y profesionales. Me sentí acompañado todo el proceso.',
    rating: 5
  },
  {
    name: 'Luis Hernández',
    text: 'Fácil, rápido y seguro. ¡Gracias por todo!',
    rating: 4
  },
  {
    name: 'Camila Domínguez',
    text: 'Nunca pensé que comprar mi casa fuera tan fácil. Todo online y sin complicaciones.',
    rating: 5
  },
];

const Testimonials = () => {
  return (
    <section className="testimonials-section">
      <div className="container-xl">
        <h2 className="testimonials-title">Esto dicen nuestros clientes de nosotros</h2>
        <div className="testimonials-carousel">
          {testimonialsMock.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <p className="testimonial-text">“{testimonial.text}”</p>
              <div className="testimonial-rating">
                {'★'.repeat(testimonial.rating)}{'☆'.repeat(5 - testimonial.rating)}
              </div>
              <div className="testimonial-name">– {testimonial.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;