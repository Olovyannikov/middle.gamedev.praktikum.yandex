import { Component, ReactNode, ErrorInfo } from 'react';

export interface IErrorBoundaryState {
    hasError: boolean;
    error?: Error;
    errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends Component<
    { children: JSX.Element; fallback: JSX.Element },
    IErrorBoundaryState
> {
    state = { hasError: false };

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        this.setState({
            hasError: true,
            error,
            errorInfo,
        });
    }

    render(): ReactNode {
        const { children, fallback = 'Something went wrong' } = this.props;
        const { hasError } = this.state;

        if (hasError) {
            return fallback;
        }

        return children;
    }
}
