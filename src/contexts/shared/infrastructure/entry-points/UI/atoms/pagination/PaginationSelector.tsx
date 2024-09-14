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

    const generateVisiblePages = (currentPage: number, totalPages: number) => {
        const pages = [];

        // Mostrar la primera página si no es la actual
        if (currentPage > 2) {
            pages.push(1);
        }

        // Mostrar puntos suspensivos si la página actual es mayor a 3
        if (currentPage > 3) {
            pages.push('...');
        }

        // Mostrar las páginas alrededor de la página actual
        for (let i = Math.max(1, currentPage - 1); i <= Math.min(totalPages, currentPage + 1); i++) {
            pages.push(i);
        }

        // Mostrar puntos suspensivos si la página actual está lejos del final
        if (currentPage < totalPages - 2) {
            pages.push('...');
        }

        // Mostrar la última página si no está ya en las páginas visibles
        if (currentPage < totalPages - 1) {
            pages.push(totalPages);
        }

        return pages;
    };

    const visiblePages = generateVisiblePages(currentPage, totalPages);

    return (
        <div className="pagination-container">
            {/* Botón para ir a la primera página */}
            <button onClick={() => handlePageClick(1)} disabled={currentPage === 1}>
                &laquo; Primero
            </button>
            {/* Botón para ir a la página anterior */}
            <button onClick={() => handlePageClick(currentPage - 1)} disabled={currentPage === 1}>
                &lt;
            </button>

            {/* Renderizar las páginas generadas */}
            {visiblePages.map((page, index) =>
                typeof page === 'number' ? (
                    <button
                        key={index}
                        onClick={() => handlePageClick(page)}
                        className={currentPage === page ? 'active' : ''}
                    >
                        {page}
                    </button>
                ) : (
                    <span key={index}>...</span>
                ),
            )}

            {/* Botón para ir a la siguiente página */}
            <button onClick={() => handlePageClick(currentPage + 1)} disabled={currentPage === totalPages}>
                &gt;
            </button>
            {/* Botón para ir a la última página */}
            <button onClick={() => handlePageClick(totalPages)} disabled={currentPage === totalPages}>
                Último &raquo;
            </button>

            {/* Mostrar la información de la página actual */}
            <span className="pagination-info">
                Página {currentPage} de {totalPages}
            </span>
        </div>
    );
}
