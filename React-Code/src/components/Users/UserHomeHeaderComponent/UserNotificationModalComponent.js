import React from 'react';
import { Link } from 'react-router-dom';
import '../../../assets/css/notifications-style.css';
// import '../../../assets/css/modal-style.css';
import '../../../assets/css/owl-slider-style.css';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import profileImg from '../../../assets/images/profile.png';
import moment from 'moment';
import convertUTCDateToLocalDate from '../../../hooks/TimeZoneConversion';
toast.configure();
function UserNotificationModalComponent({
  notificationData,

}) {
  return (
    <React.Fragment>
      <div
        className="dropdown-menu dropdown-menu-left dropdown-menu-nt-div show"
        aria-labelledby="dropdownMenuLink"
        style={{ position: 'absolute', willChange: 'transform', top: ' 0px' }}
      >
        <div className="dmenu-common-nt-root">
          <div className="common-header-div">
            <div className="title-heading-div nt-heading-div">
              <h2>Notifications</h2>
            </div>
          </div>

          <div className="common-body-div">
            {notificationData && (
              <div className="nts-dmenu-common-div">
                <div className="nts-dmenu-common-inner">
                  <div className="nts-dmenu-listing-div">
                    {/* <div className="notifications-listing-div"> */}
                    {notificationData.length > 0 ? (
                      notificationData.map((data, i) => {
                        return (
                          <div className="nts-dmenu-box" key={i}>
                            <Link className="nts-dmenu-row">
                              <div className="nt-left">
                                <div className="thumb-div">
                                  <img
                                    src={
                                      data.user.profile_image === '' ||
                                      data.user.profile_image === undefined ||
                                      data.user.profile_image === null ||
                                      data.user.profile_image ===
                                        'https://myapp-user-uploads154822-dev.s3.amazonaws.com/sample.jpg'
                                        ? profileImg
                                        : data.user.profile_image
                                    }
                                    className="img-fluid"
                                    alt="img"
                                  />
                                </div>
                              </div>
                              <div className="nt-right">
                                <div className="text-desc">
                                  {data.description.includes('session') ? (
                                    <h3>
                                      {data.description?.split(' ').slice(0, 6).join(' ')}
                                      <span className="bold-font">
                                        {` ${data.description?.split(' ').slice(6, 8).join(' ')} `}
                                      </span>
                                      {data.description?.split(' ').slice(8, 9).join(' ')}
                                      {` `}
                                      <span className="bold-font">
                                        {data.description?.split(' ').slice(9, 14).join(' ')}
                                      </span>
                                      {` `}
                                      {data.description
                                        ?.split(' ')
                                        .slice(15, data.description.length)
                                        .join(' ')}
                                    </h3>
                                  ) : (
                                    <h3>
                                      {data.description?.split(' ').slice(0, 5).join(' ')}
                                      <span className="bold-font">
                                        {` ${data.description?.split(' ').slice(5, 7).join(' ')} `}
                                      </span>
                                      
                                      {data.description
                                        ?.split(' ')
                                        .slice(7, data.description.length)
                                        .join(' ')}
                                    </h3>
                                  )}
                                  <span className="time-span">
                                    
                                    {moment(
                                      moment(convertUTCDateToLocalDate(new Date(data.created_at))),
                                    ).fromNow()}
                                  </span>
                                </div>
                              </div>
                            </Link>
                          </div>
                        );
                      })
                    ) : (
                      <div className="nts-dmenu-box">
                        <div className="nts-dmenu-row" style={{ color: '#fff', fontSize: '18px' }}>
                          You have no new notifications.
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default UserNotificationModalComponent;

UserNotificationModalComponent.propTypes = {
  handleModalClose: PropTypes.func,
  notificationData: PropTypes.array,
  handleRemoveAllNotification: PropTypes.func,
};
