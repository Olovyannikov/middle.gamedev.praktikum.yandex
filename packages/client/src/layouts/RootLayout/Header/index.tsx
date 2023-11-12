import type { DetailedHTMLProps, HTMLAttributes } from 'react';
import cn from 'clsx';
import s from './Header.module.scss';
import { AppLink } from '@/shared/ui';

type HeaderProps = DetailedHTMLProps<
    HTMLAttributes<HTMLUListElement>,
    HTMLUListElement
>;

export const Header = ({ className, ...props }: HeaderProps) => {
    return (
        <header>
            <nav className={s.nav}>
                <ul className={cn(s.list, 'list-reset', className)} {...props}>
                    <li>
                        <AppLink to="/">Main</AppLink>
                    </li>
                    <li>
                        <AppLink to="/sign-in">Sign-In</AppLink>
                    </li>
                    <li>
                        <AppLink to="/sign-up">Sign-Up</AppLink>
                    </li>
                    <li>
                        <AppLink to="/forum">Forum</AppLink>
                    </li>
                    <li>
                        <AppLink to="/game">Game</AppLink>
                    </li>

                    <li>
                        <AppLink to="/leaderboard">LeaderBoard</AppLink>
                    </li>

                    <li>
                        <AppLink to="/me">Profile</AppLink>
                    </li>
                </ul>
            </nav>
            <hr className={s.hr} />
        </header>
    );
};
