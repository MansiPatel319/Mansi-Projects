import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import sixthCreatorImg from '../../../assets/images/creators/creators6.jpg';
import userProfileImg from '../../../assets/images/profile.png';
import { toast } from 'react-toastify';
// import { get } from '../../../network/requests';
// import { getUrl } from '../../../network/url';
// import { isAuthenticated, tokenExpire } from '../../../services/auth';
toast.configure();
function ListOfPhotoPresetsComponent({ materialsDetails, materialTitle }) {

  const handleFileDownload = (e, url) => {
    // const base_url = window.location.origin;
    // let fileUrl = url;
    // fileUrl[2] = base_url.split('/')[2];
    e.preventDefault();
    // const fileName = url[url.length - 1];
    const filename = url.substring(url.lastIndexOf('/') + 1);
    fetch(url, {
      method: 'GET',
    })
      .then((resp) => resp.blob())
      .then((blob) => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        // a.style.display = 'none';
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        // window.URL.revokeObjectURL(url);
        a.click();
      });
  };
  useEffect(() => {
    let prevPath = localStorage.getItem('location');
    if (typeof prevPath !== 'undefined' && prevPath !== null) {
      localStorage.removeItem('location');
    }
  }, []);
  return (
    <React.Fragment>
      <div className="materials-details-div">
        <div className="container container-1200">
          <div className="heading-div">
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <div className="heading-inner-div">
                  <h2>{materialTitle}</h2>
                </div>
              </div>
            </div>
          </div>
          <div className="materials-details-list-div">
            <div className="materials-list-root-div">
              <div className="row">
                {materialsDetails &&
                  materialsDetails.map((data) => {
                    return (
                      <div className="col-lg-6 col-md-6" key={data.id}>
                        <div className="mtd-common-row-box">
                          <div className="mtd-common-row">
                            <div className="mtd-video-img-thumb w-100">
                              <div className="img-thumb w-100">
                                <img
                                  src={
                                    data.thumbnail_file !== undefined ||
                                    data.thumbnail_file !==
                                      'https://myapp-user-uploads154822-dev.s3.amazonaws.com/sample.jpg'
                                      ? data.thumbnail_file
                                      : sixthCreatorImg
                                  }
                                  className="img-fluid img-responsive"
                                  alt="image"
                                />
                              </div>
                            </div>
                            <div className="mtd-content-div">
                              <div className="mtd-content-row">
                                <div className="mtd-content-top-row">
                                  <h3>
                                    <Link to="#" className="link">
                                      {data.title}
                                    </Link>
                                  </h3>
                                  <div className="mtd-content-dw-row">
                                    <div className="thumb-img">
                                      <a href="#" className="link">
                                        <img
                                          src={
                                            data.profile_image !== undefined ||
                                            data.profile_image !==
                                              'https://myapp-user-uploads154822-dev.s3.amazonaws.com/sample.jpg'
                                              ? data.profile_image
                                              : userProfileImg
                                          }
                                          className="img-fluid user"
                                          alt="user"
                                        />
                                      </a>
                                    </div>
                                    <div className="our-content-right">
                                      <h3>
                                        <Link to="#" className="link">
                                          {`${data.creator_name}`}
                                        </Link>
                                      </h3>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="mtd-content-dw-right-bottom">
                                <button
                                  className="btn btn-download-icon"
                                  onClick={(e) => {
                                    handleFileDownload(e, data.material_file);
                                  }}
                                >
                                  <i className="bg-custom-icon downloading-file-icon"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ListOfPhotoPresetsComponent;

ListOfPhotoPresetsComponent.propTypes = {
  materialsDetails: PropTypes.any,
  materialTitle: PropTypes.string,
};
