import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { store } from './src/app/store';
import { AuthProvider } from './src/shared/context/AuthContext';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme.config';
import { StaticRouter } from 'react-router-dom/server';
import { App } from './src/app/App';

interface IRenderProps {
    path: string;
}

export const render = ({ path }: IRenderProps) => {
    return ReactDOMServer.renderToString(
        <StaticRouter location={path}>
            <Provider store={store}>
                <AuthProvider>
                    <ThemeProvider theme={theme}>
                        <App />
                    </ThemeProvider>
                </AuthProvider>
            </Provider>
        </StaticRouter>
    );
};
