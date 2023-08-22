import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleOpenCreateProjectModal, setActiveTab } from "../../../store/Actions/ProjectModule/projectActionCreators";
import Select from "react-select";

// component
import Button from "../../UI/Button";
import images from "../../../Assets/images";

// helper
import tabs from "../../../StaticData/Dashboard/tabs";

// css
import "./style.css";
import "../../../Assets/css/style.css";
import "../../../Assets/css/common.css";
import "../../../Assets/css/booking-list.css";
import "../../../Assets/css/booking-form.css";
import "../../../Assets/css/site-management.css";
import "../../../Assets/css/global-admin.css";
import "../../../Assets/css/cutstmize.css";

const index = () => {
  const activetab = useSelector((state: any) => state.project.activeTab)
  const [collapseTab, setCollapseTab] = useState(false);
  const [showSubMenu, setshowSubMenu] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const dispatch = useDispatch()
  const location = useLocation()
  const options = [
    { value: "English US", label: "English US" },
    { value: "English UK", label: "English UK" },
  ];
  const handleClick = () => {
    setCollapseTab(!collapseTab);
  };
  const handleClickTab = (tabName: any) => {
    // setActiveTab(tabName);
    dispatch(setActiveTab(tabName))
  };
  const handleOpenCreateProjectModel = () => {
    dispatch(handleOpenCreateProjectModal(true));
  }
  return (
    <ul
      className={
        collapseTab
          ? "navbar-nav  sidebar accordion toggled"
          : "navbar-nav  sidebar accordion"
      }
      id="accordionSidebar"
    >
      {/* <!-- Sidebar - Brand --> */}
      <Link className="sidebar-brand d-flex " to="/home">
        <img src={images.logoMini} alt="logo" className="logo-mini" />
        <img src={images.logogreenSvg} alt="logo" className="logo" />
      </Link>

      {collapseTab ? <Button
        className="btn theme-btn add-booking plusicon_button toggled"
        buttonLabel={<span><img src={images.plusIcon} alt="plus" /></span>}
        handleClick={() => handleOpenCreateProjectModel()}
      /> : <Button
        className="btn theme-btn add-booking"
        buttonLabel={<span><img src={images.plusIcon} alt="plus" />   New Project</span>}
        handleClick={() => handleOpenCreateProjectModel()}
      />}


      {tabs.map(
        (item: any) =>
          !item.isBottonTab && (
            <li
              key={item.id}
              onClick={() => handleClickTab(item.url)}
              className={
                location.pathname === item.url ? `nav-item active` : `nav-item`
              }
            >
              <Link to={`${item.url}`} className="nav-link">
                <img alt={item.name} src={item.image} />
                <span>{item.name}</span>
              </Link>
            </li>
          )
      )}
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
      <li key="8" className="nav-item">
        <Link to="" onClick={() => handleClick()} className="nav-link collapse">
          <img alt="collapse" src={images.collapse} />
          <span>Collapse</span>
        </Link>
      </li>
    </ul>
  );
};

export default index;
