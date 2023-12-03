import { RootLayout } from '@/layouts/RootLayout';
import { Banner } from '@/shared/ui/Banner';
import { TITLE, DESCRIPTION } from '../../../config';

import s from './GamePage.module.scss';

export default function GamePage() {
    return (
        <RootLayout hasHeader={false}>
            <FullScreen />
            <Banner title={TITLE} description={DESCRIPTION} />
            <Game />
        </RootLayout>
    );
}
