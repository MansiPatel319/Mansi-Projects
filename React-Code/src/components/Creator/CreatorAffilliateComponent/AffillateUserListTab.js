import React, { useEffect, useState } from 'react';
import { getUrl } from '../../../network/url';
import { get } from '../../../network/requests';
import { toast } from 'react-toastify';
import Loader from '../../UI/Loader/Loader';
import { tokenExpire } from "../../../services/auth";
import { useHistory } from "react-router-dom";
import profileImg from "../../../assets/images/profile.jpg";
import convertUTCDateToLocalDate from "../../../hooks/TimeZoneConversion";
import Moment from 'react-moment';
toast.configure();

function AffillateUserListTab() {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const [userListingData, setuserListingData] = useState('');

    const getAllUSers = () => {
        setIsLoading(true);
        const url = getUrl('affilliate_users');
        get(`${url}`, true)
            .then((response) => {
                const {
                    data: { code, data, status, message },
                } = response;
                setIsLoading(false);
                switch (code) {
                    case 200:
                        if (status === true) {
                            setuserListingData(data.data);
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
        getAllUSers();
    }, []);
    return (
        <div className="tab-pane-inner">
            {isLoading && <Loader />}
            <div className="general-list-common-div">
                <div className="general-list-panel-div">
                    <div className="row">
                        {userListingData.length > 0 ? (

                            userListingData.map((data) => {
                                return (
                                    <div className="col-lg-4 col-md-6" key={data.id}>
                                        <div className="general-common-cre-box" >
                                            <div className="general-common-cre-row">
                                                <div className="general-video-img-cre-thumb">
                                                    <div className="img-txt-div">
                                                        <div className="img-thumb">
                                                            <img src={(data.profile_image === "https://myapp-user-uploads154822-dev.s3.amazonaws.com/sample.jpg" || data.profile_image === "" || data.profile_image === null || data.profile_image === undefined) ? profileImg : data.profile_image} alt="img" className="img-fluid img-responsive" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="general-content-cre-div">
                                                    <div className="general-cre-content-row">
                                                        <div className="general-cre-content-top-row">
                                                            <p>
                                                                {(data.first_name === "" || data.first_name === undefined || data.first_name === null || data.last_name === "" || data.last_name === undefined || data.last_name === null) ? data.username : (data.first_name + " " + data.last_name)}
                                                            </p>
                                                            <div className="desc-div">
                                                                <p>{data.description}</p>
                                                            </div>

                                                            <div className="time-row time-row-no-style">
                                                                <div className="time-box">
                                                                    <div className="time-box-rounded">
                                                                        <span className="icon-span"><i className="bg-custom-icon calendar-time-icon-new"></i></span>
                                                                        <span className="text">
                                                                            <Moment fromNow ago>
                                                                                {convertUTCDateToLocalDate(new Date(data.created_at))}
                                                                            </Moment>
                                                                        </span>
                                                                    </div>
                                                                </div>
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
                                <div style={{ color: '#fff', fontSize: '18px' }}>
                                    No users data available
                                    </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AffillateUserListTab;
