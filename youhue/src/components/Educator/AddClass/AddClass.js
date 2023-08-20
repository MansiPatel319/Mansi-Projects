import React from "react";
import { Link } from "react-router-dom";

import HeaderContainer from '../../../containers/Common/Header';
import FooterContainer from '../../../containers/Common/Footer';
import Spinner from "../../Spinner/Spinner";

import Character from '../../../assets/images/character/character-01.png';

import './AddClass.scss';
import InputComponent from "../../UI/InputComponent";

class AddClass extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            formData: {
                name: ''
            },
            formError: {
                name_error: false,
                name_message: ""
            }
        }
    }

    validateForm = (data) => {
        let isFormValid = true;
        const formError = {...this.state.formError};
        if (data.name.trim() === '') {
            formError.name_error = true
            formError.name_message = "Please enter class name!"
            isFormValid = false;
        } else {
            formError.name_error = false
            formError.name_message = ""
        }
        this.setState({formError})
        return isFormValid;
    }

    handleChangedField = (name, value) => {
        const formError = {...this.state.formError};
        if (name === 'name') {
            formError[`${name}_error`] = true;
            if (value.trim() === '') {
                formError[`${name}_message`] = 'Please enter class name!';
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
            const params = new FormData();
            params.append('name', formData.name);
            this.props.addClass(params).then(async res => {
                if(res.status){
                    // this.props.addToast(res.message, { appearance: 'success', autoDismiss: true });
                    await this.props.getAllClass();
                    await this.props.getClassDetails(res.data.id);
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
                                                        <h2>Add Class</h2>
                                                    </div>
                                                </div>
                                                <div className="form-div form-my-account-div">
                                                    <div className="row row-space-between-e01">
                                                        <div className="col-lg-12 col-md-12">
                                                            <div className="form-group">
                                                                <div className="form-group-row">
                                                                    <label className="label-text" htmlFor="class-name-acc"> 
                                                                        <span className="block">Class</span>
                                                                        <span className="block">Name</span>
                                                                    </label>
                                                                    <div className="input-group-box">
                                                                        <InputComponent inputType="text" 
                                                                            inputClassName={`form-control ${formError.name_error? 'error' : ''}`} 
                                                                            inputID="class-name-acc" 
                                                                            inputName="name"
                                                                            onInputChange={this.handleFieldChange} />
                                                                    </div>
                                                                    {
                                                                        formError.name_error ?
                                                                        <div className="info-text error-text">
                                                                            <p className="error-p">{formError.name_message}</p>
                                                                        </div> :null
                                                                    } 
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
                                                                    <button className="btn btn-common-outline btn-primary3 btn-primary3-fill btn-cancel-class" id="btn-cancel-class">Cancel</button>
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

export default AddClass;
