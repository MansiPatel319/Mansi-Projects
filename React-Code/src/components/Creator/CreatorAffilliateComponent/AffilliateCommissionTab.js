import React, { useEffect, useState } from 'react';
import { getUrl } from '../../../network/url';
import { get } from '../../../network/requests';
import { toast } from 'react-toastify';
import Loader from '../../UI/Loader/Loader';
import { tokenExpire } from "../../../services/auth";
import { useHistory } from "react-router-dom";
toast.configure();


function AffilliateCommissionTab() {
    const history = useHistory();

    const [isLoading, setIsLoading] = useState(false);
    const [userListingData, setuserListingData] = useState('');
    const getCommissionRecord = () => {
        setIsLoading(true);
        const url = getUrl('affilliate_record');
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
        getCommissionRecord();
    }, []);
    return (
        <div className="tab-pane-inner">
            {isLoading && <Loader />}
            <div className="general-list-common-div">
                <div className="general-list-panel-div">
                    <div className="row mlr-8">
                        {userListingData.length > 0 ? (

                            userListingData.map((data) => {
                                return (
                                    <div className="col-lg-6 col-md-6" key={data.id}>
                                        <div className="general-common-cre-box" >
                                            <div className="general-common-cre-row">
                                                <div className="general-video-img-cre-thumb">
                                                    <div className="img-thumb">
                                                    </div>
                                                </div>
                                                <div className="general-content-cre-div">
                                                    <div className="general-cre-content-row">
                                                        <div className="general-cre-content-top-row">
                                                            <p>
                                                                {`Plane purchased of : $${data.amount}`}
                                                            </p>
                                                            <p>{`Transfer fund : $${data.transfer_amount}`}</p>
                                                            <p>{`commission amount : $${data.admin_amount}`}</p>
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
                                    No records data available
                                    </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AffilliateCommissionTab;
