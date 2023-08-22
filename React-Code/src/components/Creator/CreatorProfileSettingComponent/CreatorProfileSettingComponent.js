import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../assets/css/creator/creator-profile-settings-style.css';
import '../../../assets/css/style.css';
import '../../../assets/css/tab-style.css';
import '../../../assets/css/feather.min.css';
import '../../../assets/css/custom-forms-style.css';
import ProfileSettingTabComponent from './ProfileSettingTabComponent';
import OneToOneSettingComponent from './OneToOneSettingComponent';
const CreatorProfileSettingComponent = () => {
  const [tabActive, setTabActive] = useState('editProfile');
  const handleChangeForTab = (e, tabValue) => {
    e.preventDefault();
    setTabActive(tabValue);
  };
  return (
    <div className="main-middle-area creator-main-middle-area main-bg-color">
      <div className="header-footer-with-min-height02">
        <div className="pattern-inner-div pattern-upricing-inner-div">
          <div className="relative-index">

            <section className="profile-settings-section" id="creator-profile-settings-section">
              <div className="profile-settings-div">
                <div className="container container-1000">
                  <div className="profile-settings-root-div">
                    <div className="tabs-root-common">
                    <div className="heading-tb-top-div">
                      <div className="heading-tb-top-inner-div">
                        <h1>Profile Settings</h1>
                      </div>
                    </div>
                      <div className="tabs-header-common">
                        <ul className="nav nav-tabs">
                          <li className="nav-item">
                            <Link
                              to="#"
                              onClick={(e) => handleChangeForTab(e, 'editProfile')}
                              className={
                                tabActive === 'editProfile' ? 'nav-link text-uppercase active show' : 'nav-link text-uppercase'
                              }
                            >
                              Profile
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link
                              onClick={(e) => handleChangeForTab(e, 'onetoone')}
                              className={
                                tabActive === 'onetoone' ? 'nav-link text-uppercase active show' : 'nav-link text-uppercase'
                              }
                              to="#"
                            >
                              One-to-one Settings
                            </Link>
                          </li>
                        </ul>
                      </div>

                      <div className="tabs-body-common">
                        <div className="tab-content">
                          <div
                            className={
                              tabActive === 'editProfile'
                                ? 'tab-pane fade active show'
                                : 'tab-pane fade'
                            }
                          >
                            {tabActive === 'editProfile' && <ProfileSettingTabComponent />}
                          </div>

                          <div
                            className={
                              tabActive === 'onetoone'
                                ? 'tab-pane fade active show'
                                : 'tab-pane fade'
                            }
                          >
                            {tabActive === 'onetoone' && <OneToOneSettingComponent />}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorProfileSettingComponent;
