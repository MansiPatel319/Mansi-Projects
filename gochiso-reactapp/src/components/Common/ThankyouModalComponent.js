/* eslint-disable react/prop-types */
import React from 'react';
import ButtonElement from '../../UI/ButtonElement';

const ThankyouModalComponent = ({ title, description, handleClose }) => (

  <div className="modal modal-custom modal-small-custom fade show" id="submission-popup" style={{ display: 'block', paddingRight: '17px' }}>
    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div className="modal-content">

        <div className="modal-body">

          <div className="group-root-box submission-group-root-box">
            <ButtonElement type="button" className="close" label={<i className="fe fe-x" />} onClick={() => handleClose()} />

            <div className="submission-message-div">
              <h4>{title}</h4>
              <p>{description}</p>
            </div>

          </div>

        </div>

      </div>
    </div>
  </div>
);

export default ThankyouModalComponent;
