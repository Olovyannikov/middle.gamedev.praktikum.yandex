import { Typography } from '@mui/material';
import cn from 'clsx';

import { FullScreen } from '@/entities/FullScreen';
import { useIsDarkMode } from '@/shared/hooks/useIsDarkMode';
import { Container } from '@/shared/ui';

import s from './Banner.module.scss';

interface BannerProps {
    title?: string;
    description?: string;
}

export const Banner = ({ title, description }: BannerProps) => {
    const isDarkMode = useIsDarkMode();

    return (
        <section className={s.banner}>
            <FullScreen />
            <Container className={s.content}>
                {title ? (
                    <Typography variant='h1' className={cn(s.title, isDarkMode && s.darkTitle)}>
                        {title}
                    </Typography>
                ) : null}

                {description ? <Typography className={s.description}>{description}</Typography> : null}
            </Container>
        </section>
    );
};
