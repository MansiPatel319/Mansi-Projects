import React, { useState } from 'react';
import { Link, useParams } from "react-router-dom";
import bannerImg from "../../assets/images/background/banner-auth-logo.png";
import siteLogoImg from "../../assets/images/white-icon-logo.svg";
import { post } from "../../network/requests";
import { getUrl } from "../../network/url";
import { toast } from 'react-toastify';
import InputComponent from "../UI/InputComponent/InputComponent";
import ButtonComponent from "../UI/ButtonComponent/ButtonComponent";
import { validateEmail } from "../../utils/functions";
toast.configure();
function ForgotPasswordComponent() {
    const { slag } = useParams();
    const [email, setemail] = useState('');
    const [emailError, setemailError] = useState('');
    const handleInpChange = (e) => {
        e.preventDefault();
        if (e.target.value === '') {
            setemailError('This field is required');
            setemail('');
        } else if (!validateEmail(e.target.value)) {
            setemail(e.target.value);
            setemailError('Enter valid email');
        } else {
            setemailError('');
            setemail(e.target.value);
        }
    }
    const isFormValid = () => {
        let isValid = true;
        if (email === '') {
            setemailError('This field is required');
            isValid = false;
        }
        return isValid;
    };
    const handleForgotPasswordFormSubmit = (e) => {
        e.preventDefault();
        const isValid = isFormValid();
        if (isValid) {
            const forgotPasswordData = {
                email: email,
            };
            const url = getUrl('forgot-password');
            post(`${url}`, forgotPasswordData)
                .then((response) => {
                    const {
                        data: { code, status, message },
                    } = response;
                    switch (code) {
                        case 200:
                            if (status === true) {
                                toast.success(message, {
                                    pauseOnHover: false,
                                    position: toast.POSITION.TOP_RIGHT,
                                });
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
                    toast.error('Something went wrong', {
                        pauseOnHover: false,
                        position: toast.POSITION.TOP_RIGHT,
                    });
                });
        }
    }
    return (
        <section className="auth-section" id="login-section">
            <div className="auth-div">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 p-0">
                            <div className="auth-root-div">
                                <div className="auth-left-side">
                                    <div className="auth-banner-div">
                                        <div className="img-thumb">
                                            <div className="logo-auth-div">
                                                <div className="logo-div">
                                                    <Link className="logo_link clearfix" to="/">
                                                        <img src={siteLogoImg} className="img-fluid logo_img main-logo" alt="logo" />
                                                        <h1 className="text-logo"> <span className="text-logo-span1">Creator</span> <span className="text-logo-span2">classes</span></h1>
                                                    </Link>
                                                </div>
                                            </div>
                                            <img src={bannerImg} className="img-fluid" alt="img" />
                                        </div>
                                    </div>
                                </div>
                                <div className="auth-right-side">
                                    <div className="auth-content-broot-div">
                                        <div className="auth-content-div">
                                            <div className="auth-top-area-div">
                                                <div className="heading-div">
                                                    <h2>Forgot Password</h2>
                                                </div>
                                                <div className="form-auth-root form-general-root">
                                                    <div className="form-root-main">
                                                        <form className="form-root common-form-div">
                                                            <div className="row mlr-8">
                                                                <div className="col-xl-12 col-lg-12 col-md-12 plr-8">
                                                                    <div className="message-info-div">
                                                                        <p>{`Enter your email address below and we'll get you back on track.`}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="col-xl-12 col-lg-12 col-md-12 plr-8">
                                                                    <div className="form-group mb-30">
                                                                        <label className="label-text" style={{ color: '#fff' }}>Email</label>
                                                                        <div className="form-group-control">
                                                                            <InputComponent
                                                                                inputType="text"
                                                                                inputPlaceholder=" "
                                                                                inputClassName="form-control"
                                                                                inpValue={email}
                                                                                inputName="email"
                                                                                onInputChange={handleInpChange}
                                                                            />
                                                                        </div>
                                                                        <div className={`invalid-feedback ${emailError !== "" ? 'd-block' : ''}`}>{emailError}</div>
                                                                    </div>
                                                                </div>

                                                                <div className="col-xl-12 col-lg-12 col-md-12 plr-8">
                                                                    <div className="general-form-btn">
                                                                        <div className="general-form-left-btn">
                                                                            <ButtonComponent
                                                                                type="submit"
                                                                                btnName="Reset Password"
                                                                                nameOfClass="btn btn-common-primary mh-btn55 btn-reset-password"
                                                                                handleOnclick={(e) => {
                                                                                    handleForgotPasswordFormSubmit(e);
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="auth-bottom-area-div">
                                                <div className="row mlr-8">
                                                    <div className="col-xl-12 col-lg-12 col-md-12 plr-8">
                                                        <div className="bottom-row">
                                                            <div className="bottom-left-bx">
                                                                {slag !== 'creator' ? <div className="link-box text-center-reg-side">
                                                                    <p>Are you an instructor? <Link to={`/${slag}/login`} className="btn btn-link btn-red-link">Log In here</Link></p>
                                                                </div>
                                                                    :
                                                                    <div className="link-box text-center-reg-side">
                                                                        <p>Are you a student? <Link to={`/${slag}/login`} className="btn btn-link btn-red-link">Log In here</Link></p>
                                                                    </div>
                                                                }
                                                            </div>
                                                            <div className="bottom-right-bx">
                                                                <div className="link-box text-center-reg-side">
                                                                    <p>Already have an account <Link to={`/${slag}/signup`} className="btn btn-link btn-red-link">Signup</Link></p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
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
    )
}

export default ForgotPasswordComponent;
