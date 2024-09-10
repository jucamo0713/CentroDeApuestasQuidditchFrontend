interface PaginationProps {
    currentPage: number;
    pageSetter: (page: number) => void;
    totalPages: number;
}

export function PaginationSelector({ currentPage, pageSetter, totalPages }: PaginationProps) {
    const handlePageClick = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            pageSetter(page);
        }
    };

    return (
        <div className="pagination-container">
            <button onClick={() => handlePageClick(1)} disabled={currentPage === 1}>
                &laquo; Primero
            </button>
            <button onClick={() => handlePageClick(currentPage - 1)} disabled={currentPage === 1}>
                &lt;
            </button>

            {[...Array(totalPages)].map((_, index) => (
                <button
                    key={index}
                    onClick={() => handlePageClick(index + 1)}
                    className={currentPage === index + 1 ? 'active' : ''}
                >
                    {index + 1}
                </button>
            ))}

            <button onClick={() => handlePageClick(currentPage + 1)} disabled={currentPage === totalPages}>
                &gt;
            </button>
            <button onClick={() => handlePageClick(totalPages)} disabled={currentPage === totalPages}>
                Último &raquo;
            </button>

            <span className="pagination-info">
                Página {currentPage} de {totalPages}
            </span>
        </div>
    );
}
