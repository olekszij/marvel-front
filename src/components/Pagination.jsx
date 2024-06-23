const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div className='flex justify-center'>
      {pages.map((page) => (
        <button
          key={page}
          className={`mx-1 px-3 py-1 rounded-md ${
            currentPage === page
              ? 'bg-blue-500 text-white'
              : 'bg-white text-black'
          }`}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
