import React from 'react';
import '../../assets/css/bootstrap.min.css';
import '../../assets/fonts/moderat/moderat-style.css';
import '../../assets/css/all.min.css';
import '../../assets/css/feather.min.css';
import '../../assets/css/chat.css';
import '../../assets/css/style.css';
import UserLiveStreamChatComponent from '../../components/Users/UserChatComponent/UserLiveStreamChatComponent';

function UserLiveStreamChat() {


    return (
        <React.Fragment>
            <div id="wrapper" className="wrapper home-wrapper position-fixed-custom">
                <div className="main-middle-area pt-custom-0">
                    <UserLiveStreamChatComponent />
                </div>
            </div>
        </React.Fragment>
    )
}

export default UserLiveStreamChat;
