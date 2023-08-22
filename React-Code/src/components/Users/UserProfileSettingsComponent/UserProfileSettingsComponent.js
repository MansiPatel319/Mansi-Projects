/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EditProfileComponent from './EditProfileComponent';
import ChangeCreditCardComponent from './ChangeCreditCardComponent';
import CreditCardDetailsModalComponent from './CreditCardDetailsModalComponent';
import { getUrl } from '../../../network/url';
import { get } from '../../../network/requests';
import { toast } from 'react-toastify';
import { tokenExpire } from '../../../services/auth';

toast.configure()
function UserProfileSettingsComponent() {
  const [isModal, setisModal] = useState(false);
  const [changeCreditCardDetails, setcardDetails] = useState('');

  const [isActiveTab, setisActiveTab] = useState('Profile');
  const tabs = [
    { id: 1, tabName: 'Profile' },

  ];
  const handleTabClick = (e, activeTab) => {
    e.preventDefault();
    setisActiveTab(activeTab);
  };
  const handleCardDetails = (data) => {
    setcardDetails(data);
  }
  const getUserCardDetailsData = () => {
    const url = getUrl("getUserCardDetails");
    return get(`${url}`, true)
      .then((response) => {
        const {
          data: { code, data, status, message },
        } = response;
        
        switch (code) {
          case 200:
            if (status === true) {
              setcardDetails(data);
            }
            break;
          case 400:
            toast.error(message, {
              pauseOnHover: false,
              position: toast.POSITION.TOP_RIGHT,
            });
            break;
          default:
            toast.error(message, {
              pauseOnHover: false,
              position: toast.POSITION.TOP_RIGHT,
            });
        }
      })
      .catch((error) => {
        tokenExpire(error.response, history);

      });
  }
 const handleModal = (isActive) => {
    
    setisModal(isActive);
  }
  useEffect(() => {
    getUserCardDetailsData()
  }, [])

  return (
    <React.Fragment>

      <div className="main-middle-area user-main-middle-area main-bg-color">
        <div className="header-footer-with-min-height02">
        {isModal && <CreditCardDetailsModalComponent handleCardDetails={handleCardDetails}  handleModal={handleModal}  />}
          <div className="pattern-inner-div pattern-inner-div-no-01">
            <section className="profile-settings-section" id="profile-settings-section">
              <div className="profile-settings-div">
                <div className="container container-1000">
                  <div className="profile-settings-root-div">
                    <div className="tabs-root-common">
                      <div className="heading-tb-top-div">
                        <div className="heading-tb-top-inner-div">
                          <h1>Profile</h1>
                        </div>
                      </div>
                      <div className="tabs-header-common">
                        <ul className="nav nav-tabs">
                          {tabs.length > 0 &&
                            tabs.map((tabsData) => {
                              return (
                                <li
                                  className="nav-itemProfile"
                                  key={tabsData.id}
                                  onClick={(e) => {
                                    handleTabClick(e, tabsData.tabName);
                                  }}
                                >
                                  <Link
                                    className={`nav-link text-uppercase ${
                                      isActiveTab === tabsData.tabName ? 'active show' : ''
                                    }`}
                                    data-toggle="tab"
                                    to="#"
                                  >
                                    {tabsData.tabName}
                                  </Link>
                                </li>
                              );
                            })}
                        </ul>
                      </div>

                      <div className="tabs-body-common">
                        <div className="tab-content">
                          <div
                            id="profile-settings-tab-01"
                            className={`tab-pane fade ${
                              isActiveTab === 'Profile' ? 'active show' : ''
                            } `}
                          >
                            {isActiveTab === 'Profile' && <EditProfileComponent />}
                          </div>
                          <div
                            id="profile-settings-tab-02"
                            className={`tab-pane fade ${
                              isActiveTab === 'Credit card Settings' ? 'active show' : ''
                            } `}
                          >
                            {isActiveTab === 'Credit card Settings' && (
                              <ChangeCreditCardComponent handleSetModal={handleModal} changeCreditCardDetails={changeCreditCardDetails}  handleSetCardDetail={handleCardDetails} />
                            )}
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
    </React.Fragment>
  );
}

export default UserProfileSettingsComponent;
