import React from 'react';
import HeaderComponent from '../Header/HeaderComponent';
import AddPlaceFormLeftComponent from './AddPlaceFormLeftComponent';
import AddPlaceRightImageComponent from './AddPlaceRightImageComponent';
import '../../assets/css/add-shop-style.css';

const AddPlaceComponent = () => (
  <>
    <HeaderComponent withSearch />
    <div className="main-middle-inner-area">

      <section className="add-place-middle-section">
        <div className="add-place-middle-div">

          <div className="container-fluid p-0">
            <div className="row">
              <div className="col-lg-12 col-md-12 add-place-col">

                <div className="add-place-middle-row">
                  <AddPlaceFormLeftComponent />
                  <AddPlaceRightImageComponent />
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  </>

);

export default AddPlaceComponent;
