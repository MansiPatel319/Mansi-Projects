import React from 'react';
import '../../assets/css/owl-slider-style.css';
import { Link } from 'react-router-dom';
import homeBanner1 from '../../assets/images/home-block-banner/home-block-banner-01.png';
import homeBanner2 from '../../assets/images/home-block-banner/home-block-banner-02.png';
import homeBanner3 from '../../assets/images/home-block-banner/home-block-banner-03.png';
import homeBanner4 from '../../assets/images/home-block-banner/home-block-banner-04.png';

function BlockComponent() {
  return (
    <React.Fragment>
      <div className="block-classes-common-pattern-root">
        <section className="block-banner-classes-section01 block-banner-classes-01">
          <div className="block-banner-classes-div01">
            <div className="block-banner-classes-root">
              <div className="container-fluid">
                <div className="row align-items-center-row">
                  <div className="col-lg-6 col-md-6 p-0">
                    <div className="center-content-div">
                      <div className="center-content-row">
                        <h2>
                          <span className="block">Hundreds of </span>
                          <span className="block">Classes</span>
                        </h2>
                        <div className="desc-div">
                          <p>
                            Donec sollicitudin molestie malesuada. Praesent sapien massa, convallis
                            a pellentesque nec, egestas non nisi. Curabitur aliquet quam id dui
                            posuere blandit.Donec sollicitudin molestie malesuada. Praesent sapien
                            massa, convallis a pellentesque nec, egestas non nisi. Curabitur aliquet
                            quam id dui posuere blandit.
                          </p>
                        </div>
                        <div className="card-black-number-shadow">
                          <div className="row mlr-5">
                            <div className="col-lg-6 col-md-6 plr-5">
                              <div className="card-black-shadow-box">
                                <h4>100+</h4>
                                <p>
                                  Classes <span className="color-text01 block">and counting</span>
                                </p>
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6 plr-5">
                              <div className="card-black-shadow-box">
                                <h4>30+</h4>
                                <p>
                                  Creators <span className="color-text01 block">added weekly</span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="button-group-div">
                          <Link to="/user/login" className="btn btn-common-primary btn-cc">
                            <span className="text">Start Your Creative Career</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 p-0">
                    <div className="img-thumb-div">
                      <div className="img-thumb-inner">
                        <img src={homeBanner1} className="img-fluid img-responsive" alt="img" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="block-banner-classes-section02 block-banner-classes-02">
          <div className="block-banner-classes-div02">
            <div className="block-banner-classes-root">
              <div className="container-fluid">
                <div className="row align-items-center-row">
                  <div className="col-lg-6 col-md-6 order-2 p-0">
                    <div className="center-content-div">
                      <div className="center-content-row">
                        <h2>
                          <span className="block">New Way to </span>
                          <span className="block">Learn Live</span>
                        </h2>
                        <h3>Time to learn the new way</h3>
                        <div className="desc-div">
                          <p>
                            Donec sollicitudin molestie malesuada. Praesent sapien massa, convallis
                            a pellentesque nec, egestas non nisi. Curabitur aliquet quam id dui
                            posuere blandit.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 order-1 p-0">
                    <div className="img-thumb-div">
                      <div className="img-thumb-inner">
                        <img src={homeBanner2} className="img-fluid img-responsive" alt="img" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="block-banner-classes-section03 block-banner-classes-03">
          <div className="block-banner-classes-div03">
            <div className="block-banner-classes-root">
              <div className="container-fluid">
                <div className="row align-items-center-row">
                  <div className="col-lg-6 col-md-6 p-0">
                    <div className="center-content-div">
                      <div className="center-content-row">
                        <h2>
                          <span className="block">One To One </span>
                          <span className="block">Sessions</span>
                        </h2>
                        <h3>Time to learn the new way</h3>
                        <div className="desc-div">
                          <p>
                            Donec sollicitudin molestie malesuada. Praesent sapien massa, convallis
                            a pellentesque nec, egestas non nisi. Curabitur aliquet quam id dui
                            posuere blandit.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 p-0">
                    <div className="img-thumb-div">
                      <div className="img-thumb-inner">
                        <img src={homeBanner3} className="img-fluid img-responsive" alt="img" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="block-banner-classes-section04 block-banner-classes-04">
          <div className="block-banner-classes-div04">
            <div className="block-banner-classes-root">
              <div className="container-fluid">
                <div className="row align-items-center-row">
                  <div className="col-lg-6 col-md-6 order-2 p-0">
                    <div className="center-content-div">
                      <div className="center-content-row">
                        <h2>
                          <span className="block">Materials </span>
                        </h2>
                        <h3>Level up your work with our vast library</h3>
                        <div className="desc-div">
                          <p>
                            Donec sollicitudin molestie malesuada. Praesent sapien massa, convallis
                            a pellentesque nec, egestas non nisi. Curabitur aliquet quam id dui
                            posuere blandit.
                          </p>
                        </div>
                        <div className="button-group-div">
                          <Link to="#" className="btn btn-common-primary btn-cc">
                            <span className="text">Learn More</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 order-1 p-0">
                    <div className="img-thumb-div">
                      <div className="img-thumb-inner">
                        <img src={homeBanner4} className="img-fluid img-responsive" alt="img" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </React.Fragment>
  );
}

export default BlockComponent;
