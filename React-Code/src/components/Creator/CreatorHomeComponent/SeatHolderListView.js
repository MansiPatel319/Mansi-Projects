import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
function SeatHolderListView({ holderDetails }) {
    return (
        <div id="collapse01" className="collapse show" data-parent="#accordion">
            <div className="card-body">

                <div className="seat-user-content-div">
                    <div className="note-text-div">
                        <h4>{holderDetails.title}</h4>
                        <p>{holderDetails.user.description}</p>
                    </div>

                    <div className="common-form-div">
                        <form>
                            {holderDetails.keywords !== null &&
                                <div className="form-group mb-10">
                                    <label className="label-text">Category</label>
                                    <div className="category-control-row">
                                        <div className="category-inner">
                                            <ul className="category-list-ul" id="choose-category-list">
                                                {holderDetails.keywords.length > 0 && holderDetails.keywords.map((keywords, i) => {
                                                    return (
                                                        <li key={i}><Link to="#" className="filter-link"> <span className="span-text"> Photography </span> </Link></li>
                                                    );
                                                })}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            }
                            <div className="form-group mb-0">
                                <label className="label-text"> Booking Time </label>
                                <div className="category-control-row">
                                    <div className="category-inner">
                                        <ul className="category-list-ul slot-category-list-ul" id="choose-slot-list">
                                            <li><Link to="#" className="filter-link"> <span className="icon-img-span"> <i className="bg-custom-icon calendar-time-icon-new"></i> </span> <span className="span-text"> {moment(holderDetails.created_at).format('MMM DD, hh:mm, A')}</span> </Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                        </form>
                    </div>

                </div>

            </div>
        </div>

    )
}

export default SeatHolderListView;

SeatHolderListView.propTypes = {
    holderDetails: PropTypes.any,
};
