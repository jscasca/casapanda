// src/components/Mapa.jsx
import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import propiedades from "../data/propiedades_mock.json";

const containerStyle = {
  width: "100%",
  height: "600px",
  borderRadius: "16px",
};

const center = {
  lat: 19.39068, // CDMX centro
  lng: -99.28371,
};

const Mapa = () => {
  return (
    <LoadScript googleMapsApiKey="TU_API_KEY_AQUI">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
        {propiedades.map((prop, index) => (
          <Marker
            key={index}
            position={{
              lat: parseFloat(prop.lat),
              lng: parseFloat(prop.lng),
            }}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default Mapa;