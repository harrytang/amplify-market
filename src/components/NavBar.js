/*
 * @Author: Harry Tang - harry@powerkernel.com 
 * @Date: 2020-01-15 19:01:19 
 * @Last Modified by:   Harry Tang - harry@powerkernel.com 
 * @Last Modified time: 2020-01-15 19:01:19 
 */
import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

// Icons
import AccountCircle from "@material-ui/icons/AccountCircle";
import IconHome from "@material-ui/icons/Home";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";

import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  navLink: {
    color: "#ffffff",
    textDecoration: "none"
  }
}));

function NavBar({ user, handlerSignOut }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconHome
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconHome>

        <Typography variant="h6" className={classes.title}>
          Power Market
        </Typography>

        

        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          open={open}
          onClose={handleClose}
        >
          <MenuItem component={Link} to="/profile" onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handlerSignOut}>Sign out</MenuItem>
        </Menu>

        <Button color="inherit" component={Link} to="/">
            Home
        </Button>
        


        <IconButton
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
