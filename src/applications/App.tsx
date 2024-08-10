import * as React from 'react';
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';
import './App.css';
import { AppRoutesConstants } from '../contexts/shared/domain/model/constants/AppRoutes.Constants';
import AppNavigator from '../contexts/navigate/infrastructure/entry-points/UI/components/AppNavigator';
import { Loading } from '../contexts/shared/infrastructure/entry-points/UI/molecule/Loading';

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
        element: <div>Error 404 la pagina solicitada no existe</div>,
        path: '*',
    },
];

function App() {
    return (
        <div className="App">
            <Loading />
            <AppNavigator />
            <RouterProvider router={createBrowserRouter(router)} />
        </div>
    );
}

export default App;
