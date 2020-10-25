import React, {useEffect} from "react";
import { connect } from "react-redux";
import Link from "@material-ui/core/Link";
import Logout from "./components/Logout";
import AddChannelModal from "./AddChannelModal";
import {startChannelTimer ,stopChannelTimer} from "./redux/actions"
import logo from "./logo.png"

import { grey } from '@material-ui/core/colors';


import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import clsx from "clsx";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItemIcon from '@material-ui/core/ListItemIcon';

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    color: theme.palette.getContrastText(grey[900]),
    backgroundColor: grey[900],
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  channelName: {
    marginLeft: 16,
    color: "#ffffff",
  },
  channelOwner: {
    marginLeft: 100,
    color: "#ffffff",
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    marginRight: 36,
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 25,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  inline: {
    display: 'inline',
  },
}));

function ResponsiveDrawer(props) {

  useEffect(() => {
    props.stopChannelTimer()
    props.startChannelTimer()
  },[])


  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={clsx(classes.appBar,{[classes.appBarShift]:open,})}>
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerToggle} edge="start" className={classes.menuButton}>
            <Avatar alt="logo" src={logo} className={classes.large} />
          </IconButton>

          <Typography variant="h4" className={classes.title} noWrap><b>CONVO</b></Typography>
          {props.user && <Logout />}
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" className={clsx(classes.drawer, {[classes.drawerOpen]:open,[classes.drawerClose]:!open,})} classes={{paper:clsx({[classes.drawerOpen]:open, [classes.drawerClose]:!open,})}}>
      <div className={classes.toolbar}>
        <IconButton onClick={handleDrawerToggle}>
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </div>
      <Divider />

      <List>
        <AddChannelModal/>
        {props.channels.map((channel) => (
          <Link href={`/messages/${channel.id}`}>

            <ListItem button key={channel.id + channel.name}>
            <ListItemIcon>{channel.image_url?<Avatar alt={channel.name} src={channel.image_url} className={classes.large} />:<Avatar className={classes.large} style={{ fontSize: 30 }}>{channel.name[0]}</Avatar>}</ListItemIcon>
            <ListItemText className={classes.channelName} primary={channel.name} secondary={channel.owner}/>
            </ListItem>



          </Link>
        ))}
      </List>
    </Drawer>
    </div>
  );
}

const mapStateToProps = ({ channels, user }) => ({
  channels,
  user,
});

const mapDispatchToProps = (dispatch) => ({
  startChannelTimer: () => dispatch(startChannelTimer()),
  stopChannelTimer: () => dispatch(stopChannelTimer()),
});
export default connect(mapStateToProps, mapDispatchToProps)(ResponsiveDrawer);
