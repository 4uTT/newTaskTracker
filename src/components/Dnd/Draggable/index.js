import React from "react";
import PropTypes from "prop-types";

const Draggable = props => {
  const drag = e => {
    e.dataTransfer.setData("transfer", e.target.id);
  };
  const nowAllowDrop = e => {
    e.stopPropagation();
  };

  return (
    <div
      id={props.id}
      draggable="true"
      onDragStart={drag}
      onDragOver={nowAllowDrop}
      style={props.style}
    >
      {props.children}
    </div>
  );
};

export default Draggable;

Draggable.propTypes = {
  id: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node
};
