import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Scrum from "../tabs/Scrum";
import data from "../storage/tasks";
import TableContainer from "../common/TableContainer";
import DetailPage from "./DetailPage";
import AppBar from "../common/AppBar";

class MainPage extends Component {
  state = {
    tasks: [...data],
    selectedStatus: "Все задачи",
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
    const { tasks } = this.state;
    const taskIndex = tasks.findIndex(t => t.id === task.id);

    if (taskIndex === -1) {
      this.setState({ tasks: [task, ...tasks] });
    } else {
      const newTasks = tasks.map(_task => {
        if (_task.id === task.id) return task;
        return _task;
      });
      this.setState({ tasks: newTasks });
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
  handleEditState = (id, stateId) => {
    let taskArr = [...this.state.tasks];
    const taskIndex = taskArr.findIndex(t => t.id.toString() === id);

    if (stateId === "dr1" && taskArr[taskIndex].state !== "План") {
      taskArr[taskIndex].state = "План";
      this.setState({ tasks: taskArr });
    } else if (stateId === "dr2" && taskArr[taskIndex].state !== "В процессе") {
      taskArr[taskIndex].state = "В процессе";
      this.setState({ tasks: taskArr });
    } else if (stateId === "dr3" && taskArr[taskIndex].state !== "Выполнен") {
      taskArr[taskIndex].state = "Выполнен";
      this.setState({ tasks: taskArr });
    }
  };
  render() {
    const { selectedStatus, tasks, statuses } = this.state;
    const filteredTasks =
      selectedStatus && selectedStatus !== "Все задачи"
        ? tasks.filter(m => m.state === selectedStatus)
        : tasks;

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
          <Route
            exact
            path="/main/scrum"
            component={() => (
              <Scrum
                tasks={this.state.tasks}
                stateEdit={this.handleEditState}
              />
            )}
          />
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
  }
}

export default MainPage;
