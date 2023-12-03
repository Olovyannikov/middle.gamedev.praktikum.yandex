import { renderHook } from '@testing-library/react';
import { useGame } from '../widgets/Game/useGame';
import { GAME_STATE } from '../widgets/Game/constants';
import { FC, createContext } from 'react';

describe('useGame Hook', () => {
    const mockOnGameOver = jest.fn();
    const mockSetGameState = jest.fn();
    const mockWidth = 500;
    const mockHeight = 500;
    const WrappperContext = createContext('');

    const Wrapper: FC<{ children: JSX.Element }> = ({ children }) => (
        <WrappperContext.Provider value="">{children}</WrappperContext.Provider>
    );

    it('initializes game state correctly', () => {
        const { result } = renderHook(
            () =>
                useGame({
                    gameState: GAME_STATE.RUNNING,
                    onGameOver: mockOnGameOver,
                    setGameState: mockSetGameState,
                    width: mockWidth,
                    height: mockHeight,
                }),
            {
                wrapper: Wrapper,
            }
        );

        expect(result.current.snakeBody).toBeDefined();
        expect(result.current.foodPos).toBeDefined();
    });

    // it('handles snake movement correctly', () => {
    //     const { result } = renderHook(
    //         () =>
    //             useGame({
    //                 gameState: GAME_STATE.RUNNING,
    //                 onGameOver: mockOnGameOver,
    //                 setGameState: mockSetGameState,
    //                 width: mockWidth,
    //                 height: mockHeight,
    //             }),
    //         { wrapper: Wrapper }
    //     );

    //     act(() => {
    //         const mockEvent = {
    //             code: 'ArrowRight',
    //         } as unknown as React.KeyboardEvent<Element>;

    //         result.current.onSnakeMove(mockEvent);
    //     });
    // });
});
