import { createContext, type KeyboardEvent, type ReactNode } from 'react';
import { act } from 'react-dom/test-utils';
import { renderHook } from '@testing-library/react';

import { GAME_STATE } from '@/widgets/Game/constants';
import { useGame } from '@/widgets/Game/useGame';

describe('useGame Hook', () => {
    const mockOnGameOver = jest.fn();
    const mockSetGameState = jest.fn();
    const mockWidth = 500;
    const mockHeight = 500;
    const WrapperContext = createContext('');

    const Wrapper = ({ children }: { children: ReactNode }) => (
        <WrapperContext.Provider value=''>{children}</WrapperContext.Provider>
    );

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
            expect(result.current.snakeBody).toBeDefined();
            expect(result.current.foodPos).toBeDefined();
        });
    });

    it('правильно обрабатывает движение змеи', () => {
        act(() => {
            const mockEvent = {
                code: 'ArrowRight',
            } as unknown as KeyboardEvent<Element>;

            result.current.onSnakeMove(mockEvent);
        });
    });
});
