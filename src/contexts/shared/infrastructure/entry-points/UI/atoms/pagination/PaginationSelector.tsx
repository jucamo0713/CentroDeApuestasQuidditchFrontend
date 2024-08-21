import { Dispatch, SetStateAction, useState } from 'react';

export function PaginationSelector(params: {
    currentPage: number;
    pageSetter: Dispatch<SetStateAction<number>>;
    totalPages: number;
}) {
    const [middle, setMiddle] = useState<number>(params.currentPage);
    return (
        <div>
            {middle > 2 ? (
                <input
                    type="button"
                    value="<"
                    onClick={(e) => {
                        e.preventDefault();
                        setMiddle(middle - 1);
                    }}
                />
            ) : (
                <></>
            )}
            {middle >= 2 ? (
                <input
                    type={params.currentPage === middle - 1 ? 'submit' : 'button'}
                    value={middle - 1}
                    onClick={(e) => {
                        e.preventDefault();
                        params.pageSetter(middle - 1);
                    }}
                />
            ) : (
                <></>
            )}
            <input
                type={params.currentPage === middle ? 'submit' : 'button'}
                value={middle}
                onClick={(e) => {
                    e.preventDefault();
                    params.pageSetter(middle);
                }}
            />
            {middle + 1 <= params.totalPages ? (
                <input
                    type={params.currentPage === middle + 1 ? 'submit' : 'button'}
                    value={middle + 1}
                    onClick={(e) => {
                        e.preventDefault();
                        params.pageSetter(middle + 1);
                    }}
                />
            ) : (
                <></>
            )}
            {middle === 1 && params.totalPages >= 3 ? (
                <input
                    type={params.currentPage === 3 ? 'submit' : 'button'}
                    value={3}
                    onClick={(e) => {
                        e.preventDefault();
                        params.pageSetter(3);
                    }}
                />
            ) : (
                <></>
            )}
            {(middle === 1 && params.totalPages > 3) || middle + 2 <= params.totalPages ? (
                <input
                    type="button"
                    value=">"
                    onClick={(e) => {
                        e.preventDefault();
                        setMiddle(middle + 1);
                    }}
                />
            ) : (
                <></>
            )}
        </div>
    );
}
