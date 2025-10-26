// src/components/HeroSection.jsx
import React from "react";
import HeroSearch from "./HeroSearch";
import "./HeroSection.css";

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-container container-xl">
        <div className="hero-overlay">
          <h1 className="header-slogan">
            En<span className="accent-orange">Casa</span>, en un{" "}
            <span className="accent-purple">clic</span>
          </h1>
        </div>
        <HeroSearch />
      </div>
    </section>
  );
};

export default HeroSection;