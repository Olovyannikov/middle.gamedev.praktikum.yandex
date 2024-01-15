import { NavLink, NavLinkProps } from 'react-router-dom';
import cn from 'clsx';

import { useIsDarkMode } from '@/shared/hooks/useIsDarkMode';

import s from './AppLink.module.scss';

export const AppLink = ({ to, children, className, ...props }: NavLinkProps) => {
    const isDarkMode = useIsDarkMode();

    const linkClassName = cn(isDarkMode && s.dark, className);

    return (
        <NavLink className={({ isActive }) => (isActive ? s.active : '') + ` ${linkClassName}`} to={to} {...props}>
            {children}
        </NavLink>
    );
};
