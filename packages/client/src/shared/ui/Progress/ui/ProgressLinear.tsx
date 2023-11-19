import cn from 'clsx';
import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';

import { isNumber } from '@/shared/lib/isNumber';
import { setCSSVariable } from '@/shared/lib/setCSSVariable';

import s from '../Progress.module.scss';

interface ProgressLinearProps {
    active?: boolean;
    bordered?: boolean;
    className?: string;
    color?: string;
    fillHeight?: boolean;
    height?: number;
    indeterminate?: boolean;
    striped?: boolean;
    style?: CSSProperties;
    value?: number;
}

export const ProgressLinear = ({
    value = 0,
    active = false,
    color = 'var(--purple-500)',
    bordered = false,
    fillHeight,
    height,
    striped = false,
    indeterminate = false,
    className = '',
    style,
}: ProgressLinearProps) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const currentValue = value > 100 ? 100 : value < 0 ? 0 : value;
    const currentHeight = (h: number | string) => {
        if (isNumber(h)) {
            return {
                height: `${active ? h : 0}px`,
                borderRadius: `${h ?? 4 * 2}px`,
            };
        }

        return {};
    };

    const classes = (classType: 'progress' | 'bg' | 'wrapper') => {
        switch (classType) {
            case 'progress':
                return cn(s.linear, { [s.bordered]: bordered });
            case 'bg':
                return cn(s.bg, {
                    [s.striped]: striped,
                    [s.indeterminate]: indeterminate,
                });
            case 'wrapper':
                return cn(s.wrapper, {
                    [s.filled]: fillHeight,
                });
        }
    };

    useEffect(() => {
        if (ref?.current) {
            setCSSVariable(ref?.current, '--selector-bg', color);
        }
    }, []);

    return (
        <div
            aria-valuemin={0}
            role="progressbar"
            aria-valuemax={100}
            aria-valuenow={currentValue}
            style={{ ...style, ...currentHeight(height ?? 'auto') }}
            className={cn(classes('progress'), className)}
        >
            <div
                style={{ borderRadius: `${height ?? 4 * 2}px` }}
                className={classes('wrapper')}
            >
                <div
                    ref={ref}
                    className={classes('bg')}
                    style={{
                        width: `${indeterminate ? 100 : currentValue}%`,
                        ...currentHeight(
                            fillHeight ? height ?? 4 : height ?? 4 - 5
                        ),
                    }}
                />
            </div>
        </div>
    );
};
