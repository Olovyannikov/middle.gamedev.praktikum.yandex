import { RootLayout } from '@/layouts/RootLayout';
import { Container } from '@/shared/ui';
import { Flex } from '@/shared/ui/Flex';
import { Button } from '@/shared/ui/Button';

export default function IndexPage() {
    return (
        <RootLayout>
            <section>
                <Container>
                    <Flex gap="large" align="center">
                        <Button>Click Me</Button>
                        <Button bordered>Bordered</Button>
                        <Button depressed>Click Me</Button>
                        <Button outlined>Click Me</Button>
                        <Button rounded>Click Me</Button>
                        <Button size="small">Click Me</Button>
                        <Button size="medium">Click Me</Button>
                        <Button size="large">Click Me</Button>
                        <Button text>Click Me</Button>
                        <Button disabled={true}>Disabled</Button>
                        <Button block>Block</Button>
                        <Button bordered color="var(--green-300)">
                            asd
                        </Button>
                    </Flex>
                </Container>
            </section>
        </RootLayout>
    );
}
