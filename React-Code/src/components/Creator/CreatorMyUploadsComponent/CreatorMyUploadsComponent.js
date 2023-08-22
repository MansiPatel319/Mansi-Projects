import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../../../assets/css/style.css';
import '../../../assets/css/creator/creator-my-upload-style.css';
import '../../../assets/css/tab-style.css';
import "../../../assets/css/creator/creator-home-style.css";
import "../../../assets/css/creator/creator-popup-style.css";
import ClassesTabComponet from './ClassesTabComponet';
import MaterialsTabComponent from './MaterialsTabComponent';
const CreatorMyUploadsComponent = () => {
  const params = useParams();

  const [tabActive, setTabActive] = useState(params.slug);
  const handleChangeForTab = (e, tabValue) => {
    e.preventDefault();
    setTabActive(tabValue);
  };
  return (
    <div className="main-middle-area creator-main-middle-area main-bg-color">
      <div className="header-footer-with-min-height02">
        <div className="pattern-inner-div pattern-upricing-inner-div">
          <div className="relative-index">


            <section className="general-oto-streams-section my-uploads-section" id="my-uploads-new-section">
              <div className="general-oto-streams-div my-uploads-div">
                <div className="container container-1200">

                  <div className="row">
                    <div className="col-lg-12 col-md-12">
                      <div className="general-oto-heading-div">
                        <h1>My Uploads</h1>
                      </div>
                    </div>
                  </div>

                  <div className="general-oto-streams-common-div">
                    <div className="row">
                      <div className="col-lg-12 col-md-12">
                        <div className="tabs-root-common">
                          <div className="tabs-header-common">
                            <ul className="nav nav-tabs">
                              <li className="nav-item">
                                <Link
                                  onClick={(e) => handleChangeForTab(e, 'classes')}                                
                                  className={tabActive === 'classes' ? 'nav-link text-uppercase active show' : 'nav-link text-uppercase'}
                                  to="#"
                                >
                                  Classes
                                </Link>
                              </li>
                              <li className="nav-item">
                                <Link                                
                                  onClick={(e) => handleChangeForTab(e, 'materials')}
                                  className={tabActive === 'materials' ? 'nav-link text-uppercase active show' : 'nav-link text-uppercase'}
                                  to="#"
                                >
                                  Materials
                                </Link>
                              </li>
                            </ul>
                          </div>

                          <div className="tabs-body-common">
                            <div className="tab-content">
                              <div
                                className={
                                  tabActive === 'classes' ? 'tab-pane fade active show' : 'tab-pane fade'
                                }
                              >
                                {tabActive === 'classes' && <ClassesTabComponet />}
                              </div>

                              <div
                                className={
                                  tabActive === 'materials' ? 'tab-pane fade active show' : 'tab-pane fade'
                                }
                              >
                                {tabActive === 'materials' && <MaterialsTabComponent />}
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
          </div>
        </div>
      </div>
    </div>





  );
};

export default CreatorMyUploadsComponent;
