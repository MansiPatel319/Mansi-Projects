import React, { useEffect, useState } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { toast } from 'react-toastify';
import { getUrl } from '../../network/url';
import { get } from '../../network/requests';

const TestimonialsComponent = () => {
  
  const [updateIndex, setUpdateIndex] = useState(0);
  const handleUpdate = (e, index) => {
    e.preventDefault();
    setUpdateIndex(index);

  };

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
    <div className="testimonials-div">
      <div className="heading-div">
        <div className="container container-1200">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="heading-inner-div">
                <h2>What Our Users Say</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="testimonials-owl-slider-main-div">
        <div className="container container-1200">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="testimonials-slider-slider-root">
                {testimonialData.length > 0 && (
                  <OwlCarousel
                    className="owl-carousel owl-theme testimonials-owl-div"
                    id="sync1"
                    loop={true}
                    items={1}
                    margin={15}
                    startPosition={updateIndex}
                    onTranslated={(e) => {
                      setUpdateIndex(e.item.index);
                    }}
                  >
                    {testimonialData.map((data) => {
                      return (
                        <div className="item" key={data.id}>
                          <div className="testimonials-card-box">
                            <div className="testimonials-card-inner">
                             
                              <div className="user-desc-row">
                                <div className="desc-div">
                                  <p>{data.testimonial_text}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                         

                          <div className="testimonial-info">
                            <h3>{data.name} </h3>
                            {/* <p>Marketing Manager, Netflix </p> */}
                          </div>
                        </div>
                      );
                    })}
                  </OwlCarousel>
                )}
              </div>
              <div className="testimonial-thumb">
                {testimonialData.length > 0 && (
                  <OwlCarousel
                  key={Math.random()}
                    id="sync2"
                    className="owl-carousel owl-theme"
                    loop={testimonialData.length >= 9 ? true : false}
                    items={9}
                  >
                  
                    {testimonialData.map((data, i) => {
                      var className="";
                      if(updateIndex===i){
                        className="item current";
                      }
                      else{
                        className="";
                      }
                      return (
                        <div key={data.id} onClick={(e) => handleUpdate(e, i)}>
                        
                          <div className={className}>
                              <div className="testimonial-profile">
                              <img src={data.image} alt="" />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </OwlCarousel>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <OwlDemo /> */}
    </div>
  );
};

export default TestimonialsComponent;
