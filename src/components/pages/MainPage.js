import React, { Component } from "react";
import auth from "../utils/auth";
import { Switch, Route } from "react-router-dom";
import Scrum from "../tabs/scrum";
import data from "../storage/tasks";
import TableContainer from "../common/TableContainer";
import DetailPage from "./DetailPage";
import AppBar from "../common/AppBar";

class MainPage extends Component {
  state = {
    tasks: [...data],
    statuses: ["Все задачи", "План", "В процессе", "Выполнен"]
  };

  handleToDate = arr => {
    let newArr = arr.map(m => {
      m.dateOfStart = new Date(m.dateOfStart);
      m.deadLine = new Date(m.deadLine);
      return m;
    });
    return newArr;
  };
  handleStatusSelect = status => {
    this.setState({ selectedStatus: status });
  };
  handleAddTask = task => {
    let taskArr = [...this.state.tasks];
    const taskIndex = taskArr.findIndex(t => t.id === task.id);

    if (taskIndex < 0) {
      this.setState({ tasks: [task, ...this.state.tasks] });
      console.log("added");
    } else {
      taskArr[taskIndex] = task;
      this.setState({ tasks: taskArr });
      console.log("Edited");
    }
  };
  handleDateFormat = date => {
    if (date.getTime() === 0) {
      return "--";
    } else {
      function checkTime(i) {
        if (i < 10) {
          i = "0" + i;
        }
        return i;
      }
      let time =
        checkTime(date.getHours()) +
        ":" +
        checkTime(date.getMinutes()) +
        " " +
        checkTime(date.getDate()) +
        "." +
        checkTime(date.getUTCMonth() + 1) +
        "." +
        date.getFullYear();
      return time;
    }
  };
  render() {
    const { selectedStatus, tasks, statuses } = this.state;
    const filteredTasks =
      selectedStatus && selectedStatus !== "Все задачи"
        ? tasks.filter(m => m.state === selectedStatus)
        : tasks;
    if (auth.isAuthenticated()) {
      return (
        <div className="main">
          <AppBar />
          <Switch>
            <Route
              exact
              path="/main"
              component={() => (
                <TableContainer
                  selectedStatus={selectedStatus}
                  tasks={this.handleToDate(filteredTasks)}
                  statuses={statuses}
                  onItemSelect={this.handleStatusSelect}
                  addTasks={this.handleAddTask}
                  dateFormat={this.handleDateFormat}
                />
              )}
            />
            <Route exact path="/main/scrum" component={Scrum} />
            <Route
              exact
              path="/main/:task"
              component={m => (
                <DetailPage
                  store={m}
                  tasks={this.handleToDate(filteredTasks)}
                  dateFormat={this.handleDateFormat}
                  addTasks={this.handleAddTask}
                />
              )}
            />
          </Switch>
        </div>
      );
    } else {
      this.props.history.push("/login");
      return null;
    }
  }
}

export default MainPage;
