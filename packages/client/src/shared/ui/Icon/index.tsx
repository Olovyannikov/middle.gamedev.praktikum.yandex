import React from 'react';
import cn from 'clsx';
import s from './Icon.module.scss';

interface IconProps {
    src: string;
}

export const Icon = ({ src }: IconProps) => {
    return <img src={src} alt="icon" className={cn(s.IconFullScreen)} />;
};
