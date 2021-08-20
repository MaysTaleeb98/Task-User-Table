import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import companyLogo from '../pages/logo.png';
import { Link } from "react-router-dom";


const drawerWidth = 255;
const fontSizing = 40;

const useStyles = makeStyles((theme) => ({
  '@global': {
    'a': {
      textDecoration: 'none',
      color: '#A4A6B3',


    }
  },
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    background: '#F7F8FC',
    color: '#252733',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    height:'100%vh',
    backgroundColor: '#363740',
    color: '#A4A6B3',
    fontFamily: 'Mulish',
    weight: 400,
    style: 'normal',
    fontSize: fontSizing,
    lineheight: 20.08,
    letter: 0.2,
    padding: 20,

  },
  icons: {
    marginleft: 60,
    color: '#9FA2B4',
    opacity: 0.4,
    size: 2
  },
  logo: {
    marginLeft: 30,
    marginTop: 10

  },
  // necessary for content to be below app bar
  toolbar: {
    //theme.mixins.toolbar,
    marginTop: 20
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));
export default function PermanentDrawerLeft(props) {
  const classes = useStyles();

  const { links } = props;

  return (
    <div className={classes.root}>
      <CssBaseline />

      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.logo} >
          <img src={companyLogo} alt="BigCo Inc. logo" />
        </div>
        <div className={classes.toolbar} />
        <List>
          {links.map(link => (
            <Link to={link.ref} key={link.label}>
              <ListItem button  >
                <ListItemIcon className={classes.icons}>{link.icon}</ListItemIcon>
                <ListItemText primary={link.label} />
              </ListItem>
            </Link>
          ))}


        </List>

      </Drawer>

      <main className={classes.content}>
        <div className={classes.toolbar} />

      </main>
    </div>

  );
}

PermanentDrawerLeft.propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape({
    ref: PropTypes.string,
    icon: PropTypes.node,
    label: PropTypes.string.isRequired,
  })),
}


PermanentDrawerLeft.defaultProps = {
  links: [],
}

