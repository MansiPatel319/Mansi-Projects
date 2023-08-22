import React, { useEffect } from 'react';
import "../assets/css/bootstrap.min.css";
import "../assets/css/select-category-question.css";
import "../assets/css/style.css";
import "../assets/css/all.min.css";
import "../assets/css/feather.min.css";
import SelectCategoryQuestionComponet from '../components/SelectCategoryQuestionComponet/SelectCategoryQuestionComponet';
import { useHistory } from 'react-router-dom';

function SelectCategoryQuestion() {
    const history = useHistory();
    useEffect(() => {
        const checkCreator = localStorage.getItem('is_creator');
        if (checkCreator === 'true') {
            history.push('/creator-home');
        } else {
            history.push('/select-category-question');
        }
    }, []);
    return (
        <React.Fragment>
            <div id="wrapper" className="wrapper select-category-wrapper">
                <div className="main-middle-area pt-custom-0">
                    <SelectCategoryQuestionComponet />
                </div>
            </div>
        </React.Fragment>
    )
}

export default SelectCategoryQuestion
