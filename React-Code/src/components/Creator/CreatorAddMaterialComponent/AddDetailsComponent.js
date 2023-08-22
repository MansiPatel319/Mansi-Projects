import React from 'react';

function AddDetailsComponent() {

  return (
    <React.Fragment>
      <div className="step-tab-pane-inner">
        <div className="tab-form-div">
          <div className="tab-form-body">
            <div className="center-area-div">
              <div className="container container-800 plr-8 plr-xs-0">
                <div className="common-form-div common-form-updated-div">
                  <div className="row mlr-8">
                    <div className="col-lg-6 col-md-6 plr-8">
                      <div className="dropzone-root-group" id="dropzone">
                        <form
                          className="dropzone needsclick"
                          id="my-awesome-dropzone"
                          action="assets/images"
                        >
                          <div className="dz-message needsclick">
                            <div className="icon-div">
                              <img
                                src="assets/images/icons/custom/upload-drag-icon.svg"
                                className="img-fluid img-upload-icon"
                                alt="plus"
                              />
                            </div>
                            <p>
                              <span className="block"> Drag and drop file you</span>
                              <span className="block"> want to upload for thumbnail</span>
                            </p>
                            <div className="or-div">
                              <span className="text">or</span>
                            </div>
                            <div className="button-center-div">
                              <span className="btn btn-common-primary">Choose</span>
                            </div>
                          </div>
                          <div className="change-btn-div" id="change-file-div">
                            <span className="btn btn-common-primary">Change</span>
                          </div>
                        </form>
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6 plr-8">
                      <div className="dropzone-root-group" id="dropzone">
                        <form
                          className="dropzone needsclick"
                          id="my-awesome-dropzone"
                          action="assets/images"
                        >
                          <div className="dz-message needsclick">
                            <div className="icon-div">
                              <img
                                src="assets/images/icons/custom/upload-drag-icon.svg"
                                className="img-fluid img-upload-icon"
                                alt="plus"
                              />
                            </div>
                            <p>
                              <span className="block"> Drag and drop file for your </span>
                              <span className="block"> photo presets</span>
                            </p>
                            <div className="or-div">
                              <span className="text">or</span>
                            </div>
                            <div className="button-center-div">
                              <span className="btn btn-common-primary" id="choose-file-div">
                                Choose
                              </span>
                            </div>
                          </div>
                          <div className="change-btn-div" id="change-file-div">
                            <span className="btn btn-common-primary">Change</span>
                          </div>
                        </form>
                      </div>
                    </div>

                    <div className="col-lg-12 col-md-12 plr-8">
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
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="tab-form-bottom">
            <div className="tab-cre-btn-div">
              <a href="#" className="btn btn-common-black btn-black-back mr-20">
                Back
              </a>
              <a href="#" className="btn btn-common-white btn-next">
                Next
              </a>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default AddDetailsComponent;
