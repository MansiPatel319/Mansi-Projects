import React from 'react';
import '../../assets/css/home-style.css';
import '../../assets/css/style.css';
import '../../assets/css/feather.min.css';
import MainPageBannerComponent from './MainPageBanner/MainPageBannerComponent';
import MeetTheCreatorComponent from '../Main/MeetTheCreator/MeetTheCreatorComponent';
import UltimateOnlineCourseForCreatorsComponent from '../Main/UltimateOnlineCourseForCreators/UltimateOnlineCourseForCreatorsComponent';
import TestimonialComponent from '../Main/Testimonial/TestimonialComponent';
import OurClassComponent from "./OurClassComponent";
import BlockComponent from './BlockComponent';

function MainComponent() {
    return (
        <div id="wrapper" className="wrapper home-wrapper">
            <div className="main-middle-area pt-custom-0">
                <MainPageBannerComponent />
                <OurClassComponent />
                <BlockComponent />
                <MeetTheCreatorComponent />
                <UltimateOnlineCourseForCreatorsComponent />
                <TestimonialComponent />
            </div>
        </div>
    )
}

export default MainComponent
