import React from 'react'
import { Link } from 'react-router-dom';

const LinkButton = ({ path, icon, title, customClass }) => {
  return (
    <>
      <Link
        className={customClass}
        to={path}
      >
        {icon}
        {title}
      </Link>
    </>
  );
};

export default LinkButton
