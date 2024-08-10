import React, { useState } from 'react';
import { LoadingSourceUseCase } from '../../../../domain/usecase/LoadingSource.UseCase';
import './Loading.css';

export function Loading() {
    const [loadingSource, setLoadingSource] = useState(LoadingSourceUseCase.currentLoading);
    LoadingSourceUseCase.loadingSourceSubject.subscribe({
        next: setLoadingSource,
    });
    if (loadingSource) {
        return (
            <div className="cover-loader">
                <div className="loader" />
            </div>
        );
    }
    return <></>;
}
