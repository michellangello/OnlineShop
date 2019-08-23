import React from "react";
import { Grid, Typography } from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import SimpleImageSlider from "react-simple-image-slider";

import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

const useStyles = makeStyles(theme => ({
    img: {
        margin: 'auto',
        display: 'block',
        maxHeight: '100%',
    },
    card: {
        margin: 15,
        padding: 10
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));



const ProductCard = (props) => {

    const card = props.card;
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <Grid item>
                <CardActions>
                    <AwesomeSlider>
                        {
                            card.images.map(imageUrl =>
                                <div data-src={imageUrl} />
                        )
                    }

                    </AwesomeSlider>
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
                    <Grid>

                    </Grid>
                </Grid>

                <Grid item>
                    <Typography variant="h5">${card.price}</Typography>
                </Grid>

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Add to Card
                        </Button>
            </Grid>
        </Card>
    );
}

export default ProductCard;