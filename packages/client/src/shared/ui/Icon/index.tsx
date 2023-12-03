import React from 'react';
import cn from 'clsx';
import s from './Icon.module.scss';

interface IconProps {
    src: string;
}

export const Icon: React.FC<IconProps> = ({ src }) => {
    return <img src={src} alt="icon" className={cn(s.IconFullScreen)} />;
};
