import type { DetailedHTMLProps, HTMLAttributes } from 'react';
import s from './Main.module.scss';
import cn from 'clsx';

type MainProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;

export const Main = ({ children, className, ...props }: MainProps) => {
    return (
        <main className={cn(s.main, className)} {...props}>
            {children}
        </main>
    );
};
