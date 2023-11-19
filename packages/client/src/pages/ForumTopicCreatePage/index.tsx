import { RootLayout } from '@/layouts/RootLayout';
import { Grid, Button, TextField, TextareaAutosize } from '@mui/material';

export default function ForumTopicCreatePage() {
    return (
        <RootLayout>
            <Grid
                container
                alignItems="center"
                justifyContent="center"
                direction="column"
                sx={{ minWidth: '100%', padding: 1 }}
                gap={2}
            >
                <Grid
                    container
                    alignItems="center"
                    justifyContent="center"
                    sx={{ width: '90%' }}
                    gap={2}
                >
                    <TextField
                        sx={{ width: '100%' }}
                        placeholder="Topic's name"
                    />
                    <TextareaAutosize
                        placeholder="Topic"
                        style={{ width: '100%', minHeight: 150 }}
                    ></TextareaAutosize>
                </Grid>
                <Grid
                    container
                    sx={{ width: 'auto' }}
                    alignItems="flex-end"
                    justifyContent="flex-end"
                    gap={2}
                >
                    <Button>Create</Button>
                </Grid>
            </Grid>
        </RootLayout>
    );
}
