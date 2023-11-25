import type { RouteProps } from 'react-router-dom';
import {
    IndexPageLazy,
    ProfilePageLazy,
    RegistrationPageLazy,
    LoginPageLazy,
    ForumPageLazy,
    GamePageLazy,
    LeaderBoardPageLazy,
    Error500PageLazy,
} from '@/pages/pages.lazy';
import { PrivateRoute } from './PrivateRoute';

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
        element: (
            <PrivateRoute>
                <IndexPageLazy />
            </PrivateRoute>
        ),
    },
    [AppRoutes.LOGIN]: {
        path: RouterPaths.login,
        element: <LoginPageLazy />,
    },
    [AppRoutes.REGISTRATION]: {
        path: RouterPaths.registration,
        element: <RegistrationPageLazy />,
    },
    [AppRoutes.PROFILE]: {
        path: RouterPaths.profile,
        element: (
            <PrivateRoute>
                <ProfilePageLazy />
            </PrivateRoute>
        ),
    },
    [AppRoutes.GAME]: {
        path: RouterPaths.game,
        element: (
            <PrivateRoute>
                <GamePageLazy />
            </PrivateRoute>
        ),
    },
    [AppRoutes.LEADERBOARD]: {
        path: RouterPaths.leaderboard,
        element: <LeaderBoardPageLazy />,
    },
    [AppRoutes.FORUM]: {
        path: RouterPaths.forum,
        element: (
            <PrivateRoute>
                <ForumPageLazy />
            </PrivateRoute>
        ),
    },
    [AppRoutes.Error500]: {
        path: RouterPaths.Error500,
        element: <Error500PageLazy />,
    },
};
