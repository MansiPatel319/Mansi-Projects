import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Amplify, { Storage } from 'aws-amplify';
import { getUrl } from '../../../network/url';
import { post, put, get } from '../../../network/requests';
import AddDetailsComponent from '../AddDetailsComponent/AddDetailsComponent';
import Loader from '../../UI/Loader/Loader';
import { setAddDetailsData } from '../../../actions/addDetails';
import { useDispatch } from 'react-redux';
import { tokenExpire } from '../../../services/auth';
import awsconfig from '../../../aws-exports';
Amplify.configure(awsconfig);
toast.configure();
const AddClassTabContent = ({ getcurrentStep }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditFlag, setIsEditFlag] = useState('');

  const handleAddDetailsNext = async (data) => {
    setIsLoading(true);
    let classFile;
    let classFileName;
    let classUrl;
    let URLsplit;
    let splitClassUrl;
    if (data.uploadClassFile[0].name) {
      classFile = data.uploadClassFile[0];
    
      const extArray = classFile.name.split('.');
      const ext = extArray[extArray.length - 1];
      classFileName = `creator-class-${Date.now()}.${ext}`;
      await Storage.put(`classes/${classFileName}`, classFile, {
        contentType: classFile.type,
      });
      classUrl = await Storage.get(`classes/${classFileName}`);
       URLsplit = classUrl.split('/');
       splitClassUrl = classUrl.split('/').slice(3, URLsplit.length).join('/');
    }
 
 
    setIsLoading(false);
    if (id === undefined || id === null) {
      setIsLoading(true);
      const url = getUrl('creator_class');
      const formData = new FormData();
      formData.append('title', data.addTitle);
      formData.append('thumbnail_file', data.thumbnailFile[0]);
      formData.append('class_file', splitClassUrl.split('?')[0]);
      formData.append('class_keywords', data.keywords.join(' , '));
      formData.append('class_covers', data.streamCoversData.join(' , '));
      formData.append('class_description', data.classDescription);
      post(`${url}/`, formData, true)
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
                history.push('/creator-my-uploads/classes');
                dispatch(setAddDetailsData({ id: null }));
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
      setIsLoading(true);
      const url = getUrl('creator_class');
      const formData = new FormData();
      formData.append('title', data.addTitle);
      if (data.thumbnailFile[0].name) {
        formData.append('thumbnail_file', data.thumbnailFile[0]);
      }
      if (data.uploadClassFile[0].name) {
        formData.append('class_file', splitClassUrl.split('?')[0]);
      }
      // if (data.uploadClassFile[0].name) {
      //   formData.append('promo_file', data.uploadClassFile[0]);
      // }
      formData.append('class_keywords', data.keywords.join(' , '));
      formData.append('class_covers', data.streamCoversData.join(' , '));
      formData.append('class_description', data.classDescription);
      put(`${url}/${id}/`, formData, true)
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
                history.push('/creator-my-uploads/classes');
                dispatch(setAddDetailsData({ id: null }));
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
  };
  const getClassDetails = (classId) => {
    setIsLoading(true);
    const url = getUrl('get_creator_class_details');
    get(`${url}${classId}/`, true)
      .then((response) => {
        const {
          data: { code, data, status, message },
        } = response;
        setIsLoading(false);
        switch (code) {
          case 200:
            if (status === true) {
              const editData = {
                addTitle: data.title,
                thumbnailFile: [data.thumbnail_file],
                uploadClassFile:
                  data.class_file === null || data.class_file === undefined
                    ? ''
                    : [data.class_file],
                // uploadClassFile: (data.promo_file === null || data.promo_file === undefined) ? "" : [data.promo_file],
                keywords: data.class_keywords.map(({ id }) => id),
                streamCoversData: data.class_covers,
                classDescription: data.class_description,
              };
              dispatch(setAddDetailsData(editData));
              setIsEditFlag(true);
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
  const handleGoBack = () => {
    history.go(-2);
  };
  useEffect(() => {
    if (id !== undefined) {
      const classId = id;
      getClassDetails(classId);
    } else {
      setIsEditFlag(true);
      dispatch(setAddDetailsData({ id: null }));
    }
  }, []);
  return (
    <>
      {isLoading && <Loader />}
      {getcurrentStep === 1 && isEditFlag && (
        <div
          id="step-ss-tab-01"
          className={getcurrentStep === 1 ? 'tab-pane fade active show' : 'tab-pane fade'}
        >
          <AddDetailsComponent
            // editData={editData}
            handleSubmitNext={handleAddDetailsNext}
            isNotShowKeyword={false}
            isNotShowCover={false}
            backButtonNotShow={false}
            uploadedFileText={{
              text1: 'Drag and drop MP4 file ',
              text2: 'for the class',
            }}
            uploadFileAccept=".mp4,.webm,.3gp,.ogv"
            isUploadFileRequired={true}
            isClassUploadFile={true}
            isMaterialAdd={true}
            handleSubmitBack={handleGoBack}
          />
        </div>
      )}
    </>
  );
};

export default AddClassTabContent;
AddClassTabContent.propTypes = {
  getcurrentStep: PropTypes.number,
};
