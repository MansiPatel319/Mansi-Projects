import React, { useState } from 'react';
import { Link } from "react-router-dom";
import bannerAuthLogo from '../../assets/images/icons/select-category-question-graphic.png';
import FilterComponent from '../Filter/FilterComponent';
import { useHistory } from 'react-router-dom';
import logo from "../../assets/images/white-icon-logo.svg";

function SelectCategoryQuestionComponet() {
    const history = useHistory();
    const [searchKeyword, setSearchKeyword] = useState("");
    const [errorMessage, seterrorMessage] = useState('');

    const handleSetKeywords = (keywordData) => {
        const searchKey = keywordData === "" ? "" : keywordData.toString();
        setSearchKeyword(searchKey);
        if (keywordData) {
            seterrorMessage("");
        }
    };

    const handleSkip = () => {
        setSearchKeyword("");
        let location = localStorage.getItem("location");
        let keywordData = localStorage.getItem("keywordData");
        if (typeof location !== undefined && location !== null) {
            history.push(location);
        }
        else if (typeof keywordData !== undefined && keywordData !== null) {
            localStorage.removeItem("keywordData");
            history.push("/user-home");
        }
        else {
            history.push("/user-home");
        }
    }
    const handleNext = () => {
        if (searchKeyword === undefined) {
            seterrorMessage("Please choose keyword");
        }
        else {
            let location = localStorage.getItem("location");
            if (typeof location !== undefined && location !== null) {
                history.push(location);
            }
            else {
                history.push("/user-home");
            }
        }
    }

    return (
        <React.Fragment>
            <section className="select-category-section" id="select-category-section">
                <div className="select-category-div">
                    <div className="container container-770">
                        <div className="row">
                            <div className="col-lg-12 col-md-12">

                                <div className="logo-vs-div">
                                    <Link className="logo_link clearfix" to="/">
                                        <img src={logo} className="img-fluid logo_img main-logo" alt="logo" />
                                        <h1 className="text-logo"> <span className="text-logo-span1">Creator</span> <span className="text-logo-span2">classes</span></h1>
                                    </Link>
                                </div>

                                <div className="select-category-root-div">
                                    <div className="select-category-img-root">
                                        <div className="img-thumb">
                                            <img src={bannerAuthLogo} className="img-fluid" alt="img" />
                                        </div>
                                    </div>

                                    <div className="select-category-center-side">
                                        <div className="select-category-content-div">
                                            <div className="select-category-top-area-div">
                                                <div className="skip-div">
                                                    <Link to="#" className="skip-link" onClick={handleSkip}>
                                                        <span> Skip </span>
                                                        <span className="material-icons-outlined">chevron_right</span>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="select-category-body-area-div">
                                                <div className="select-category-body-center">
                                                    <div className="heading-div">
                                                        <h2>What do you want to learn?</h2>
                                                    </div>
                                                    <FilterComponent handleSetKeywords={handleSetKeywords} />
                                                </div>
                                            </div>
                                            <div className="select-category-top-area-div">
                                                <div className="skip-div">
                                                    <Link to="#" className="skip-link" onClick={handleNext}>
                                                        <span> Next </span>
                                                        <span className="material-icons-outlined">chevron_right</span>
                                                    </Link>
                                                </div>
                                            </div>
                                            {errorMessage && <p style={{ color: 'red', textAlign: 'center', fontSize: '18px' }}>
                                                {errorMessage}
                                            </p>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}

export default SelectCategoryQuestionComponet;

