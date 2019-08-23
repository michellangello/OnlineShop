import React, { Component, useState } from "react";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const NotFound = () => {
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '100vh' }}
        >
            <Grid item xs={3}>
                <Typography variant="h1" component="h2" gutterBottom>
                    PAGE NOT FOUND
                </Typography>
            </Grid>
        </Grid>
    )
}


export default NotFound;