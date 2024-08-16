import * as React from 'react';
import { createBrowserRouter, Outlet, RouteObject, RouterProvider } from 'react-router-dom';
import './App.css';
import { AppRoutesConstants } from '../contexts/shared/domain/model/constants/AppRoutes.Constants';
import AppNavigator from '../contexts/navigate/infrastructure/entry-points/UI/components/AppNavigator';
import { Loading } from '../contexts/shared/infrastructure/entry-points/UI/molecule/Loading';
import { ToastContainer } from 'react-toastify';
import Profile from '../contexts/user/infrastructure/entry-points/UI/components/Profile';

const routes: RouteObject[] = [
    {
        element: <div>Hello world!</div>,
        path: AppRoutesConstants.MAIN_PAGE,
    },
    {
        element: <div>Matches!</div>,
        path: AppRoutesConstants.MATCHES_PAGE,
    },
    {
        element: <Profile />,
        path: AppRoutesConstants.PROFILE,
    },
    {
        element: <div>Error 404 la pagina solicitada no existe</div>,
        path: '*',
    },
];

const router: RouteObject[] = [
    {
        children: routes,
        element: (
            <>
                <Loading />
                <AppNavigator />
                <Outlet />
                <ToastContainer theme="dark" />
            </>
        ),
    },
];

function App() {
    return (
        <div className="App">
            <RouterProvider router={createBrowserRouter(router)} />
        </div>
    );
}

export default App;
