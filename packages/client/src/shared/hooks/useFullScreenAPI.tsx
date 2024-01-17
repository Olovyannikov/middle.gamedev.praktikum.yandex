import { useEffect, useState } from 'react';

import { toggleFullscreen } from '../utils/toggleFullScreen';

export const useFullScreenAPI = () => {
    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        const onFullscreenChange = () => {
            setIsFullscreen(Boolean(document.fullscreenElement));
        };

        document.addEventListener('fullscreenchange', onFullscreenChange);

        return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
    }, []);

    return { isFullscreen, toggleFullscreen };
};
