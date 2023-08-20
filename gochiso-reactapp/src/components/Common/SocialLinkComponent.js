/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

function SocialLinkComponent(props) {
  return (
    <>
      <a
        href={props.link}
        target="_blank"
        rel="noreferrer"
        className={props.className}
      >
        {props.spanTag}
      </a>
    </>
  );
}

export default SocialLinkComponent;
