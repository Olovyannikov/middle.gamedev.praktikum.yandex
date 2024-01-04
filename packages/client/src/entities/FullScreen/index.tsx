import FullScreenExitIcon from '@/app/assets/img/fullscreen_exit_icon.svg?react';
import FullScreenIcon from '@/app/assets/img/fullscreen_icon.svg?react';
import { useFullScreenAPI } from '@/shared/hooks/useFullScreenAPI';

import s from './FullScreen.module.scss';

export const FullScreen = () => {
    const { isFullscreen, toggleFullscreen } = useFullScreenAPI();
    return (
        <button className={s.fullscreen} id='toggler' onClick={() => toggleFullscreen()}>
            {!isFullscreen ? <FullScreenIcon /> : <FullScreenExitIcon />}
        </button>
    );
};
