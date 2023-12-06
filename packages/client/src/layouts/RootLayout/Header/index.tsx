import type { DetailedHTMLProps, HTMLAttributes } from 'react';
import cn from 'clsx';
import { AppLink } from '@/shared/ui';
import { useAuth } from '@/shared/context/AuthContext';
import { SignOut, Spinner } from '@phosphor-icons/react';
import s from './Header.module.scss';
import { useLogout } from '@/shared/hooks/useLogout';

type HeaderProps = DetailedHTMLProps<
    HTMLAttributes<HTMLUListElement>,
    HTMLUListElement
>;

export const Header = ({ className, ...props }: HeaderProps) => {
    const { isAuth } = useAuth();
    const { logout, isLoading } = useLogout();

    return (
        <header>
            <nav className={s.nav}>
                <ul className={cn(s.list, 'list-reset', className)} {...props}>
                    <li>
                        <AppLink to="/">Main</AppLink>
                    </li>
                    {!isAuth && (
                        <>
                            <li>
                                <AppLink to="/sign-in">Sign-In</AppLink>
                            </li>
                            <li>
                                <AppLink to="/sign-up">Sign-Up</AppLink>
                            </li>
                        </>
                    )}
                    {isAuth && (
                        <li>
                            <AppLink to="/forum">Forum</AppLink>
                        </li>
                    )}
                    <li>
                        <AppLink to="/game">Game</AppLink>
                    </li>

                    <li>
                        <AppLink to="/leaderboard">LeaderBoard</AppLink>
                    </li>

                    <li>
                        <AppLink to="/me">Profile</AppLink>
                    </li>
                    {isAuth && (
                        <li>
                            <button className={s.logout} onClick={logout}>
                                {isLoading ? <Spinner /> : <SignOut />} LogOut
                            </button>
                        </li>
                    )}
                </ul>
            </nav>
            <hr className={s.hr} />
        </header>
    );
};
