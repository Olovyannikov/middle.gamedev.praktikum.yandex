export const setCSSVariable = (
    element: HTMLElement,
    variable: string,
    value: string
) => {
    if (element && value) {
        element.style.setProperty(variable, String(value));
    }
};
