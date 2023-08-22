import React from 'react';
import { Link } from 'react-router-dom';
import profileImg from '../../../assets/images/profile.png';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import convertUTCDateToLocalDate from '../../../hooks/TimeZoneConversion';
const NotificationBookingListComponent = ({ notificationList }) => {
  return (
    <React.Fragment>
      <div className="nts-dmenu-listing-div">
        {notificationList.length > 0 ? (
          notificationList.map((data) => {
            return (
              <div className="nts-dmenu-box" key={data.id}>
                <Link to="#" className="nts-dmenu-row">
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
                          {data.description?.split(' ').slice(0, 9).join(' ')}
                          <span className="bold-font">
                            {` ${data.description?.split(' ').slice(10, data.description.length).join(' ')} `}
                          </span>
                        </h3>
                      ) : (
                        <h3>

                          {data.description?.split(' ').slice(0, 8).join(' ')}
                          <span className="bold-font">
                          {` ${data.description?.split(' ').slice(10, data.description.length).join(' ')} `}
                          </span>{' '}
                          Be prepared.{' '}
                        </h3>
                      )}
                      <span className="time-span">
                        <Moment fromNow ago>
                          {convertUTCDateToLocalDate(new Date(data.created_at))}
                        </Moment>
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
    </React.Fragment>
  );
};

export default NotificationBookingListComponent;
NotificationBookingListComponent.propTypes = {
  notificationList: PropTypes.array,
};
