import React from 'react';
import PropTypes from 'prop-types';
const BookingModalComponent = ({
  handleCloseModal,
  children,
  header1,
  header2,
  changeHederClass,
}) => {
  return (
    <div
      className="modal right right-slider-modal fade show"
      id="login-to-book-modal"
      role="dialog"
      style={{ display: 'block', paddingRight: ' 17px', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" onClick={handleCloseModal}>
              <span aria-hidden="true">
                <i className="fe fe-x close-icon-x"></i>
              </span>
            </button>
          </div>

          <div className="modal-body">
            <div className="common-modal-body login-to-book-body">
              <div className="common-header-div">
                <div className="title-heading-div">
                  <h2 className={changeHederClass === 'common' ? 'ltb-h2' : 'ltp-h2 hide-h2'}>
                    {header1}
                  </h2>
                  <h2 className={changeHederClass === 'login' ? 'ltb-h2' : 'ltp-h2 hide-h2'}>
                    {header1}
                  </h2>
                  <h2 className={changeHederClass === 'signup' ? 'ltb-h2' : 'ltp-h2 hide-h2'}>
                    {header2}
                  </h2>
                </div>
              </div>
              <div className="common-body-div">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModalComponent;
BookingModalComponent.propTypes = {
  handleCloseModal: PropTypes.func,
  children: PropTypes.object,
  header1: PropTypes.string,
  header2: PropTypes.string,
  changeHederClass: PropTypes.string,
};
