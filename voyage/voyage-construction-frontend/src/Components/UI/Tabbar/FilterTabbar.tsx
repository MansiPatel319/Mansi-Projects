import React from 'react';
import images from '../../../Assets/images';

export interface TabbarProps {
  activeTab: string;
  handleClickTab: any;
  tabs: any,

}

const FilterTabbar = ({ activeTab, handleClickTab, tabs }: TabbarProps) => {
  return (
    <ul className="nav nav-tabs filter-tabs" id="myTab" role="tablist">
      {tabs.map((tab: any) =>
        <li className="nav-item">
          <a className={`nav-link ${activeTab === tab.slug && "active"}`} id={tab.slug} onClick={() => handleClickTab(tab.slug)} data-toggle="tab" role="tab" aria-controls="area"><span>{tab.tabName}</span><img src={images.forward} /></a>
        </li>)}


    </ul>
  );
}

export default FilterTabbar;
