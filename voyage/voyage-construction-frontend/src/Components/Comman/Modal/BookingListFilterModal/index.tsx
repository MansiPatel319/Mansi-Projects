import React,{useEffect, useState} from 'react'
import CheckboxList from '../UserFIlterModal/CheckboxList';
import { useParams } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { setBookingListFilter } from '../../../../Store/Actions/BookingList/BookingListActionCreator';
// APIs
import { getALLResourceList } from '../../../../Network/Core/SiteManagement/resourse';

// Static Data
import tabs from '../../../../StaticData/BookingList/filtersTabs';
import usertype_data from '../../../../StaticData/BookingList/tabs/UserType';
import Areatabs from '../../../../StaticData/BookingList/tabs/Area';
import recipient_tabs from '../../../../StaticData/BookingList/tabs/RecipientCompany';
import event_tab from '../../../../StaticData/BookingList/tabs/Event';

import FilterTabbar from '../../../UI/Tabbar/FilterTabbar';
export interface UserFilterModalProps{
    showModalFilter?: () => void;
    hideFilterModal?: () => void;
}

function index({showModalFilter,hideFilterModal}:UserFilterModalProps) {
    const {project} = useParams()
    const [activeTab, setActiveTab] = useState('Area')
    const [showTabs, setShowTabs] = useState<any>(Areatabs)
    const [vehicles, setvehicles] = useState<any>([])
    const dispatch = useDispatch()
    const filteredDataRedux = useSelector((state:any)=>state.bookinglist.filterData)
    const handleClickTab = (tabName:any) => {
        setActiveTab(tabName)
    }
    const tabArray = {
        "Area":Areatabs,
        "recipient-company":recipient_tabs,
        "event":event_tab,
        "vehicle-type":[],
        "user-type":[],
        "forms":[],
        "resource":[],
        "booking-type":[]
    }
    const [filterData, setfilterData] = useState(tabArray)
    const setVehicleList = async() => {
        const res = await getALLResourceList(project,1,true)
        const {status,data,statusText} = res
        switch (status){
            case 200:
                data.results.forEach( (item:any) => {
                    item.id = item.id
                    item.name = item.name
                    item.isChecked = false
                })
                setShowTabs(data.results)
        }
    }
    console.warn(filteredDataRedux,"################");
    useEffect(()=>{
        switch (activeTab){
            case "Area":
                setShowTabs(Areatabs)
                break;
            case "recipient-company":
                setShowTabs(recipient_tabs)
                break;
            case "event":
                setShowTabs(event_tab)
                break;
                case "vehicle-type":
                setShowTabs([])
                break;
            case "user-type":
                setShowTabs(usertype_data)
                break;
            case "forms":
                setShowTabs([])
                break;
            case "resource":
                setVehicleList()
                break;
            case "booking-type":
                setShowTabs([])
                break;
            default :
                setShowTabs([1,2,3])
                break;

        }
    },[activeTab])
    const handleChangeCheckbox = (name:any,id:any) => {
        const tabIndex = tabs.findIndex( (items:any) => items.slug===name )
        let currentTab = tabs[tabIndex].slug
        const tempData = [...showTabs]
        tempData.forEach((element:any) => {
            if(element.id === id){
                element.isChecked = !element.isChecked
            }
        });
        setShowTabs(tempData)
        tabArray[currentTab as keyof typeof tabArray]=showTabs
        setfilterData(tabArray)
    }

    const onApplyFilter = () => {
        dispatch(setBookingListFilter(filterData))
    }
    console.warn();
    
  return (
    <div className="modal fade show" style={{display:'block'}} id="filterModal">
        <div className="modal-dialog modal-lg modal-dialog-scrollable">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">Filters</h4>
                </div>
                <div className="modal-body">
                    <div className="filtermodalbody-wrapper">

                        <FilterTabbar tabs={tabs} activeTab={activeTab} handleClickTab={handleClickTab} />

                        <div className="tab-content filtermodal-tabcontent">

                            {<CheckboxList checkboxList={showTabs} name={activeTab} handleChangeCheckbox={handleChangeCheckbox} /> }

                        </div>
                    </div>
                </div>


                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={hideFilterModal}>Cancel</button>
                    <button className="btn theme-btn disabled" id="apply-filter" onClick={onApplyFilter}>Apply Filters</button>
                </div>

            </div>
        </div>
    </div>
  )
}

export default index