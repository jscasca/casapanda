// src/pages/Home.jsx
import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
// import MediaSection from '../components/MediaSection';
import ThreeSteps from '../components/ThreeSteps';
import Recommended from '../components/Recommended';
import InfoCards from '../components/InfoCards';
import AboutSection from '../components/AboutSection';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="home">
      <Header />
      <HeroSection />
      {/*<MediaSection /> */ }
      <ThreeSteps />
      <Recommended />
      <InfoCards />
      <AboutSection />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Home;