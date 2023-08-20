import React from 'react';
import { useSelector } from 'react-redux';
import getLangValue from '../../resources/language';
import images from '../../resources/images';
import ImageElement from '../../UI/ImageElement';
import SearchComponent from '../Common/SearchComponent';
import strings from '../../resources/strings';

function DashboardBannerComponent() {
  const lang = useSelector((state) => state.defaultLanguage.lang);

  return (
    <section className="main-banner-section">
      <div className="banner-div">
        <div className="content-banner-root">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <div className="content-banner">
                  <div className="row center-align">
                    <div className="col-lg-8 col-md-6">
                      <div className="text-content">
                        <div className="heading-text-div">
                          <h1>
                            <span className="block">
                              {getLangValue(
                                strings.HOME_BANNER_HEADING_1,
                                lang,
                              )}
                            </span>
                            <span className="block">
                              {getLangValue(
                                strings.HOME_BANNER_HEADING_2,
                                lang,
                              )}
                            </span>
                          </h1>
                        </div>
                        <SearchComponent
                          className="custom-search-div"
                          placeholder={getLangValue(
                            strings.HOME_SEARCH_PLACEHOLDER,
                            lang,
                          )}
                        />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="banner-img-thumb-div">
                        <div className="thumb-div">
                          <ImageElement
                            src={images.HomeBanner}
                            className="img-fluid img-banner"
                            alt="img"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DashboardBannerComponent;
