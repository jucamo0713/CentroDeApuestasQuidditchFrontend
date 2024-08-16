import React, { useEffect, useState } from 'react';
import { LoadingSourceUseCase } from '../../../../domain/usecase/LoadingSource.UseCase';
import './Loading.css';

export function Loading() {
    const [loadingSource, setLoadingSource] = useState(false);
    useEffect(() => {
        LoadingSourceUseCase.loadingSource$.subscribe({
            next: setLoadingSource,
        });
    }, []);
    return (
        <>
            {loadingSource && (
                <div className="cover-loader">
                    <div className="loader" />
                </div>
            )}
        </>
    );
}
