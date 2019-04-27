import React from "react";
import styled from "styled-components";
import Draggable from "../Dnd/Draggable";
import Droppable from "../Dnd/Droppable";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

const Wrapper = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
`;

const Item = styled.div`
  padding: 8px;
  color: #555;
  background: white;
  border-radius: 3px;
  display: flex;
  justify-content: space-between;
`;

const droppableStyle = {
  backgroundColor: "rgb(199, 199, 199)",
  width: "250px",
  height: "800px",
  margin: "32px",
  borderRadius: "7px",
  boxShadow:
    "0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)",
  overflow: "hidden"
};
const linkStyle = {
  width: "20px",
  height: "20px",
  textAlign: "center",
  textDecoration: "none",
  color: "#000",
  padding: "3px",
  borderRadius: "15px",
  background: "#e7e7e7"
};
const titleStyle = {
  height: "50px",
  lineHeight: "50px",
  textAlign: "center"
};
const Scrum = ({ tasks, stateEdit }) => {
  const plans = tasks.filter(m => m.state === "План");
  const inProcesses = tasks.filter(m => m.state === "В процессе");
  const ready = tasks.filter(m => m.state === "Выполнен");

  return (
    <Wrapper>
      <Droppable id="dr1" stateEdit={stateEdit} style={droppableStyle}>
        <Typography
          component="h2"
          variant="headline"
          gutterBottom
          style={titleStyle}
        >
          План
        </Typography>

        {plans.map(m => (
          <Draggable
            id={m.id.toString()}
            key={"key" + m.id}
            style={{ margin: "8px" }}
          >
            <Item>
              <span>{m.title}</span>
              <Link style={linkStyle} to={`/main/${m.id}`}>
                &#10148;
              </Link>
            </Item>
          </Draggable>
        ))}
      </Droppable>
      <Droppable id="dr2" stateEdit={stateEdit} style={droppableStyle}>
        <Typography
          component="h2"
          variant="headline"
          gutterBottom
          style={titleStyle}
        >
          В процессе
        </Typography>
        {inProcesses.map(m => (
          <Draggable
            id={m.id.toString()}
            key={"key" + m.id}
            style={{ margin: "8px" }}
          >
            <Item>
              <span>{m.title}</span>
              <Link style={linkStyle} key={"key" + m.id} to={`/main/${m.id}`}>
                &#10148;
              </Link>
            </Item>
          </Draggable>
        ))}
      </Droppable>
      <Droppable id="dr3" stateEdit={stateEdit} style={droppableStyle}>
        <Typography
          component="h2"
          variant="headline"
          gutterBottom
          style={titleStyle}
        >
          Готово
        </Typography>
        {ready.map(m => (
          <Draggable
            id={m.id.toString()}
            key={"key" + m.id}
            style={{ margin: "8px" }}
          >
            <Item>
              <span>{m.title}</span>
              <Link style={linkStyle} to={`/main/${m.id}`}>
                &#10148;
              </Link>
            </Item>
          </Draggable>
        ))}
      </Droppable>
    </Wrapper>
  );
};

export default Scrum;
