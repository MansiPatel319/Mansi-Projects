import React from "react";
import { Link } from "react-router-dom";

export interface TabbarProps {
  activeTab: string;
  handleClickTab: any;
  tabs: any;
  availablity: boolean;
}

const index = ({
  activeTab,
  handleClickTab,
  tabs,
  availablity,
}: TabbarProps) => {
  return (
    <nav className={`site-details-tab ${availablity && "availability"}`}>
      <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
        {
          tabs.map((tab: any) => (
          <Link
            className={`nav-item nav-link ${
              activeTab === tab.slug && "active"
            } `}
            id={tab.slug}
            onClick={() => handleClickTab(tab.slug)}
            data-toggle="tab"
            to="#"
            role="tab"
            aria-controls="nav-details"
            aria-selected="true"
          >
            {tab.tabName}
          </Link>
          ))
        }
      </div>
    </nav>
  );
};

export default index;
