import { RootLayout } from '@/layouts/RootLayout';
import { Container } from '@/shared/ui';
import { Avatar } from '@/shared/ui/Avatar';
import { Flex } from '@/shared/ui/Flex';

export default function GamePage() {
    return (
        <RootLayout>
            <section>
                <Container>
                    <Flex gap="middle" align="center">
                        <Avatar size="small" />
                        <Avatar size="medium" />
                        <Avatar size="large" />
                        <Avatar size={60} />
                        <Avatar>Larry King</Avatar>
                        <Avatar bgColor="var(--purple-500)">BB King</Avatar>
                        <Avatar square>Garry Moore</Avatar>
                        <Avatar
                            size="large"
                            src="https://m.media-amazon.com/images/I/7190zRsNnZL._UF1000,1000_QL80_.jpg"
                        >
                            Eric Clapton
                        </Avatar>
                        <Avatar rounded />
                    </Flex>
                </Container>
            </section>
        </RootLayout>
    );
}
