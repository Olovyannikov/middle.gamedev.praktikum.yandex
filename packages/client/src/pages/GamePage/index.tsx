import { RootLayout } from '@/layouts/RootLayout';
import { Banner } from '@/shared/ui/Banner';
import { TITLE, DESCRIPTION } from '../../../config';

import { FullScreen } from '@/entities/FullScreen';
import { Game } from '@/widgets/Game';

export default function GamePage() {
    return (
        <RootLayout hasHeader={false}>
            <FullScreen />
            <Banner title={TITLE} description={DESCRIPTION} />
            <Game />
        </RootLayout>
    );
}
