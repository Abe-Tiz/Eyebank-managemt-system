import React from "react";

const MaterialIcon = (props) => (
  <i
    className="material-icons"
    style={{ color: props.color, fontSize: props.size, maxWidth: 100 }}
  >
    {props.name}
  </i>
);

export default MaterialIcon;
