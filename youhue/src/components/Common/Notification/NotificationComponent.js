import React from "react";
import { render } from 'react-dom';
import { Link } from "react-router-dom";
import parse from 'html-react-parser';
import noNotificationImage from "../../../assets/images/no-notification.svg";
import userIcon from "../../../assets/images/Shape.svg";
import moment from "moment";

import dots from "../../../assets/images/dots.svg"
import right from "../../../assets/images/right.svg"
import setting from "../../../assets/images/setting.svg"

import "../../../styles/notification.css"

class NotificationComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notification: props.notification,
      showSettings: false
    };
  }
  strcolor =(string) =>{
  var string=`<h5 style="color:maroon">${string}</h5>`
  return string
  }
  handleSettingClick=()=>{
    this.setState({showSettings: !this.state.showSettings})
  }
  render() {
    return (
      <div className="yh_notificationToggle_wrapper active">
        <div className="yh_notificationToggle_inner">
          {this.props.notification && this.props.notification.length > 0 ? (
            <>
              <div className="notific_mark">
                  <h3>Notifications</h3>
                  <ul>
                    <li>
                      <Link to="#" className="notific_popup" onClick={this.handleSettingClick}>
                        <img src={dots} alt="dots" />
                        <div className={`notific_box ${this.state.showSettings ? "active" : ""}`}>
                          <ul>
                            <li><Link to="#" onClick={() => this.props.markAllAsRead()}><img src={right} alt="right" />Mark all as read</Link></li>
                            <li><Link to="/notification-settings"><img src={setting} alt="setting" />Notification Settings</Link></li>
                          </ul>
                        </div>
                      </Link>
                    </li>
                  </ul>
              </div>
              <div className="yh_notification_list">
                <ul>
                  {this.props.notification.map((item) => {
                    
                    if(!item.is_admin&& !item.is_class && !item.is_negative){
                      const {
                        status: { mood, owner },
                        time,
                        id,
                        is_read,
                      } = item;
                      const getFullNameArray = owner.username.split(" ");
                      const getShortName =
                        getFullNameArray[1] !== undefined
                          ? `${getFullNameArray[0]
                              ?.substring(0, 1)
                              .toUpperCase()}${getFullNameArray[1]
                              ?.substring(0, 1)
                              .toUpperCase()}`
                          : `${getFullNameArray[0]
                              ?.substring(0, 1)
                              .toUpperCase()}`;
                      return (
                        <li
                          onClick={() =>
                            this.props.handleReadNotification(
                              is_read,
                              id,
                              item.status.id
                            )
                          }
                        >
                          <div
                            className={`yh_notification_block ${
                              !is_read && "notification"
                            }`}
                          >
                            <div
                              className={`yh_notification_thumb ${
                                mood?.parent ? mood.parent.slug : mood.slug
                              } `}
                            >
                              {item.is_flag ? (
                                <span className="custom-icon flag-icon"></span>
                              ) : (
                                <span className="notificationThumb_image">
                                  {getShortName}
                                </span>
                              )}
  
                              <span className="notificationThumb_mood">
                                <span
                                  className={`mood-icon mood-${
                                    mood.parent ? mood.parent.slug : mood.slug
                                  }-icon`}
                                ></span>
                              </span>
                            </div>
                            <div className="yh_notification_text">
                              {!item.is_flag &&
                              <h5
                              style={item.is_flag ? { color: "#e25674" } : {}}
                            >
                              {/* <h5>{item.title}</h5> */}
                              {`${owner.username} ${
                                item.group?.name
                                  ? `(${item.group?.name})`
                                  : ""
                              } was`}{" "}
                              <span>{mood.name}</span>
                            </h5>
                              }
                              {item.is_flag && <>{parse(this.strcolor(item.title))}</>}
                              {/* {item.is_flag && <>{parse(`<h5 style={{color: 'red'}} > <span >${item.title}</span></h5>`)}</>} */}
                              {/* {parse(`<h5 style={${item.is_flag ? { color: "red" } : {}}}> <span >${item.title}</span></h5>`)} */}
                                                         
                            <p>{moment(new Date(item.date_created_web_utc)).fromNow()} </p>

                            </div>
                          </div>
                        </li>
                      );
                    }
                    else if(item.is_negative){
                      
                      const {
                        status: { mood, owner },
                        time,
                        id,
                        is_read,
                      } = item;
                      const getFullNameArray = owner.username.split(" ");
                      const getShortName =
                        getFullNameArray[1] !== undefined
                          ? `${getFullNameArray[0]
                              ?.substring(0, 1)
                              .toUpperCase()}${getFullNameArray[1]
                              ?.substring(0, 1)
                              .toUpperCase()}`
                          : `${getFullNameArray[0]
                              ?.substring(0, 1)
                              .toUpperCase()}`;
                      return (
                        <li
                          onClick={() =>
                            this.props.handleReadNotification(
                              item.is_read,
                              item.id,
                              item.id,
                              item.is_class,
                              item.is_admin,
                              item.is_negative
                            )
                          }>
                          <div
                            className={`yh_notification_block ${
                              !is_read && "notification"
                            }`}>
                            <div
                              className={`yh_notification_thumb ${
                                mood?.parent ? mood.parent.slug : mood.slug
                              } `}>
                              <span className="notificationThumb_image">
                                {getShortName}
                              </span>

                              <span className="notificationThumb_mood">
                                <span
                                  className={`mood-icon mood-nagative-icon`}></span>
                              </span>
                            </div>
                            <div className="yh_notification_text">
                              {/* {!item.is_flag &&
                              <h5
                              style={item.is_flag ? { color: "#e25674" } : {}}
                            >
                             
                              {`${owner.username}  was`}{" "}
                              <span >{mood.name}</span>
                            </h5>
                              } */}

                              {parse(this.strcolor(item.title))}
                              {/* {parse(`<h5 style={${item.is_flag ? { color: "red" } : {}}}> <span >${item.title}</span></h5>`)} */}

                              <p>
                                {moment(
                                  new Date(item.date_created_web_utc)
                                ).fromNow()}{" "}
                              </p>
                            </div>
                          </div>
                        </li>
                      );
                    }
                  else if(item.is_className===true){
                    return (
                      <li
                        onClick={() =>
                          this.props.handleReadNotification(
                            item.is_read,
                            item.id,
                            item.id,
                            item.is_class,
                            item.is_admin,
                            item.is_negative,
                            item.group.id
                            
                          )
                        }
                      >
                        <div
                          className={`yh_notification_block ${
                            !item.is_read && "notification"
                          }`}
                        >
                          <div
                            className={`yh_notification_thumb `}
                          >
                            {item.is_flag ? (
                              <span className="custom-icon flag-icon"></span>
                            ) : (
                              <span className="notificationThumb_image">
                                <img src="data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='22px' height='15px' viewBox='0 0 22 15' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3Enoun_users_791122%3C/title%3E%3Cg id='Educator---Insight-Dashboard' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cg id='noun_users_791122' fill='%23652D90' fill-rule='nonzero'%3E%3Ccircle id='Oval' cx='10.9419643' cy='2.92633929' r='2.90089286'%3E%3C/circle%3E%3Ccircle id='Oval' cx='17.45625' cy='3.58794643' r='2.16294643'%3E%3C/circle%3E%3Cpath d='M21.7566964,10.865625 C21.3241071,8.14285714 19.8991071,6.51428571 17.45625,6.51428571 C16.5147321,6.51428571 15.7513393,6.74330357 15.1151786,7.20133929 C15.1915179,7.27767857 15.2678571,7.35401786 15.3696429,7.43035714 C16.4129464,8.52455357 17.1254464,10.1022321 17.45625,12.1125 C17.45625,12.1888393 17.4816964,12.2651786 17.4816964,12.3160714 C19.8482143,12.3415179 21.9348214,11.934375 21.7566964,10.865625 Z' id='Path'%3E%3C/path%3E%3Ccircle id='Oval' cx='4.42767857' cy='3.58794643' r='2.16294643'%3E%3C/circle%3E%3Cpath d='M6.53973214,7.43035714 C6.61607143,7.35401786 6.69241071,7.27767857 6.76875,7.20133929 C6.13258929,6.74330357 5.34375,6.51428571 4.42767857,6.51428571 C2.01026786,6.51428571 0.585267857,8.11741071 0.127232143,10.865625 C-0.0508928571,11.934375 2.06116071,12.3415179 4.42767857,12.3415179 C4.42767857,12.2651786 4.42767857,12.1888393 4.453125,12.1379464 C4.75848214,10.1276786 5.47098214,8.55 6.53973214,7.43035714 Z' id='Path'%3E%3C/path%3E%3Cpath d='M10.9419643,14.2245536 C7.76116071,14.2245536 4.96205357,13.6647321 5.19107143,12.2651786 C5.80178571,8.60089286 7.71026786,6.46339286 10.9419643,6.46339286 C14.1736607,6.46339286 16.0821429,8.62633929 16.6928571,12.2651786 C16.921875,13.6647321 14.1227679,14.2245536 10.9419643,14.2245536 Z' id='Path'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/svg%3E"/>
                              </span>
                            )}

                            <span className="notificationThumb_mood">
                              <span
                                className={`mood-icon mood-icon`}
                              ></span>
                            </span>
                          </div>
                          <div className="yh_notification_text">
                            <h5
                              style={item.is_flag ? { color: "#e25674" } : {}}
                            >
                            <div dangerouslySetInnerHTML={{ __html: item.message }} />
                              {" "}
                              {/* <span>{mood.name}</span> */}
                            </h5>
                            
                            <p>{moment(new Date(item.date_created_web_utc)).fromNow()} </p>
                         
                          </div>
                        </div>
                      </li>
                    );
                  }
                  else if(item.is_admin===true){
                    return (
                      <li
                        onClick={() =>
                          this.props.handleReadNotification(
                            item.is_read,
                            item.id,
                            item.id,
                            item.is_class,
                            item.is_admin
                          )
                        }
                      >
                        <div
                          className={`yh_notification_block ${
                            !item.is_read && "notification"
                          }`}
                        >
                          <div
                            className={`yh_notification_thumb `}
                          >
                            {item.is_flag ? (
                              <span className="custom-icon flag-icon"></span>
                            ) : (
                              <span className="notificationThumb_image">
                               <img src={userIcon}/> 
                              </span>
                            )}

                            <span className="notificationThumb_mood">
                              <span
                                className={`mood-icon mood--icon`}
                              ></span>
                            </span>
                          </div>
                          <div className="yh_notification_text">
                            <h5
                              style={item.is_flag ? { color: "#e25674" } : {}}
                            >
                              {`${item.message}  `}{" "}
                              {/* <span>{mood.name}</span> */}
                            </h5>
                            <p>{moment(new Date(item.date_created_web_utc)).fromNow()} </p>
                          </div>
                        </div>
                      </li>
                    );
                  }
                  })}
                </ul>
              </div>
            </>
          ) : (
            <>
              <div className="notific_mark">
                  <h3>Notifications</h3>
                  <ul>
                    <li>
                      <Link to="#" className="notific_popup" onClick={this.handleSettingClick}>
                        <img src={dots} alt="dots" />
                        <div className={`notific_box ${this.state.showSettings ? "active" : ""}`}>
                          <ul>
                            <li><Link to="#" onClick={() => this.props.markAllAsRead()}><img src={right} alt="right" />Mark all as read</Link></li>
                            <li><Link to="/notification-settings"><img src={setting} alt="setting" />Notification Settings</Link></li>
                          </ul>
                        </div>
                      </Link>
                    </li>
                  </ul>
              </div>
            <div className="no-notification-wrapper">
              <div className="yh_notification_list">
              <img src={noNotificationImage} alt="image" />
              <h3>No new notifications!</h3>
              </div>
            </div>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default NotificationComponent;
