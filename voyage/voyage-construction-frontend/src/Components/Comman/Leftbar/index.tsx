import React, { useState } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";

// component
import Button from "../../UI/Button";
import images from "../../../Assets/images";

// helper
import tabs from "../../../StaticData/Dashboard/tabs";

// css
import "./style.css";
import { setSidebarDetails } from "../../../Store/Actions/comman/sidebarActionCreatore";
import "../../../Assets/css/customize.css"
import { getLocalStorage } from "../../../Network/ApiService";
import { constants } from "../../../Library/Constants";
import { setBookingDetails, setBookingType } from "../../../Store/Actions/BookingModule/bookingActionCreator";
import bookingSteps from "../../../StaticData/BookingForm/steps";

const index = () => {
  const [activetab, setActiveTab] = useState("Booking List");
  const [collapseTab, setCollapseTab] = useState(false);
  const [showSubMenu, setshowSubMenu] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const isSiteManagement: any = useSelector(
    (state: any) => state.sidebarDetail.isSiteDetailMenueOpen
  );
  const bookingStepsData = useSelector((state: any) => state.booking.bookingSteps)
  const bookingType = useSelector((state: any) => state.booking.bookingType)

  const projectRole = getLocalStorage(constants.USER)?.projectRole;
  console.log('projectRole', projectRole);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const location = useLocation()
  const { project } = useParams();
  const options = [
    { value: "English US", label: "English US" },
    { value: "English UK", label: "English UK" },
  ];
  const handleClick = () => {
    setCollapseTab(!collapseTab);
  };
  const handleMenuClick = (name: string) => {
    setActiveTab(name)
    setshowSubMenu(!showSubMenu);
    dispatch(setSidebarDetails(!isSiteManagement));
  };
  const handleSubMenuClick = (name: string) => {
    setActiveTab(name)
    // setshowSubMenu(!showSubMenu);
    dispatch(setSidebarDetails(!isSiteManagement));
  };


  const handleActiveMenuClick = (name: string) => {

    setActiveTab(name);
  };
  const handleAddBooking = () => {

    if (!location.pathname.includes('new-booking-form')) {
      dispatch(setBookingDetails(bookingSteps))
      dispatch(setBookingType(''))
      navigate(`/new-booking-form/${project}`)
    }
    else {
      dispatch(setBookingDetails(bookingSteps))
      dispatch(setBookingType(''))
      window.location.reload()
    }


  }

  console.log('activetab :>> ', activetab);
  return (
    <ul
      className={
        collapseTab
          ? "navbar-nav  sidebar accordion toggled"
          : "navbar-nav  sidebar accordion"
      }
      id="accordionSidebar">
      {/* <!-- Sidebar - Brand --> */}

      {collapseTab ? <Button
        className="btn theme-btn add-booking plusicon_button toggled"
        buttonLabel={<span><img src={images.plusIcon} alt="plus" /></span>}

      /> : <Button
        handleClick={() => handleAddBooking()}
        className="btn theme-btn add-booking"
        buttonLabel={<span><img src={images.plusIcon} alt="plus" />   New Booking</span>}

      />}

      {tabs.map((item: any) =>

        !item.isBottonTab ? (
          item.data.length > 0 ? (

            <li
              key={item.id}
              className={
                activetab === item.name ? `nav-item active` : `nav-item`
              }>
              <Link
                className="nav-link collapsed"
                to="#"
                data-toggle="collapse"
                onClick={() => handleMenuClick(item.name)}
                aria-expanded="true"
                aria-controls="collapseTwo">
                <img alt={item.name} src={item.image} />
                <span>{item.name}</span>
              </Link>

              {isSiteManagement && (
                <div
                  id="collapseTwo"
                  className="collapse"
                  style={{ display: "block" }}>
                  <div className="collapse-inner rounded">
                    {item.data?.map((data: any) => (
                      <Link className={
                        activetab === data.name ? `nav-link active` : `nav-link`
                      } to={`${data.url}/${project}`}
                      onClick={() => handleSubMenuClick(item.name)}
                      >
                        <img src={data.image} />
                        <span>{data.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </li>

          )

            : (
              <>
                {((item.name === "User Management" && projectRole !== constants.PROJECT_USER) || item.name !== "User Management") &&
                  <li
                    key={item.id}
                    className={
                      location.pathname.includes(item.url) ? `nav-item active` : `nav-item`
                      // activetab === item.name ? `nav-item active` : `nav-item`
                    } >
                    <Link to={`${item.url}/${project}`} className="nav-link" onClick={() => handleActiveMenuClick(item.name)}>
                      <img alt={item.name} src={item.image} />
                      <span>{item.name}</span>
                    </Link>
                  </li>
                }
              </>
            )
        ) : (
          <li className="nav-item bottom-links">
            <div className={
              collapseTab
                ? "form-group mb-0 toggled"
                : "form-group mb-0 toggled"
            }>
              <Select
                classNamePrefix="form-control-language"
                options={options}
                value={options.find((c) => c.value === selectedOption)}
                onChange={(val: any) => setSelectedOption(val)}
              />
            </div>
          </li>
        )
      )}
      <li key="8" className="nav-item">
        <Link to="#" onClick={() => handleClick()} className="nav-link collapse">
          <img alt="collapse" src={images.collapse} />
          <span>Collapse</span>
        </Link>
      </li>
    </ul>
  );
};

export default index;
