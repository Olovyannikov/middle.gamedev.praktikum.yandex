import { Container } from '../Container';

import s from './Banner.module.scss';

type BannerProps = {
    title?: string;
    description?: string;
};

export const Banner = ({ title, description }: BannerProps) => {
    return (
        <section className={s.banner}>
            <Container className={s.banner__inner}>
                {title ? <h1 className={s.banner__title}>{title}</h1> : null}
                {description ? (
                    <p className={s.banner__description}>{description}</p>
                ) : null}
            </Container>
        </section>
    );
};
