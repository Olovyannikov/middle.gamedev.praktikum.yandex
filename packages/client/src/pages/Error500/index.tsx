import { Link } from 'react-router-dom';
import { Grid, Icon } from '@mui/material';

import { RootLayout } from '@/layouts/RootLayout';

import ErrorVector from './ErrorVector.svg';
export default function Error500() {
    return (
        <RootLayout>
            <Grid
                container
                direction='column'
                alignItems='center'
                justifyContent='center'
                style={{ minHeight: '90vh' }}
            >
                <Grid item xs={3}>
                    <h1 style={{ textAlign: 'center' }}>Error 500</h1>
                    <p style={{ textAlign: 'center' }}>
                        Try return to <Link to='/'>mainpage</Link>
                    </p>
                    <Icon style={{ width: 400, height: 400 }}>
                        <img src={ErrorVector} alt='error' />
                    </Icon>
                </Grid>
            </Grid>
        </RootLayout>
    );
}
