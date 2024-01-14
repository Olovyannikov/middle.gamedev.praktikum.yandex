//TODO fix after `yarn ssr`
import { Icon } from '@/shared/ui';
import FullScreenIcon from '@/app/assets/img/fullscreen_icon.svg';
import FullScreenExitIcon from '@/app/assets/img/fullscreen_exit_icon.svg';
import { useFullScreenAPI } from '@/shared/hooks/useFullScreenAPI';

export const FullScreen = () => {
    const { isFullscreen, toggleFullscreen } = useFullScreenAPI();
    return (
        <button id='toggler' onClick={() => toggleFullscreen()}>
            <Icon src={!isFullscreen ? FullScreenIcon : FullScreenExitIcon} />
        </button>
    );
};
