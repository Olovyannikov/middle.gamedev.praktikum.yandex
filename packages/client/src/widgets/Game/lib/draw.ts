import type { Draw } from '@/widgets/Game/types';
import { SEGMENT_SIZE } from '@/widgets/Game/constants';

export const draw = ({ ctx, body, food }: Draw) => {
    if (food) {
        ctx.fillStyle = 'rgb(0, 200, 0)';
        ctx.fillRect(food.x, food.y, SEGMENT_SIZE, SEGMENT_SIZE);
    }

    ctx.fillStyle = 'rgb(200, 0, 0)';
    body?.forEach((segment) =>
        ctx.fillRect(segment.x, segment.y, SEGMENT_SIZE, SEGMENT_SIZE)
    );
};
