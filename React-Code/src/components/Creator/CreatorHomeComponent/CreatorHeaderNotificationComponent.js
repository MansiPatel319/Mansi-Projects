import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import NotificationBookingListComponent from './NotificationBookingListComponent';
import '../../../assets/css/notifications-style.css';
const CreatorHeaderNotificationComponent = ({
  notificationList,
}) => {
  return (
    <React.Fragment>
      <div className="dropdown-menu dropdown-menu-left dropdown-menu-nt-div show" aria-labelledby="dropdownMenuLink" style={{ position: "absolute", top: 0, willChange: 'transform' }}>
        <div className="dmenu-common-nt-root">
          <div className="common-header-div">
            <div className="title-heading-div nt-heading-div">
              <h2>Notifications</h2>
            </div>
          </div>
          <div className="common-body-div">

            <div className="nts-dmenu-common-div">
              <div className="nts-dmenu-common-inner">

                <div className="ntf-tabs-root-common">

                  <div className="ntf-tabs-header-common">
                    <ul className="nav nav-tabs">
                      <li className="nav-item">
                        <Link className="nav-link text-uppercase active show" data-toggle="tab" to="#">Booking</Link>
                      </li>
                    </ul>
                  </div>

                  <div className="ntf-tabs-body-common">
                    <div className="tab-content">
                      <div id="notifications-tab-01" className="tab-pane fade active show">
                        <NotificationBookingListComponent
                          notificationList={notificationList}
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

    </React.Fragment>
  );
};

export default CreatorHeaderNotificationComponent;
CreatorHeaderNotificationComponent.propTypes = {
  handleModalClose: PropTypes.func,
  notificationList: PropTypes.array,
  handleRemoveAllNotification: PropTypes.func,
};
