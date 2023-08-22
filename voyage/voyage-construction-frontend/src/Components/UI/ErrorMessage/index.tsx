/* eslint-disable react/jsx-no-useless-fragment */
import React from "react";

// css
import "./style.css";

export interface IErrorMessageProps {
  errMessage?: string;
  containerClass?: string;
}

const index = (props: IErrorMessageProps) => {
  const { errMessage, containerClass } = props;

  return (
    <>
      {errMessage !== "" && (
          <div className={`error-message-box ${containerClass}`}>
          <p>{errMessage}</p>
        </div>
      )}
    </>
  );
};

export default index;
