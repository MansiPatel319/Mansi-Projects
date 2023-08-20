import React from "react";
import { Link } from "react-router-dom";

import HeaderContainer from '../../../containers/Common/Header';
import FooterContainer from '../../../containers/Common/Footer';
import Spinner from "../../Spinner/Spinner";

import Character from '../../../assets/images/character/character-01.png';

import './EditAccount.scss';

class EditAccount extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            isPasswordReset: false,
            formData: {
                school_name: props.educator.educatorData['school_name'],
                professor_name:props.educator.educatorData['professor_name']
            },
            formError: {
                school_name_error: false,
                school_name_message: "",
                professor_name_error: false,
                professor_name_message: "",
            }
        }
    }

    validateForm = (data) => {
        let isFormValid = true;
        const formError = {...this.state.formError};
        if (data.school_name.trim() === '') {
            formError.school_name_error = true
            formError.school_name_message = "Please enter your school name."
            isFormValid = false;
        } else {
            formError.school_name_error = false
            formError.school_name_message = ""
        }
        if (data.professor_name.trim() === '') {
            formError.professor_name_error = true
            formError.professor_name_message = "Please enter your name."
            isFormValid = false;
        } else {
            formError.professor_name_error = false
            formError.professor_name_message = ""
        }
        this.setState({formError})
        return isFormValid;
    }

    handleChangedField = (name, value) => {
        const formError = {...this.state.formError};
        if (name === 'school_name') {
            formError[`${name}_error`] = true;
            if (value.trim() === '') {
                formError[`${name}_message`] = 'Please enter your school name.';
            } else {
                formError[`${name}_error`] = false;
                formError[`${name}_message`] = '';
            }
        } else  if (name === 'professor_name') {
            formError[`${name}_error`] = true;
            if (value.trim() === '') {
                formError[`${name}_message`] = 'Please enter your name.';
            } else {
                formError[`${name}_error`] = false;
                formError[`${name}_message`] = '';
            }
        } 
        this.setState({formError});
    }

    handleFieldChange = (event) => {
        const { name, value } = event.target;
        const formData = {...this.state.formData};
        formData[name] = value;
        this.setState({ formData }, () => {
            this.handleChangedField(name, value)
        });
    }

    submitForm = () => {
        const { formData } = this.state;
        const { history } = this.props;
        const isValid = this.validateForm(formData);
        if (isValid) {
            this.props.updateAccountDetails(formData).then(res => {
                if(res.status){
                    // this.props.addToast(res.message, { appearance: 'success', autoDismiss: true });
                    this.props.getAccountDetails();
                    history.replace('/educator');
                } else{
                    // this.props.addToast(res.message, { appearance: 'error', autoDismiss: true });
                }                
            }).catch(err => {
                console.log(err);
            });           
        }
    }

    render() {
        const { educator } = this.props;
        const { formError } = this.state;
        return (
            <div className="general-account-section zoom">
                {
                    this.props.authenticate.loading ? <Spinner /> : null
                }
                <div className="general-account-div bg-image-common2">
                    <HeaderContainer isLoggedIn={true}/>             
                    <div className="body-main-new">
                        <div className="container-main-root">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12 col-md-12">  
                                        <div className="general-account-root">
                                            <div className="full-account-div full-my-account-div">
                                                <div className="general-title">
                                                    <div className="center-text-block">
                                                        <div className="cancel-box">
                                                            <div className="icon-div">
                                                                <Link to="/educator" className="cancel-icon-button cancel-button">
                                                                    <span className="custom-icon cancel-round-icon"></span>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                        <h2>My Account</h2>
                                                    </div>
                                                </div>
                                                <div className="form-div form-my-account-div">
                                                    <div className="row row-space-between-e01">
                                                        <div className="col-lg-12 col-md-12">
                                                            <div className="form-group">
                                                                <div className="form-group-row">
                                                                    <label className="label-text" htmlFor="school-name-acc"> 
                                                                        <span className="block">School</span>
                                                                        <span className="block">Name</span>
                                                                    </label>
                                                                    <div className="input-group-box">
                                                                        <input type="text" 
                                                                            className={`form-control ${formError.school_name_error? 'error' : ''}`} 
                                                                            id="school-name-acc" 
                                                                            defaultValue ={educator.educatorData ? educator.educatorData['school_name'] : ''}
                                                                            name="school_name"
                                                                            onChange={this.handleFieldChange} />
                                                                    </div>
                                                                    {
                                                                        formError.school_name_error ?
                                                                        <div className="info-text error-text">
                                                                            <p className="error-p">{formError.school_name_message}</p>
                                                                        </div> :null
                                                                    } 
                                                                </div>
                                                            </div>
                                                        </div> 
                                                        <div className="col-lg-12 col-md-12">
                                                            <div className="form-group">
                                                                <div className="form-group-row">
                                                                    <label className="label-text" htmlFor="your-name-acc">
                                                                        <span className="block">Your</span>
                                                                        <span className="block">Name</span>
                                                                    </label>
                                                                    <div className="input-group-box">
                                                                        <input type="text" 
                                                                            className={`form-control ${formError.professor_name_error? 'error' : ''}`}  
                                                                            id="your-name-acc" 
                                                                            defaultValue={educator.educatorData ? educator.educatorData['professor_name'] : ''}
                                                                            name="professor_name"
                                                                            onChange={this.handleFieldChange} />
                                                                    </div>
                                                                    {
                                                                        formError.professor_name_error ?
                                                                        <div className="info-text error-text">
                                                                            <p className="error-p">{formError.professor_name_message}</p>
                                                                        </div> :null
                                                                    }   
                                                                </div>
                                                                <div className="info-text">
                                                                    <p className="info-p">Please use the name by which your students know you.</p>
                                                                </div>
                                                            </div>
                                                        </div>    
                                                        <div className="col-lg-12 col-md-12">
                                                            <div className="form-group">
                                                                <div className="form-group-row">
                                                                    <label className="label-text" htmlFor="email-acc">
                                                                        <span className="block">Your</span>
                                                                        <span className="block">Email</span>
                                                                    </label>
                                                                    <div className="input-group-box">
                                                                        <input type="email" 
                                                                            className="form-control disabled-02" 
                                                                            id="email-acc" 
                                                                            defaultValue={educator.educatorData ? educator.educatorData['email'] : ''} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>  
                                                        <div className="col-lg-12 col-md-12">
                                                            <div className="form-group">
                                                                <div className="form-group-row">
                                                                    <label className="label-text" htmlFor="confirm-email-acc">
                                                                        <Link to="/change-password" className="link-btn">
                                                                            <span className="block">Reset</span>
                                                                            <span className="block">Password</span>
                                                                        </Link>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>                                                  
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-lg-12 col-md-12">                                                
                                                            <div className="button-row center-button-row">
                                                                <div className="right-side-button">
                                                                    <button className="btn btn-common-outline btn-primary2 btn-account-save"
                                                                        onClick={this.submitForm}>
                                                                        Save
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="view-character-div">
                                                    <div className="row">
                                                        <div className="col-lg-12 col-md-12">
                                                            <div className="view-character-box">
                                                                <div className="center-character-thumb">
                                                                    <img src={Character} className="img-fluid img-character" alt="character" />
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
                    <FooterContainer isLoggedIn={true}/>
                </div>
            </div>
        );
    }
}

export default EditAccount;
