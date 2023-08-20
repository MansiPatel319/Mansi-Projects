/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import getLangValue from '../../../resources/language';
import strings from '../../../resources/strings';

function CommunityActionsComponent() {
  const lang = useSelector((state) => state.defaultLanguage.lang);

  return (
    <>
      <div className="community-button-card-root">
        <div className="row mlr-10">
          {/* <div className="col-lg-4 col-md-6 plr-10">
            <div className="community-button-div">
              <Link href="#" className="btn btn-community-button">
                {`+ ${getLangValue(strings.INVITE_A_FRIEND, lang)}`}
              </Link>
            </div>
          </div> */}

          <div className="col-lg-6 col-md-6 plr-10">
            <div className="community-button-div">
              <Link to={`/${lang}/add-place`} className="btn btn-community-button">
                {getLangValue(strings.ADD_PLACE, lang)}
              </Link>
            </div>
          </div>

          <div className="col-lg-6 col-md-6 plr-10">
            <div className="community-button-div">
              <a target="_blank" href="https://www.mamoru.earth/volunteer" className="btn btn-community-button" rel="noreferrer">
                {getLangValue(strings.VOLUNTEER, lang)}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CommunityActionsComponent;
