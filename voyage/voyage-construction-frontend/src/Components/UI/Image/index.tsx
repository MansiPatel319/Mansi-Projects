import React from "react";

export interface ImageProps {
  register?: any;
  logoImage: string;
  value: any | string;
  inputName: string;
  rules: Object;
  id: any;
  disabled: boolean;
  error: String
}

const index = ({
  logoImage,
  value,
  register,
  inputName,
  rules,
  id,
  disabled,
  error
}: ImageProps) => {
  return (
    <div className={`file-input ${error ? "error" : ""} `}>
      {logoImage || (value) ? (
        <div className="img-list-div" style={{ width: "100%" }}>
          <div className="row mlr-8">
            <div className="col-12 plr-8">
              <div className="image-bx">
               
                <div className="image-bx-inner">
                  <img
                    src={
                      (value)  ||
                      logoImage
                    }
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
        style={disabled?{cursor:'auto'}:{cursor:'pointer'}}
        type="file"
        multiple={false}
        accept="image/*"
        className="form-control"
        id={id}
        disabled={disabled}
        {...register(inputName, rules)}
      />
    </div>
  );
};

export default index;
