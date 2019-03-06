import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },
  input: {
    margin: theme.spacing.unit
  },
  formControl: {
    margin: theme.spacing.unit
  },
  formControler: {
    margin: theme.spacing.unit,
    width: "20%",
    minWidth: "200px",
    marginTop: "40px"
  },
  btn: {
    marginTop: "40px",
    background: "rgb(33, 150, 243)",
    textTransform: "none",
    color: "#fff",
    width: "15%",
    minWidth: "150px",
    "&:hover": {
      background: "rgb(107, 188, 253)"
    },
    float: "right"
  }
});

class InputForms extends React.Component {
  state = {
    priority: "",
    description: "",
    title: "",
    state: "",
    deadLine: "2019-03-03T10:30"
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSend = () => {
    const { title, description, deadLine, state, priority } = this.state;

    if (this.props.task) {
      const task = {
        title,
        description,
        deadLine,
        state,
        priority,
        dateOfStart: this.props.task.dateOfStart,
        dateOfFinish: this.props.task.dateOfFinish,
        id: this.props.task.id
      };
      if (
        title !== "" &&
        description !== "" &&
        state !== "" &&
        priority !== ""
      ) {
        this.props.addTasks(task);
        this.props.close();
      } else {
        alert("Заполните все поля!");
      }
    } else {
      const task = {
        title,
        description,
        deadLine,
        state,
        priority,
        dateOfStart: new Date(),
        id: new Date().getTime()
      };

      if (
        title !== "" &&
        description !== "" &&
        state !== "" &&
        priority !== ""
      ) {
        this.props.addTasks(task);
        this.props.close();
      } else {
        alert("Заполните все поля!");
      }
    }
  };
  handleTitle = () => {
    if (this.props.task) {
      return "Форма для редактирования задачи";
    } else {
      return "Форма для добавления новой задачи";
    }
  };
  componentDidMount() {
    if (this.props.task) {
      const { task } = this.props;
      function checkTime(i) {
        if (i < 10) {
          i = "0" + i;
        }
        return i;
      }

      if (task.deadLine) {
        let dLine =
          task.deadLine.getFullYear() +
          "-" +
          checkTime(task.deadLine.getUTCMonth() + 1) +
          "-" +
          checkTime(task.deadLine.getDate()) +
          "T" +
          checkTime(task.deadLine.getHours()) +
          ":" +
          checkTime(task.deadLine.getMinutes());
        this.setState({
          title: task.title,
          priority: task.priority,
          description: task.description,
          state: task.state,
          deadLine: dLine
        });
      } else {
        this.setState({
          title: task.title,
          priority: task.priority,
          description: task.description,
          state: task.state,
          deadLine: "2017-03-03T11:30"
        });
      }
    }
  }
  render() {
    const { classes, btnInner } = this.props;

    return (
      <>
        <Typography variant="h4" gutterBottom>
          {this.handleTitle()}
        </Typography>
        <form className={classes.container}>
          <FormControl
            className={classes.formControl}
            style={{ width: "100%" }}
          >
            <InputLabel htmlFor="title">Название</InputLabel>
            <Input
              value={this.state.title}
              id="title"
              onChange={this.handleChange}
              name="title"
              required
            />
          </FormControl>
          <FormControl
            className={classes.formControl}
            style={{ width: "100%" }}
          >
            <InputLabel htmlFor="description">Описание</InputLabel>
            <Input
              value={this.state.description}
              id="description"
              onChange={this.handleChange}
              name="description"
            />
          </FormControl>

          <FormControl className={classes.formControler}>
            <InputLabel shrink htmlFor="priority-label-placeholder">
              Приоритет
            </InputLabel>
            <Select
              value={this.state.priority}
              onChange={this.handleChange}
              input={<Input name="priority" id="priority-label-placeholder" />}
              displayEmpty
              name="priority"
              className={classes.selectEmpty}
            >
              <MenuItem value="Низкий">Низкий</MenuItem>
              <MenuItem value="Нормальный">Нормальный</MenuItem>
              <MenuItem value="Высокий">Высокий</MenuItem>
            </Select>
            <FormHelperText>Выберите приоритет</FormHelperText>
          </FormControl>

          <FormControl className={classes.formControler}>
            <InputLabel shrink htmlFor="state-label-placeholder">
              Статус
            </InputLabel>
            <Select
              value={this.state.state}
              onChange={this.handleChange}
              input={<Input name="state" id="state-label-placeholder" />}
              displayEmpty
              name="state"
              className={classes.selectEmpty}
            >
              <MenuItem value="План">План</MenuItem>
              <MenuItem value="В процессе">В процессе</MenuItem>
              <MenuItem value="Выполнен">Выполнен</MenuItem>
            </Select>
            <FormHelperText>Выберите статус</FormHelperText>
          </FormControl>
          <FormControl className={classes.formControler}>
            <TextField
              onChange={this.handleChange}
              name="deadLine"
              id="deadline"
              label="Дедлайн"
              type="datetime-local"
              value={this.state.deadLine}
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
            />
          </FormControl>
        </form>
        <Button className={classes.btn} onClick={this.handleSend}>
          {btnInner}
        </Button>
      </>
    );
  }
}

InputForms.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(InputForms);
