/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { useSelector } from 'react-redux';
import getLangValue from '../../resources/language';
import strings from '../../resources/strings';

function ProfileAboutComponent(props) {
  const lang = useSelector((state) => state.defaultLanguage.lang);

  return (
    <>
      {props.profileData && (
        <div className="pro-about-div">
          <div className="pro-about-inner-div">
            <div className="pro-about-top-div">
              <div className="pro-about-top-left-div">
                <h4>{getLangValue(strings.ABOUT, lang)}</h4>
              </div>
              <div className="pro-about-top-right-div">
                <button className="btn btn-edit" type="button">
                  {getLangValue(strings.EDIT, lang)}
                </button>
              </div>
            </div>

            {props.profileData.user && props.profileData.user.introduction && (
              <div className="pro-about-desc-div">
                <p>
                  &ldquo;
                  {props.profileData.user.introduction}
                  &rdquo;
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileAboutComponent;
