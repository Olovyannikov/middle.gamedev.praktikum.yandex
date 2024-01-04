import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';

import { store } from '@/app/store';
import { AuthProvider } from '@/shared/context/AuthContext';

import { theme } from '../theme.config';
import { App } from './app/App';

ReactDOM.hydrateRoot(
    document.getElementById('root') as HTMLElement,
    <BrowserRouter>
        <Provider store={store}>
            <AuthProvider>
                <ThemeProvider theme={theme}>
                    <App />
                </ThemeProvider>
            </AuthProvider>
        </Provider>
    </BrowserRouter>
);
