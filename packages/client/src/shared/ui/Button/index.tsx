import cn from 'clsx';
import { Link } from 'react-router-dom';
import type {
    ButtonHTMLAttributes,
    CSSProperties,
    DetailedHTMLProps,
    ElementType,
} from 'react';
import { Fragment } from 'react';
import s from './Button.module.scss';

interface ButtonCommonProps<T extends ElementType>
    extends DetailedHTMLProps<
        ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > {
    href?: string;
    to?: string;
    as?: T;
    target?: HTMLAnchorElement['target'];
    download?: HTMLAnchorElement['download'];
    dark?: boolean;
    size?: 'small' | 'medium' | 'large';
    text?: boolean;
    block?: boolean;
    active?: boolean;
    rounded?: boolean;
    bordered?: boolean;
    outlined?: boolean;
    depressed?: boolean;
    bgColor?: string;
    color?: string;
}

export const Button = <T extends ElementType = 'button'>({
    as,
    to,
    href,
    target = '_blank',
    download,
    children,
    className,
    block = false,
    outlined = false,
    depressed = false,
    bordered = false,
    disabled = false,
    text = false,
    rounded = false,
    color,
    size = 'medium',
    bgColor,
    ...props
}: ButtonCommonProps<T>) => {
    const classNames = cn(s.button, 'btn-reset', className, {
        [s.block]: block,
        [s.bordered]: bordered,
        [s.depressed]: depressed,
        [s.outlined]: outlined,
        [s.rounded]: rounded,
        [s[size]]: size,
        [s.text]: text,
    });

    const Tag = as || 'button';

    if (to && !!to.length) {
        return (
            <Link
                className={classNames}
                aria-disabled={disabled}
                to={to}
                style={{ '--color': bgColor, color } as CSSProperties}
            >
                {children}
            </Link>
        );
    }

    if (Tag === 'a' || (href && !!href.length)) {
        return (
            <a
                className={classNames}
                aria-disabled={disabled}
                href={href}
                {...(download && { download })}
                style={{ '--color': bgColor, color } as CSSProperties}
                target={target}
            >
                {children}
            </a>
        );
    }

    const Wrapper = disabled ? 'span' : Fragment;

    return (
        <Wrapper>
            <Tag
                className={classNames}
                {...props}
                disabled={disabled}
                style={{ '--color': bgColor, color } as CSSProperties}
            >
                {children}
            </Tag>
        </Wrapper>
    );
};
