/* eslint-disable react/prop-types */
import React from 'react';

function AuthFormHeadingComponent({ headingText1, headingText2 }) {
  return (
    <>
      <div className="heading-div">
        <h2>
          <span className="block">{headingText1}</span>
          {headingText2 && (
            <span className="block">{headingText2}</span>
          )}
        </h2>
      </div>
    </>
  );
}

export default AuthFormHeadingComponent;
