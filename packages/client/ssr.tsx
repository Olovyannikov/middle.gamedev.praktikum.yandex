import { App } from './src/app/App';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Provider } from 'react-redux';
import { AuthProvider } from './src/shared/context/AuthContext';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme.config';
import React from 'react';

async function render(uri, store) {
    const renderResult = renderToString(
        <StaticRouter location={uri}>
            <Provider store={store}>
                <AuthProvider>
                    <ThemeProvider theme={theme}>
                        <App />
                    </ThemeProvider>
                </AuthProvider>
            </Provider>
        </StaticRouter>
    );
    return [renderResult];
}

export { render };
