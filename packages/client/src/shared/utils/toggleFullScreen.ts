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

export function toggleFullscreen(elem?: FullScreenableElement): void {
    const documentTyped = document as FullScreenableDocument;
    const isFullscreenElement =
        !documentTyped.fullscreenElement &&
        !documentTyped.mozFullScreenElement &&
        !documentTyped.webkitFullscreenElement &&
        !documentTyped.msFullscreenElement;

    elem = elem || document.documentElement;

    if (isFullscreenElement) {
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
