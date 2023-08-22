import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  setScheduleStreamSteps,
  setScheduleStreamStep3,
} from '../../../actions/creatorSchedleStreamAction';
const AddAmountComponent = () => {
  const dispatch = useDispatch();
  const schedulStreamStem3 = useSelector((state) => state.CreatorScheduleStream.schedulStreamStem3);
  const amountList = [
    { id: 1, amount: 50 },
    { id: 2, amount: 60 },
    { id: 3, amount: 70 },
  ];
  const [amount, setAmount] = useState(0);
  const [amountErr, setAmountErr] = useState('');
  const handlechangeAmount = (e, amountValue) => {
    e.preventDefault();
    setAmount(amountValue);
  };
  const isFormValidation = () => {
    let isValid = true;
    if (amount === 0) {
      setAmountErr('Please select amount');
      isValid = false;
    }
    return isValid;
  };
  const handleAddAmountNext = () => {
    const isValid = isFormValidation();
    if (isValid) {
      const step3Data = { amount: amount };
      dispatch(setScheduleStreamSteps(4));
      dispatch(setScheduleStreamStep3(step3Data));
    }
  };
  const handleAddAmountBack = () => {
    dispatch(setScheduleStreamSteps(2));
  };
  useEffect(() => {
    if (
      (schedulStreamStem3.amount !== '' || schedulStreamStem3.amount !== null,
        schedulStreamStem3.amount !== undefined)
    ) {
      setAmount(schedulStreamStem3.amount);
    }
  }, []);
  return (
    <div className="step-tab-pane-inner">
      <div className="tab-form-div">
        <div className="tab-form-body">
          <div className="center-area-div">
            <div className="container container-800 plr-8 plr-xs-0">
              <div className="common-form-div common-form-updated-div">
                <div className="row mlr-8">
                  <div className="col-lg-12 col-md-12 plr-8">
                    <div className="center-amlist">
                      <div className="form-group select-form-group-amlist mb-30">
                        <label className="font-center">
                          <span className="text">Select Amount</span>
                        </label>
                        <div className="category-control-amlist-row">
                          <div className="category-amlist-inner">
                            {amountList.length > 0 && (
                              <ul className="category-amlist-list-ul">
                                {amountList.map((data) => {
                                  return (
                                    <li
                                      className={data.amount === amount ? 'active ' : ''}
                                      key={data.id}
                                      onClick={(e) => handlechangeAmount(e, data.amount)}
                                    >
                                      <Link to="#" className="amlist-link">
                                        ${data.amount}
                                      </Link>
                                    </li>
                                  );
                                })}
                              </ul>
                            )}
                          </div>
                          {amountErr !== '' ? (
                            <div style={{ color: 'red', fontSize: '18px' }}>{amountErr}</div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="tab-form-bottom">
          <div className="tab-cre-btn-div">
            <Link
              to="#"
              className="btn btn-common-black btn-black-back mr-20"
              onClick={handleAddAmountBack}
            >
              Back
            </Link>
            <Link to="#" className="btn btn-common-white btn-next" onClick={handleAddAmountNext}>
              Next
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAmountComponent;
