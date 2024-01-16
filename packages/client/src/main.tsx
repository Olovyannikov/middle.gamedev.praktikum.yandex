import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { store } from '@/app/store';
import { AuthProvider } from '@/shared/context/AuthContext';
import { ColorModeProvider as ThemeProvider } from '@/shared/context/ColorModeProvider';

import { App } from './app/App';

ReactDOM.hydrateRoot(
    document.getElementById('root') as HTMLElement,
    <BrowserRouter>
        <Provider store={store}>
            <AuthProvider>
                <ThemeProvider>
                    <App />
                </ThemeProvider>
            </AuthProvider>
        </Provider>
    </BrowserRouter>
);
