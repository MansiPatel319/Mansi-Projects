/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import coursPlanImg from '../../assets/images/plan-background-update2x.png';
import { get } from "../../network/requests";
import { getUrl } from "../../network/url";
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

function ExclusiveCoursePopUpMpdalComponent({handleModalClose}) {
    const history = useHistory();
    const [userPlan, setuserPlan] = useState('');


    const getUserPlans = () => {
        const url = getUrl('get_all_user_plans');
        get(url, false)
            .then((response) => {
                const {
                    data: { code, data, status, message },
                } = response;
                switch (code) {
                    case 200:
                        if (status === true) {
                            setuserPlan(data);
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
            .catch(() => {
                // toast.error('Something went wrong', {
                //     pauseOnHover: false,
                //     position: toast.POSITION.TOP_RIGHT,
                // });
            });
    };

    const handleClick = (activePlanDetails) => {
        localStorage.setItem("activePlaneDetails", JSON.stringify(activePlanDetails));
        localStorage.setItem("backButtonPath", location.pathname)
        history.push('/user-payment-details')
    }  
    useEffect(() => {
        getUserPlans();
    }, []);
    return (
        <div className="modal center center-common-modal fade show" id="general-book-course-modal" tabIndex="-1" role="dialog" style={{ paddingRight: '16px', display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)', overflowY: 'scroll' }}>
            <div className="modal-dialog modal-dialog-centered modal-dialog-lg" role="document">
                <div className="modal-content">

                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleModalClose}><span aria-hidden="true"> <i className="fe fe-x close-icon-x"></i> </span></button>
                    </div>

                    <div className="modal-body">

                        <div className="general-pop-root general-book-course-root">
                            <section className="general-book-course-pop-section" id="general-book-course-section">
                                <div className="container container-970">
                                    <div className="row">
                                        {userPlan && userPlan.length > 0 && userPlan.slice(0, 1).map((planData) => {
                                            return (
                                                <div className="col-lg-12 col-md-12" key={planData.id}>
                                                    <div className="general-book-course-div">
                                                        <div className="container-general-center">

                                                            <div className="heading-div">
                                                                <div className="heading-inner-div">
                                                                    <h1>
                                                                        <span className="block">Our Pricing Plan </span>
                                                                    </h1>
                                                                      <p className="new-subtitle">Browse our annual subscription plan</p>
                                                                </div>
                                                            </div>

                                                            <div className="general-bk-co-details-div">
                                                                <div className="general-bk-co-details-inner">

                                                                    <div className="bk-co-card-root">
                                                                        <div className="our-pricing-plan-card our-pricing-plan-full-card">
                                                                            <div className="flex-plan-card-inner">

                                                                                <div className="flex-plan-card-inner-left-div">
                                                                                    <div className="img-div">
                                                                                        <img src={coursPlanImg} className="img-fluid" alt="img" />
                                                                                    </div>
                                                                                </div>

                                                                                <div className="flex-plan-card-inner-right-div">
                                                                                    <div className="check-icon-group">
                                                                                        <span className="check-span-rounded"><i className="bg-custom-icon custom-check-icon"></i></span>
                                                                                    </div>

                                                                                    <div className="min-details-div">
                                                                                        <div className="fp-title-top">
                                                                                            {/* <div className="fp-title-top-left">
                                                                                                <span className="label-span active">{planData.name}</span>
                                                                                            </div> */}
                                                                                            <div className="fp-title-top-right">
                                                                                                <h3>${(planData.plan_amount)} <span className="text-small">/Year</span></h3>
                                                                                                <p>{`$${planData.plan_amount}`} Billed Yearly</p>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="desc-inner-box">
                                                                                            <ul className="check-list-ul">
                                                                                                {planData.plan_covers.length > 0 &&
                                                                                                    planData.plan_covers.map((data, index) => {
                                                                                                        return <li key={index}>{data}</li>;
                                                                                                    })}
                                                                                            </ul>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>

                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="bk-co-card-bottom-root">
                                                                        <div className="plan-btn">
                                                                            <button className="btn btn-primary-outline btn-primary-outline-big min-height-55 btn-get-started-plan active" onClick={() => handleClick(planData)}>Buy Now</button>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>

                                            );
                                        })}
                                    </div>

                                </div>
                            </section>
                        </div>

                    </div>

                </div>
            </div>
        </div >
    )
}

export default ExclusiveCoursePopUpMpdalComponent;

// ExclusiveCoursePopUpMpdalComponent.propTypes = {
//     handleModalClose: PropTypes.func,
// };