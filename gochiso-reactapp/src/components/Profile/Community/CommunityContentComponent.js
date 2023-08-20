/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { useSelector } from 'react-redux';
import getLangValue from '../../../resources/language';
import strings from '../../../resources/strings';
import CommunityCountComponent from './CommunityCountComponent';

function CommunityContentComponent(props) {
  const lang = useSelector((state) => state.defaultLanguage.lang);

  return (
    <>
      {props.communityData && (
        <div className="community-color-card-root">
          <div className="row mlr-10">
            <CommunityCountComponent
              communityText={getLangValue(strings.MEMBERS, lang)}
              communityCount={props.communityData.statistics.total_member}
            />

            <CommunityCountComponent
              communityText={getLangValue(
                strings.ACTIONS_FOR_SUSTAINABILITY,
                lang,
              )}
              communityCount={
                props.communityData.statistics.actions_for_sustainability
              }
            />

            <CommunityCountComponent
              communityText={getLangValue(strings.PLACES, lang)}
              communityCount={props.communityData.statistics.total_business}
            />

            <CommunityCountComponent
              communityText={getLangValue(strings.RECOMMENDATIONS, lang)}
              communityCount={props.communityData.statistics.total_reviews}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default CommunityContentComponent;
