import React,{useState} from 'react'
import images from "../../../Assets/images";
import BookingListFilter from '../../Comman/Modal/BookingListFilterModal';
function index() {

    const [filterCount, setFilterCount] = useState<any>([]);
    const [showModal, setshowModal] = useState(false)
    const showModalFilter = () => {
        setshowModal(true)
    }
    const hideFilterModal = () => {
        setshowModal(false)
    }
    return (
        <div className="page-wrapper">
            <div className="page-header">
                <h3 className="page-title">Booking List</h3>
            </div>


            <div className="page-content booking-list-wrapper">

                <div className="booking-list-form">
                    <form action="javascript:void(0)">
                        <div className="filter-wrapper">
                            <div className="f-left">
                                <div className="form-group form-inline">
                                    <input type="date" className="form-control" name="" />
                                </div>
                                <div className="to">TO</div>
                                <div className="form-group form-inline">
                                    <input type="date" className="form-control" name="" />
                                </div>
                                <div className="form-group form-inline filter-search">
                                    <img src={images.search} />
                                    <input type="text" className="form-control" name="" />
                                </div>
                                <button className="btn white-btn filter-btn" onClick={() => showModalFilter()}>
                                    Filter <img src={images.plusTheme} />
                                </button>
                            </div>
                            <button className="btn white-btn dl-btn">
                                <img src={images.download} />
                            </button>
                        </div>
                        {filterCount.length>0 && <div className="filter-data-box">
                            <div className="f_header">
                                <p className="f-text">Filters: 2</p>
                                <div className="divide"></div>
                                <a>Clear All</a>
                            </div>
                            <div className="selected-filter">
                                <div className="sf">
                                    <span className="sf-title">Area: </span>
                                    <span className="sf-text">Olympia Way, North Gate, East Gate</span>
                                    <a><img src={images.cross} className="cross-img" /></a>
                                </div>
                                <div className="sf">
                                    <span className="sf-title">Resource:</span>
                                    <span className="sf-text"> Box Truck, Forklift, Pickup Truck, ...</span>
                                    <a><img src={images.cross} className="cross-img" /></a>
                                </div>
                            </div>
                        </div>}
                        <div className="selected-table-box">
                            <p className="stb-title">3 Selected</p>
                            <div className="form-group">
                                <select className="form-control">
                                    <option>Actions</option>
                                    <option>Delete</option>
                                    <option>Edit</option>
                                </select>
                            </div>
                            <a><img src={images.cross} className="cross-img" /></a>
                        </div>
                    </form>
                </div>



                <div className="right-sidebar-modal">


                    <button className="btn side-bar-modal-btn" data-toggle="modal" data-target="#myModal2">
                        <img src={images.backIcon} />
                    </button>

                    <div className="modal right fade" id="myModal2" role="dialog" aria-labelledby="myModalLabel2">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">

                                <div className="modal-header">
                                    <button className="btn side-bar-modal-btn" data-toggle="modal" data-target="#myModal2">
                                        <img src={images.backIcon} />
                                    </button>


                                </div>

                                <div className="modal-body">
                                    <div className="user-profilepic text-center">
                                        <img src="images/Account-Menu.png" />
                                    </div>
                                    <form>
                                        <div className="sidebar-detail-form">
                                            <h3>Details</h3>
                                            <div className="form-group">
                                                <label>First Name</label>
                                                <input type="text" className="form-control" name="" />
                                            </div>
                                            <div className="form-group">
                                                <label>Last Name</label>
                                                <input type="text" className="form-control" name="" />
                                            </div>
                                            <div className="form-group">
                                                <label>Phone Number</label>
                                                <input type="number" className="form-control" name="" />
                                            </div>
                                            <div className="form-group">
                                                <label>Email</label>
                                                <input type="email" className="form-control" name="" />
                                            </div>
                                            <div className="form-group">
                                                <label>Company</label>
                                                <input type="text" className="form-control" name="" />
                                            </div>
                                        </div>
                                    </form>
                                    <form>
                                        <div className="sidebar-detail-form">
                                            <h3>Roles</h3>
                                            <div className="form-group">
                                                <label>Project Role</label>
                                                <input type="text" className="form-control" name="" />
                                            </div>
                                            <div className="form-group">
                                                <label>Organisation Role</label>
                                                <input type="text" className="form-control" name="" />
                                            </div>

                                        </div>
                                        <div className="sidebar-form personal-detail">
                                            <button className="theme-btn" data-toggle="modal" data-target="#deletecontact">Save Changes</button>
                                            <a href="#" className="remove-link">Remove from project</a>
                                        </div>
                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>






                <div className="booking-list-data">
                    <ul className="nav nav-pills" id="pills-tab" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" id="pills-all-tab" data-toggle="pill" href="#pills-all" role="tab" aria-controls="pills-all" aria-selected="true">All<span className="badge">21</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="pills-scheduled-tab" data-toggle="pill" href="#pills-scheduled" role="tab" aria-controls="pills-scheduled" aria-selected="false">Scheduled<span className="badge">6</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="pills-checkin-tab" data-toggle="pill" href="#pills-checkin" role="tab" aria-controls="pills-checkin" aria-selected="false">Checked In<span className="badge">4</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="pills-checkout-tab" data-toggle="pill" href="#pills-checkout" role="tab" aria-controls="pills-checkout" aria-selected="false">Checked Out<span className="badge">3</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="pills-forapproval-tab" data-toggle="pill" href="#pills-forapproval" role="tab" aria-controls="pills-forapproval" aria-selected="false">For Approval<span className="badge">5</span></a>
                        </li>
                        <li className="divider"></li>
                        <li className="nav-item">
                            <a className="nav-link" id="pills-refused-tab" data-toggle="pill" href="#pills-refused" role="tab" aria-controls="pills-refused" aria-selected="false">Refused<span className="badge">1</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="pills-declined-tab" data-toggle="pill" href="#pills-declined" role="tab" aria-controls="pills-declined" aria-selected="false">Declined<span className="badge">1</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="pills-cancelled-tab" data-toggle="pill" href="#pills-cancelled" role="tab" aria-controls="pills-cancelled" aria-selected="false">Cancelled<span className="badge">1</span></a>
                        </li>
                    </ul>

                </div>

            </div>
            {showModal && <BookingListFilter hideFilterModal={hideFilterModal}  showModalFilter={showModalFilter}/>}
        </div>
    )
}

export default index