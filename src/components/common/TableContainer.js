import React, { Component } from "react";
import EnhancedTable from "../tabs/table";
import FilterBoard from "../tabs/FilterBoard";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 5%;
  display: flex;
  justify-content: space-between;
`;

class TableContainer extends Component {
  render() {
    return (
      <Wrapper>
        <FilterBoard
          statuses={this.props.statuses}
          onItemSelect={this.props.onItemSelect}
          selectedStatus={this.props.selectedStatus}
          addTasks={this.props.addTasks}
        />
        <EnhancedTable
          tasks={this.props.tasks}
          dateFormat={this.props.dateFormat}
        />
      </Wrapper>
    );
  }
}

export default TableContainer;
