import React from 'react';
import '../../assets/css/bootstrap.min.css';
import '../../assets/css/all.min.css';
import '../../assets/css/feather.min.css';
import '../../assets/css/chat.css';
import '../../assets/css/style.css';
import UserChatComponent from '../../components/Users/UserChatComponent/UserChatComponent';

function UserChat() {

  return (
    <React.Fragment>
      <div id="wrapper" className="wrapper home-wrapper position-fixed-custom">
        <div className="main-middle-area pt-custom-0">
          <UserChatComponent />
        </div>
      </div>
    </React.Fragment>
  );
}

export default UserChat;
