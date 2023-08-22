import React, { useEffect } from 'react';
import '../../assets/css/bootstrap.min.css';
import '../../assets/css/all.min.css';
import '../../assets/css/feather.min.css';
import '../../assets/css/select2.min.css';
import '../../assets/css/select-custom.css';
import '../../assets/css/select2-custom.css';
import '../../assets/css/date/bootstrap-datetimepicker.css';
import '../../assets/css/date/custom-timepicker.css';
import '../../assets/css/drag-and-drop/dropzone.css';
import '../../assets/css/drag-and-drop/dropzone-custom.css';
import '../../assets/css/creator/creator-step-main-style.css';
import '../../assets/css/creator/creator-popup-style.css';
import '../../assets/css/style.css';

import '../../assets/css/tab-style.css';
import CreatorHeader from '../../components/Header/CreatorHeader';
import CreatorAddMaterialComponent from '../../components/Creator/CreatorAddMaterialComponent/CreatorAddMaterialComponent';
import { useHistory, useParams } from 'react-router-dom';

function CreatorAddMaterial() {
  const params = useParams();
  const history = useHistory();
  useEffect(() => {
    const checkCreator = localStorage.getItem('is_creator');
    if (checkCreator === 'true') {
      if (params.id !== " " && params.id !== undefined) {
        history.push(`/creator-add-material/edit/${params.id}`);
      }
      else {
        history.push('/creator-add-material');
      }
    } else {
      history.push('/user-home');
    }
  }, []);
  return (
    <React.Fragment>
      <div id="wrapper" className="wrapper creator-home-wrapper position-fixed-custom">
        <CreatorHeader activeTab="Home" />
        <div className="main-middle-area creator-main-middle-area main-bg-color">
          <div className="header-footer-with-min-height02">
            <div className="pattern-inner-div pattern-upricing-inner-div">
              <div className="relative-index">
                <CreatorAddMaterialComponent />
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default CreatorAddMaterial;
