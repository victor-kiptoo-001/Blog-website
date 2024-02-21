

function Pagination ({ currentPage, onPageChange, blogs, pageSize }) {
  const totalPages = Math.ceil(blogs.length / pageSize);

  const renderPaginationLinks = () => {
      return Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
          <li key={pageNumber} className={pageNumber === currentPage ? "activePagination" : ""}>
              <a href="#" onClick={() => onPageChange(pageNumber)}>{pageNumber}</a>
          </li>
      ));
  };

  return (
    <div className="my-10">
    
      <ul className="pagination flex-wrap gap-4">
          <li>
              <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
          </li>

          <div className="flex gap-1">{renderPaginationLinks()}</div>

          <li>
              <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
          </li>
      </ul>
      </div>
  );
};

export default Pagination;