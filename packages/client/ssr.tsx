import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { Location } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';
import type { AnyAction, Store } from 'redux';

import { ColorModeProvider as ThemeProvider } from '@/shared/context/ColorModeProvider';

import { App } from './src/app/App';
import { AuthProvider } from './src/shared/context/AuthContext';

async function render(uri: string | Partial<Location<unknown>>, store: Store<unknown, AnyAction>) {
    const renderResult = renderToString(
        <StaticRouter location={uri}>
            <Provider store={store}>
                <AuthProvider>
                    <ThemeProvider>
                        <App />
                    </ThemeProvider>
                </AuthProvider>
            </Provider>
        </StaticRouter>
    );
    return [renderResult];
}

export { render };
