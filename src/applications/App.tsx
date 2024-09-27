import * as React from 'react';
import { createBrowserRouter, Outlet, RouteObject, RouterProvider } from 'react-router-dom';
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
import { LoginPage } from '../contexts/user/infrastructure/entry-points/UI/pages/LoginPage';
import { SignUpPage } from '../contexts/user/infrastructure/entry-points/UI/pages/SignUpPage';
import { Home } from '../contexts/shared/infrastructure/entry-points/UI/components/Home';
import { MatchDetails } from '../contexts/details/infrastructure/entry-point/UI/components/details';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface MatchDetailsType {
    highlights: {
        description: string;
        time: string;
    }[];
    id: number;
    scoreA: number;
    scoreB: number;
    teamA: {
        image: string;
        name: string;
    };
    teamB: {
        image: string;
        name: string;
    };
}

function MatchDetailsWrapper() {
    const { matchId } = useParams();
    const [matchDetails, setMatchDetails] = useState<MatchDetailsType | null>(null);

    useEffect(() => {
        async function fetchMatchDetails() {
            try {
                const response = await fetch('/detailsMatches.json');
                const data = await response.json();
                const match = data.find((m: MatchDetailsType) => m.id === Number(matchId));
                setMatchDetails(match || null);
            } catch (error) {
                console.error('Error al cargar el archivo JSON:', error);
            }
        }

        fetchMatchDetails();
    }, [matchId]);

    if (!matchDetails) {
        return <div>No se encontraron detalles para este partido.</div>;
    }

    return (
        <MatchDetails
            teamA={matchDetails.teamA}
            teamB={matchDetails.teamB}
            scoreA={matchDetails.scoreA}
            scoreB={matchDetails.scoreB}
            highlights={matchDetails.highlights}
        />
    );
}

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
        element: <MatchDetailsWrapper />,
        path: AppRoutesConstants.MATCH_DETAIL,
    },
    {
        element: <LoginPage />,
        path: AppRoutesConstants.LOGIN_PAGE,
    },
    {
        element: <SignUpPage />,
        path: AppRoutesConstants.SIGNUP_PAGE,
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
