import React, { useState, useEffect } from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import axios from 'axios';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 500,
    },
    image: {
        // width: 128,
        // height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        //maxWidth: '100%',
        maxHeight: '100%',
    },
    progress: {
        margin: theme.spacing(2),
        flexGrow: 1,

    },
}));



const MediaCard = (props) => {


    const defaultResponse = {
        error: false,
        isLoaded: false,
        cards: [],
    }

    const classes = useStyles();
    const [response, setResponse] = useState(defaultResponse);


    useEffect(() => {
        // You can await here
        axios('http://localhost:6002/products')
            .then(res => res.data)
            .then(res => {
                setResponse({
                    cards: res,
                    isLoaded: true,
                    error: false
                })
            })
            .catch((err) => setResponse({
                isLoaded: true,
                error: err,
            }));
    }, []);


    if (response.error) {
        return <div>Error</div>;
    }
    else if (!response.isLoaded) {
        return <CircularProgress className={classes.progress} />;
    }
    else
        return (
            response.cards.map(card => {
                return <Paper className={classes.paper}>
                    <Grid container spacing={2}>
                        <Grid item>
                            <CardActions>
                                <CardMedia
                                    component="img"
                                    alt="Contemplative Reptile"
                                    image={card.images[0]}
                                    title="Contemplative Reptile"
                                />
                            </CardActions>
                        </Grid>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="h5" >
                                        {card.name}
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        Full resolution 1920x1080 • JPEG
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        ID: 1030114
                                     </Typography>
                                </Grid>
                                <Grid item>
                                    <Fab variant="extended" color="primary" aria-label="add" className={classes.fab}>
                                        <AddIcon />
                                        Add to card
                                       </Fab>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Typography variant="h5">${card.price}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            })
        );
}

// export default withStyles(styles)(MediaCard);
export default MediaCard;