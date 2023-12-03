import { Container } from '@/shared/ui';
import { Typography } from '@mui/material';

import s from './Banner.module.scss';

interface BannerProps {
    title?: string;
    description?: string;
}

export const Banner = ({ title, description }: BannerProps) => {
    return (
        <section className={s.banner}>
            <Container className={s.content}>
                {title ? (
                    <Typography variant="h1" className={s.title}>
                        {title}
                    </Typography>
                ) : null}
                {description ? (
                    <Typography className={s.description}>
                        {description}
                    </Typography>
                ) : null}
            </Container>
        </section>
    );
};
