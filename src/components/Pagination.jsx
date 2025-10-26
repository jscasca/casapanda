// src/components/Pagination.jsx
const Pagination = ({ totalPages, currentPage, onPageChange }) => {
    const pageNumbers = [...Array(totalPages).keys()].map(i => i + 1);
  
    return (
      <div className="pagination">
        {pageNumbers.map(number => (
          <button
            key={number}
            className={`page-button ${currentPage === number ? 'active' : ''}`}
            onClick={() => onPageChange(number)}
          >
            {number}
          </button>
        ))}
      </div>
    );
  };
  
  export default Pagination;