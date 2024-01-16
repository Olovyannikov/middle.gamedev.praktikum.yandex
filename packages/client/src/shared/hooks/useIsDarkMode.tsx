import { useTheme } from '@mui/material';

export const useIsDarkMode = () => {
    const theme = useTheme();
    const { mode } = theme.palette;

    return mode === 'dark';
};
