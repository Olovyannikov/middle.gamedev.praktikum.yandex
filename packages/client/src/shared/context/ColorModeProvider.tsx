import { createContext, type PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';

import { themeOptions } from '@/../theme.config';
import { useChangeThemeMutation } from '@/services/themeApi';
import { useGetUserQuery } from '@/services/AuthService/AuthService';

enum ColorModes {
    Light = 'light',
    Dark = 'dark',
}

//type ColorMode = ColorModes.Light | ColorModes.Dark;

type ColorModeProps = () => void;

const ColorModeContextInitial: ColorModeProps = () => undefined;

const ColorModeContext = createContext<ColorModeProps>(ColorModeContextInitial);

export const useColorMode = () => {
    const context = useContext(ColorModeContext);
    if (context === undefined) throw new Error('useColorMode must be used within a ColorModeProvider');
    return context;
};

export const ColorModeProvider = ({ children }: PropsWithChildren) => {
    const [isInitializated, setIsInitializated] = useState(true);
    const [colorMode, setColorMode] = useState(() => {
        //localStorage ломает SSR сборку и вообще тут должны быть запросы на сервер
        //const lsColorMode = localStorage.getItem('colorMode');
        //return (lsColorMode ?? ColorModes.Light) as ColorMode;
        return ColorModes.Light;
    });

    const [changeTheme, themeRes] = useChangeThemeMutation();
    const { data, error, isError, isLoading } = useGetUserQuery();

    const postTheme = async (theme: string) => {
        const result = await changeTheme(theme);
    };

    const toggleColorMode = useCallback(() => {
        setColorMode((prevColorMode) => (prevColorMode === ColorModes.Light ? ColorModes.Dark : ColorModes.Light));
    }, []);

    useEffect(() => {
        if (isInitializated && data) {
            setIsInitializated(false);
            setColorMode(data.theme === ColorModes.Light ? ColorModes.Light : ColorModes.Dark);
        }
        postTheme(colorMode);
    }, [colorMode, data]);

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
