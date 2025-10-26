// src/components/PropertyList.jsx
import React from 'react';
import PropertyCard from './PropertyCard';
import './PropertyList.css';

const PropertyList = ({ properties }) => {
  return (
    <div className="property-list">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
};

export default PropertyList;