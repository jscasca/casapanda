// src/Components/Filters.jsx
import { useState } from "react";
import "./Filters.css";

const Filters = ({ onFilter }) => {
  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [bedrooms, setBedrooms] = useState("");

  const handleFilter = () => {
    onFilter({ location, minPrice, maxPrice, bedrooms });
  };

  return (
    <div className="filters">
      <input
        type="text"
        placeholder="Ubicación"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <input
        type="number"
        placeholder="Precio mínimo"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
      />
      <input
        type="number"
        placeholder="Precio máximo"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />
      <input
        type="number"
        placeholder="Recámaras"
        value={bedrooms}
        onChange={(e) => setBedrooms(e.target.value)}
      />
      <button onClick={handleFilter}>Filtrar</button>
    </div>
  );
};

export default Filters;