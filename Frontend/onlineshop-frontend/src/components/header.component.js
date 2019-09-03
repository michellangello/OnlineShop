import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import MediaCardList from './cardlist.component';
import Login from './login.component';
import Register from './register.component';
import Admin from './admin.component';
import NotFound from './notfound.component';
import { logout } from '../helpers/auth-helper';

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

const AdapterLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);


export default function HeaderAppBar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Router>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            <Button color="inherit" component={AdapterLink} to={'/'} className="nav-link">Home</Button>
                        </Typography>
                        {
                            (!!localStorage.getItem('token'))
                                ? <Button color="inherit" component={AdapterLink} to="/login">Login</Button>
                                : <Button color="inherit" component={AdapterLink} onClick={logout()} to="/login">Logout</Button>
                        }
                    </Toolbar>
                </AppBar>
                <Switch>
                    <Route exact path='/' component={MediaCardList} />
                    <Route path='/login' component={Login} />
                    <Route path='/register' component={Register} />
                    <PrivateRoute path="/admin" component={Admin} />
                    <Route path="*" component={NotFound} />
                </Switch>
            </Router>
        </div>
    );
}


function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={props =>
                !!localStorage.getItem('token') ? (<Component {...props} />)
                    : (<Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location }
                        }}
                    />
                    )
            }
        />
    );
}