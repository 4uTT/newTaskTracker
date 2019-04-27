import React from "react";
import EnhancedTable from "../tabs/table";
import FilterBoard from "../tabs/FilterBoard";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 5%;
  display: flex;
  justify-content: space-between;
`;

const TableContainer = props => (
  <Wrapper>
    <FilterBoard
      statuses={props.statuses}
      onItemSelect={props.onItemSelect}
      selectedStatus={props.selectedStatus}
      addTasks={props.addTasks}
    />
    <EnhancedTable tasks={props.tasks} dateFormat={props.dateFormat} />
  </Wrapper>
);

export default TableContainer;
