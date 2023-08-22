import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { get, post, remove } from '../../../network/requests';
import { getUrl } from '../../../network/url';
import { tokenExpire } from '../../../services/auth';

import userProfileImg from "../../../assets/images/profile.png";
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
toast.configure();

function CategorySecondComponent({ keyWord, searchKey }) {
    const [classData, setclassData] = useState('');
    // const [isPlanPurchased, setisPlanPurchased] = useState(false);
    const [flag, setflag] = useState(0);
    const history = useHistory();
    const getClasses = () => {
        const url = getUrl('getSearchClassesDetails');
        let inputData = searchKey === undefined ? "" : searchKey;
        get(`${url}?search=${inputData}&class_keyword=${keyWord.id}`, true)
            .then((response) => {
                const {
                    data: { code, data, status, message },
                } = response;
                switch (code) {
                    case 200:
                        if (status === true) {
                            setclassData(data);
                        }
                        break;
                    case 400:
                        toast.error(message);
                        break;
                    default:
                        toast.error(message);
                }
            })
            .catch((error) => {
                tokenExpire(error.response, history);
            });
    };

    const handleFavButtonClick = (classId, isClassFav) => {
        // if (isPlanPurchased) {
            if (isClassFav) {
                const url = getUrl("removeFavClass");
                return remove(`${url}${classId}/`, true)
                    .then((response) => {
                        const {
                            data: { code, status, message },
                        } = response;
                        switch (code) {
                            case 200:
                                if (status === true) {
                                    getClasses();
                                    setflag(flag + 1);
                                    toast.success(message);
                                }
                                break;
                            case 400:
                                toast.error(message);
                                break;
                            default:
                                toast.error(message);
                        }
                    })
                    .catch((error) => {
                        tokenExpire(error.response, history);
                    });
            }
            else {
                const url = getUrl("postFavClass");
                return post(`${url}${classId}/`, {}, true)
                    .then((response) => {
                        const {
                            data: { code, status, message },
                        } = response;
                        switch (code) {
                            case 200:
                                if (status === true) {
                                    getClasses();
                                    setflag(flag + 1);
                                    toast.success(message);
                                }
                                break;
                            case 400:
                                toast.error(message);
                                break;
                            default:
                                toast.error(message);
                        }
                    })
                    .catch((error) => {
                        tokenExpire(error.response, history);
                    });
            }
        // }
        // else {
        //     history.push('/flexible-plans');
        // }
    }

    // const getPurchasedPlanDetails = () => {
    //     const url = getUrl('user-plan');
    //     get(url, true)
    //         .then((response) => {
    //             const {
    //                 data: { code, status, message },
    //             } = response;
    //             switch (code) {
    //                 case 200:
    //                     if (status === true) {
    //                         setisPlanPurchased(true);
    //                     }
    //                     break;
    //                 case 400:
    //                     if (message === "You dont have any active plan!") {
    //                         setisPlanPurchased(false);
    //                     }
    //                     break;
    //                 default:
    //                     toast.error(message, {
    //                         pauseOnHover: false,
    //                         position: toast.POSITION.TOP_RIGHT,
    //                     });
    //             }
    //         })
    //         .catch(() => {
    //             // toast.error('Something went wrong', {
    //             //     pauseOnHover: false,
    //             //     position: toast.POSITION.TOP_RIGHT,
    //             // });
    //         });
    // };

    useEffect(() => {
        getClasses();
        // getPurchasedPlanDetails();
    }, [flag]);
    return (
        <div className="our-card-classes-div our-cc-div2 bordertop1">

            <div className="common-heading-div">
                <div className="common-heading-inner-div">
                    <div className="common-heading-title-row">
                        <div className="common-heading-title-left">
                            <h2>{keyWord.keyword}</h2>
                        </div>
                        <div className="common-heading-title-right">
                            <Link to={`/user-feed-search/${keyWord.keyword}`} className="btn btn-primary-outline btn-primary-outline-n45">
                                <span className="text">View all</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="common-card-class-feed-div">
                <div className="row">
                    {classData && classData.length > 0 && classData.slice(0, 1).map((data, i) => {
                        let name=data.creator_name?.split(" ");
                        return (
                            <div className="col-lg-6 col-md-12 left-big-img-order order-md-2" key={i}>
                                <div className="common-feed-card-slider-bx-big">
                                    <div className="our-video-img-thumb">
                                        <div className="img-thumb"> <img src={data.thumb_image} className="img-fluid img-responsive" alt="image" /> </div>
                                        <div className="like-box-abs"> <button className={`like-button ${data.is_favourite ? 'active' : ''}`} onClick={() => handleFavButtonClick(data.id, data.is_favourite)}>
                                            <span className="like-icon "> </span>
                                        </button> </div>
                                        {/* <div className="time-box-abs"> <button className="time-button"> 13:47 </button> </div> */}
                                    </div>
                                    <div className="our-content-div">
                                        <div className="our-content-row">
                                            <div className="our-content-full">
                                                <h4><Link to={`/user-feed-search/${keyWord.keyword}`}>{data.title}</Link> </h4>
                                            </div>
                                        </div>

                                        <div className="our-content-bottom-row">
                                            <div className="our-content-bottom-left">
                                                <div className="our-content-left">
                                                    <div className="thumb-img">
                                                        <Link to={`/user-feed-search/${keyWord.keyword}`} className="link">
                                                            <img
                                                                src={
                                                                    data.thumb_image_creator_small === null ||
                                                                        data.thumb_image_creator_small ===
                                                                        "https://myapp-user-uploads154822-dev.s3.amazonaws.com/sample.jpg"
                                                                        ? userProfileImg
                                                                        : data.thumb_image_creator_small
                                                                }
                                                                className="img-fluid user"
                                                                alt="user"
                                                            />
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="our-content-right">
                                                    <h3><Link to={`/user-feed-search/${keyWord.keyword}`} className="link"><span className="text-span">{name[0]}</span> <span className="icon-rounded-span check-icon-rounded"><span className="material-icons">done</span></span> </Link></h3>
                                                    <p>{data.classListData}</p>
                                                </div>
                                            </div>
                                            <div className="our-content-bottom-right">
                                                <h4><span className="material-icons">schedule</span> <span className="txt">
                                                    
                                                     <span>{moment(data.created_at.replace("Z","")).format('HH:mm') } </span>
                                                </span>  </h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    <div className="col-lg-6 col-md-12 right-small-img-order order-md-1">
                        {classData && classData.length > 0 && classData.slice(1, 4).map((data, i) => {
                            let name=data.creator_name?.split(" ");
                            return (
                                <div className="common-feed-card-slider-bx-half-small" key={i}>
                                    <div className="our-video-img-thumb">
                                        <div className="img-thumb"> <img src={data.thumb_image} className="img-fluid img-responsive" alt="image" /> </div>
                                        <div className="like-box-abs"> <button className={`like-button ${data.is_favourite ? 'active' : ''}`} onClick={() => handleFavButtonClick(data.id, data.is_favourite)}>
                                            <span className="like-icon "> </span>
                                        </button> </div>
                                        {/* <div className="time-box-abs"> <button className="time-button"> 13:47 </button> </div> */}
                                    </div>
                                    <div className="our-content-div">
                                        <div className="our-content-row">
                                            <div className="our-content-full">
                                                <h4><Link to={`/user-feed-search/${keyWord.keyword}`}>{data.title}</Link> </h4>
                                            </div>

                                            <div className="our-content-left">
                                                <div className="thumb-img">
                                                    <Link to={`/user-feed-search/${keyWord.keyword}`} className="link">
                                                        <img
                                                            src={
                                                                data.thumb_image_creator_small === null ||
                                                                    data.thumb_image_creator_small ===
                                                                    "https://myapp-user-uploads154822-dev.s3.amazonaws.com/sample.jpg"
                                                                    ? userProfileImg
                                                                    : data.thumb_image_creator_small
                                                            }
                                                            className="img-fluid user"
                                                            alt="user"
                                                        />
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="our-content-right">
                                                <h3><Link to={`/user-feed-search/${keyWord.keyword}`} className="link"> <span className="text-span"> <span className="text-span">{name[0]}</span></span> <span className="icon-rounded-span check-icon-rounded"><span className="material-icons">done</span></span> </Link></h3>
                                                <p>{data.classListData}</p>
                                            </div>
                                        </div>

                                        <div className="our-content-bottom-row">
                                            <div className="our-content-bottom-right">
                                                <h4><span className="material-icons">schedule</span> <span className="txt">
                                                   
                                                     <span>{moment(data.created_at.replace("Z","")).format('HH:mm') } </span>
                                                     
                                                </span>  </h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

            </div>

        </div>

    )
}

export default CategorySecondComponent;

CategorySecondComponent.propTypes = {
    keyWord: PropTypes.any,
    searchKey: PropTypes.any
}
