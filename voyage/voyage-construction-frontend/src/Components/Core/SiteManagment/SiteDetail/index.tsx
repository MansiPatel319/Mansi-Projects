import React, { useState } from 'react'

// component
import Tabbar from "../../../UI/Tabbar"
import SiteInformation from './SiteInformation'
import AccessPoint from './AccessPoint'

// helper
import { tabs } from "../../../../StaticData/SiteManagement/SiteDetail"
import Resources from './Resouces'

const index = () => {
  
  const [activeTab, setActiveTab] = useState('site-information')
  
  const handleClickTab = (tabName: any) => {
    setActiveTab(tabName)
  }
  return (
    <div className="page-wrapper">
    <div className="page-header">
      <h3 className="page-title">Site Details</h3>     
    </div>


    <div className="page-content common-page-content">
      <div className="row">
          <div className="col-md-12">
            <Tabbar availablity={false} tabs={tabs} activeTab={activeTab} handleClickTab={handleClickTab} />
            <div className="tab-content site-detailtab-cont" id="nav-tabContent">
              {activeTab === 'site-information'  && <SiteInformation/>}
              {activeTab === 'access-point'  && <AccessPoint/>}
              {activeTab === 'resources'  && <Resources/>}
             </div>
              
              </div>
          </div>
    </div>
</div>
  )
}

export default index