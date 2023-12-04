import { RootLayout } from '@/layouts/RootLayout';
import { Banner } from '@/shared/ui/Banner';
import { TITLE, DESCRIPTION } from '../../../config';

import { Game } from '@/widgets/Game';

export default function GamePage() {
    return (
        <RootLayout hasHeader={false}>
            <Banner title={TITLE} description={DESCRIPTION} />
            <Game />
        </RootLayout>
    );
}
