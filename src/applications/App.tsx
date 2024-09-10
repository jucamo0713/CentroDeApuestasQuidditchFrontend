import * as React from 'react';
import { createBrowserRouter, Outlet, RouteObject, RouterProvider } from 'react-router-dom';
import './App.css';
import { AppRoutesConstants } from '../contexts/shared/domain/model/constants/AppRoutes.Constants';
import AppNavigator from '../contexts/navigate/infrastructure/entry-points/UI/components/AppNavigator';
import { Loading } from '../contexts/shared/infrastructure/entry-points/UI/molecule/Loading';
import { ToastContainer } from 'react-toastify';
import Profile from '../contexts/user/infrastructure/entry-points/UI/components/Profile';
import Recharge from '../contexts/money/infrastructure/entry-points/UI/components/Recharge';
import { BetDetail } from '../contexts/bet/infrastructure/entry-point/UI/components/BetDetail';
import { Teams } from '../contexts/teams/infrastructure/entry-point/UI/components/Teams';
import { Events } from '../contexts/events/infrastructure/entry-point/UI/components/Events';
import { Matches } from '../contexts/matches/infrastructure/entry-point/UI/components/Matches';
import { Results } from '../contexts/results/infrastructure/entry-point/UI/components/Results';
import { Favorites } from '../contexts/favorites/infrastructure/entry-point/UI/components/Favorites';
import { LoginPage } from '../contexts/login/infrastructure/entry-point/UI/components/LoginPage';
import { Home } from '../contexts/shared/infrastructure/entry-points/UI/components/Home';

const routes: RouteObject[] = [
    {
        element: <Home />,
        path: AppRoutesConstants.MAIN_PAGE,
    },
    {
        element: <Matches />,
        path: AppRoutesConstants.MATCHES_PAGE,
    },
    {
        element: <Results />,
        path: AppRoutesConstants.RESULTS_PAGE,
    },
    {
        element: <Events />,
        path: AppRoutesConstants.EVENTS_PAGE,
    },
    {
        element: <Favorites />,
        path: AppRoutesConstants.FAVORITE,
    },
    {
        element: <Recharge />,
        path: AppRoutesConstants.RECHARGE,
    },
    {
        element: <Teams />,
        path: AppRoutesConstants.TEAMS_PAGE,
    },
    {
        element: <Profile />,
        path: AppRoutesConstants.PROFILE,
    },
    {
        element: <BetDetail />,
        path: AppRoutesConstants.BET_DETAIL,
    },
    {
        element: <div>MatchDetail!</div>,
        path: AppRoutesConstants.MATCH_DETAIL,
    },
    {
        element: <LoginPage />,
        path: AppRoutesConstants.LOGIN_PAGE,
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
