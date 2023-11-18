import { RootLayout } from '@/layouts/RootLayout';
import { Grid, Icon } from '@mui/material';
import ErrorVector from './ErrorVector.svg';
import { Link } from 'react-router-dom';

export default function Error500() {
    return (
        <RootLayout>
            <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '90vh' }}
            >
                <Grid item xs={3}>
                    <h1 style={{ textAlign: 'center' }}>Ошибка 500</h1>
                    <p style={{ textAlign: 'center' }}>
                        Попробуйте вернуться <Link to="/">на главную</Link>
                    </p>
                    <Icon style={{ width: 400, height: 400 }}>
                        <img src={ErrorVector} />
                    </Icon>
                </Grid>
            </Grid>
        </RootLayout>
    );
}
