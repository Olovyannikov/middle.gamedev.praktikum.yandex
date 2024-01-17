import { createContext, type PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';

import { themeOptions } from '@/../theme.config';

enum ColorModes {
    Light = 'light',
    Dark = 'dark',
}

type ColorMode = ColorModes.Light | ColorModes.Dark;

type ColorModeProps = () => void;

const ColorModeContextInitial: ColorModeProps = () => undefined;

const ColorModeContext = createContext<ColorModeProps>(ColorModeContextInitial);

export const useColorMode = () => {
    const context = useContext(ColorModeContext);
    if (context === undefined) throw new Error('useColorMode must be used within a ColorModeProvider');
    return context;
};

export const ColorModeProvider = ({ children }: PropsWithChildren) => {
    const [colorMode, setColorMode] = useState(() => {
        if (typeof window === 'undefined') return;
        const lsColorMode = window.localStorage.getItem('colorMode');
        return (lsColorMode ?? ColorModes.Light) as ColorMode;
    });

    const toggleColorMode = useCallback(() => {
        setColorMode((prevColorMode) => (prevColorMode === ColorModes.Light ? ColorModes.Dark : ColorModes.Light));
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        window.localStorage.setItem('colorMode', colorMode || '');
    }, [colorMode]);

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: colorMode,
                },
                ...themeOptions,
            }),
        [colorMode]
    );

    return (
        <ColorModeContext.Provider value={toggleColorMode}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ColorModeContext.Provider>
    );
};
