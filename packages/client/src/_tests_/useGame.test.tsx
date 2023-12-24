import { renderHook } from '@testing-library/react';
import { useGame } from '@/widgets/Game/useGame';
import { GAME_STATE } from '@/widgets/Game/constants';
import { createContext } from 'react';
import { act } from 'react-dom/test-utils';

describe('useGame Hook', () => {
    const mockOnGameOver = jest.fn();
    const mockSetGameState = jest.fn();
    const mockWidth = 500;
    const mockHeight = 500;
    const WrappperContext = createContext('');

    const Wrapper = ({ children }: { children: React.ReactNode }) => {
        return (
            <WrappperContext.Provider value="">
                {children}
            </WrappperContext.Provider>
        );
    };

    const { result } = renderHook(
        () =>
            useGame({
                gameState: GAME_STATE.RUNNING,
                onGameOver: mockOnGameOver,
                setGameState: mockSetGameState,
                width: mockWidth,
                height: mockHeight,
            }),
        { wrapper: Wrapper }
    );

    it('корректно инициализирует состояние игры', () => {
        act(() => {
            console.log(result);

            expect(result.current.snakeBody).toBeDefined();
            expect(result.current.foodPos).toBeDefined();
        });
    });

    it('правильно обрабатывает движение змеи', () => {
        act(() => {
            const mockEvent = {
                code: 'ArrowRight',
            } as unknown as React.KeyboardEvent<Element>;

            result.current.onSnakeMove(mockEvent);
        });
    });
});
