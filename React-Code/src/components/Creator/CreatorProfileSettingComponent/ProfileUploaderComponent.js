import React from 'react';
import ProfileImage from '../../../assets/images/profile.png';
import PropTypes from 'prop-types';
const ProfileUploaderComponent = ({ handleProfileUploader, pageUploadImage, errorMessage }) => {
  return (
    <div className="profile-pic-upload">
      <div className="circle">
        <img
          className="profile-pic"
          src={
            pageUploadImage === '' ||
              pageUploadImage === 'https://myapp-user-uploads154822-dev.s3.amazonaws.com/sample.jpg'
              ? ProfileImage
              : pageUploadImage
          }
        />
        <label className="filelabel-icon" htmlFor="file-uploadpic">
          <i className="bg-custom-icon upload-picture-icon"></i>
          <span className="text">Upload Photo</span>
        </label>
        <input
          onChange={handleProfileUploader}
          className="file-upload d-none"
          id="file-uploadpic"
          type="file"
          accept="image/*"
        />
      </div>
      {errorMessage && <div style={{ color: 'red', fontSize: '18px', textAlign: 'center' }}>{errorMessage}</div>}
    </div>
  );
};

export default ProfileUploaderComponent;
ProfileUploaderComponent.propTypes = {
  handleProfileUploader: PropTypes.func,
  pageUploadImage: PropTypes.any,
  errorMessage: PropTypes.string
};
