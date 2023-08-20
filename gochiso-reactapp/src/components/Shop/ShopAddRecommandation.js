/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { post } from '../../network/requests';
import { getUrl } from '../../network/urls';
import getLangValue from '../../resources/language';
import strings from '../../resources/strings';
import { tokenExpire } from '../../services/Auth';
import ButtonElement from '../../UI/ButtonElement';
import Loader from '../../UI/Loader/Loader';
import { isToken } from '../../utils/functions';

toast.configure();
function ShopAddRecommandation({ restaurantId, getShopDetailsData }) {
  const history = useHistory();
  const [showAddRecommand, setShowAddRecommand] = useState(false);
  const [previewUrl, setPreviewUrl] = useState([]);
  const [recommendation, setRecommandation] = useState('');
  const [recommendationError, setRecommandationError] = useState('');
  const [imageError, setImageError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const lang = useSelector((state) => state.defaultLanguage.lang);

  const onSelectFile = (e) => {
    let tempUrl = [];
    setImageError('');
    if (!e.target.files || e.target.files.length === 0) {
      //   setSelectedFile(undefined);
      setImageError(getLangValue(strings.ERR_FIELD_REQUIRED, lang));
      return;
    }
    tempUrl = [...previewUrl];
    if (e.target.files.length === 1) {
      if (!e.target.files[0].type.match('image.*')) {
        setImageError('Wrong Image Type');
        return;
      }
      tempUrl.push(e.target.files[0]);
    } else if (e.target.files.length > 1) {
      Array.from(e.target.files).forEach((item) => {
        if (!item.type.match('image.*')) {
          setImageError('Wrong Image Type');
          return;
        }
        tempUrl.push(item);
      });
    }

    setPreviewUrl([...tempUrl]);
  };
  const handleCancel = () => {
    setPreviewUrl('');
    setShowAddRecommand(false);
  };
  const handleAddRecommandtion = () => {
    if (!isToken()) {
      history.push(`/${lang}/login`);
    } else {
      setShowAddRecommand(!showAddRecommand);
    }
  };
  const handleChangeRecommandation = (e) => {
    setRecommandation(e.target.value);
    if (e.target.value === '') {
      setRecommandationError(getLangValue(strings.ERR_FIELD_REQUIRED, lang));
    } else {
      setRecommandationError('');
    }
  };
  const handleCancelImage = (i) => {
    const tempPreviewUrl = [...previewUrl];
    tempPreviewUrl.forEach((item, index) => {
      if (index === i) {
        tempPreviewUrl.splice(index, 1);
      }
    });
    setPreviewUrl(tempPreviewUrl);
  };
  const isFormValidation = () => {
    let isValid = true;
    if (previewUrl.length < 1) {
      setImageError(getLangValue(strings.ERR_FIELD_REQUIRED, lang));
      isValid = false;
    } else if (imageError === getLangValue(strings.WRONG_IMAGE_TYPE, lang)) {
      isValid = false;
    }

    if (recommendation === '') {
      setRecommandationError(getLangValue(strings.ERR_FIELD_REQUIRED, lang));
      isValid = false;
    }
    return isValid;
  };
  const handleSubmit = () => {
    const token = localStorage.getItem('token');
    const isValid = isFormValidation();
    if (isValid) {
      setIsLoading(true);
      const addRecommandationData = new FormData();
      for (let i = 0; i < previewUrl.length; i += 1) {
        addRecommandationData.append('reviews[]', previewUrl[i]);
      }
      addRecommandationData.append('review', recommendation);
      addRecommandationData.append('recommend', 1);
      addRecommandationData.append('lang', lang);
      addRecommandationData.append('type', 'shop');
      addRecommandationData.append('restaurant_id', restaurantId);
      const url = getUrl('add-recommandation');
      post(`${url}?api_token=${token}`, addRecommandationData, false)
        .then((response) => {
          const {
            data: { messages, status, code },
          } = response;
          setIsLoading(false);
          switch (code) {
            case 200:
              if (status === 'true') {
                getShopDetailsData();
                toast.success(messages, {
                  pauseOnHover: false,
                  position: toast.POSITION.TOP_RIGHT,
                });
                setShowAddRecommand(false);
                setPreviewUrl([]);
                setRecommandation('');
              }
              break;
            case 400:
              toast.error(messages, {
                pauseOnHover: false,
                position: toast.POSITION.TOP_RIGHT,
              });
              break;
            default:
              toast.error(
                lang === 'en'
                  ? process.env.REACT_APP_DEFAULT_ERROR_MESSAGE_EN
                  : process.env.REACT_APP_DEFAULT_ERROR_MESSAGE_JP,
                {
                  pauseOnHover: false,
                  position: toast.POSITION.TOP_RIGHT,
                },
              );
          }
        })
        .catch((error) => {
          setIsLoading(false);
          tokenExpire(error.response, history);
        });
    }
  };
  return (
    <>
      {isLoading && <Loader /> }
      <div className="add-recommendation-form-div">
        {!showAddRecommand && (

        <div className="btn-add-div" id="add-recommendation-btn-div">
          <div className="add-button-card-root">
            <ButtonElement className="btn btn-recommendation-button" label={`+ ${getLangValue(strings.ADD_RECOMMENDATION, lang)}`} id="btn-recommendation-button" onClick={() => handleAddRecommandtion()} />
          </div>
        </div>
        )}
        <div className={`add-recommendation-form-card-root ${!showAddRecommand && 'd-none'} `} id="add-recommendation-form-card">
          <div className="add-recommendation-form-card">

            <div className="file-div">
              <div className="custom-file">
                <input type="file" className="custom-file-input" id="customFile" multiple onChange={(e) => onSelectFile(e)} />
                <label className="custom-file-label" htmlFor="customFile">
                  {' '}
                  <i className="bg-custom-icon image-icon" />
                  {' '}
                  {getLangValue(strings.ADD_PHOTOS, lang)}
                </label>
              </div>
              <div className="img-list-div">
                <div className="row mlr-8">
                  {previewUrl && previewUrl.length > 0 && previewUrl.map((image, i) => (
                    <div className="col-lg-3 col-md-3 col-6 plr-8">
                      <div className="image-bx">
                        <div className="cancel-div">
                          {' '}
                          <ButtonElement label={<i className="fe fe-x" />} type="button" className="btn btn-link btn-cancel" onClick={() => handleCancelImage(i)} />
                          {' '}
                        </div>
                        <div className="image-bx-inner">
                          <img src={URL.createObjectURL(image)} alt="img" className="img-fluid img-object-cover" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {imageError !== '' ? (
                  <div className="invalid-feedback d-block">
                    {imageError}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="textarea-dvi">
              <textarea className="form-control" value={recommendation} onChange={handleChangeRecommandation} cols="30" rows="3" placeholder={getLangValue(strings.WRITE_RECOMMANDATION, lang)} />
              {recommendationError !== '' ? (
                <div className="invalid-feedback d-block">
                  {recommendationError}
                </div>
              ) : null}
            </div>
            <div className="button-bottom-row">
              <div className="button-bottom-right-div">
                <ButtonElement className="btn-custom-rounded btn-cancel mr-10 btn-lowercase" onClick={() => handleCancel()} id="cancel-recommendation-button" label={getLangValue(strings.CANCEL, lang)} />
                <ButtonElement className="btn-custom-rounded btn-submit btn-lowercase" onClick={() => handleSubmit()} label={getLangValue(strings.SUBMIT, lang)} />
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default ShopAddRecommandation;
