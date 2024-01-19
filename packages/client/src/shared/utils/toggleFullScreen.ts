// Определение интерфейса для элемента с поддержкой FullScreen API
interface FullScreenableElement {
    requestFullscreen?: () => Promise<void>;
    msRequestFullscreen?: () => Promise<void>;
    mozRequestFullScreen?: () => Promise<void>;
    webkitRequestFullscreen?: (options?: { navigationUI?: string }) => Promise<void>;
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

export async function toggleFullscreen(elem: FullScreenableElement = document.documentElement): Promise<void> {
    const documentTyped = document as FullScreenableDocument;
    const isFullscreenElement =
        !documentTyped.fullscreenElement &&
        !documentTyped.mozFullScreenElement &&
        !documentTyped.webkitFullscreenElement &&
        !documentTyped.msFullscreenElement;

    if (isFullscreenElement) {
        if (elem.requestFullscreen) {
            await elem.requestFullscreen();
        } else if (elem.msRequestFullscreen) {
            await elem.msRequestFullscreen();
        } else if (elem.mozRequestFullScreen) {
            await elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
            await elem.webkitRequestFullscreen({ navigationUI: 'show' });
        }
    } else {
        if (documentTyped.exitFullscreen) {
            await documentTyped.exitFullscreen();
        } else if (documentTyped.msExitFullscreen) {
            await documentTyped.msExitFullscreen();
        } else if (documentTyped.mozCancelFullScreen) {
            await documentTyped.mozCancelFullScreen();
        } else if (documentTyped.webkitExitFullscreen) {
            await documentTyped.webkitExitFullscreen();
        }
    }
}
