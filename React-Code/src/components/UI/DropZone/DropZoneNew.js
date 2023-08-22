import React from 'react';
import Dropzone from 'react-dropzone';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import UploadImageIcon from '../../../assets/images/icons/custom/upload-drag-icon-new.svg';
const DropZoneNew = ({ onDrop, accept, uploadedFile, onRemove, showText }) => {
  return (
    <Dropzone onDrop={onDrop} accept={accept}>
      {({ getRootProps, getInputProps }) => (
        <div className="dropzone-root-group" id="dropzone">
          <form
            className="dropzone needsclick"
            id="my-awesome-dropzone"
            action="assets/images"
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <div
              className="dz-message needsclick"
              style={{ display: (uploadedFile !== undefined && uploadedFile.length !== 0) ? 'none' : 'block' }}
            >
              <div className="icon-div">
                <img src={UploadImageIcon} className="img-fluid img-upload-icon" alt="plus" />
              </div>
              <p>
                <span className="block">{showText.text1}</span>
                <span className="block">{showText.text2}</span>
              </p>
              <div className="button-center-div mt-26">
                <span className="btn btn-common-primary">
                  <span className="bg-custom-icon folder-icon"></span> Or Choose File
                  </span>
              </div>
            </div>

            {uploadedFile !== undefined && uploadedFile.length !== 0 ? (
              <div className="dz-preview dz-processing dz-image-preview dz-success dz-complete">
                <div className="dz-image">
                  {uploadedFile[0].name ? (
                    <>
                      {uploadedFile[0].name.match(/\.(jpg|jpeg|png)$/) ? (
                        <img src={URL.createObjectURL(uploadedFile[0])} alt="" />
                      ) : null}
                      {uploadedFile[0].name.match(/\.(pdf)$/) ? (
                        <i
                          className="far fa-file-pdf"
                          style={{
                            fontSize: '180px',
                            color: 'red',
                            display: 'flex',
                            justifyContent: 'center',
                          }}
                        ></i>
                      ) : null}
                      {uploadedFile[0].name.match(/\.(doc|docx)$/) ? (
                        <i
                          className="far fa-file-word"
                          style={{
                            fontSize: '180px',
                            color: '#4175df',
                            display: 'flex',
                            justifyContent: 'center',
                          }}
                        ></i>
                      ) : null}
                      {uploadedFile[0].name.match(/\.(xls|xlsx)$/) ? (
                        <i
                          className="far fa-file-excel"
                          style={{
                            fontSize: '180px',
                            color: '#4CAF50',
                            display: 'flex',
                            justifyContent: 'center',
                          }}
                        ></i>
                      ) : null}
                      {uploadedFile[0].name.match(/\.(ppt|pptx)$/) ? (
                        <i
                          className="far fa-file-powerpoint"
                          style={{
                            fontSize: '180px',
                            color: '#EF6C00',
                            display: 'flex',
                            justifyContent: 'center',
                          }}
                        ></i>
                      ) : null}
                      {uploadedFile[0].name.match(/\.(zip|rar|tar|gzip|gz|7z)$/) ? (
                        <i
                          className="far fa-file-archive"
                          style={{
                            fontSize: '180px',
                            //color: '#EF6C00',
                            display: 'flex',
                            justifyContent: 'center',
                          }}
                        ></i>
                      ) : null}
                      {uploadedFile[0].name.match(/\.(txt)$/) ? (
                        <i
                          className="far fa-file-alt"
                          style={{
                            fontSize: '180px',
                            //color: '#EF6C00',
                            display: 'flex',
                            justifyContent: 'center',
                          }}
                        ></i>
                      ) : null}
                      {uploadedFile[0].name.match(/\.(mp4|ogg|webm)$/) ? (
                        <i
                          className="far fa-file-video"
                          style={{
                            fontSize: '180px',
                            //color: '#EF6C00',
                            display: 'flex',
                            justifyContent: 'center',
                          }}
                        ></i>
                      ) : null}
                      {uploadedFile[0].name.match(/\.(mp3|wav)$/) ? (
                        <i
                          className="far fa-file-audio"
                          style={{
                            fontSize: '180px',
                            //color: '#EF6C00',
                            display: 'flex',
                            justifyContent: 'center',
                          }}
                        ></i>
                      ) : null}
                    </>
                  ) : (
                    <>
                      {uploadedFile[0].match(/\.(jpg|jpeg|png)$/) ? (
                        <img src={uploadedFile[0]} alt="" />
                      ) : null}
                      {uploadedFile[0].match(/\.(pdf)$/) ? (
                        <i
                          className="far fa-file-pdf"
                          style={{
                            fontSize: '180px',
                            color: 'red',
                            display: 'flex',
                            justifyContent: 'center',
                          }}
                        ></i>
                      ) : null}
                      {uploadedFile[0].match(/\.(doc|docx)$/) ? (
                        <i
                          className="far fa-file-word"
                          style={{
                            fontSize: '180px',
                            color: '#4175df',
                            display: 'flex',
                            justifyContent: 'center',
                          }}
                        ></i>
                      ) : null}
                      {uploadedFile[0].match(/\.(xls|xlsx)$/) ? (
                        <i
                          className="far fa-file-excel"
                          style={{
                            fontSize: '180px',
                            color: '#4CAF50',
                            display: 'flex',
                            justifyContent: 'center',
                          }}
                        ></i>
                      ) : null}
                      {uploadedFile[0].match(/\.(ppt|pptx)$/) ? (
                        <i
                          className="far fa-file-powerpoint"
                          style={{
                            fontSize: '180px',
                            color: '#EF6C00',
                            display: 'flex',
                            justifyContent: 'center',
                          }}
                        ></i>
                      ) : null}
                      {uploadedFile[0].match(/\.(zip|rar|tar|gzip|gz|7z)$/) ? (
                        <i
                          className="far fa-file-archive"
                          style={{
                            fontSize: '180px',
                            //color: '#EF6C00',
                            display: 'flex',
                            justifyContent: 'center',
                          }}
                        ></i>
                      ) : null}
                      {uploadedFile[0].match(/\.(txt)$/) ? (
                        <i
                          className="far fa-file-alt"
                          style={{
                            fontSize: '180px',
                            //color: '#EF6C00',
                            display: 'flex',
                            justifyContent: 'center',
                          }}
                        ></i>
                      ) : null}
                      {uploadedFile[0].match(/\.(mp4|ogg|webm)$/) ? (
                        <i
                          className="far fa-file-video"
                          style={{
                            fontSize: '180px',
                            //color: '#EF6C00',
                            display: 'flex',
                            justifyContent: 'center',
                          }}
                        ></i>
                      ) : null}
                      {uploadedFile[0].match(/\.(mp3|wav)$/) ? (
                        <i
                          className="far fa-file-audio"
                          style={{
                            fontSize: '180px',
                            //color: '#EF6C00',
                            display: 'flex',
                            justifyContent: 'center',
                          }}
                        ></i>
                      ) : null}
                    </>
                  )}
                </div>

                <div className="dz-details">
                  <div className="dz-size">
                    {uploadedFile[0].name ? (
                      <span>
                        <strong>{(uploadedFile[0].size / 1024).toFixed(1)}</strong> KB
                      </span>
                    ) : null}
                  </div>
                  <div className="dz-filename">
                    {uploadedFile[0].name ? (
                      <span> {uploadedFile[0].name}</span>
                    ) : (
                      <span> {uploadedFile[0].split('/').pop()}</span>
                    )}
                  </div>
                </div>
                <div className="dz-progress">
                  <progress
                    max="100"
                    value="100"
                    className="dz-upload"
                    style={{ width: 'auto' }}
                  ></progress>
                </div>

                <div className="dz-success-mark">
                  <svg
                    width="54px"
                    height="54px"
                    viewBox="0 0 54 54"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                  >
                    <title>Check</title> <defs></defs>
                    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                      <path
                        d="M23.5,31.8431458 L17.5852419,25.9283877 C16.0248253,24.3679711 13.4910294,24.366835 11.9289322,25.9289322 C10.3700136,27.4878508 10.3665912,30.0234455 11.9283877,31.5852419 L20.4147581,40.0716123 C20.5133999,40.1702541 20.6159315,40.2626649 20.7218615,40.3488435 C22.2835669,41.8725651 24.794234,41.8626202 26.3461564,40.3106978 L43.3106978,23.3461564 C44.8771021,21.7797521 44.8758057,19.2483887 43.3137085,17.6862915 C41.7547899,16.1273729 39.2176035,16.1255422 37.6538436,17.6893022 L23.5,31.8431458 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z"
                        id="Oval-2"
                        strokeOpacity="0.198794158"
                        stroke="#747474"
                        fillOpacity="0.816519475"
                        fill="#FFFFFF"
                      ></path>
                    </g>
                  </svg>
                </div>
                <div className="dz-error-mark">
                  <svg
                    width="54px"
                    height="54px"
                    viewBox="0 0 54 54"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                  >
                    <title>Error</title> <defs></defs>
                    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                      <g
                        id="Check-+-Oval-2"
                        stroke="#747474"
                        strokeOpacity="0.198794158"
                        fill="#FFFFFF"
                        fillOpacity="0.816519475"
                      >
                        <path
                          d="M32.6568542,29 L38.3106978,23.3461564 C39.8771021,21.7797521 39.8758057,19.2483887 38.3137085,17.6862915 C36.7547899,16.1273729 34.2176035,16.1255422 32.6538436,17.6893022 L27,23.3431458 L21.3461564,17.6893022 C19.7823965,16.1255422 17.2452101,16.1273729 15.6862915,17.6862915 C14.1241943,19.2483887 14.1228979,21.7797521 15.6893022,23.3461564 L21.3431458,29 L15.6893022,34.6538436 C14.1228979,36.2202479 14.1241943,38.7516113 15.6862915,40.3137085 C17.2452101,41.8726271 19.7823965,41.8744578 21.3461564,40.3106978 L27,34.6568542 L32.6538436,40.3106978 C34.2176035,41.8744578 36.7547899,41.8726271 38.3137085,40.3137085 C39.8758057,38.7516113 39.8771021,36.2202479 38.3106978,34.6538436 L32.6568542,29 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z"
                          id="Oval-2"
                        ></path>
                      </g>
                    </g>
                  </svg>
                </div>
                <Link className="dz-remove" to="#" onClick={onRemove}>
                  <i className="fe fe-x"></i>
                </Link>
              </div>
            ) : null}
          </form>
        </div>
      )}
    </Dropzone>
  );
};

export default DropZoneNew;
DropZoneNew.propTypes = {
  onDrop: PropTypes.func,
  onRemove: PropTypes.func,
  accept: PropTypes.string,
  uploadedFile: PropTypes.any,
  showText: PropTypes.object,
};
