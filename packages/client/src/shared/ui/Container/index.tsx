import { DetailedHTMLProps, ElementType, HTMLAttributes } from 'react';
import cn from 'clsx';

import s from './Container.module.scss';

interface ContainerProps<T extends ElementType>
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    as?: T;
}

export const Container = <T extends ElementType = 'div'>({
    as,
    className,
    children,
    style,
    ...props
}: ContainerProps<T>) => {
    const Tag = as ?? 'div';

    return (
        <Tag style={style} className={cn(s.container, className)} {...props}>
            {children}
        </Tag>
    );
};
