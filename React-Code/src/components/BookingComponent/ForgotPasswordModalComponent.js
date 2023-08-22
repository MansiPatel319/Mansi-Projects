import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import InputComponent from "../UI/InputComponent/InputComponent";
import { validateEmail } from "../../utils/functions";
import { toast } from 'react-toastify';
import { post } from "../../network/requests";
import { getUrl } from "../../network/url";

function ForgotPasswordModalComponent() {
    const [email, setemail] = useState('');
    const [emailError, setemailError] = useState('');

    const handleInpChange = (e) => {
        e.preventDefault();
        if (e.target.value === '') {
            setemailError('E-mail is required');
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
            setemailError('E-mail is required');
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
                                    position: toast.POSITION.TOP_LEFT,
                                });
                            }
                            break;
                        case 400:
                            toast.error(message, {
                                pauseOnHover: false,
                                position: toast.POSITION.TOP_LEFT,
                            });
                            break;
                        default:
                            toast.error(message, {
                                pauseOnHover: false,
                                position: toast.POSITION.TOP_LEFT,
                            });
                    }
                })
                .catch(() => {
                    toast.error('Something went wrong', {
                        pauseOnHover: false,
                        position: toast.POSITION.TOP_LEFT,
                    });
                });
        }
    }

    return (
        <div className="tab-pane-inner">
            <div className="form-ls-root">
                <div className="form-root-main">
                    <form className="form-root">
                        <div className="row mlr-8">
                            <div className="col-xl-12 col-lg-12 col-md-12 plr-8">
                                <div className="form-group-custom form-group-icon">
                                    <InputComponent
                                        icon="user-rounded-icon"
                                        iconName="account_circle"
                                        inputType="text"
                                        inputPlaceholder="Email"
                                        inputClassName="form-control"
                                        inpValue={email}
                                        inputName="email"
                                        onInputChange={handleInpChange}
                                    />
                                    {emailError && <div style={{ color: 'red', fontSize: '18px', margin: '5px 0px 0 10px' }}>{emailError}</div>}
                                </div>
                            </div>

                            <div className="col-xl-12 col-lg-12 col-md-12 plr-8">
                                <Link to="#" className="btn btn-common-primary btn-signup" onClick={(e) => {
                                    handleForgotPasswordFormSubmit(e);
                                }}>SEND</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ForgotPasswordModalComponent;
