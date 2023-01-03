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
import InfoIcon from "@mui/icons-material/Info";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import ContactsIcon from "@mui/icons-material/Contacts";
import { AccountCircle, Home, ViewAgenda } from "@material-ui/icons";
import { Badge, Menu, MenuItem } from "@mui/material";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Offcanvas } from "react-bootstrap";

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
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

export default function MiniDrawer() {
  const [show, setShow] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const [all, setAll] = React.useState([]);
  const stringifiedPerson = localStorage.getItem("user");
  const personAsObjectAgain = JSON.parse(stringifiedPerson);
  console.log(personAsObjectAgain);
  const [users, setUsers] = React.useState(personAsObjectAgain);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    await axios
      .get(`http://localhost:4000/api/v1/special/Obj/`)
      .then((res) => {
        // const data = res.data.filter((e) => e.status === "Pending");
        setAll(res.data.filter((e) => e.status === "Pending"));
        console.log(all.length, "datss");
      })
      .catch((err) => console.log(err));
  };

  const handleCloseCanva = () => setShow(false);
  const handleShowCanva = () => setShow(true);

  const handleClick = () => {
    let confirm = window.confirm("Are you sure you want to logout");
    if (confirm) {
      localStorage.clear();
      window.location.reload();
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
      {users === null ? (
        ""
      ) : (
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
                ZOCK
              </Typography>

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
                <MenuItem onClick={handleClose}>{users.username}</MenuItem>
                <MenuItem onClick={handleClick}>logout</MenuItem>
              </Menu>
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

              {users.id === 2 ? (
                <Badge color="secondary" badgeContent={all.length} showZero>
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
                <Link  style={{textDecoration: 'none', color:"grey"}}  to="/msc">
                  <div>
                    {all.map((e) => (
                      <div

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
                        You have req from {e.name} status is <span style={{color:'red'}}>{e.status}</span>.
                        <hr />
                      </div>
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
            <DrawerHeader>
              <h5>Welcome User!</h5>
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

              <Link to="/skills">
                <ListItem
                  button
                  style={{ marginTop: 20 }}
                  onClick={handleDrawerClose}
                >
                  <ListItemIcon>
                    <LibraryBooksIcon />
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
                    <InfoIcon />
                  </ListItemIcon>
                  <ListItemText primary={"About"} />
                </ListItem>
              </Link>

              {users.id === 2 ? (
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

              <Link to="/msc">
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
            </List>
            <Divider />
          </SwipeableDrawer>
        </Box>
      )}
    </>
  );
}
