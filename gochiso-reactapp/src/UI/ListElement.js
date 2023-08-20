/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';

function ListElement(props) {
  return (
    <li>
      <Link
        to="#"
        className={props.className}
        onClick={(e) => props.onWordClick(e, props.word)}
      >
        {props.word}
      </Link>
    </li>
  );
}

export default ListElement;
