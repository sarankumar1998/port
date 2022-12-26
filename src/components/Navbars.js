
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { Link, useNavigate } from "react-router-dom";
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import InfoIcon from '@mui/icons-material/Info';
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ContactsIcon from '@mui/icons-material/Contacts';
import { AccountCircle, Home, ViewAgenda } from '@material-ui/icons';
import { Menu, MenuItem } from '@mui/material';




const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}));


const drawerWidth = 240;


const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer() {

    const stringifiedPerson = localStorage.getItem("user");
  const personAsObjectAgain = JSON.parse(stringifiedPerson);
  console.log(personAsObjectAgain);
  const [users, setUsers] = React.useState(personAsObjectAgain);

  const handleClick = () => {
    let confirm = window.confirm("Are you sure you want to logout");
    if (confirm) {
      localStorage.clear();
      window.location.reload();
    }
  };
  
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const navigate  = useNavigate()
  console.log(navigate,'lll');

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (

    <>
    
    {users === null ? (
        ""
      ) : (
  
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              my: 2,
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>{users.username}</MenuItem>
                <MenuItem onClick={handleClick}>logout</MenuItem>
              </Menu>
            </div>



        </Toolbar>
      </AppBar>
      <SwipeableDrawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          onClose={() => setOpen(false)}
          onBackdropClick={handleDrawerClose}
          anchor="left"
          open={open}
          onOpen={() => setOpen(true)}
        >
        <DrawerHeader>
        <h5>Welcome User!</h5>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>


        <Link to="/home">
              <ListItem
                button
                style={{ marginTop: 20 }}
                onClick={handleDrawerClose}
              >
                <ListItemIcon>
               <Home/>
                </ListItemIcon>
                <ListItemText primary={"Home"} />
              </ListItem>
            </Link>


            <Link to="/skills">
              <ListItem
                button
                style={{ marginTop: 20 }}
                onClick={handleDrawerClose}
              >
                <ListItemIcon>
               <LibraryBooksIcon/>
                </ListItemIcon>
                <ListItemText primary={"Skill"} />
              </ListItem>
            </Link>

            
        <Link to="/about">
              <ListItem
                button
                style={{ marginTop: 20 }}
                onClick={handleDrawerClose}
              >
                <ListItemIcon>
               <InfoIcon/>
                </ListItemIcon>
                <ListItemText primary={"About"} />
              </ListItem>
            </Link>

            
        <Link to="/contact">
              <ListItem
                button
                style={{ marginTop: 20 }}
                onClick={handleDrawerClose}
              >
                <ListItemIcon>
               <ContactsIcon/>
                </ListItemIcon>
                <ListItemText primary={"Contact"} />
              </ListItem>
            </Link>

            
        <Link to="/msc">
              <ListItem
                button
                style={{ marginTop: 20 }}
                onClick={handleDrawerClose}
              >
                <ListItemIcon>
               <ViewAgenda/>
                </ListItemIcon>
                <ListItemText primary={"View"} />
              </ListItem>
            </Link>
        </List>
        <Divider />

      </SwipeableDrawer>
      
    </Box>
      )}
      </>
  );
}

