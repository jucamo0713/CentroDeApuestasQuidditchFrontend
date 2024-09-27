import React from 'react';
import { Pagination } from '@mui/material';

interface PaginationSelectorProps {
    currentPage: number;
    pageSetter: (page: number) => void;
    totalPages: number;
}

const PaginationSelector: React.FC<PaginationSelectorProps> = ({ currentPage, pageSetter, totalPages }) => {
    return (
        <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(event, value) => pageSetter(value)}
            color="primary"
            sx={{ marginTop: 2 }}
        />
    );
};

export default PaginationSelector;
