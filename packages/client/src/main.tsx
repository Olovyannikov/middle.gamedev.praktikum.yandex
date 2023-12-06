import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app/App';
import { BrowserRouter } from 'react-router-dom';
import { store } from '@/app/store';
import { Provider } from 'react-redux';
import { AuthProvider } from '@/shared/context/AuthContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <AuthProvider>
                    <App />
                </AuthProvider>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);
