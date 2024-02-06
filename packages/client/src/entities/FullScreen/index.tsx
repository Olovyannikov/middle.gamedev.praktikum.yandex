//TODO fix after `yarn ssr`
import { CSSProperties } from 'react';

import FullScreenExitIcon from '@/app/assets/img/fullscreen_exit_icon.svg';
import FullScreenIcon from '@/app/assets/img/fullscreen_icon.svg';
import { useFullScreenAPI } from '@/shared/hooks/useFullScreenAPI';
import { Icon } from '@/shared/ui';

export const FullScreen = () => {
    const { isFullscreen, toggleFullscreen } = useFullScreenAPI();
    const styles: CSSProperties = {
        width: '60px',
        background: 'transparent',
        border: 'none',
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        cursor: 'pointer',
    };
    return (
        <button style={styles} id='toggler' onClick={() => toggleFullscreen()}>
            <Icon src={!isFullscreen ? FullScreenIcon : FullScreenExitIcon} />
        </button>
    );
};
