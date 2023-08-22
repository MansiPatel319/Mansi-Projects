import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import dummyUserImg from '../../assets/images/profile.png';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { setChatMessage } from '../../actions/ChatAction';
toast.configure();

function ChatLiveStreamModalComponent({ channelName, senderDetails }) {
  const chatMessges = useSelector((state) => state.Chat.messages);
  const dispatch = useDispatch();
  const [input, setinput] = useState('');
  let chatRecord = [...chatMessges];

  const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div className="test "  ref={elementRef} />;
  };

  const handleSendMessage = async () => {
    // try {
      if(input &&  input.trim()){
        await channelName
        .sendMessage({ text: input })
        .then(() => {
          chatRecord.push({ sender: senderDetails.username, message: input,profile_image:senderDetails.profile_image });
          dispatch(setChatMessage(chatRecord));
          handleMessageFromPeer();
          // setTimeout(() => {
          //   setinput('');
          // }, 300);
          setinput('');
        })
        .catch(() => {
          // console.log("error: ", error);
        });
      }
        
      
   
    
    // }
    // catch () {
    //     console.log("Client is not logged in");
    // }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  function handleMessageFromPeer() {
    return channelName.on('ChannelMessage', ({ text }, senderId) => {
      chatRecord.push({ sender: senderId, message: text });
      dispatch(setChatMessage(chatRecord));
     
    });
  }

  const handleInpChange = (e) => {
    e.preventDefault();
    setinput(e.target.value);
  };

  useEffect(() => {
    channelName.on('ChannelMessage', ({ text }, senderId) => {
      chatRecord.push({ sender: senderId, message: text });
      dispatch(setChatMessage(chatRecord));
      
    });
  }, []);

  return (
    <React.Fragment>
      <div className="chat-area-box-root">
        <div className="card chat-box" id="chatbox">
          <div className="card-body chat-content">
            <div  className="card-body-row">
              {chatMessges?.length > 0 &&
                senderDetails &&
                chatMessges?.map((chatData, i) => {
                  return (
                    <div
                      className={`chat-item ${
                        senderDetails.username !== chatData.sender ? 'chat-left' : 'chat-right'
                      }`}
                      key={i}
                    >
                      {senderDetails.username !== chatData.sender && (
                        <div className="user-img-thumb">
                          <img
                            src={
                             ( chatData.profile_image === null ||
                              chatData.profile_image ===
                                'https://myapp-user-uploads154822-dev.s3.amazonaws.com/sample.jpg' ||
                                chatData.profile_image === undefined)
                                ? dummyUserImg
                                : chatData.profile_image
                            }
                            className="img-fluid img-user"
                          />
                        </div>
                      )}
                      <div className="chat-details" >
                        <div className="chat-user" >{chatData.sender}</div>
                        <div 
                          className={`chat-text ${
                            senderDetails.username !== chatData.sender ? 'chat-text2' : ''
                          }`}
                        >
                          {chatData.message }
                         
                        </div>
                         
                       
                      </div>

                     
                    </div>
                  );
                })}
                 <AlwaysScrollToBottom />
            </div>
          </div>
        
          <div  className="card-footer chat-form">
            <div className="card-footer-row">
              <form className="card-form" id="chat-form">
                <textarea
                  className="form-control"
                  placeholder="Write a message"
                  value={input}
                  onChange={handleInpChange}
                  onKeyPress={(e) => {
                    handleKeyPress(e);
                  }}
                ></textarea>
                <Link className="btn btn-primary" type="submit" onClick={handleSendMessage} to="#">
                  <i className="fa fa-play"></i>
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
     
    </React.Fragment>
  );
}

export default ChatLiveStreamModalComponent;

ChatLiveStreamModalComponent.propTypes = {
  channelName: PropTypes.any,
  senderDetails: PropTypes.any,
};
