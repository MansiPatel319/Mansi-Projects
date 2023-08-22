import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { toast } from 'react-toastify';
import { getUrl } from '../../../network/url';
import { get } from '../../../network/requests';
import Loader from '../../UI/Loader/Loader';
import { tokenExpire } from "../../../services/auth";
import oneToOneSessionImg from '../../../assets/images/latest/oto-image.png';
toast.configure();
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {Setjoiningtype} from '../../../../src/actions/JoiningTypeActio'
import '../../../assets/css/creator/creator-home-style.css';
import '../../../assets/css/tab-style.css';
import '../../../assets/css/style.css';
import '../../../assets/css/feather.min.css';


function BookedOneToOneSessionComponent() {
    // const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const [listOfAllSession, setListOfAllSession] = useState('');
    const dispatch = useDispatch();
    const getAllUserBookedSession = () => {
        setIsLoading(true);
        const url = getUrl('user_session_listing');
        get(`${url}`, true)
            .then((response) => {
                const {
                    data: { code, data, status, message },
                } = response;
                setIsLoading(false);
                switch (code) {
                    case 200:
                        if (status === true) {
                            setListOfAllSession(data.data);
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
        getAllUserBookedSession();
    }, []);

    return (
        <React.Fragment>
            {isLoading && <Loader />}
            <div className="tab-pane-inner">
                <div className="general-list-common-div">
                    <div className="general-list-panel-div">
                        <div className="row mlr-8">
                            {listOfAllSession.length > 0 ? (
                                listOfAllSession.map((data) => {
                                    const date=data.time_slot?.slot_datetime.replace('Z','');
                                    return (
                                        <div className="col-lg-6 col-md-6 plr-8" key={data.id}>
                                            <div className="general-common-cre-box">
                                                <div className="general-common-cre-row">

                                                    <div className="general-video-img-cre-thumb">
                                                        <div className="img-thumb">
                                                            <img
                                                                src={oneToOneSessionImg}
                                                                className="img-fluid img-responsive"
                                                                alt="image"
                                                            />
                                                        </div>
                                                        <div className="action-box-abs">
                                                        </div>
                                                    </div>


                                                    {/* <div className="our-content-div">
                                                        <div className="our-content-row">
                                                            <div className="our-content-left">
                                                                <div className="thumb-img">
                                                                    <Link
                                                                        to={`/user-class-details/${data.creator.id}`}
                                                                        className="link"
                                                                    >
                                                                        <img
                                                                            src={
                                                                                data.creator.profile_image === null ||
                                                                                    data.creator.profile_image ===
                                                                                    "https://myapp-user-uploads154822-dev.s3.amazonaws.com/sample.jpg"
                                                                                    ? profileImg
                                                                                    : data.creator.profile_image
                                                                            }
                                                                            className="img-fluid user"
                                                                            alt="user"
                                                                        />
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                            <div className="our-content-right">
                                                                <h3>
                                                                    <Link
                                                                        to={`/user-class-details/${data.creator.id}`}
                                                                        className="link"
                                                                    >
                                                                        <span className="text-span">{data.creator.full_name}</span>

                                                                        <span className="icon-rounded-span check-icon-rounded">
                                                                            <span className="material-icons">done</span>
                                                                        </span>
                                                                    </Link>
                                                                </h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                     */}




                                                    <div className="general-content-cre-div">
                                                        <div className="general-cre-content-row">
                                                            <div className="general-cre-content-top-row time-my-div">
                                                                <div className="time-row">
                                                                    <div className="time-box-rounded">
                                                                        <span className="icon-span">
                                                                            <i className="bg-custom-icon calendar-time-icon-new"></i>
                                                                        </span>
                                                                        <span className="text">
                                                                            {moment(date).format('MMM DD, hh:mm A')}
                                                                            {` ${data.time_slot.tz_value !== null ? data.time_slot.tz_value : ''}`}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <div className="desc-div ml-2">
                                                                    <p>{data.creator.full_name}</p>
                                                                </div>
                                                                <div className="col-lg-6 col-md-6 plr-10">
                                                                    {!data.time_slot.completed && <Link to={`/user-chat/${moment(data.time_slot.slot_datetime).format('MMM DD,YYYY hh:mm:ss A')}/${data.time_slot.id}`} className="btn btn-common-primary btn-save mr-20"  onClick={() => dispatch(Setjoiningtype({"type":"BookOnetoOne"}))} style={{ fontSize: '18px', marginLeft: '-5px' }}>
                                                                        Join live session
                                                                    </Link>}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    );
                                })
                            ) : (
                                <div className="general-common-cre-box">
                                    <div
                                        style={{ color: '#fff', fontSize: '18px' }}
                                    >
                                       You have no upcoming one-to-one sessions booked.
                                        </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>

    )
}

export default BookedOneToOneSessionComponent;