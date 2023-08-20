import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import userIcon from "../../assets/images/icons/user-new-icon.svg";
import { Link } from "react-router-dom";
const DropdownNew = () => {
  return (
    <div className="input-div">
      <div className="select-card-dropdown-div">
        <div id="myDropdown" className="dd-container" style={{width: "100%"}}>
          <div
            className="dd-select"
            style={{width: "100%", background: "rgb(238, 238, 238)"}}
          >
            {/* <input className="dd-selected-value" type="hidden" value="0" />  */}
          
            <Link to="#" className="dd-selected">
              <span className="span-img">
                <img
                  className="dd-selected-image"
                  src={userIcon}
                />
              </span>
              <label className="dd-selected-text">Select an educator</label>
              {/* <small className="dd-selected-description dd-desc dd-selected-description-truncated">
                agreen@kingsnas.ae
              </small> */}
            </Link>
            <span className="dd-pointer dd-pointer-down" />
          </div>
          <ul
            className="dd-options dd-click-off-close"
            style={{ width: "100%", display: "block" }}
          >
            <li style={{textDecorationStyle:'none'   }}>
              <Link to="#" className="dd-option">
                <input className="dd-option-value" type="hidden" value="0" />
                <span className="span-img">
                  <img
                    className="dd-option-image"
                    src={userIcon}
                  />
                </span>
                <label className="dd-option-text" style={{lineHeight: "0px"}}>
                  Select an educator
                </label>
              </Link>
            </li>
            <li>
              <Link to="#" className="dd-option dd-option-selected">
                
                <input
                  className="dd-option-value"
                  type="hidden"
                  value="1"
                />
                <span className="span-img">
                  <img
                    className="dd-option-image"
                    src={userIcon}
                  />
                </span>
                <label className="dd-option-text">Ms. Green</label>
                <small className="dd-option-description dd-desc">
                  agreen@kingsnas.ae
                </small>
              </Link>
            </li>
            <li>
              <Link to="#" className="dd-option">
                
                <input
                  className="dd-option-value"
                  type="hidden"
                  value="2"
                />
                <span className="span-img">
                  <img
                    className="dd-option-image"
                    src={userIcon}
                  />
                </span>
                <label className="dd-option-text">Mr. Chris</label>
                <small className="dd-option-description dd-desc">
                  dchris@kingsnas.ae
                </small>
              </Link>
            </li>
            <li>
              <Link to="#" className="dd-option">
                
                <input
                  className="dd-option-value"
                  type="hidden"
                  value="3"
                />
                <span className="span-img">
                  <img
                    className="dd-option-image"
                    src={userIcon}
                  />
                </span>
                <label className="dd-option-text">Ms. Danni</label>
                <small className="dd-option-description dd-desc">
                  mdanni@kingsnas.ae
                </small>
              </Link>
            </li>
            <li>
              <Link to="#" className="dd-option">
                
                <input
                  className="dd-option-value"
                  type="hidden"
                  value="4"
                />
                <span className="span-img">
                  <img
                    className="dd-option-image"
                    src={userIcon}
                  />
                </span>
                <label className="dd-option-text">Ms. Sara</label>
                <small className="dd-option-description dd-desc">
                  csara@kingsnas.ae
                </small>
              </Link>
            </li>
          </ul>
        </div>
        {/* <div className="dropdown-select-user" id="myDropdown">
                          <select id="demo-htmlselect">
                            <option value="0" selected="selected" data-imagesrc="assets/images/icons/user-new-icon.svg" data-description=""> Select an educator </option>
                            <option value="1" data-imagesrc="assets/images/icons/user-new-icon.svg" data-description="agreen@kingsnas.ae"> Ms. Green </option>
                            <option value="2" data-imagesrc="assets/images/icons/user-new-icon.svg" data-description="dchris@kingsnas.ae"> Mr. Chris </option>
                            <option value="3" data-imagesrc="assets/images/icons/user-new-icon.svg" data-description="mdanni@kingsnas.ae"> Ms. Danni </option>
                            <option value="4" data-imagesrc="assets/images/icons/user-new-icon.svg" data-description="csara@kingsnas.ae"> Ms. Sara </option>
                        </select>
                        </div> */}
      </div>
    </div>
  );
};

export default DropdownNew;
