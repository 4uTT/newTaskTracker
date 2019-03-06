import React from "react";
import styled from "styled-components";
import SimpleModal from "../utils/Modal";

const Wrapper = styled.div`
  width: 300px;
  margin-right: 20px;
`;
const ListWrap = styled.ul`
  padding: 0;
  margin: 0;
  border-radius: 5px;
  border: 1px solid #e7e7e7;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12);
  overflow: hidden;
`;
const ListItem = styled.li`
  list-style: none;
  align-items: center;
  line-height: 48px;
  padding-left: 10px;
  cursor: pointer;
  border-bottom: 1px solid #e7e7e7;
  transition: 0.5s;
  &:hover {
    background: #e7e7e7;
  }
  &:last-child {
    border-bottom: none;
  }
`;
const active = {
  background: "rgb(33, 150, 243)",
  color: "white"
};

const FilterBoard = ({ onItemSelect, statuses, selectedStatus, addTasks }) => {
  return (
    <Wrapper>
      <ListWrap>
        {statuses.map((m, i) => {
          return (
            <ListItem
              className={m === selectedStatus ? "active" : "passive"}
              onClick={() => onItemSelect(m)}
              key={i}
              style={m === selectedStatus ? active : {}}
            >
              {m}
            </ListItem>
          );
        })}
      </ListWrap>
      <SimpleModal
        addTasks={addTasks}
        btnOuter="Добавить задачу"
        btnInner="Добавить"
      />
    </Wrapper>
  );
};

export default FilterBoard;
