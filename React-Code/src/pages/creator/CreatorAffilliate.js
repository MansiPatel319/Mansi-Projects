import React, { useEffect } from 'react';
import "../../assets/css/feather.min.css";
import CreatorHeader from '../../components/Header/CreatorHeader';
import FooterComponent from '../../components/Footer/FooterComponent';
import CreatorAffilliateComponent from "../../components/Creator/CreatorAffilliateComponent/CreatorAffilliateComponent";
import { useHistory } from 'react-router-dom';

function CreatorAffilliate() {
    const history = useHistory();
    useEffect(() => {
        const checkCreator = localStorage.getItem('is_creator');
        if (checkCreator === 'true') {
            history.push('/creator-affilliate/users');
        } else {
            history.push('/user-home');
        }
    }, []);
    return (
        <React.Fragment>
            <div id="wrapper" className="wrapper creator-home-wrapper position-fixed-custom">
                <CreatorHeader activeTab="Affilliate" />
                <CreatorAffilliateComponent />
                <FooterComponent auth/>
            </div>
        </React.Fragment>
    )
}

export default CreatorAffilliate
