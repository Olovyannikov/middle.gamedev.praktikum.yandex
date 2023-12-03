import { useEffect, useState } from 'react';
import s from './FullScreen.module.scss';

// Определение интерфейса для элемента с поддержкой FullScreen API
interface FullScreenableElement {
    requestFullscreen?: () => Promise<void>;
    msRequestFullscreen?: () => Promise<void>;
    mozRequestFullScreen?: () => Promise<void>;
    webkitRequestFullscreen?: (options?: {
        navigationUI?: string;
    }) => Promise<void>;
}

// Определение интерфейса для документа с поддержкой FullScreen API
interface FullScreenableDocument {
    fullscreenElement?: Element;
    mozFullScreenElement?: Element;
    webkitFullscreenElement?: Element;
    msFullscreenElement?: Element;
    exitFullscreen?: (() => Promise<void>) | undefined;
    msExitFullscreen?: (() => Promise<void>) | undefined;
    mozCancelFullScreen?: (() => Promise<void>) | undefined;
    webkitExitFullscreen?: (() => Promise<void>) | undefined;
}

function toggleFullscreen(elem?: FullScreenableElement): void {
    const documentTyped = document as FullScreenableDocument;

    elem = elem || document.documentElement;

    if (
        !documentTyped.fullscreenElement &&
        !documentTyped.mozFullScreenElement &&
        !documentTyped.webkitFullscreenElement &&
        !documentTyped.msFullscreenElement
    ) {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen({ navigationUI: 'show' });
        }
    } else {
        if (documentTyped.exitFullscreen) {
            documentTyped.exitFullscreen();
        } else if (documentTyped.msExitFullscreen) {
            documentTyped.msExitFullscreen();
        } else if (documentTyped.mozCancelFullScreen) {
            documentTyped.mozCancelFullScreen();
        } else if (documentTyped.webkitExitFullscreen) {
            documentTyped.webkitExitFullscreen();
        }
    }
}

export const FullScreen = () => {
    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        function onFullscreenChange() {
            setIsFullscreen(Boolean(document.fullscreenElement));
        }

        document.addEventListener('fullscreenchange', onFullscreenChange);

        return () =>
            document.removeEventListener(
                'fullscreenchange',
                onFullscreenChange
            );
    }, []);
    return (
        <button
            id="toggler"
            className={`${s.buttonFullScreen} ${
                isFullscreen && s.buttonExitFullScreen
            }`}
            onClick={() => toggleFullscreen()}
        ></button>
    );
};
