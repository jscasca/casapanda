
// src/pages/Properties.jsx
import React, { useState } from 'react';
// import Filters from '../components/Filters';
// import PropertyList from '../Backup-Components/PropertyList';
import Pagination from '../components/Pagination';
import Modal from '../components/Modal';
import { properties } from '../properties';

const Properties = () => {
  const itemsPerPage = 4;
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);

  const handleFilterChange = (e) => {
    const filterValue = e.target.value.toLowerCase();
    const filtered = properties.filter((property) =>
      property.title.toLowerCase().includes(filterValue) || property.price.includes(filterValue)
    );
    setFilteredProperties(filtered);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePropertyClick = (property) => {
    setSelectedProperty(property);
  };

  const handleCloseModal = () => {
    setSelectedProperty(null);
  };

  const currentProperties = filteredProperties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container-xl">
      {/*<Filters onFilterChange={handleFilterChange} /> */}
      {/*<PropertyList properties={currentProperties} onPropertyClick={handlePropertyClick} />*/}
      <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
      <Modal property={selectedProperty} onClose={handleCloseModal} />
    </div>
  );
};

export default Properties;
