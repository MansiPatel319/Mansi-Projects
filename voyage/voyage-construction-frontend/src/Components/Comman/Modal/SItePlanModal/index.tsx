import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
// css

import images from "../../../../Assets/images";
import { setShowSitePlan } from "../../../../Store/Actions/BookingModule/bookingActionCreator";
import useOutsideClick from "../../Header/ManageOutsideClickClose";



const InviteModal = () => {
  const refOutsideModel = useRef(null);
  const dispatch = useDispatch()
  const showSitePlan = useSelector((state:any)=>state.booking.showSitePlan)


  useOutsideClick(refOutsideModel, () => { 
    dispatch(setShowSitePlan(''))
    
  
   
  })
  return (
    <div
      className="modal fade  show"
      id="invite_user_Modal"
      style={{ display: "block" }}
    >
      <div className="modal-dialog modal-dialog-scrollable modal-site-plan">
        <div className="modal-content" ref={refOutsideModel}>
          <div className="viewSitePlan">
                  <img src={showSitePlan} />
                </div>
        </div>
      </div>
    </div>
  );
};

export default InviteModal;
