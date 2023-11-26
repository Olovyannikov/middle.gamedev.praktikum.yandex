import { Component, ReactNode, ErrorInfo } from 'react';

export interface ErrorBoundaryState {
    hasError: boolean;
    error?: Error;
    errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends Component<
    { children: ReactNode; fallback: ReactNode },
    ErrorBoundaryState
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
