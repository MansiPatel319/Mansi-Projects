import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import AddDetailsComponent from '../AddDetailsComponent/AddDetailsComponent';
import ScheduleFormComponent from '../ScheduleFormComponent/ScheduleFormComponent';
import AllocateSeatComponent from '../AllocateSeatComponent/AllocateSeatComponent';
import {
  setScheduleStreamSteps,
  setScheduleStreamStep2,
  setScheduleStreamStep3,
} from '../../../actions/creatorSchedleStreamAction';
import { setAddDetailsData } from '../../../actions/addDetails';
import { getUrl } from '../../../network/url';
import { get } from '../../../network/requests';
import Loader from '../../UI/Loader/Loader';
import { useHistory } from 'react-router-dom';
import { tokenExpire } from '../../../services/auth';
function createSeatData(id, isActiveSeat) {
  return {
    id,
    isActiveSeat,
  };
}
let seatRows = [];
let i = 1;
while (i < 92) {
  if (i === 1) {
    seatRows.push(createSeatData(i, true));
  } else {
    seatRows.push(createSeatData(i, false));
  }

  i++;
}

const ScheduleStreamTabContent = ({ getcurrentStep }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const handleAddDetailsNext = (data) => {
    dispatch(setScheduleStreamSteps(2));
    dispatch(setAddDetailsData(data));
  };
  const getStreamDetails = () => {
    setIsLoading(true);
    const url = getUrl('get_creator_streams_details');
    get(`${url}${id}/`, true)
      .then((response) => {
        const {
          data: { code, data, status, message },
        } = response;

        setIsLoading(false);
        switch (code) {
          case 200:
            if (status === true) {
              const step1Data = {
                addTitle: data.title,
                thumbnailFile: [data.thumbnail_file],
                uploadClassFile: (data.sneak_peak_file === null || data.sneak_peak_file === undefined) ? "" : [data.sneak_peak_file],
                keywords: data.stream_keywords.map(({ id }) => id),
                streamCoversData: data.stream_covers,
              };
              var date=data.stream_datetime?.replace('Z','');
              const DateAndTime = new Date(date);
            
              const step2Data = {
                day: parseInt(moment(DateAndTime).format('DD')),
                month: moment(DateAndTime).format('MM'),
                year: parseInt(moment(DateAndTime).format('YYYY')),
                time: moment(DateAndTime).format('mm'),
                tz: data.tz,
                tz_value: data.tz_value,
                fullDateAndTime: [DateAndTime],
                amount: { label: data.stream_amount, value: data.stream_amount }
              };

              const step3Data = { seat: data.total_seats };
              dispatch(setAddDetailsData(step1Data));
              dispatch(setScheduleStreamStep2(step2Data));
              dispatch(setScheduleStreamStep3(step3Data));
              setIsEditable(true);
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
  };

  useEffect(() => {
    if (id !== undefined) {
      const streamId = id;
      getStreamDetails(streamId);
    } else {
      setIsEditable(true);
      dispatch(setScheduleStreamSteps(1));
      dispatch(setAddDetailsData({ id: null }));
      dispatch(setScheduleStreamStep2({ id: null }));
      dispatch(setScheduleStreamStep3({ id: null }));
    }
  }, []);
  return (
    <div className="step-tabs-body-common">
      <div className="tab-content step-tab-content">
        {isLoading && <Loader />}
        {getcurrentStep === 1 && isEditable && (
          <div className={getcurrentStep === 1 ? 'tab-pane fade active show' : 'tab-pane fade'}>
            <AddDetailsComponent
              handleSubmitNext={handleAddDetailsNext}
              uploadedFileText={{
                text1: 'Drag and drop a sneak',
                text2: 'peek video file (optional)',
              }}
              isUploadFileRequired={false}
              isNotShowKeyword={false}
              isNotShowCover={false}
              backButtonNotShow={true}
              isClassUploadFile={false}
              uploadFileAccept=".mp4,.ogv,.webm"
              isMaterialAdd={false}
            />
          </div>
        )}
        {getcurrentStep === 2 && (
          <div className={getcurrentStep === 2 ? 'tab-pane fade active show' : 'tab-pane fade'}>
            <ScheduleFormComponent />
          </div>
        )}
        {getcurrentStep === 3 && (
          <div
            id="step-ss-tab-03"
            className={getcurrentStep === 3 ? 'tab-pane fade active show' : 'tab-pane fade'}
          >
            <AllocateSeatComponent />
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleStreamTabContent;
ScheduleStreamTabContent.propTypes = {
  getcurrentStep: PropTypes.number,
};
