import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";
import bannerImg from "../../assets/images/background/banner-auth-logo.png";
import siteLogoImg from "../../assets/images/white-icon-logo.svg";
import { post } from "../../network/requests";
import { getUrl } from "../../network/url";
import { toast } from 'react-toastify';
import InputComponent from "../UI/InputComponent/InputComponent";
toast.configure();

function ResetPassword() {
    const { uuid } = useParams();
    const history = useHistory();
    const [isPwdVisible, setPwdVisible] = useState(false);
    const [isConfirmPwdVisible, setConfirmPwdVisible] = useState(false);
    const [userPassword, setPassword] = useState('');
    const [userPasswordErr, setPasswordErr] = useState('');
    const [userConfirmPwd, setConfirmPwd] = useState('');
    const [userConfirmPwdErr, setConfirmPwdErr] = useState('');
    const handlePasswordVisiblity = () => {
        setPwdVisible(!isPwdVisible);
    };
    const handleConfirmPasswordVisiblity = () => {
        setConfirmPwdVisible(!isConfirmPwdVisible);
    };

    const handleInpChange = (e) => {
        switch (e.target.name) {
            case 'userPassword':
                if (e.target.value === '') {
                    setPasswordErr('This field is required');
                    setPassword('');
                }
                else {
                    setPasswordErr('');
                    setPassword(e.target.value);
                }
                break;
            case 'userConfirmPwd':
                setConfirmPwd(e.target.value);

                if (e.target.value === '') {
                    setConfirmPwdErr('This field is required');
                    setConfirmPwd('');
                }
                if (userPassword !== '' && e.target.value !== '') {
                    if (userPassword !== e.target.value) {
                        setConfirmPwdErr("Passwords don't match");
                    }
                    else{
                    setConfirmPwdErr('');
                    }
                }
                else {
                    setConfirmPwdErr('');
                    // setConfirmPwd(e.target.value);
                }
                break;
            default:
                break;
        }
    };

    const isFormValidation = () => {
        setPasswordErr('')
        setConfirmPwd('')
        const passwordRegx = new RegExp(/^[0-9]+$/);
        let isValid = true;
        if (userPassword === '') {
            setPasswordErr('This field is required');
            isValid = false;
            return
        }
        if (userConfirmPwd === '') {
            setConfirmPwdErr('This field is required');
            isValid = false;
            return
        }
        if (userPassword !== '' && userPassword.length < 8) {
            isValid = false;
            setPasswordErr('The password is too short it must be 8 character long ! ');
            return
        } if (passwordRegx.test(userPassword)) {
            isValid = false;
            setPasswordErr('The password is entirely numeric !');
            return
        }
        if (userConfirmPwd !== '' && userConfirmPwd.length < 8) {
            isValid = false;
            setConfirmPwdErr('The password is too short it must be 8 character long ! ');
            return
        } if (passwordRegx.test(userPassword)) {
            isValid = false;
            setConfirmPwdErr('The password is entirely numeric !');
            return
        }
        if (userPassword !== '' && userConfirmPwd !== '') {
            if (userPassword !== userConfirmPwd) {
                isValid = false;
                setConfirmPwdErr("Passwords don't match");
                return
            }
        }
        return isValid;
    };

    const handleResetPasswordForm = (e) => {
        e.preventDefault();
        const isValid = isFormValidation();
        if (isValid) {
            const resetPAsswordData = {
                token: uuid,
                password: userPassword
            }
            const url = getUrl('reset-password');
            post(`${url}`, resetPAsswordData)
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
                                history.push("/user/login");
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
                                                                    <div className="form-group mb-30">
                                                                        <label className="label-text" style={{ color: '#fff' }}>Password</label>
                                                                        <div className="form-group-control pass-form-group-control">
                                                                            <InputComponent
                                                                                inputType={isPwdVisible ? 'html' : 'password'}
                                                                                inputID="password02"
                                                                                inputClassName="form-control"
                                                                                inpValue={userPassword}
                                                                                onInputChange={handleInpChange}
                                                                                inputName="userPassword"
                                                                            />
                                                                            <span className="icon-group pass-icon-group">
                                                                                <button
                                                                                    type="button"
                                                                                    id="show_password02"
                                                                                    name="show_password"
                                                                                    className="pass-hide password-view-click"
                                                                                    onClick={handlePasswordVisiblity}
                                                                                >
                                                                                    <span
                                                                                        className={`pass-custom-icon material-icons ${isPwdVisible ? 'password-hide' : 'password-view'
                                                                                            }`}
                                                                                    >
                                                                                        {`${isPwdVisible ? 'visibility_off' : 'visibility'}`}
                                                                                    </span>
                                                                                </button>
                                                                            </span>
                                                                        </div>
                                                                        <div className={`invalid-feedback ${userPasswordErr !== '' ? 'd-block' : ''}`}>
                                                                            {userPasswordErr}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-xl-12 col-lg-12 col-md-12 plr-8">
                                                                    <div className="form-group mb-30">
                                                                        <label className="label-text" style={{ color: '#fff' }}>Confirm Password</label>
                                                                        <div className="form-group-control pass-form-group-control">
                                                                            <InputComponent
                                                                                inputType={isConfirmPwdVisible ? 'html' : 'password'}
                                                                                inputID="password03"
                                                                                inputClassName="form-control"
                                                                                inpValue={userConfirmPwd}
                                                                                onInputChange={handleInpChange}
                                                                                inputName="userConfirmPwd"
                                                                            />
                                                                            <span className="icon-group pass-icon-group">
                                                                                <button
                                                                                    type="button"
                                                                                    id="show_password03"
                                                                                    name="show_password"
                                                                                    className="pass-hide password-view-click"
                                                                                    onClick={handleConfirmPasswordVisiblity}
                                                                                >
                                                                                    <span
                                                                                        className={`pass-custom-icon material-icons ${isConfirmPwdVisible ? 'password-hide' : 'password-view'
                                                                                            }`}
                                                                                    >
                                                                                        {`${isConfirmPwdVisible ? 'visibility_off' : 'visibility'}`}
                                                                                    </span>
                                                                                </button>
                                                                            </span>

                                                                        </div>
                                                                        <div className={`"invalid-feedback ${userConfirmPwdErr !== '' ? 'invalid-feedback  d-block' : ''}`}>
                                                                            {userConfirmPwdErr}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-xl-12 col-lg-12 col-md-12 plr-8">
                                                                    <div className="general-form-btn">
                                                                        <div className="general-form-left-btn">
                                                                            <button type="button" className="btn btn-common-primary mh-btn55 btn-login" onClick={(e) => {
                                                                                handleResetPasswordForm(e);
                                                                            }}>Reset Password</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </form>
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

export default ResetPassword
