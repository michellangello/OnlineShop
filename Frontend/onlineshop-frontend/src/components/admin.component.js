import React, { Component, useState } from "react";
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
import AdminNavBar from "./admin.navbar.component";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import ProductInfo from "./admin.products.component"
import ProductCreate from './createproduct.component';

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
    progress: {
        margin: theme.spacing(2),
        flexGrow: 1,

    },
}));

export default function MaterialTableDemo() {

    const classes = useStyles();

           return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" noWrap>
                            Clipped drawer
          </Typography>
                    </Toolbar>
                </AppBar>
                <AdminNavBar></AdminNavBar>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Switch>
                        <Route exact path='/admin' component={UsersInfoTable} />
                        <Route path='/admin/users' component={UsersInfoTable} />
                       {/* <Route path='/admin/products' component={ProductInfo} /> */}
                        <Route path='/admin/products/create' component={ProductCreate} />
                    </Switch>
                </main>
            </div>
        );
}

