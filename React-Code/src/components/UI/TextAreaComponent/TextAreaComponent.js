import React from 'react';
import PropTypes from 'prop-types';

const TextAreaComponent = (props) => {
    return (
        <div className="text-area-div">
            <div className="form-textarea-div">
                <div className="form-group">
                    <textarea
                        className="form-control form-textarea"
                        rows={props.textAareaRows}
                        placeholder={props.textAreaPlaceholder}
                        cols={props.textAreaCols}
                        autoFocus={props.textAreaAutoFocus}
                        disabled={props.textAreaDisabled}
                        form={props.textAreaForm}
                        value={props.inpValue}
                        maxLength={props.textAreaMaxLength}
                        name={props.textName}
                        readOnly={props.textAreaReadOnly}
                        required={props.textAreaRequired}
                        onChange={props.handleOnChange}
                        onInput={props.handleOnInput}
                        onClick={props.handleOnClick}
                        onBlur={props.handleOnBlur}
                    ></textarea>
                </div>
            </div>
        </div>
    )
}

export default TextAreaComponent;

TextAreaComponent.propTypes = {
    textAreaPlaceholder: PropTypes.string,
    inpValue: PropTypes.string,
    textAreaCols: PropTypes.number,
    textAareaRows: PropTypes.string,
    textAreaAutoFocus: PropTypes.bool,
    textAreaDisabled: PropTypes.bool,
    textAreaForm: PropTypes.string,
    textAreaMaxLength: PropTypes.number,
    textName: PropTypes.string,
    textAreaReadOnly: PropTypes.bool,
    textAreaRequired: PropTypes.bool,
    handleOnChange: PropTypes.func,
    handleOnInput: PropTypes.func,
    handleOnClick: PropTypes.func,
    handleOnBlur: PropTypes.func
}