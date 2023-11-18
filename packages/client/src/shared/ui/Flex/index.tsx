import type {
    CSSProperties,
    DetailedHTMLProps,
    ElementType,
    HTMLAttributes,
} from 'react';
import cn from 'clsx';
import { isNumber } from '@/shared/lib/isNumber';
import s from './Flex.module.scss';

export type SizeType = 'small' | 'middle' | 'large' | undefined;

interface FlexProps<T extends ElementType>
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    as?: T;
    column?: boolean;
    wrap?: CSSProperties['flexWrap'];
    justify?: CSSProperties['justifyContent'];
    align?: CSSProperties['alignItems'];
    gap?: CSSProperties['gap'] | SizeType;
}

export const Flex = <T extends ElementType = 'div'>({
    as,
    children,
    className,
    gap = 0,
    align,
    column,
    wrap = 'wrap',
    justify,
    ...props
}: FlexProps<T>) => {
    const Tag = as ?? 'div';

    return (
        <Tag
            className={cn(s.flex, className, {
                [s.small]: gap === 'small',
                [s.middle]: gap === 'middle',
                [s.large]: gap === 'large',
            })}
            style={
                {
                    gap: isNumber() && gap,
                    alignItems: align,
                    justifyContent: justify,
                    flexWrap: wrap,
                    flexDirection: column ? 'column' : 'row',
                } as CSSProperties
            }
            {...props}
        >
            {children}
        </Tag>
    );
};
