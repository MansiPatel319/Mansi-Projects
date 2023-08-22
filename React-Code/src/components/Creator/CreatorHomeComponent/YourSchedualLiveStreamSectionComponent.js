/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CreatorGeneralComponent from './CreatorGeneralComponent';
import CreatorOneToOneComponent from './CreatorOneToOneComponent';
import '../../../assets/css/creator/creator-popup-style.css';

function YourSchedualLiveStreamSectionComponent(props) {
  const [activeTab, setactiveTab] = useState('Live streams workshops');
  const activeTabs = [
    { id: 1, tab: 'Live streams workshops' },
    { id: 2, tab: 'Live streams One-To-One' },
  ];
  const handleActiveTab = (e, activeTabName) => {
    e.preventDefault();
    setactiveTab(activeTabName);
  };

  return (
    <React.Fragment>
      <section className="general-oto-streams-section" id="general-oto-streams-section">
        <div className="general-oto-streams-div">
          <div className="container container-1200">
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <div className="general-oto-heading-div">
                  <h1>Your scheduled Streams</h1>
                </div>
              </div>
            </div>

            <div className="general-oto-streams-common-div">
              <div className="row">
                <div className="col-lg-12 col-md-12">
                  <div className="tabs-root-common">
                    <div className="tabs-header-common">
                      <ul className="nav nav-tabs">
                        {activeTabs.length > 0 &&
                          activeTabs.map((data) => {
                            return (
                              <li
                                className="nav-item"
                                key={data.id}
                                onClick={(e) => {
                                  handleActiveTab(e, data.tab);
                                }}
                              >
                                <Link
                                  className={`nav-link text-uppercase  ${activeTab === data.tab ? 'active show' : ''
                                    }`}
                                  data-toggle="tab"
                                  to="#"
                                >
                                  {data.tab}
                                </Link>
                              </li>
                            );
                          })}
                      </ul>
                    </div>

                    <div className="tabs-body-common">
                      <div className="tab-content">

                        <div
                          id="general-tab-01"
                          className={`tab-pane fade ${activeTab === 'Live streams workshops' ? 'active show' : ''
                            }`}
                        >
                          {activeTab === 'Live streams workshops' && <CreatorGeneralComponent {...props} />}
                        </div>
                        <div
                          id="oto-tab-02"
                          className={`tab-pane fade ${activeTab === 'Live streams One-To-One' ? 'active show' : ''
                            }`}
                        >
                          {activeTab === 'Live streams One-To-One' && <CreatorOneToOneComponent {...props}  />}
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

    </React.Fragment>
  );
}

export default YourSchedualLiveStreamSectionComponent;
