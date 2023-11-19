import type { RouteProps } from 'react-router-dom';
import {
    IndexPageLazy,
    ProfilePageLazy,
    RegistrationPageLazy,
    LoginPageLazy,
    ForumPageLazy,
    GamePageLazy,
    LeaderBoardPageLazy,
    ForumTopicPageLazy,
    ForumTopicCreatePageLazy,
} from '@/pages/pages.lazy';

export const AppRoutes = {
    INDEX: 'index',
    LOGIN: 'login',
    REGISTRATION: 'registration',
    PROFILE: 'profile',
    GAME: 'game',
    LEADERBOARD: 'leaderboard',
    FORUM: 'forum',
    TOPICS: 'topics',
    TOPIC: 'topic',
    CREATE_TOPIC: 'createTopic',
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
    [AppRoutes.TOPICS]: '/topic/:id',
    [AppRoutes.TOPIC]: '/topic',
    [AppRoutes.CREATE_TOPIC]: '/create/topic',
};

export const router: Record<AppRoutesValues, RouteProps> = {
    [AppRoutes.INDEX]: {
        path: RouterPaths.index,
        element: <IndexPageLazy />,
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
        element: <ProfilePageLazy />,
    },
    [AppRoutes.GAME]: {
        path: RouterPaths.game,
        element: <GamePageLazy />,
    },
    [AppRoutes.LEADERBOARD]: {
        path: RouterPaths.leaderboard,
        element: <LeaderBoardPageLazy />,
    },
    [AppRoutes.FORUM]: {
        path: RouterPaths.forum,
        element: <ForumPageLazy />,
    },
    [AppRoutes.TOPICS]: {
        path: RouterPaths.topics,
        element: <ForumTopicPageLazy />,
    },
    [AppRoutes.TOPIC]: {
        path: RouterPaths.topic,
        element: <ForumTopicPageLazy />,
    },
    [AppRoutes.CREATE_TOPIC]: {
        path: RouterPaths.createTopic,
        element: <ForumTopicCreatePageLazy />,
    },
};
