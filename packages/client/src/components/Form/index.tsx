import cn from 'clsx';
import s from './Form.module.scss';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export const Form = ({
    className,
    children,
    ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement>) => (
    <form className={cn(s.form, className)} {...props}>
        {children}
    </form>
);
