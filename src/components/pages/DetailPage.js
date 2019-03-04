import React, { Component } from "react";
import { Typography } from "@material-ui/core";
import styled from "styled-components";
import SimpleModal from "../utils/Modal";

const Container = styled.div`
  width: 80%;
  margin: 20px auto;
  padding: 40px;
`;
const Row = styled.div`
  width: 100%;
  min-height: 40px;
  display: flex;
`;
const RowLeft = styled.div`
  width: 200px;
  display: flex;
  justify-content: flex-end;
  padding: 15px;
`;
const RowRight = styled.div`
  flex: 1;
  padding: 15px;
`;
const textAlign = {
  textAlign: "right"
};
class DetailPage extends Component {
  state = {};

  handleLeadTime = task => {
    let days, hours;
    if (task.dateOfFinish) {
      days = Math.ceil(
        (new Date(task.dateOfFinish).getTime() -
          new Date(task.dateOfStart).getTime()) /
          (1000 * 3600 * 24)
      );

      hours = Math.ceil(
        (new Date(task.dateOfFinish).getTime() -
          (new Date(task.dateOfStart).getTime() + days * 1000 * 3600 * 24)) /
          3600000
      );
    } else if (new Date().getTime() - new Date(task.dateOfStart) < 3600 * 24) {
      days = 0;
      hours = 0;
    } else {
      days = Math.ceil(
        (new Date().getTime() - new Date(task.dateOfStart).getTime()) /
          (1000 * 3600 * 24)
      );
      hours = Math.ceil(
        (new Date().getTime() -
          (new Date(task.dateOfStart).getTime() + days * 1000 * 3600 * 24)) /
          3600000
      );
    }
    return days + " дней(день) " + hours * -1 + " часов(час)";
  };
  handleFinishDate = date => {
    if (date) {
      return this.props.dateFormat(new Date(date));
    } else {
      return "---";
    }
  };

  render() {
    const { store, tasks, dateFormat } = this.props;
    const task = tasks.filter(
      m => m.id === parseInt(store.match.params.task)
    )[0];
    return (
      <Container>
        <Row>
          <RowLeft>
            <Typography style={textAlign} variant="h5" gutterBottom>
              Название:
            </Typography>
          </RowLeft>
          <RowRight>
            <Typography variant="h6" gutterBottom>
              {task.title}
            </Typography>
          </RowRight>
        </Row>
        <Row>
          <RowLeft>
            <Typography variant="h5" gutterBottom style={textAlign}>
              Описание:
            </Typography>
          </RowLeft>
          <RowRight>
            <Typography variant="h6" gutterBottom>
              {task.description}
            </Typography>
          </RowRight>
        </Row>
        <Row>
          <RowLeft>
            <Typography variant="h5" gutterBottom style={textAlign}>
              Приоритет:
            </Typography>
          </RowLeft>
          <RowRight>
            <Typography variant="h6" gutterBottom>
              {task.priority}
            </Typography>
          </RowRight>
        </Row>
        <Row>
          <RowLeft>
            <Typography variant="h5" gutterBottom style={textAlign}>
              Статус:
            </Typography>
          </RowLeft>
          <RowRight>
            <Typography variant="h6" gutterBottom>
              {task.state}
            </Typography>
          </RowRight>
        </Row>
        <Row>
          <RowLeft>
            <Typography variant="h5" gutterBottom style={textAlign}>
              Дата назначения:
            </Typography>
          </RowLeft>
          <RowRight>
            <Typography variant="h6" gutterBottom>
              {dateFormat(task.dateOfStart)}
            </Typography>
          </RowRight>
        </Row>
        <Row>
          <RowLeft>
            <Typography variant="h5" gutterBottom style={textAlign}>
              Дедлайн:
            </Typography>
          </RowLeft>
          <RowRight>
            <Typography variant="h6" gutterBottom>
              {dateFormat(task.deadLine)}
            </Typography>
          </RowRight>
        </Row>
        <Row>
          <RowLeft>
            <Typography variant="h5" gutterBottom style={textAlign}>
              Дата завершения:
            </Typography>
          </RowLeft>
          <RowRight>
            <Typography variant="h6" gutterBottom>
              {this.handleFinishDate(task.dateOfFinish)}
            </Typography>
          </RowRight>
        </Row>

        <Row>
          <RowLeft>
            <Typography variant="h5" gutterBottom style={textAlign}>
              Затраченное время:
            </Typography>
          </RowLeft>
          <RowRight>
            <Typography variant="h6" gutterBottom>
              {this.handleLeadTime(task)}
            </Typography>
          </RowRight>
        </Row>

        <Row>
          <RowLeft />
          <RowRight>
            <SimpleModal
              btnOuter="Редактировать"
              btnInner="Сохранить"
              task={task}
              addTasks={this.props.addTasks}
            />
          </RowRight>
        </Row>
      </Container>
    );
  }
}

export default DetailPage;
