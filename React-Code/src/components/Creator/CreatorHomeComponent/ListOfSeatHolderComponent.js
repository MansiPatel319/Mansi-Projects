import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { getUrl } from '../../../network/url';
import { get } from '../../../network/requests';
import { tokenExpire } from "../../../services/auth";
import { useHistory } from "react-router-dom";
import Loader from '../../UI/Loader/Loader';
import Moment from 'react-moment';
import convertUTCDateToLocalDate from "../../../hooks/TimeZoneConversion";
import SeatHolderListView from "./SeatHolderListView";
import ProfileImage from '../../../assets/images/profile.png';

const ListOfSeatHolderComponent = ({ handleModalClose, selectedStreamId }) => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [listOfSeatHolder, setListOfSeatHolder] = useState([]);
  const [holoderDetails, setholoderDetails] = useState("");

  const handleDropDownToggle = (data) => {
    for (let i = 0; i < listOfSeatHolder.length; i++) {
      if (data.id === listOfSeatHolder[i].id) {
        if (listOfSeatHolder[i].isOpen === undefined) {
          listOfSeatHolder[i]['isOpen'] = true;
        }
        else {
          if (listOfSeatHolder[i].isOpen) {
            listOfSeatHolder[i]['isOpen'] = false;
          }
          else if (listOfSeatHolder[i].isOpen === false || listOfSeatHolder[i].isOpen === undefined) {
            listOfSeatHolder[i]['isOpen'] = true;
          }
        }
      }
      else {
        listOfSeatHolder[i]['isOpen'] = false;
      }
    }
    setholoderDetails(data);
  }
  const getAllStreamSeatHolder = () => {
    setIsLoading(true);
    const url = getUrl('get_creator_streams_seat_holder_list');
    get(`${url}/${selectedStreamId}/`, true)
      .then((response) => {
        const {
          data: { code, data, status, message },
        } = response;
        setIsLoading(false);
        switch (code) {
          case 200:
            if (status === true) {
              setListOfSeatHolder(data);
            }
            break;
          case 400:
            toast.error(message, {
              pauseOnHover: false,
              position: toast.POSITION.TOP_RIGHT,
            });
            break;
          default:
            toast.error(message, {
              pauseOnHover: false,
              position: toast.POSITION.TOP_RIGHT,
            });
        }
      })
      .catch((error) => {
        setIsLoading(false);
        tokenExpire(error.response, history);
      });
  };
  useEffect(() => {
    getAllStreamSeatHolder();
  }, []);
  return (
    <React.Fragment>
      {isLoading && <Loader />}
      <div className="modal center center-common-modal fade show" id="list-of-seat-holders-modal" tabIndex="-1" role="dialog" style={{ overflowY: 'scroll', paddingRight: '16px', display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <div className="modal-dialog modal-dialog-centered modal-dialog-lg" role="document">
          <div className="modal-content">

            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true" onClick={handleModalClose}> <i className="fe fe-x close-icon-x"></i> </span></button>
            </div>

            <div className="modal-body">
              <div className="general-pop-root">
                <section className="general-details-pop-section general-list-of-seat-holders-section">
                  <div className="container container-970">
                    <div className="row">
                      <div className="col-lg-12 col-md-12">
                        <div className="general-payment-div general-details-div">
                          <div className="container-general-center">

                            <div className="heading-div">
                              <div className="heading-inner-div">
                                <h1>Seat Holders List</h1>
                              </div>
                            </div>

                            <div className="general-view-details-div">
                              <div className="list-seat-holders-div">
                                <div className="list-seat-holders-inner">

                                  <div className="seat-listing-div" id="accordion">
                                    {listOfSeatHolder.length > 0 ? (
                                      listOfSeatHolder.map((data) => {
                                        return (
                                          <div className="card seat-user-listing-box" key={data.id}>
                                            <div className="card-header">
                                              <div className="seat-user-listing-row">
                                                <div className="nt-left">
                                                  <div className="thumb-div">
                                                    <img src={
                                                      data.user.profile_image ===
                                                        'https://myapp-user-uploads154822-dev.s3.amazonaws.com/sample.jpg' ||
                                                        data.user.profile_image === ''
                                                        ? ProfileImage
                                                        : data.user.profile_image
                                                    } className="img-fluid" alt="img" />
                                                  </div>

                                                  <div className="text-desc">
                                                    <h3> <Link to="#" className="link">{(data.first_name === "" || data.user.first_name === null || data.user.first_name === undefined || data.user.last_name === "" || data.user.last_name === null || data.user.last_name === undefined) ? data.user.username : (data.user.first_name + " " + data.user.last_name)}</Link></h3>
                                                    <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)', fontWeight: '400' }}>Booked <Moment fromNow ago>
                                                      {convertUTCDateToLocalDate(new Date(data.created_at))}
                                                    </Moment> ago</p>
                                                  </div>
                                                </div>

                                                {/* <div className="nt-right">
                                                  <div className="user-link">
                                                    <Link to="#" className="link link-color btn-block">Block</Link>
                                                  </div>
                                                </div> */}

                                                <div className="abs-arrow-right-div">
                                                  <Link className={`card-link card-link-arrow  ${holoderDetails ? (holoderDetails.user.id === data.user.id && data.isOpen ? '' : 'collapsed') : 'collapsed'}`} data-toggle="collapse" to="#" onClick={() => { handleDropDownToggle(data) }}>
                                                    <span className="rounded-link">
                                                      <span className="material-icons-outlined arrow-icon"> keyboard_arrow_down </span>
                                                    </span>
                                                  </Link>
                                                </div>
                                              </div>
                                            </div>

                                            {holoderDetails ?
                                              <>
                                                {
                                                  holoderDetails.user.id === data.user.id && data.isOpen ? <SeatHolderListView holderDetails={holoderDetails} /> : ''
                                                }
                                              </>
                                              : ''
                                            }

                                          </div>
                                        );
                                      })
                                    ) : (
                                      <div className="seat-user-listing-box">
                                        <div
                                          className="seat-user-listing-row"
                                          style={{ color: '#fff', fontSize: '18px' }}
                                        >
                                          No data available
                                      </div>
                                      </div>
                                    )}
                                  </div>

                                </div>
                              </div>
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </section>
              </div>

            </div>

          </div>
        </div>
      </div>

    </React.Fragment>
  );
};

export default ListOfSeatHolderComponent;
ListOfSeatHolderComponent.propTypes = {
  handleModalClose: PropTypes.func,
  selectedStreamId: PropTypes.number,
};
