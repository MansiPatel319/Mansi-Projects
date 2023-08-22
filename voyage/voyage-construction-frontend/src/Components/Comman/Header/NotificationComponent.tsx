import React from "react";
import { Link } from "react-router-dom";

export interface notificationProps {
  notification: object[];
}

function Notification(props: notificationProps) {
  const { notification } = props;
  return (
    <div
      className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in show"
      aria-labelledby="alertsDropdown"
    >
      <h6 className="dropdown-header">Alerts Center</h6>
      {notification.map((item: any) => (
        <Link
          className="dropdown-item d-flex align-items-center"
          to="#"
          key={item.id}
        >
          <div className="mr-3">
            <div className="icon-circle bg-primary">
              <i className="fas fa-file-alt text-white" />
            </div>
          </div>
          <div>
            <div className="small text-gray-500">{item.date}</div>
            <span className={item.isBold && "font-weight-bold"}>
              {item.description}
            </span>
          </div>
        </Link>
      ))}
      <Link className="dropdown-item text-center small text-gray-500" to="#">
        Show All Alerts
      </Link>
    </div>
  );
}

export default Notification;
