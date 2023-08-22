import React from 'react';
import '../../assets/css/bootstrap.min.css';
import '../../assets/css/all.min.css';
import '../../assets/css/feather.min.css';
import '../../assets/css/chat.css';
import '../../assets/css/style.css';
import CreatorChatComponent from '../../components/Creator/CreatorChatComponent/CreatorChatComponent';

function CreatorChat() {
  return (
    <React.Fragment>
      <div id="wrapper" className="wrapper home-wrapper">
        <div className="main-middle-area pt-custom-0">
          <CreatorChatComponent />
        </div>
      </div>
    </React.Fragment>
  );
}

export default CreatorChat;
