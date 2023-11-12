import s from './AppLink.module.scss';
import { NavLink, NavLinkProps } from 'react-router-dom';

export const AppLink = ({
    to,
    children,
    className,
    ...props
}: NavLinkProps) => {
    return (
        <NavLink
            className={({ isActive }) =>
                (isActive ? s.active : '') + ` ${className ?? ''}`
            }
            to={to}
            {...props}
        >
            {children}
        </NavLink>
    );
};
