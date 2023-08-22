import React, { useState } from 'react';
import PropTypes from "prop-types";
// import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import moment from 'moment';
// import { post } from "../../../network/requests";
// import { getUrl } from "../../../network/url";
// import { toast } from 'react-toastify';

function ChooseSlotComponent({ sessionTimeSlot, handleTimeSlot, sessionData }) {
  const [activeTimeSlot, setactiveTimeSlot] = useState(Number);
  const handleTimeSlotSelect = (e, id) => {
    e.preventDefault();
    if (activeTimeSlot === id) {
      setactiveTimeSlot(0);
      handleTimeSlot(0);
    }
    else {
      setactiveTimeSlot(id);
      handleTimeSlot(id);
    }
  }
  // const handlerequestslots =() =>{
  //   const formdata = new FormData();
  //   formdata.append('creator_id', sessionData.session.creator.id);
  //   const url = getUrl('request_slot');
  //   return post(`${url}`, formdata, true)
  //     .then((response) => {
  //       const {
  //         data: { code, message },
  //       } = response;
  //       switch (code) {
  //         case 200:
  //           toast.success(message);
  //           break;
  //         case 400:
  //           toast.error(message);
  //           break;
  //         default:
  //           toast.error(message);
  //       }
  //     })
  //     .catch((error) => {
  //       toast.error(error);
  //     });
  // };
  console.log("sessionData",sessionData.session.creator.id);
  return (
    <React.Fragment>
      <div className="category-control-row">
        <div className="category-inner">
          {sessionTimeSlot.length > 0 && <ul className="category-list-ul slot-category-list-ul">{sessionTimeSlot.map((data) => {
            return (
              <li className={activeTimeSlot === data.id ? "active" : ''} onClick={(e) => { handleTimeSlotSelect(e, data.id) }} key={data.id}>
                <Link to="#" className="filter-link" style={{ padding: "6px 35px 5px 35px" }}>
                  <i className="bg-custom-icon calendar-time-icon"></i>
                  {moment(data.slot_datetime.substr(0,data.slot_datetime.length-1)).format('MMM DD hh:mm A')}
                  {/* {moment(data.slot_datetime).format('MMM DD, hh:mm A')} */}
                  {` ${data.tz_value !== null ? data.tz_value : ''}`}
                  {activeTimeSlot === data.id && (
                    <span className="cancel-icon-span" onClick={(e) => { handleTimeSlotSelect(e, data.id) }}>
                      <i className="fe fe-x cross-icon"></i>
                    </span>
                  )}
                </Link>
              </li>
            );
          })}</ul> }
           
        </div>
      </div>
    </React.Fragment>
  );
}

export default ChooseSlotComponent;

ChooseSlotComponent.propTypes = {
  sessionTimeSlot: PropTypes.any,
  handleTimeSlot: PropTypes.func,
  sessionData: PropTypes.func
}
