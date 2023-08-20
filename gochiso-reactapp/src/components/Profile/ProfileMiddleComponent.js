/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import ProfileLeftPanelComponent from '../Common/ProfileLeftPanelComponent';

function ProfileMiddleComponent(props) {
  return (
    <>
      <div className="main-middle-inner-area">
        <section className="profile-section">
          <div className="profile-div">
            <div className="container container-1200">
              <div className="row">
                <div className="col-lg-12 col-md-12">
                  <div className="profile-row-div row mlr-10">
                    <ProfileLeftPanelComponent />

                    {props.mainContentComponent}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default ProfileMiddleComponent;
