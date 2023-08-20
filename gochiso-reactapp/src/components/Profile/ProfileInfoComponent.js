/* eslint-disable no-undef */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import getLangValue from '../../resources/language';
import strings from '../../resources/strings';
import ImageElement from '../../UI/ImageElement';

function ProfileInfoComponent(props) {
  const lang = useSelector((state) => state.defaultLanguage.lang);
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
      props.updateProfilePicture(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);

    setSelectedFile(e.target.files[0]);
  };
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  return (
    <>
      {props.profileData && (
        <>
          <div className="profile-image-div">
            <div className="profile-pic-upload-group">
              <div className="circle">
                {selectedFile ? (
                  <ImageElement
                    className="profile-pic"
                    src={preview}
                    alt="img"
                  />
                ) : (
                  <ImageElement
                    className="profile-pic"
                    src={props.profileData.user.image_url}
                    alt="img"
                  />
                )}
                <label className="filelabel-icon" htmlFor="file-uploadpic">
                  <span className="material-icons"> edit </span>
                </label>
                <input
                  className="file-upload d-none"
                  id="file-uploadpic"
                  type="file"
                  accept="image/*"
                  onChange={onSelectFile}
                />
              </div>
            </div>
          </div>

          <div className="user-info-div">
            <div className="header-title-div">
              <h2>
                {props.profileData.user.first_name}
                &nbsp;
                {props.profileData.user.last_name}
              </h2>
            </div>

            <div className="contact-info-div">
              {props.profileData.user && props.profileData.user.email && (
                <div
                  className={
                    props.profileData.user.phone
                      ? 'contact-info-half border-right-1'
                      : 'contact-info-half'
                  }
                >
                  <Link
                    to={`mailto:${props.profileData.user.email}`}
                    className="link"
                  >
                    <span className="icon-group-span">
                      <span className="material-icons">mail_outline</span>
                    </span>
                    <span className="txt-span">
                      {props.profileData.user.email}
                    </span>
                  </Link>
                </div>
              )}
              {props.profileData.user && props.profileData.user.phone && (
                <div className="contact-info-half">
                  <Link
                    to={`tel:${props.profileData.user.phone}`}
                    className="link"
                  >
                    <span className="icon-group-span">
                      <i className="fe fe-phone" />
                    </span>
                    <span className="txt-span">
                      {props.profileData.user.phone}
                    </span>
                  </Link>
                </div>
              )}
            </div>

            <div className="btn-div">
              <button
                className="btn btn-general-common btn-edit text-uppercase"
                type="button"
              >
                {getLangValue(strings.EDIT_PROFILE_DETAILS, lang)}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ProfileInfoComponent;
