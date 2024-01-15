//TODO fix after `yarn ssr`
import FullScreenExitIcon from '@/app/assets/img/fullscreen_exit_icon.svg';
import FullScreenIcon from '@/app/assets/img/fullscreen_icon.svg';
import { useFullScreenAPI } from '@/shared/hooks/useFullScreenAPI';
import { Icon } from '@/shared/ui';

import s from './FullScreen.module.scss';

export const FullScreen = () => {
    const { isFullscreen, toggleFullscreen } = useFullScreenAPI();
    return (
        <button id='toggler' className={s.fullscreen} onClick={() => toggleFullscreen()}>
            <Icon src={!isFullscreen ? FullScreenIcon : FullScreenExitIcon} />
        </button>
    );
};
