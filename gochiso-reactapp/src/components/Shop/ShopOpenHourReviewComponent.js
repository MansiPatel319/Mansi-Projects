/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector } from 'react-redux';
import images from '../../resources/images';
import getLangValue from '../../resources/language';
import strings from '../../resources/strings';
import ImageElement from '../../UI/ImageElement';

function OpenDayAndTime({ dayName, dayTimeRange }) {
  return (
    <>
      <p>
        <span className="days-span">{dayName}</span>
        <span className="times-span">{dayTimeRange}</span>
      </p>
    </>
  );
}

function ShopOpenHourReviewComponent({ shopDetails: { restaurant } }) {
  const lang = useSelector((state) => state.defaultLanguage.lang);
  const shopOpenHours = restaurant.point_percentages;
  let rating = restaurant && restaurant.google_ratings
    ? restaurant.google_ratings
    : 0;
  const stars = [];
  while (stars.length < 5) {
    if (rating > 1) {
      stars.push(1);
    } else if (rating > 0) {
      const empty = Math.abs(0 - rating);
      const half = Math.abs(0.5 - rating);
      const full = Math.abs(1 - rating);
      const closest = Math.min(empty, half, full);
      switch (closest) {
        case empty:
          stars.push(0);
          break;
        case half:
          stars.push(0.5);
          break;
        case full:
          stars.push(1.0);
          break;
        default:
          stars.push(0);
          break;
      }
    } else {
      stars.push(0);
    }
    rating -= 1;
  }
  const getshopOpenHoursKey = (key) => {
    switch (key) {
      case 'mon':
        return getLangValue(strings.MONDAY, lang);
      case 'tue':
        return getLangValue(strings.TUESDAY, lang);
      case 'wed':
        return getLangValue(strings.WEDNESDAY, lang);
      case 'thu':
        return getLangValue(strings.THURSDAY, lang);
      case 'fry':
        return getLangValue(strings.FRIDAY, lang);
      case 'sat':
        return getLangValue(strings.SATURDAY, lang);
      case 'sun':
        return getLangValue(strings.SUNDAY, lang);
      default:
    }
    return undefined;
  };
  return (
    <>
      {restaurant && (
        <div className="open-hr-reviews-div">
          <div className="row mlr-8">
            <div className="col-lg-6 col-md-6 plr-8">
              <div className="open-white-card-bx Hours-white-card-bx">
                <div className="open-white-card-bx-header">
                  <h3>{getLangValue(strings.OPEN_HOURS, lang)}</h3>
                </div>
                <div className="open-white-card-bx-body">
                  <div className="open-hr-time-sheet-div">
                    {Object.keys(shopOpenHours).map((item) => (
                      <OpenDayAndTime
                        dayName={getshopOpenHoursKey(item)}
                        dayTimeRange={
                          shopOpenHours[item].start_times_range
                    }
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-md-6 plr-8">
              <div className="open-white-card-bx reviews-white-card-bx">
                <div className="open-white-card-bx-header">
                  <div className="open-white-card-bx-header-left">
                    <h3>{getLangValue(strings.GOOGLE_REVIEW, lang)}</h3>
                  </div>
                  <div className="open-white-card-bx-header-right">
                    <div className="rating-div">
                      <span className="icon-span">
                        <ImageElement
                          src={images.GoogleLogo}
                          className="img-fluid"
                          alt="icon"
                        />
                      </span>
                      <span className="text">
                        {restaurant.google_ratings
                          ? parseFloat(
                            restaurant.google_ratings,
                          ).toPrecision(2)
                          : 'NA'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="open-white-card-bx-body">
                  <div className="open-google-reviews-div">
                    <div className="star-div">
                      <ul className="star-ul">
                        {stars.map((i, index) => (
                          <li className={i !== 0 ? 'active' : ''} key={index}>
                            <button className="star-btn" type="button">
                              <span className="material-icons-outlined">
                                {i === 0.5 ? 'star_half' : 'star'}
                              </span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ShopOpenHourReviewComponent;
