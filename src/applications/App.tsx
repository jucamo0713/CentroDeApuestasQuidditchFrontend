import * as React from 'react';
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';
import './App.css';
import AppNavigator from '../contexts/navigate/infrastructure/entry-points/UI/components/AppNavigator';
import { AppRoutesConstants } from '../contexts/shared/domain/constants/AppRoutes.Constants';

const router: RouteObject[] = [
    {
        element: <div>Hello world!</div>,
        path: AppRoutesConstants.MAIN_PAGE,
    },
    {
        element: <div>Matches!</div>,
        path: AppRoutesConstants.MATCHES_PAGE,
    },
    {
        element: <div>ay papi usted donde se intento meter?</div>,
        path: '*',
    },
];

function App() {
    return (
        <div className="App">
            <AppNavigator isLogged={false} />
            <RouterProvider router={createBrowserRouter(router)} />
        </div>
    );
}

export default App;
