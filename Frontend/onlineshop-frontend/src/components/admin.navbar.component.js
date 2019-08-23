import React from 'react';
import MaterialTable from 'material-table';
import UsersInfoTable from './admin.usersinfo.component';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Icon from '@material-ui/core/Icon';
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faHome, faUsers, faShoppingBag } from '@fortawesome/free-solid-svg-icons'


const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    toolbar: theme.mixins.toolbar,
}));


const AdminNavBar = (props) => {
    const classes = useStyles();
    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <div className={classes.toolbar} />
            <List>
                <ListItem key="Inbox" component={Link} to="/admin" button>
                    <ListItemIcon>
                        <FontAwesomeIcon icon={faHome} size="lg" />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem button key="Products" component={Link} to="/admin/products" >
                    <ListItemIcon>
                        <FontAwesomeIcon icon={faShoppingBag} size="lg" />
                    </ListItemIcon>
                    <ListItemText primary="Products" />
                </ListItem>
                <ListItem button key="Users" component={Link} to="/admin/users" >
                    <ListItemIcon>
                        <FontAwesomeIcon icon={faUsers} size="lg" />
                    </ListItemIcon>
                    <ListItemText primary="Users" />
                </ListItem>
            </List>
        </Drawer>
    );
}

export default AdminNavBar;