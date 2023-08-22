import { Link } from 'react-router-dom'
import "./style.css"
import React, { useState } from 'react'

// component
import Tabbar from "../../../UI/Tabbar";
import SiteAvailaibility from './SiteAvailaibility';
import Resources from './ResourceAvailability'

// helper
import { tabs } from "../../../../StaticData/SiteManagement/Availability"


const index = () => {
  
  const [activeTab, setActiveTab] = useState('site')
  
  const handleClickTab = (tabName: any) => {
    setActiveTab(tabName)
  }
  return (
    <div className="page-wrapper">
    <div className="page-header">
      <h3 className="page-title">Availability</h3>     
    </div>


    <div className="page-content common-page-content">
      <div className="row">
          <div className="col-md-12">
            <Tabbar availablity={false} tabs={tabs} activeTab={activeTab} handleClickTab={handleClickTab} />
            <div className="tab-content site-detailtab-cont" id="nav-tabContent">
              {activeTab === 'site'  && <SiteAvailaibility/>}
              {activeTab === 'resources'  && <Resources/>}
             </div>
              
              </div>
          </div>
    </div>
</div>
  )
}

export default index
