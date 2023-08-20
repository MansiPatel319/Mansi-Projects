import React from 'react';
import { useSelector } from 'react-redux';
import HeaderComponent from '../components/Header/HeaderComponent';
import getLangValue from '../resources/language';
import strings from '../resources/strings';

function PageNotFound() {
  const lang = useSelector((state) => state.defaultLanguage.lang);

  return (
    <>
      <div id="wrapper" className="wrapper home-wrapper w-100">
        <HeaderComponent />
        <div className="main-middle-area">
          <div className="page-not-found-main-div">
            <div className="page-not-found-root-div">
              <p>
                <span className="block">
                  {`${getLangValue(strings.PAGE_NOT_FOUND, lang)}`}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PageNotFound;
