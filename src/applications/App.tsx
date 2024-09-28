import * as React from 'react';
import { createBrowserRouter, Outlet, RouteObject, RouterProvider } from 'react-router-dom';
import { AppRoutesConstants } from '../contexts/shared/domain/model/constants/AppRoutes.Constants';
import AppNavigator from '../contexts/navigate/infrastructure/entry-points/UI/components/AppNavigator';
import { Loading } from '../contexts/shared/infrastructure/entry-points/UI/molecule/Loading';
import { ToastContainer } from 'react-toastify';
import Profile from '../contexts/user/infrastructure/entry-points/UI/components/Profile';
import Recharge from '../contexts/money/infrastructure/entry-points/UI/components/Recharge';
import { Teams } from '../contexts/teams/infrastructure/entry-point/UI/components/Teams';
import { Events } from '../contexts/events/infrastructure/entry-point/UI/components/Events';
import { Matches } from '../contexts/matches/infrastructure/entry-point/UI/components/Matches';
import { Results } from '../contexts/results/infrastructure/entry-point/UI/components/Results';
import { Favorites } from '../contexts/favorites/infrastructure/entry-point/UI/components/Favorites';
import { LoginPage } from '../contexts/user/infrastructure/entry-points/UI/pages/LoginPage';
import { SignUpPage } from '../contexts/user/infrastructure/entry-points/UI/pages/SignUpPage';
import { Home } from '../contexts/shared/infrastructure/entry-points/UI/components/Home';
import { MatchDetails } from '../contexts/details/infrastructure/entry-point/UI/components/details';
import { WorldCupDetails } from '../contexts/events/infrastructure/entry-point/UI/components/WorldCupDetails';
import { EnglishLeagueDetails } from '../contexts/events/infrastructure/entry-point/UI/components/EnglishLeagueDetails';
import { HogwartsCupDetails } from '../contexts/events/infrastructure/entry-point/UI/components/HogwartsCupDetails';
import { BetDetailPage } from '../contexts/bet/infrastructure/entry-point/UI/pages/BetDetailPage';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { MatchDetailData } from '../contexts/matches/domain/model/matchDetailData';

interface BetDetailsType {
    date: string;
    id: string;
    money: number;
    multiplier: number;
    scoreA: number;
    scoreB: number;
    status: string;
    teamA: {
        image: string;
        name: string;
    };
    teamB: {
        image: string;
        name: string;
    };
}

async function fetchData<T>(url: string, id: string | number, key: keyof T): Promise<T | null> {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.find((item: T) => item[key] === id) || null;
    } catch (error) {
        console.error('Error al cargar los datos JSON:', error);
        return null;
    }
}

function MatchDetailsWrapper() {
    const { matchId } = useParams();
    const [matchDetails, setMatchDetails] = useState<MatchDetailData | null>(null);

    useEffect(() => {
        fetchData<MatchDetailData>('/detailsMatches.json', matchId!, 'matchId').then(setMatchDetails);
    }, [matchId]);

    if (!matchDetails) {
        return <div>No se encontraron detalles para este partido.</div>;
    }

    return <MatchDetails {...matchDetails} />;
}

function BetDetailsWrapper() {
    const { betId } = useParams(); // Obteniendo el betId de la URL
    const [betDetails, setBetDetails] = useState<BetDetailsType | null>(null);

    useEffect(() => {
        if (betId) {
            fetchData<BetDetailsType>('/detailsBets.json', betId, 'id').then(setBetDetails);
        }
    }, [betId]);

    if (!betDetails) {
        return <div>No se encontraron detalles para esta apuesta.</div>;
    }

    return (
        <BetDetailPage
            teamA={betDetails.teamA}
            teamB={betDetails.teamB}
            scoreA={betDetails.scoreA}
            scoreB={betDetails.scoreB}
            money={betDetails.money}
            multiplier={betDetails.multiplier}
            date={betDetails.date}
            status={betDetails.status}
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
        element: <WorldCupDetails />,
        path: AppRoutesConstants.WORLDCUP_PAGE,
    },
    {
        element: <EnglishLeagueDetails />,
        path: AppRoutesConstants.ENGLISHLEAGUE_PAGE,
    },
    {
        element: <HogwartsCupDetails />,
        path: AppRoutesConstants.HOGWARTSCUP_PAGE,
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
        element: <BetDetailsWrapper />,
        path: AppRoutesConstants.BET_DETAIL_PAGE,
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
