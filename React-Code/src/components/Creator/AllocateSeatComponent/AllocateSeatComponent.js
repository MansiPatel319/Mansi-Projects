import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getUrl } from '../../../network/url';
import { post, put } from '../../../network/requests';
import Amplify, { Storage } from 'aws-amplify';
import {
  setScheduleStreamSteps,
  setScheduleStreamStep4,
} from '../../../actions/creatorSchedleStreamAction';
import { tokenExpire } from '../../../services/auth';
import DropDownList from '../../UI/DropDownList/DropDownList';
import CongratulationModal from '../CreatorScheduleStreamComponent/CongratulationModal';
import { setAddDetailsData } from '../../../actions/addDetails';
import Loader from '../../UI/Loader/Loader';
import awsconfig from '../../../aws-exports';
Amplify.configure(awsconfig);
toast.configure();
function createSeatData(id, isActiveSeat) {
  return {
    id,
    isActiveSeat,
  };
}

const AllocateSeatComponent = () => {
  let seatRows = [];
  let i = 1;
  while (i < 92) {
    seatRows.push(createSeatData(i, false));
    i++;
  }
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const schedulStreamStem1 = useSelector((state) => state.AddDetails.addDetailsData);
  const schedulStreamStem2 = useSelector((state) => state.CreatorScheduleStream.schedulStreamStem2);
  const schedulStreamStem4 = useSelector((state) => state.CreatorScheduleStream.schedulStreamStem3);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptionErr, setSelectedOptionErr] = useState(null);
  const [isOpenModal, setIsModal] = useState(false);
  const [totalSeatRows, setTotalSeatRows] = useState(seatRows);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);
  const [addClassFlag, setAddClassFlag] = useState(false);
  const options = totalSeatRows.map(({ id: label, id: value }) => ({
    value,
    label,
  }));
  const containerStyle = {
    width: '100%!important',
    boxSizing: 'border-box',
    display: 'inline-block',
    margin: 0,
    position: 'relative',
    verticalAlign: ' middle',
  };
  let controlStyle = {
    borderRadius: !isOpenDropDown ? '12px' : '12px 12px 0px 0px',
    padding: '5px 48px 5px 12px',
    background: '#1e1e27',
    border: '1px solid #282a33',
    minHeight: '56px',
    fontWeight: '600',
    fontSize: '16px',
    color: 'rgba(255, 255, 255, 0.75)',
    marginBottom: '0px',
  };
  const valueContainerStyle = {
    color: 'rgb(255 255 255 / 75%)',
    lineHeight: '32px',
    paddingRight: '33px',
    display: 'block',
    paddingLeft: '8px',
    overflow: 'hidden',
    textCverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  };
  const placeholderStyle = {
    color: 'rgba(255, 255, 255, 0.75)',
    fontWeight: '600',
    fontSize: '16px',
  };
  const indicatosContainerStyle = {
    borderRadius: '0 0 0 0',
    height: '44px',
    width: '44px',
    backgroundColor: 'transparent',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '1px',
    right: '1px',
  };
  const indicatorContainerStyle = {
    border: 'none',
    top: 'auto',
    left: 'auto',
    position: 'relative',
    margin: '0',
    width: 'inherit',
    height: 'inherit',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 15px 0 0',
    fontSize: '24px',
    color: '#acacac',
    fontFamily: 'Feather',
  };
  const menuStyle = {
    backgroundColor: '#1e1e27',
    margin: 0,
    padding: 0,
    borderRadius: '0px 0px 12px 12px',
  };
  const menuListStyle = {
    margin: 0,
    padding: 0,
    borderRadius: '0px 0px 12px 12px',
  };
  const optionStyle = {
    background: '#1e1e27',
    color: 'rgb(255 255 255 / 75%)',
    colorActive: '#fff',
    padding: '15px 22px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
    lineHeight: ' 25px',
    fontWeight: '500',
    fontSize: '16px',
    letterSpacing: '0.5px',

    // background:'transperent',
  };
  const dropdownIndicatorStyle = {};
  const svgStyle = {
    height: '44px',
    width: '50px',
  };
  const handleClickDropDown = () => {
    setIsOpenDropDown(!isOpenDropDown);
  };

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    const updateRow = [...totalSeatRows];
    updateRow.map((data) => {
      if (data.id <= selectedOption.value) {
        data.isActiveSeat = true;
      } else {
        data.isActiveSeat = false;
      }
      return data;
    });
    setTotalSeatRows(updateRow);
    setSelectedOptionErr('');
  };
  const isFormValidation = () => {
    let isValid = true;
    if (selectedOption === null) {
      setSelectedOptionErr('Please select number of seat');
      isValid = false;
    }
    return isValid;
  };

  const handleAllocateSeatNext = async () => {
    const isValid = isFormValidation();
    if (isValid) {
      setIsLoading(true);
      let streamSneakPeakFile;
      let streamSneakPeakFileName;
      let streamSneakPeakUrl;
      if (schedulStreamStem1.uploadClassFile !== '') {
        if (schedulStreamStem1.uploadClassFile[0].name) {
          streamSneakPeakFile = schedulStreamStem1.uploadClassFile[0];
          const extArray = streamSneakPeakFile.name.split('.');
          const ext = extArray[extArray.length - 1];
          streamSneakPeakFileName = `creator-stream-${Date.now()}.${ext}`;
          await Storage.put(`streams/${streamSneakPeakFileName}`, streamSneakPeakFile, {
            contentType: streamSneakPeakFile.type,
          });
          streamSneakPeakUrl = await Storage.get(`streams/${streamSneakPeakFileName}`);
        }
      }
      var URLsplit = streamSneakPeakUrl !== undefined && streamSneakPeakUrl.split('/');
      const splitStreamSneakPeakUrl =
        streamSneakPeakUrl !== undefined &&
        streamSneakPeakUrl.split('/').slice(3, URLsplit.length).join('/');
      setIsLoading(false);
      const formData = new FormData();
      formData.append('title', schedulStreamStem1.addTitle);
      if (schedulStreamStem1.thumbnailFile[0].name !== undefined) {
        formData.append('thumbnail_file', schedulStreamStem1.thumbnailFile[0]);
      }
      if (schedulStreamStem1.uploadClassFile !== '') {
        if (schedulStreamStem1.uploadClassFile[0].name) {
          formData.append('sneak_peak_file', splitStreamSneakPeakUrl.split('?')[0]);
          // formData.append('sneak_peak_file', schedulStreamStem1.uploadClassFile[0]);
        }
      }
      formData.append('stream_keywords', schedulStreamStem1.keywords.join(','));
      formData.append('stream_covers', schedulStreamStem1.streamCoversData.join(','));
      formData.append(
        'stream_datetime',
        moment(schedulStreamStem2.fullDateAndTime[0]).format('YYYY-MM-DD HH:mm'),
      );
      formData.append('tz', schedulStreamStem2.tz);
      formData.append('stream_amount', schedulStreamStem2.amount.value);
      formData.append('total_seats', selectedOption.value);
      const url = getUrl('creator_streams');
      setIsLoading(false);
      if (id === undefined) {
        post(`${url}`, formData, true)
          .then((res) => {
            const {
              data: { code, status, message },
            } = res;
            setIsLoading(false);
            switch (code) {
              case 201:
                if (status === true) {
                  toast.success(message, {
                    pauseOnHover: false,
                    position: toast.POSITION.TOP_RIGHT,
                  });
                  // creatChatRoom();
                  setIsModal(true);
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
          .catch((error) => {
            setIsLoading(false);
            tokenExpire(error.response, history);
          });
      } else {
        put(`${url}${id}/`, formData, true)
          .then((res) => {
            const {
              data: { code, status, message },
            } = res;
            setIsLoading(false);
            switch (code) {
              case 200:
                if (status === true) {
                  toast.success(message, {
                    pauseOnHover: false,
                    position: toast.POSITION.TOP_RIGHT,
                  });
                  dispatch(setScheduleStreamSteps(1));
                  history.push('/creator-home');
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
          .catch((error) => {
            setIsLoading(false);
            tokenExpire(error.response, history);
          });
      }
    }
  };
  const handleAllocateSeatBack = () => {
    if (selectedOption === null) {
      dispatch(setScheduleStreamSteps(2));
    } else {
      const totalSeat = { seat: selectedOption.value };
      dispatch(setScheduleStreamSteps(2));
      dispatch(setScheduleStreamStep4(totalSeat));
    }
  };
  const closeCongratulationModel = () => {
    history.push('/creator-add-a-class');
  };
  const handleClickAddClass = () => {
    setAddClassFlag(true);
  };
  useEffect(() => {
    if (isOpenModal) {
      setTimeout(() => {
        setIsModal(false);
        // setTotalSeatRows(totalSeatRows => ([...totalSeatRows, ...initalseatRows]));
        dispatch(setScheduleStreamSteps(1));
        dispatch(setAddDetailsData({ id: null }));
        if (addClassFlag) {
          history.push('/creator-add-a-class');
        } else {
          history.push('/creator-home');
        }
      }, 3000);
    }
  }, [isOpenModal, addClassFlag]);
  useEffect(() => {
    const seat = options.find((seat) => seat.value === schedulStreamStem4.seat);
    const updatedData = seat === undefined ? null : seat;
    setSelectedOption(seat === undefined ? null : seat);

    const updateRow = totalSeatRows;
    updateRow.map((data) => {
      if (updatedData !== null) {
        if (data.id <= seat.value) {
          data.isActiveSeat = true;
        } else {
          data.isActiveSeat = false;
        }
      } else {
        data.isActiveSeat = false;
      }

      return data;
    });
    setTotalSeatRows(updateRow);
  }, []);
  return (
    <div className="step-tab-pane-inner">
      {isOpenModal && (
        <CongratulationModal
          closeModel={closeCongratulationModel}
          handleClickAddClass={handleClickAddClass}
        />
      )}
      {isLoading && <Loader />}
      <div className="tab-form-div">
        <div className="tab-form-body">
          <div className="center-area-div">
            <div className="container container-750">
              <div className="common-form-div common-form-updated-div allocate-seats-form-div">
                <div className="row">
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group select2-form-group select2-new-group select2-new-group2 mb-10">
                      <label htmlFor="">Enter Number of Seats</label>
                      <div className="input-control-row">
                        <div className="select-box select-custom2 select-custom2-general round-12 mr-10">
                          <DropDownList
                            value={selectedOption}
                            onChange={handleChange}
                            options={options}
                            placeholder="Select Seat"
                            containerStyle={containerStyle}
                            controlStyle={controlStyle}
                            valueContainerStyle={valueContainerStyle}
                            placeholderStyle={placeholderStyle}
                            indicatosContainerStyle={indicatosContainerStyle}
                            indicatorContainerStyle={indicatorContainerStyle}
                            menuStyle={menuStyle}
                            optionStyle={optionStyle}
                            menuListStyle={menuListStyle}
                            handleClick={handleClickDropDown}
                            dropdownIndicatorStyle={dropdownIndicatorStyle}
                            svgStyle={svgStyle}
                            singleValueStyle={placeholderStyle}
                            isSearchable={false}
                          />
                        </div>
                        {selectedOptionErr !== '' ? (
                          <div
                            style={{ color: 'red', fontSize: '18px', margin: '10px 0px 0px 10px' }}
                          >
                            {selectedOptionErr}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="seat-box-root">
                      <div className="seat-box-inner">
                        {totalSeatRows.length > 0 && (
                          <div className="seat-box-list" id="seat-box-list">
                            {totalSeatRows.map((seat) => {
                              return (
                                <div
                                  className={
                                    seat.isActiveSeat ? 'seat-icon-box active' : 'seat-icon-box'
                                  }
                                  id="seat-icon-box"
                                  key={seat.id}
                                >
                                  <Link to="#" className="seat-icon-link">
                                    <i className="bg-custom-icon seat-icon"></i>
                                  </Link>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="tab-form-bottom mt-40">
          <div className="tab-cre-btn-div general-btn-div-row">
            <div className="general-btn-div-right">
              <Link
                to="#"
                className="btn btn-primary-outline btn-primary-color-02 mh-btn55 btn-black-back mr-24"
                onClick={handleAllocateSeatBack}
              >
                Back
              </Link>
              <Link
                to="#"
                className="btn btn-common-primary mh-btn55 btn-done"
                onClick={handleAllocateSeatNext}
              >
                Done
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllocateSeatComponent;
