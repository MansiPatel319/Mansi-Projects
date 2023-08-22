import React, { useEffect, useState } from 'react';
import '../../../assets/css/style.css';
import { Link } from 'react-router-dom';
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "../../../assets/css/style.css";
import "../../../assets/css/feather.min.css";
// import "../../../assets/css/all.min.css";
import "../../../assets/css/owl-slider-style.css";
// import "../../../assets/css/modal-style.css";
// import "../../../assets/fonts/gilroy/gilroy-style.css";
// import "../../../assets/fonts/moderat/moderat-style.css";
import "../../../assets/css/bootstrap.min.css";
import { get } from '../../../network/requests';
import { getUrl } from '../../../network/url';
import { toast } from 'react-toastify';
toast.configure();
function TestimonialComponent() {
    const [testimonialData, setTestimonialData] = useState('');
    const getTestimonialData = () => {
        const url = getUrl('get_user_testimonials_data');
        return get(`${url}`, false)
            .then((response) => {
                setTestimonialData(response.data.results);
               
            })
            .catch(() => {
                toast.error('Something went wrong', {
                    pauseOnHover: false,
                    position: toast.POSITION.TOP_RIGHT,
                });
            });
    };

    useEffect(() => {
        getTestimonialData();
    }, []);

    return (
        <React.Fragment>
            <section className="testimonials-section" id="testimonials-section">
                <div className="testimonials-div">
                    <div className="heading-div">
                        <div className="container container-1000">
                            <div className="row">
                                <div className="col-lg-12 col-md-12">
                                    <div className="heading-inner-div">
                                        <h2>Testimonials</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="testimonials-owl-slider-main-div">
                        <div className="container container-1000">
                            <div className="row">
                                <div className="col-lg-12 col-md-12">
                                    <div className="testimonials-slider-slider-root">
                                        {testimonialData && testimonialData.length > 0 && (
                                            <OwlCarousel
                                                className="owl-carousel owl-theme testimonials-owl-div"
                                                id="testimonials-owl"
                                                items={1}
                                                navElement='button type="button" role="presentation"'
                                                navClass={["owl-prev", "owl-next"]}
                                                navText={[
                                                    '<span class="span-roundcircle left-roundcircle"><i class="fe fe-chevron-left left-arrow"></i></span>',
                                                    '<span class="span-roundcircle right-roundcircle"><i class="fe fe-chevron-right right-arrow"></i></span>',
                                                ]}
                                                nav
                                                smartSpeed={2300}
                                            >
                                                {testimonialData.map((data, i) => {
                                                    return (
                                                        <div className="item" key={i}>
                                                            <div className="testimonials-card-box">
                                                                <div className="testimonials-card-inner">
                                                                    <div className="user-top-row">
                                                                        <div className="img-thumb"> <img src={data.image} className="img-fluid img-responsive" alt="testimonials" /> </div>
                                                                        <div className="text-content-div">
                                                                            <h3><Link to="/" className="link">{data.name}</Link></h3>
                                                                        </div>
                                                                    </div>
                                                                    <div className="user-desc-row">
                                                                        <div className="desc-div">
                                                                            <p>{data.testimonial_text}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </OwlCarousel>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}

export default TestimonialComponent
