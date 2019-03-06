import React from "react";
import PropTypes from "prop-types";

const Droppable = props => {
  const drop = e => {
    e.preventDefault();
    const data = e.dataTransfer.getData("transfer");
    e.target.appendChild(document.getElementById(data));
    props.stateEdit(data, props.id);
  };

  const allowDrop = e => {
    e.preventDefault();
  };

  return (
    <div id={props.id} onDrop={drop} onDragOver={allowDrop} style={props.style}>
      {props.children}
    </div>
  );
};

export default Droppable;

Droppable.propTypes = {
  id: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node
};
