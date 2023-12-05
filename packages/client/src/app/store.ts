import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { useDispatch } from 'react-redux';
import { baseApi } from '@/services/baseApi';

type AppDispatch = typeof store.dispatch;

export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
});

export const useAppDispatch: () => AppDispatch = useDispatch;

setupListeners(store.dispatch);
