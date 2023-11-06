import { RootLayout } from '@/layouts/RootLayout';
import { Alert, Container } from '@/shared/ui';
import { Flex } from '@/shared/ui/Flex';

export default function ForumPage() {
    return (
        <RootLayout>
            <section>
                <Container>
                    <Flex gap="middle">
                        <Alert>Hello Forum!</Alert>
                        <Alert type="success">Hello Forum!</Alert>
                        <Alert type="warning">Hello Forum!</Alert>
                        <Alert type="error">Hello Forum!</Alert>
                        <Alert rounded>Hello Forum!</Alert>
                        <Alert border="left">Hello Forum!</Alert>
                        <Alert rounded border="top">
                            Hello Forum!
                        </Alert>
                        <Alert elevation={1}>Hello Forum!</Alert>
                        <Alert elevation={2}>Hello Forum!</Alert>
                        <Alert elevation={3}>Hello Forum!</Alert>
                        <Alert elevation={4}>Hello Forum!</Alert>
                        <Alert elevation={5}>Hello Forum!</Alert>
                        <Alert rounded closeable>
                            Hello Forum!
                        </Alert>

                        <Alert outlined>Hello Forum!</Alert>
                        <Alert outlined type="success">
                            Hello Forum!
                        </Alert>
                        <Alert outlined type="error">
                            Hello Forum!
                        </Alert>
                        <Alert outlined type="warning">
                            Hello Forum!
                        </Alert>
                        <Alert dense>Hello Forum!</Alert>
                        <Alert flat>Hello Forum!</Alert>
                        <Alert inset>Hello Forum!</Alert>
                    </Flex>
                </Container>
            </section>
        </RootLayout>
    );
}
