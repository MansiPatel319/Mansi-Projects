import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Amplify, { Storage } from 'aws-amplify';
import ChooseCategoryComponent from './ChooseCategoryComponent';
import AddDetailsComponent from '../AddDetailsComponent/AddDetailsComponent';
import {
  setMaterialSteps,
  setMaterialStep1,
} from '../../../actions/creatorMaterialAction';
import { getUrl } from '../../../network/url';
import { get, post, put } from '../../../network/requests';
import Loader from '../../UI/Loader/Loader';
import { setAddDetailsData } from '../../../actions/addDetails';
import { tokenExpire } from '../../../services/auth';
import awsconfig from '../../../aws-exports';
Amplify.configure(awsconfig);
toast.configure();
const AddMaterialTabContent = ({ getcurrentStep }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const [isLoading, setIsLoadning] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const materialStep1 = useSelector((state) => state.CreatorMaterial.materialStep1);
  const handleAddDetailsNext = async (data) => {
    setIsLoadning(true);
    let materialFile;
    let materailFileName;
    let materialUrl;
    if (data.uploadClassFile[0].name) {
      materialFile = data.uploadClassFile[0];
      const extArray = materialFile.name.split('.');
      const ext = extArray[extArray.length - 1];
      materailFileName = `creator-material-${Date.now()}.${ext}`;
      await Storage.put(`materials/${materailFileName}`, materialFile, {
        contentType: materialFile.type,
      });
      materialUrl = await Storage.get(`materials/${materailFileName}`);
    }
    var URLsplit = materialUrl.split('/');
    const splitMaterialUrl = materialUrl.split('/').slice(3, URLsplit.length).join('/');
    if (id === undefined) {
      setIsLoadning(true);
      const url = getUrl('creator_material');
      const formData = new FormData();
      formData.append('material_category', materialStep1.category_title.id);
      formData.append('title', data.addTitle);
      formData.append('thumbnail_file', data.thumbnailFile[0]);
      formData.append('material_file', splitMaterialUrl.split('?')[0]);
      post(`${url}/`, formData, true)
        .then((res) => {
          const {
            data: { code, status, message },
          } = res;
          setIsLoadning(false);
          switch (code) {
            case 201:
              if (status === true) {
                toast.success(message, {
                  pauseOnHover: false,
                  position: toast.POSITION.TOP_RIGHT,
                });
                dispatch(setMaterialSteps(1));
                dispatch(setAddDetailsData({ id: null }));
                history.push('/creator-my-uploads/materials');
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
          setIsLoadning(false);
          tokenExpire(error.response, history);
        });
    } else {
      const url = getUrl('creator_material');
      const formData = new FormData();
      formData.append('material_category', materialStep1.category_title.id);
      formData.append('title', data.addTitle);
      if (data.thumbnailFile[0].name) {
        formData.append('thumbnail_file', data.thumbnailFile[0]);
      }
      if (data.uploadClassFile[0].name) {
        formData.append('material_file', splitMaterialUrl.split('?')[0]);
      }
      setIsLoadning(true);
      put(`${url}/${id}/`, formData, true)
        .then((res) => {
          const {
            data: { code, status, message },
          } = res;
          setIsLoadning(false);
          switch (code) {
            case 200:
              if (status === true) {
                dispatch(setMaterialSteps(1));
                dispatch(setAddDetailsData({ id: null }));
                toast.success(message, {
                  pauseOnHover: false,
                  position: toast.POSITION.TOP_RIGHT,
                });
                history.push('/creator-my-uploads/materials');
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
          setIsLoadning(false);
          tokenExpire(error.response, history);
        });
    }
  };
  const handleAddDetailsBack = () => {
    dispatch(setMaterialSteps(1));
  };
  const getMaterilDetails = (materialId) => {
    setIsLoadning(true);
    const url = getUrl('creator_material');
    get(`${url}/${materialId}/`, true)
      .then((response) => {
        const {
          data: { code, data, status, message },
        } = response;
        setIsLoadning(false);
        switch (code) {
          case 200:
            if (status === true) {
              const step1Data = { category_title: data.material_category };
              const step2Data = {
                id: data.id,
                addTitle: data.title,
                thumbnailFile: [data.thumbnail_file],
                uploadClassFile: [data.material_file],
              };
              dispatch(setMaterialStep1(step1Data));
              // dispatch(setMaterialStep2(step2Data));
              dispatch(setAddDetailsData(step2Data));
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
        setIsLoadning(false);
        tokenExpire(error.response, history);
      });
  };
  useEffect(() => {
    if (id !== undefined) {
      const materialId = id;
      getMaterilDetails(materialId);
    } else {
      setIsEditable(true);
      dispatch(
        setMaterialStep1({
          id: null,
        }),
      );
      dispatch(setAddDetailsData({ id: null }));
    }
  }, []);
  return (
    <>
      {isLoading && <Loader />}
      {getcurrentStep === 1 && isEditable && (
        <div className={getcurrentStep === 1 ? 'tab-pane fade active show' : 'tab-pane fade'}>
          <ChooseCategoryComponent />
        </div>
      )}
      {getcurrentStep === 2 && (
        <div className={getcurrentStep === 2 ? 'tab-pane fade active show' : 'tab-pane fade'}>
          <AddDetailsComponent
            handleSubmitNext={handleAddDetailsNext}
            handleSubmitBack={handleAddDetailsBack}
            isNotShowKeyword={true}
            isNotShowCover={true}
            isUploadFileRequired={true}
            isClassUploadFile={true}
            isMaterialAdd={true}
            uploadedFileText={{
              text1: 'Drag and drop file for your ',
              text2: 'photo presets',
            }}
            uploadFileAccept="application/pdf,.doc, .docx,.xls,.xlsx,.ppt,.pptx,.zip,.rar,.tar,.gzip,.gz,.7z,.txt,.mp4,.ogv,.webm,.mp3,.wav,.jpeg,.jpg,.png"
          />
        </div>
      )}
    </>
  );
};

export default AddMaterialTabContent;
AddMaterialTabContent.propTypes = {
  getcurrentStep: PropTypes.number,
};
