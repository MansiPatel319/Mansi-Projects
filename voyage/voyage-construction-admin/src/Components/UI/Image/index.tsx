import React from "react";
import { Link } from "react-router-dom";
import images from "../../../Assets/images";

export interface ImageProps {
  register?: any;
  logoImage: any;
  // value: any | string;
  inputName: string;
  rules: Object;
  id: any;
  disabled: boolean;
  handleUploadImage?: (e: any) => void;
  handleDeleteImage?: any;
}

const index = ({
  logoImage,
  // value,
  // register,
  handleUploadImage,
  handleDeleteImage,
  id,
  disabled,
  inputName,
}: ImageProps) => {
  return (
    <>
      <div className="form-group mb-0">
        {logoImage ? (
          <div className="form-group mb-0">
            <div className="file-input upload-databox added-data-box">
              <div className="file-input-text">
                <img src={images.Imageicon} alt="default" />
                <p>Company Logo</p>
              </div>
              <input
                type="file"
                className="form-control"
                name={inputName}
                onChange={handleUploadImage}
                id={id}
                multiple={false}
                accept="image/*"
              />
              {/* <span className="file-size">{(logoImage.size)/1000} KB</span> */}
              <Link
                to="#"
                className="delete-file"
                onClick={() => handleDeleteImage(inputName)}
              >
                <img src={images.deleteIcon} alt="delete" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="file-input upload-databox">
            <div className="file-input-text">
              <img src={images.uploadLogo} alt="upload" />
              <p>
                Drag and drop your files or <span>BROWSE FILES</span>
              </p>
            </div>
            <input
              type="file"
              className="form-control"
              name={inputName}
              onChange={handleUploadImage}
              id={id}
              multiple={false}
              accept="image/*"
            />
          </div>
        )}
      </div>

      {/* <div className="file-input">
      {logoImage || value ? (
        <div className="img-list-div" style={{ width: "100%" }}>
          <div className="row mlr-8">
            <div className="col-12 plr-8">
              <div className="image-bx">
               

                <div className="image-bx-inner">
                  <img
                    src={logoImage || value}
                    alt="img"
                    id="organizationImage"
                    className="img-fluid img-object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="file-input-text">
          Click to browse or <br />
          drag and drop your files
        </div>
      )}

      <input
        style={disabled ? { cursor: "auto" } : { cursor: "pointer" }}
        type="file"
        multiple={false}
        accept="image/*"
        className="form-control"
        id={id}
        disabled={disabled}
        // register && register(inputName, rules)
      />
    </div> */}
    </>
  );
};

export default index;
