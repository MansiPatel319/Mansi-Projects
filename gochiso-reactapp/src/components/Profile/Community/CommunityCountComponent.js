/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';

function CommunityCountComponent(props) {
  return (
    <>
      <div className="col-lg-6 col-md-6 plr-10">
        <div className="community-color-card-bx-div">
          <div className="community-color-card-bx-inner">
            <div className="top-txt-div">
              <p>{props.communityText}</p>
            </div>
            <h3>{props.communityCount}</h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default CommunityCountComponent;
