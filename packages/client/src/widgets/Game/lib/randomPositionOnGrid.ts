import type { RandomPositionOnGridArgs } from '@/widgets/Game/types';

export const randomPositionOnGrid = ({
    gridSize = 5,
    threshold,
}: RandomPositionOnGridArgs) =>
    Math.floor(Math.random() * (threshold / gridSize)) * gridSize;
