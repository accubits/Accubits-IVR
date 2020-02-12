import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import DialpadIcon from '@material-ui/icons/Dialpad';
import { Link } from 'react-router-dom';

export const mainListItems = (
    <div>
        <Link to="/">
            <DashboardIcon />
            <ListItemText primary="Dashboard" />
        </Link>
        <Link to="/numbers">
            <DialpadIcon />
            <ListItemText primary="Numbers" />
        </Link>
        <Link to="/users">
            <PeopleIcon />
            <ListItemText primary="Users" />
        </Link>

    </div >
);

export const secondaryListItems = (
    <div>
        <ListSubheader inset>Settings</ListSubheader>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Current month" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Last quarter" />
        </ListItem>
    </div>
);