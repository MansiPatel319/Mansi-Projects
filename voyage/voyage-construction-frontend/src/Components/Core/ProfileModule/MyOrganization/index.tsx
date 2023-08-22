import React, { useState } from 'react'


// component
import Tabbar from "../../../UI/Tabbar"

// helper
import { tabs } from "../../../../StaticData/ProfileModule/organization"
import Details from './Details';
import Users from './Users';


export interface MyOrganizationProps { }
const index = () => {
  
  const [activeTab, setActiveTab] = useState('details')
  
  const handleClickTab = (tabName: any) => {
    setActiveTab(tabName)
  }
 
  return (
    <div className="page-wrapper">
      <div className="page-header">
        <h3 className="page-title">My Organization</h3>
      </div>
      {/* <!-- page header title section end--> */}

      <div className="page-content common-page-content">
        <div className="row">
          <div className="col-md-12">
            <Tabbar availablity tabs={tabs} activeTab={activeTab} handleClickTab={handleClickTab} />
            <div className="tab-content site-detailtab-cont" id="nav-tabContent">
              {activeTab === 'details'  && <Details/>}
              {activeTab === 'users'  && <Users/>}
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default index