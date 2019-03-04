import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import InputForms from "./InputForms";

function getModalStyle() {
  return {
    top: "100px",
    left: (window.innerWidth - 720) / 2
  };
}

const styles = theme => ({
  paper: {
    position: "absolute",

    width: "720px",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none",

    justifyContent: "center",
    background: "none"
  },
  btn: {
    marginTop: "20px",
    width: "100%",
    background: "rgb(33, 150, 243)",
    color: "#fff",
    fontWeight: "500",
    textTransform: "none",
    "&:hover": {
      background: "rgb(107, 188, 253)"
    }
  }
});

class SimpleModal extends React.Component {
  state = {
    open: false
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, btnOuter, btnInner, task } = this.props;

    return (
      <div>
        <Button onClick={this.handleOpen} className={classes.btn}>
          {btnOuter}
        </Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <div>
              <InputForms
                close={this.handleClose}
                addTasks={this.props.addTasks}
                task={task}
                btnInner={btnInner}
              />
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired
};

const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default SimpleModalWrapped;
