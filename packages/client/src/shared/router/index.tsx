import type { RouteProps } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import ProfilePage from '@/pages/ProfilePage';
import ForumPage from '@/pages/ForumPage';
import IndexPage from '@/pages/IndexPage';
import Error500 from '@/pages/Error500';
import LoginPage from '@/pages/LoginPage';
import RegistrationPage from '@/pages/RegistationPage';
import GamePage from '@/pages/GamePage';
import LeaderBoardPage from '@/pages/LeaderBoardPage';

export const AppRoutes = {
    INDEX: 'index',
    LOGIN: 'login',
    REGISTRATION: 'registration',
    PROFILE: 'profile',
    GAME: 'game',
    LEADERBOARD: 'leaderboard',
    FORUM: 'forum',
    Error500: 'Error500',
} as const;

type AppRoutesKeys = keyof typeof AppRoutes;
type AppRoutesValues = (typeof AppRoutes)[AppRoutesKeys];

export const RouterPaths: Record<AppRoutesValues, string> = {
    [AppRoutes.INDEX]: '/',
    [AppRoutes.LOGIN]: '/sign-in',
    [AppRoutes.REGISTRATION]: '/sign-up',
    [AppRoutes.PROFILE]: '/me',
    [AppRoutes.GAME]: '/game',
    [AppRoutes.LEADERBOARD]: '/leaderboard',
    [AppRoutes.FORUM]: '/forum',
    [AppRoutes.Error500]: '/505',
};

export const router: Record<AppRoutesValues, RouteProps> = {
    [AppRoutes.INDEX]: {
        path: RouterPaths.index,
        element: <IndexPage />,
    },
    [AppRoutes.LOGIN]: {
        path: RouterPaths.login,
        element: <LoginPage />,
    },
    [AppRoutes.REGISTRATION]: {
        path: RouterPaths.registration,
        element: <RegistrationPage />,
    },
    [AppRoutes.PROFILE]: {
        path: RouterPaths.profile,
        element: (
            <PrivateRoute>
                <ProfilePage />
            </PrivateRoute>
        ),
    },
    [AppRoutes.GAME]: {
        path: RouterPaths.game,
        element: <GamePage />,
    },
    [AppRoutes.LEADERBOARD]: {
        path: RouterPaths.leaderboard,
        element: <LeaderBoardPage />,
    },
    [AppRoutes.FORUM]: {
        path: RouterPaths.forum,
        element: (
            <PrivateRoute>
                <ForumPage />
            </PrivateRoute>
        ),
    },
    [AppRoutes.Error500]: {
        path: RouterPaths.Error500,
        element: <Error500 />,
    },
};
