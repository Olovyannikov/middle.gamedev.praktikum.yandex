import ReactDOM from 'react-dom/client';
import { App } from './app/App';
import { BrowserRouter } from 'react-router-dom';
import { store } from '@/app/store';
import { Provider } from 'react-redux';
import { AuthProvider } from '@/shared/context/AuthContext';
import { ThemeProvider } from '@mui/material';
import { theme } from '../theme.config';

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
