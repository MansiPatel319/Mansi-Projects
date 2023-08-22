import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getUrl } from '../../../network/url';
import { get } from '../../../network/requests';
import '../../../assets/css/drag-and-drop/dropzone.css';
import '../../../assets/css/drag-and-drop/dropzone-custom.css';
import PropTypes from 'prop-types';
import DropZoneNew from '../../UI/DropZone/DropZoneNew';
import Loader from '../../UI/Loader/Loader';
import { useSelector } from 'react-redux';
import noFilterIconImg from "../../../assets/images/icons-filter/icon-01.png";
import { useHistory } from 'react-router-dom';
toast.configure();
const AddDetailsComponent = ({
  handleSubmitNext,
  isNotShowKeyword,
  isNotShowCover,
  uploadedFileText,
  uploadFileAccept,
  isUploadFileRequired,
  isClassUploadFile,
  isMaterialAdd,
  handleSubmitBack
}) => {
  const addDetailsData = useSelector((state) => state.AddDetails.addDetailsData);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const [addTitle, setAddTitle] = useState('');
  const [addTitleErr, setAddTitleErr] = useState('');
  const [addThumbnail, setAddThumbnail] = useState([]);
  const [addThumbnailErr, setAddThumbnailErr] = useState('');
  const [addUploadedFile, setAddUploadedFile] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [keywordsErr, setKeywordsErr] = useState([]);
  const [keywordsList, setKeywordsList] = useState([]);
  const [streamCover, setStreamCover] = useState('');
  const [streamCoversData, setStreamCoversData] = useState([]);
  const [streamCoversDataErr, setStreamCoversDataErr] = useState([]);
  const [addClassFile, setAddClassFile] = useState([]);
  const [addClassFileErr, setaddClassFileErr] = useState('');
  const [classDescription, setclassDescription] = useState('');
  const [descriptionFieldErr, setdescriptionFieldErr] = useState('');
  const handleAddStreamCover = (e) => {
    e.preventDefault();
    if (streamCover !== '') {
      setStreamCover('');
      setStreamCoversData(streamCoversData.concat(streamCover));
      setStreamCoversDataErr('');
    }
  };
  const handleDescrChange = (e) => {
    setclassDescription(e.target.value);
    setdescriptionFieldErr("");
  }
  const handleChangeStreamCover = (e) => {
    setStreamCover(e.target.value);
  };
  const handleRemoveStreamCover = (e, id) => {
    e.preventDefault();
    const newdata = streamCoversData.filter((data, index) => index !== id);
    setStreamCoversData(newdata);
  };
  const handleSelectedKeyword = (e, id) => {
    e.preventDefault();
    if (!keywords.includes(id)) {
      if (keywords.indexOf(id) === -1) {
        keywords.push(id);
      }
    } else {
      let index = keywords.indexOf(id);
      keywords.splice(index, 1);
    }
    setKeywords(keywords);
    setKeywordsErr('');
  };
  const handleChangeAddTitle = (e) => {
    if (e.target.value === '') {
      setAddTitle('');
      setAddTitleErr('Title is required');
    } else {
      setAddTitle(e.target.value);
      setAddTitleErr('');
    }
  };
  const formIsValid = () => {
    let isValid = true;
    if (addTitle === '') {
      setAddTitleErr('Title is required');
      isValid = false;
    }
    if (isClassUploadFile) {
      if (classDescription === "" || classDescription === null) {
        setdescriptionFieldErr("This field is required");
        isValid = false;
      }
    }
    if (addThumbnail.length === 0) {
      setAddThumbnailErr('Thumbnail is required');
      isValid = false;
    }
    if (isUploadFileRequired) {
      // if (addUploadedFile.length === 0) {
      //   // setAddUploadedFileErr('File upload is required');
      //   // isValid = false;
      // }
    }
    if (isClassUploadFile) {
      if (addClassFile.length === 0) {
        setaddClassFileErr('File upload is required');
        isValid = false;
      }
    }
    if (!isNotShowKeyword) {
      if (keywords.length <= 0) {
        setKeywordsErr('Please choose any one keyword');
        isValid = false;
      }
    }
    if (!isNotShowCover) {
      if (streamCoversData.length <= 0) {
        setStreamCoversDataErr('Please add cover');
        isValid = false;
      }
    }


    return isValid;
  };
  const handleAddDetailsSubmit = () => {
    const isValid = formIsValid();
    if (isValid) {
      const AddDetailsData = {
        addTitle: addTitle,
        thumbnailFile: addThumbnail,
        uploadedFile: addUploadedFile,
        uploadClassFile: addClassFile,
        keywords: keywords,
        streamCoversData: streamCoversData,
        classDescription: classDescription
      };
      handleSubmitNext(AddDetailsData);
    }
  };

  const getKeywordsData = () => {
    setIsLoading(true);
    const url = getUrl('getKeywordsDetails');
    get(`${url}`)
      .then((response) => {
        const {
          data: { code, data, status, message },
        } = response;
        setIsLoading(false);
        switch (code) {
          case 200:
            if (status === true) {
              setKeywordsList(data);
              //setHandleEditData(true);
            }
            break;
          case 400:
            toast.error(message, {
              pauseOnHover: false,
              position: toast.POSITION.TOP_RIGHT,
            });
            break;
          case 401:
            localStorage.removeItem('token');
            history.push('/login');
            break;
          default:
            toast.error(message, {
              pauseOnHover: false,
              position: toast.POSITION.TOP_RIGHT,
            });
        }
      })
      .catch(() => {
        setIsLoading(false);
        toast.error('Something went wrong', {
          pauseOnHover: false,
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
  useEffect(() => {
    getKeywordsData();
  }, []);
  useEffect(() => {
    setAddTitle(addDetailsData.id !== null ? addDetailsData.addTitle : '');
    setAddThumbnail(addDetailsData.id !== null ? addDetailsData.thumbnailFile : '');
    setAddUploadedFile(addDetailsData.id !== null ? addDetailsData.uploadedFile : '');
    setAddClassFile(addDetailsData.id !== null ? addDetailsData.uploadClassFile : '');
    setKeywords(addDetailsData.id !== null ? addDetailsData.keywords : []);
    setStreamCoversData(addDetailsData.id !== null ? addDetailsData.streamCoversData : []);
    setclassDescription(addDetailsData.id !== null ? addDetailsData.classDescription : '');
  }, []);

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles && acceptedFiles[0]) {
      let img = acceptedFiles[0];
      let imgName = acceptedFiles[0].name;
      let img_ext = imgName.split('.').pop().toLowerCase();
      const maxAllowedSize = Math.round(img.size / 1024);
      if (maxAllowedSize >= 102400) {
        setAddThumbnailErr('Please upload file size upto 100 MB');
      } else if (['jpg', 'jpeg', 'png'].indexOf(img_ext) === -1) {
        setAddThumbnailErr('Please this type not allowed');
      } else {
        setAddThumbnail(acceptedFiles.map((file) => file));
        setAddThumbnailErr('');
      }
    }
  };

  const handleUploadedClassFile = async (acceptedFiles) => {
    if (acceptedFiles && acceptedFiles[0]) {
      setAddClassFile(acceptedFiles.map((file) => file));
    }
  }

  const handleSubmitBackBtn = () => {
    if (isMaterialAdd) {
      handleSubmitBack();
    }
    else {
      history.go(-2);
    }

  }

  return (
    <div className="step-tab-pane-inner">
      {isLoading && <Loader />}
      <div className="tab-form-div">
        <div className="tab-form-body">
          <div className="center-area-div">
            <div className="container container-750">
              <div className="common-form-div common-form-updated-div">
                <div className="row">
                  <div className="col-lg-6 col-md-6">
                    <DropZoneNew
                      onDrop={onDrop}
                      accept=".jpeg,.jpg,.png"
                      uploadedFile={addThumbnail}
                      onRemove={() => {
                        setAddThumbnail('');
                      }}
                      showText={{
                        text1: 'Drag and drop file you',
                        text2: 'want to upload for thumbnail',
                      }}
                    />
                    {addThumbnailErr === '' ? null : (
                      <div style={{ color: 'red', fontSize: '18px', margin: '-25px 0 20px 0' }}>
                        {addThumbnailErr}
                      </div>
                    )}
                  </div>
                  
                  <div className="col-lg-6 col-md-6">
                    <DropZoneNew
                      onDrop={handleUploadedClassFile}
                      accept={uploadFileAccept}
                      uploadedFile={addClassFile}
                      onRemove={() => {
                        setAddClassFile('');
                      }}
                      showText={uploadedFileText}
                    />
                    {addClassFileErr === '' ? null : (
                      <div style={{ color: 'red', fontSize: '18px', margin: '-25px 0 20px 0' }}>
                        {addClassFileErr}
                      </div>
                    )}
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group mb-40">
                      <label className="font-weight-700">
                        <span className="text">
                          Add Title<span className="color-span">*</span>
                        </span>
                      </label>
                      <div className="input-control-row">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter the title"
                          value={addTitle}
                          onChange={handleChangeAddTitle}
                        />
                      </div>
                      {addTitleErr === '' ? null : (
                        <div style={{ color: 'red', fontSize: '18px' }}>{addTitleErr}</div>
                      )}
                    </div>
                  </div>
                  {isNotShowKeyword ? null : (
                    <div className="col-lg-12 col-md-12">
                      <div className="form-group mb-40">
                        <label className="font-weight-700">
                          <span className="text">
                            Keywords<span className="color-span">*</span>
                          </span>
                        </label>
                        <div className="filter-category-root-div filter-category-root-left-div">
                          <div className="filter-category-inner">
                            <ul className="filter-list-ul">
                              {keywordsList.length > 0 && (
                                <>
                                  {keywordsList.map((keyword) => {
                                    return (
                                      <li
                                        className={`${keywords.includes(keyword.id) ? 'active' : ''
                                          }`}
                                        key={keyword.id}
                                        onClick={(e) => handleSelectedKeyword(e, keyword.id)}
                                      >
                                        <Link to="#" className="filter-link">
                                          <span className="icon-img-span">
                                            <img src={keyword.image === null || keyword.image === undefined || keyword.image === "https://myapp-user-uploads154822-dev.s3.amazonaws.com/sample.jpg" ? noFilterIconImg : keyword.image} alt="img" className="img-fluid" />
                                          </span>
                                          <span className="span-text">
                                            {keyword.keyword}
                                          </span>


                                          {/* {keywords.includes(keyword.id) ? (
                                            <span className="cancel-icon-span">
                                              <i className="fe fe-x cross-icon"></i>
                                            </span>
                                          ) : (
                                            ''
                                          )} */}
                                        </Link>
                                      </li>
                                    );
                                  })}
                                </>
                              )}
                              {/* <li>
                                <Link to="#" className="filter-link">
                                  +Add new<span> </span>
                                </Link>
                              </li> */}
                            </ul>
                          </div>
                          {keywordsErr !== '' ? (
                            <div style={{ color: 'red', fontSize: '18px' }}>{keywordsErr}</div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  )}
                  {isNotShowCover ? null : (
                    <div className="col-lg-12 col-md-12">
                      <div className="form-group form-group-with-btn mb-30">
                        <label className="font-weight-700">
                          <span className="text">
                            What your stream will cover?
                            <span className="color-span">*</span>
                          </span>
                        </label>
                        <div className="input-control-row">
                          <input
                            value={streamCover}
                            type="text"
                            className="form-control"
                            placeholder="Suggestion : Understanding Composition"
                            onChange={handleChangeStreamCover}
                          />
                          <div className="abs-right-top">
                            <button
                              className="btn btn-common-primary btn-add"
                              onClick={handleAddStreamCover}
                            >
                              <span className="material-icons-outlined">add</span>
                              Add
                            </button>
                          </div>
                        </div>
                        <div className="category-control-row add-category-row-control">
                          <div className="category-inner">
                            {streamCoversData.length > 0 && (
                              <ul className="category-list-ul">
                                {streamCoversData.map((cover, index) => {
                                  return (
                                    <li className="active" key={index}>
                                      <Link to="#" className="filter-link">
                                        {cover}
                                        <span
                                          className="cancel-icon-span"
                                          onClick={(e) => handleRemoveStreamCover(e, index)}
                                        >
                                          <i className="fe fe-x cross-icon"></i>
                                        </span>
                                      </Link>
                                    </li>
                                  );
                                })}
                              </ul>
                            )}
                          </div>
                        </div>
                      </div>
                      {streamCoversDataErr !== '' ? (
                        <div style={{ color: 'red', fontSize: '18px', marginBottom: '25px' }}>{streamCoversDataErr}</div>
                      ) : null}
                    </div>
                  )}
                  {isClassUploadFile && (
                    <div className="col-lg-12 col-md-12">
                      <div className="form-group mb-40">
                        <label className="font-weight-700">
                          <span className="text">Write description<span className="color-span">*</span></span>
                        </label>
                        <div className="input-control-row">
                          <textarea className="form-control textrea-no-icon" id="" cols="30" rows="4" placeholder="Write description" value={classDescription} onChange={handleDescrChange}></textarea>
                        </div>
                        {descriptionFieldErr !== "" && <div style={{ color: 'red', fontSize: '18px', marginBottom: '25px' }}>{descriptionFieldErr}</div>}
                      </div>
                    </div>
                  )}
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
                onClick={handleSubmitBackBtn}
              >
                <span className="text">Back</span>
              </Link>
              <Link to="#" className="btn btn-common-primary mh-btn55 btn-done" onClick={handleAddDetailsSubmit}>
                {isMaterialAdd ? 'Done' : 'Next'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDetailsComponent;
AddDetailsComponent.propTypes = {
  handleSubmitNext: PropTypes.func,
  handleSubmitBack: PropTypes.func,
  isNotShowKeyword: PropTypes.bool,
  isNotShowCover: PropTypes.bool,
  editData: PropTypes.any,
  backButtonNotShow: PropTypes.bool,
  handleUpdateKeywords: PropTypes.func,
  uploadedFileText: PropTypes.object,
  uploadFileAccept: PropTypes.string,
  isUploadFileRequired: PropTypes.bool,
  isClassUploadFile: PropTypes.bool,
  isMaterialAdd: PropTypes.bool,
};
