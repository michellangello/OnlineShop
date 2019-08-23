import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Grid, Paper } from '@material-ui/core'
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import ImageDropZone from './imagedropzone.component'

const useStyles = makeStyles(theme => ({

    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing(1),
    },
    paper: {
        padding: theme.spacing(4),
        textAlign: 'center',
        color: theme.palette.text.secondary,

    },
}));

const ProductCreate = (props) => {
    const classes = useStyles();
    const [values, setValues] = useState({
        numberformat: '1320',
    });
    const [files, setFiles] = useState([]);

    const handleChange = name => event => {
        setValues({
            ...values,
            [name]: event.target.value,
        });
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={6}>
                <Paper className={classes.paper}>
                    <form className={classes.container} noValidate autoComplete="off">
                        <TextField fullWidth
                            id="standard-name"
                            label="Name"
                            className={classes.textField}
                            value={values.name}
                            onChange={handleChange('name')}
                            margin="normal"
                        />
                        <TextField fullWidth
                            id="standard-name"
                            label="description"
                            className={classes.textField}
                            value={values.name}
                            onChange={handleChange('name')}
                            margin="normal"
                        />

                        <FormControl fullWidth className={classes.margin}>
                            <InputLabel htmlFor="adornment-amount">Amount</InputLabel>
                            <Input
                                id="adornment-amount"
                                value={values.amount}
                                onChange={handleChange('amount')}
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            />
                        </FormControl>
                        <TextField
                            id="standard-name"
                            label="NumberFormat"
                            className={classes.textField}
                            //                value={values.name}
                            //              onChange={handleChange('name')}
                            margin="normal"
                            InputProps={{
                                inputComponent: (props) => <NumberFormat thousandSeparator={true} prefix={'$'} {...props} />,
                            }}
                        />

                    </form>
                </Paper>
            </Grid>

            <Grid item xs={6}>
                <Paper className={classes.paper}>
                    <ImageDropZone onChange={(files) => setFiles(files)}>
                    </ImageDropZone>
                </Paper>
            </Grid>

        </Grid >


    );
}
export default ProductCreate;