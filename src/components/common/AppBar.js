import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {},
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  btn: {
    float: "right"
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between"
  },
  left: {
    width: "130px",
    display: "flex",
    justifyContent: "space-between"
  },
  link: {
    color: "#fff",
    underline: "none",
    textDecoration: "none",
    padding: "5px 10px",
    borderRadius: "4px",
    transition: "0.4s",
    "&:hover": {
      background: "#ffffff54"
    },
    fontWeight: "500"
  }
};

function ButtonAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ background: "rgb(33, 150, 243)" }}>
        <Toolbar className={classes.toolbar}>
          <div className={classes.left}>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              <Link to="/main/scrum" className={classes.link}>
                Scrum
              </Link>
            </Typography>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              <Link to="/main" className={classes.link}>
                Table
              </Link>
            </Typography>
          </div>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            <Link to="/login" className={classes.link}>
              Выход
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ButtonAppBar);
