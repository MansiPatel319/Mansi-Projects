import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { getUrl } from '../../../network/url';
import { get } from '../../../network/requests';
import { setMaterialSteps, setMaterialStep1 } from '../../../actions/creatorMaterialAction';
import Loader from '../../UI/Loader/Loader';
toast.configure();
function ChooseCategoryComponent() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [listOfMaterialCategory, setListOfMaterialCategory] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedCategoryErr, setSelectedCategoryErr] = useState('');
  const materialStep1 = useSelector((state) => state.CreatorMaterial.materialStep1);
  const handleSelectMaterialCategory = (e, data) => {
    e.preventDefault();
    if (selectedCategory.id === data.id) {
      setSelectedCategory(0);
    } else {
      setSelectedCategory(data);
      setSelectedCategoryErr('');
    }
  };

  const handleSubmitBack = () => {
    history.go(-2);
  }
  const isFormValidation = () => {
    let isValid = true;
    if (selectedCategory === 0) {
      setSelectedCategoryErr('Please choose any one category');
      isValid = false;
    }
    return isValid;
  };
  const handleNextChooseCategoty = () => {
    const isValid = isFormValidation();
    if (isValid) {
      dispatch(setMaterialSteps(2));
      const step1Data = { category_title: selectedCategory };
      dispatch(setMaterialStep1(step1Data));
    }
  };
  const getMaterialCaterogyList = () => {
    setIsLoading(true);
    const url = getUrl('userMaterials');
    get(url)
      .then((res) => {
        const {
          data: { code, data, status, message },
        } = res;
        setIsLoading(false);
        switch (code) {
          case 200:
            if (status === true) {
              setListOfMaterialCategory(data);
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
      .catch(() => {
        setIsLoading(false);
        toast.error('Something went wrong', {
          pauseOnHover: false,
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
  useEffect(() => {
    getMaterialCaterogyList();
  }, []);
  useEffect(() => {
    setSelectedCategory(materialStep1.id === null ? 0 : materialStep1.category_title);
  }, []);
  return (
    <React.Fragment>
      {isLoading && <Loader />}
      <div className="step-tab-pane-inner">
        <div className="tab-form-div">
          <div className="tab-form-body">
            <div className="center-area-div">
              <div className="materials-category-list-root-div">
                <div className="row mlr-12">
                  {listOfMaterialCategory.length > 0 &&
                    listOfMaterialCategory.map((data) => {
                      return (
                        <div className="col-lg-4 col-md-4 plr-12" key={data.id}>
                          <div
                            className={`add-materials-category-box ${data.id === selectedCategory.id ? 'active' : ''
                              }`}
                            onClick={(e) => handleSelectMaterialCategory(e, data)}
                          >
                            <div className="creators-img-mask-thumb">
                              <div className="img-thumb">
                                <img
                                  src={data.category_image}
                                  className="img-fluid img-responsive"
                                  alt="image"
                                />
                              </div>
                              <div className="cancel-button-div">
                                <Link className="remove-btn" to="#">
                                  <i className="fe fe-x"></i>
                                </Link>
                              </div>
                            </div>
                            <div className="creators-content-div">
                              <h3>{data.category_title}</h3>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
                {selectedCategoryErr === '' ? null : (
                  <div style={{ color: 'red', fontSize: '18px' }}>{selectedCategoryErr}</div>
                )}
              </div>
            </div>
          </div>
          <div className="tab-form-bottom mt-40">
            <div className="tab-cre-btn-div general-btn-div-row">
              <div className="general-btn-div-right">
                <Link to="#" className="btn btn-primary-outline btn-primary-color-02 mh-btn55 btn-black-back mr-24" onClick={handleSubmitBack}>
                  <span className="text">Back</span>
                </Link>
                <Link
                  to="#"
                  className="btn btn-common-primary mh-btn55 btn-next"
                  onClick={handleNextChooseCategoty}
                >
                  Next
              </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ChooseCategoryComponent;
