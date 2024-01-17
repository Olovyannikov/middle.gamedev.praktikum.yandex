import { type DetailedHTMLProps, forwardRef, type HTMLAttributes, memo, type RefObject, useEffect } from 'react';

import { Card } from '@/shared/ui';

import s from './Canvas.module.scss';

interface CanvasProps extends DetailedHTMLProps<HTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement> {
    draw: (ctx: CanvasRenderingContext2D) => void;
}

export const Canvas = memo(
    forwardRef<HTMLCanvasElement, CanvasProps>(({ draw, ...props }, ref) => {
        useEffect(() => {
            const canvas = (ref as RefObject<HTMLCanvasElement>)?.current;
            const ctx = canvas?.getContext('2d');

            if (!ref || !canvas || !ctx) return;

            draw(ctx);

            return () => ctx.clearRect(0, 0, window.innerWidth, 400);
        }, [draw, ref]);

        if (!ref) return null;

        return (
            <Card>
                <canvas ref={ref} className={s.root} width={400} height={200} {...props} />
            </Card>
        );
    })
);

Canvas.displayName = 'Canvas';
