import cn from 'clsx';
import type { DetailedHTMLProps, HTMLAttributes } from 'react';
import type { NumericRange } from '@/shared/types/utility/NumericRange';

import { ProgressLinear } from '@/shared/ui';

import s from './Card.module.scss';

interface CardProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    bordered?: boolean;
    disabled?: boolean;
    elevation?: NumericRange<1, 5> | 0;
    flat?: boolean;
    height?: number;
    inset?: boolean;
    loading?: boolean;
    maxHeight?: number;
    maxWidth?: number;
    minHeight?: number;
    minWidth?: number;
    outlined?: boolean;
    rounded?: boolean;
    width?: number;
}

export const Card = ({
    bordered = false,
    disabled = false,
    elevation = 1,
    flat = false,
    inset = false,
    loading = false,
    outlined = false,
    rounded = false,
    children,
    className,
    ...props
}: CardProps) => {
    const classes = cn(s.card, className, {
        [s.bordered]: bordered,
        [s.disabled]: disabled,
        [s.flat]: flat,
        [s.outlined]: outlined,
        [s.inset]: inset,
        [s.rounded]: rounded,
        [s[`elevation-${elevation}`]]: elevation,
    });

    return (
        <div className={classes} {...props}>
            {loading ? (
                <ProgressLinear
                    active
                    fillHeight
                    height={4}
                    indeterminate
                    color="var(--purple-500)"
                />
            ) : null}
            {children}
        </div>
    );
};
