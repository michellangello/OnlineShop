import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Card from './../Card';
import Login from './../Login';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function HeaderAppBar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Router>
                <AppBar position="static" color="default">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            <Link to={'/'} className="nav-link"> Home </Link>
                        </Typography>

                        <Link to={'/login'}>  <Button color="inherit">Login                        </Button>
                        </Link>

                    </Toolbar>
                </AppBar>
                <Switch>
                    <Route exact path='/' component={Card} />
                    <Route path='/login' component={Login} />
                </Switch>
            </Router>
        </div>
    );
}
