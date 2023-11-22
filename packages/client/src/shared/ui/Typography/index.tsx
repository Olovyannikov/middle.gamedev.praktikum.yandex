import cn from 'clsx';
import type { ElementType, ReactNode } from 'react';
import s from './Typography.module.scss';

type TypographyVariant =
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'body1'
    | 'body2'
    | 'subtitle1'
    | 'subtitle2'
    | 'caption'
    | 'overline';

interface TypographyProps<T extends ElementType> {
    as?: T;
    className?: string;
    children?: ReactNode;
    variant?: TypographyVariant;
}

export const Typography = <T extends ElementType = 'p'>({
    as,
    className,
    variant = 'body1',
    children,
}: TypographyProps<T>) => {
    let Tag = as ?? 'p';

    if (variant.includes('h')) {
        Tag = variant;
    }

    return (
        <Tag
            className={cn(s.text, className, {
                [s[variant]]: variant,
            })}
        >
            {children}
        </Tag>
    );
};
