import cn from 'clsx';
import type { ReactNode } from 'react';
import { isNumber } from '@/shared/lib/isNumber';
import { isString } from '@/shared/lib/isString';
import s from './Avatar.module.scss';

type Size = 'small' | 'medium' | 'large';

interface AvatarProps {
    src?: string;
    alt?: string;
    className?: string;
    bgColor?: string;
    color?: string;
    rounded?: boolean;
    size?: Size | number;
    square?: boolean;
    children?: ReactNode;
}

export const Avatar = ({
    src,
    alt,
    className,
    children,
    color = 'var(--white)',
    bgColor = 'var(--accent-blue)',
    size = 'medium',
    square = false,
    rounded = false,
}: AvatarProps) => {
    return (
        <div
            className={cn(s.avatar, className, {
                [s[size as Size]]: size,
                [s.rounded]: rounded,
                [s.square]: square,
            })}
            style={{
                backgroundColor: bgColor,
                color,
                ...(isNumber(size)
                    ? { width: size ?? 0, height: size ?? 0 }
                    : {}),
            }}
        >
            {src && <img src={src} alt={alt} />}
            {isString(children) &&
                !src &&
                children.split(' ')[0][0] + children.split(' ')[1][0]}
        </div>
    );
};
