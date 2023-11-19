import { RootLayout } from '@/layouts/RootLayout';
import { Grid, Icon } from '@mui/material';
import ErrorVector from '@/app/assets/img/ErrorVector.svg';
import { Link } from 'react-router-dom';

export default function Error404() {
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
                    <h1 style={{ textAlign: 'center' }}>Oops 404!!</h1>
                    <p style={{ textAlign: 'center' }}>
                        Try return to <Link to="/">mainpage</Link>
                    </p>
                    <Icon style={{ width: 400, height: 400 }}>
                        <img src={ErrorVector} alt="error 404" />
                    </Icon>
                </Grid>
            </Grid>
        </RootLayout>
    );
}
