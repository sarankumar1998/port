import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import moment from "moment";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MessageIcon from "@mui/icons-material/Message";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import { Link, useNavigate } from "react-router-dom";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import RateReviewIcon from '@mui/icons-material/RateReview'
;import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import ContactsIcon from "@mui/icons-material/Contacts";
import { AccountCircle, Home, ViewAgenda } from "@material-ui/icons";
import { Badge, Menu, MenuItem } from "@mui/material";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Offcanvas } from "react-bootstrap";
import LogoutIcon from "@mui/icons-material/Logout";

const drawerWidth = 240;

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL + '/special/Obj';

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function Navbars() {
  const [show, setShow] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const [approval, setApproval] = useState([]);

  const token = sessionStorage.getItem("token");
  const decodedToken = JSON.parse(atob(token.split('.')[1]));
  const { id, username } = decodedToken;
  const userId = id;

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }


  }, [navigate]);





  const handleCloseCanva = () => setShow(false);
  const handleShowCanva = () => {
    setShow(true);
    
    axios.get(`${apiBaseUrl}`)
      .then(res => {
        setApproval(res.data)
      })
      .catch(err => {
        console.log(`err`, err);
      })
  
  }

  const handleLogout = () => {
    let confirm = window.confirm("Are you sure you want to logout");
    if (confirm) {
      sessionStorage.clear();
      navigate('/login');
    }
  };

  const theme = useTheme();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {/* {user === null ? (
        ""
      ) : ( */}
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              Mars
            </Typography>
            <IconButton aria-label="settings">
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <Link style={{ textDecoration: "none" }} to="/Myprofile">
                  {" "}
                  <MenuItem onClick={handleClose}>{username}</MenuItem>
                </Link>

                <MenuItem onClick={handleLogout}>logout &nbsp;   <LogoutIcon /></MenuItem>


              </Menu>
            </IconButton>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
              sx={{ ml: "auto" }}
            >
              <AccountCircle />
            </IconButton>

            {userId === 2 ? (
              <Badge color="secondary" badgeContent={approval.length} showZero>
                <CircleNotificationsIcon onClick={handleShowCanva} />
              </Badge>
            ) : null}

            <Offcanvas
              style={{ marginTop: "4rem" }}
              show={show}
              placement={"end"}
              onHide={handleCloseCanva}
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>Notification</Offcanvas.Title>
              </Offcanvas.Header>
              <hr />
              <Offcanvas.Body>
                <Link
                  style={{ textDecoration: "none", color: "grey" }}
                  to="/msc"
                >
                  <div >
                    {approval.map((e) => (
                      <>{e.status === "Pending" ? <div
                        style={{
                          textAlign: "start",
                          fontSize: "15px",
                          fontFamily: "sans-serif",
                        }}
                      >
                        <h6
                          className="text-end"
                          style={{
                            fontSize: "12px",
                            marginTop: "1rem",
                            fontStyle: "italic",
                          }}
                        >
                          ({moment(e.tm).format("DD/MM/YYYY")})
                        </h6>
                        <span>
                          <MessageIcon style={{ color: "grey" }} />
                        </span>{" "}
                        You have req from <span style={{ fontWeight: "700", color: "black" }}>{e.name}</span> status is{" "}
                        <span style={{ color: "red" }}>{e.status}</span>.
                        <hr />
                      </div> : null} </>
                    ))}
                  </div>
                </Link>
              </Offcanvas.Body>
            </Offcanvas>
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
          <DrawerHeader style={{background:"#f0f4ff"}}>
            <h5 className="mt-2" style={{marginRight:"1.5rem"}}>Welcome User!</h5>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
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
                  <Home />
                </ListItemIcon>
                <ListItemText primary={"Home"} />
              </ListItem>
            </Link>




            {userId === 2 ? (
              ""
            ) : (
              <Link to="/contact">
                <ListItem
                  button
                  style={{ marginTop: 20 }}
                  onClick={handleDrawerClose}
                >
                  <ListItemIcon>
                    <ContactsIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Contact"} />
                </ListItem>
              </Link>
            )}

            <Link to="/clientForm">
              <ListItem
                button
                style={{ marginTop: 20 }}
                onClick={handleDrawerClose}
              >
                <ListItemIcon>
                  <ViewAgenda />
                </ListItemIcon>
                <ListItemText primary={"View"} />
              </ListItem>
            </Link>

            <Link to="/sports">
              <ListItem
                button
                style={{ marginTop: 20 }}
                onClick={handleDrawerClose}
              >
                <ListItemIcon>
                  <SportsCricketIcon />
                </ListItemIcon>
                <ListItemText primary={"Sports"} />
              </ListItem>
            </Link>

            {userId === 2 && <Link to="/clientmail">
              <ListItem
                button
                style={{ marginTop: 20 }}
                onClick={handleDrawerClose}
              >
                <ListItemIcon>
                  <MessageIcon />
                </ListItemIcon>
                <ListItemText primary={"Mail"} />
              </ListItem>
            </Link>

            }
            <Link to="/RatemyApp">
              <ListItem
                button
                style={{ marginTop: 20 }}
                onClick={handleDrawerClose}
              >
                <ListItemIcon>
                  <RateReviewIcon />
                </ListItemIcon>
                <ListItemText primary={"Rating"} />
              </ListItem>
            </Link>



          </List>
          <Divider />
        </SwipeableDrawer>
      </Box>
      {/* )} */}
    </>
  );
}
