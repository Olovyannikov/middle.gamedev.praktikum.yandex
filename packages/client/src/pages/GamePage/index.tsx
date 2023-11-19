import { RootLayout } from '@/layouts/RootLayout';
import { Banner } from '../../shared/ui/Banner';

export default function GamePage() {
    const title = 'The Snake';
    const description = `
        The snake game is a classic video game where the player controls a snake 
        that moves around a grid or screen. The objective of the game is to eat food items 
        that appear randomly on the grid, which causes the snake to grow longer
    `;

    return (
        <RootLayout hasHeader={false}>
            <Banner title={title} description={description} />
        </RootLayout>
    );
}
