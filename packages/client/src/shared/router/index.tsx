import type { RouteProps } from 'react-router-dom';

import Error500 from '@/pages/Error500';
import ForumPage from '@/pages/ForumPage';
import ForumTopicPage from '@/pages/ForumTopicPage';
import GamePage from '@/pages/GamePage';
import IndexPage from '@/pages/IndexPage';
import LeaderBoardPage from '@/pages/LeaderBoardPage';
import LoginPage from '@/pages/LoginPage';
import ProfilePage from '@/pages/ProfilePage';
import RegistrationPage from '@/pages/RegistationPage';

import { PrivateRoute } from './PrivateRoute';

export const AppRoutes = {
    INDEX: 'index',
    LOGIN: 'login',
    REGISTRATION: 'registration',
    PROFILE: 'profile',
    GAME: 'game',
    LEADERBOARD: 'leaderboard',
    FORUM: 'forum',
    TOPIC: 'topic',
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
    [AppRoutes.TOPIC]: '/topic/:topicId',
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
    [AppRoutes.TOPIC]: {
        path: RouterPaths.topic,
        element: <ForumTopicPage />,
    },
};
