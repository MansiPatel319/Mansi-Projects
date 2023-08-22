import React, { useState, useEffect, useRef  } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import dummyUserImg from '../../assets/images/profile.png';
import { toast } from 'react-toastify';
toast.configure();

function ChatModalComponent({ userClient, peer, senderDetails }) {
  const [input, setinput] = useState("");
  const [messages, setmessages] = useState([]);
  let chatRecord = [...messages];

  const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div  ref={elementRef} />;
  };

  const sendMessage = async () => {
    if(input &&  input.trim()){
    await userClient.sendMessageToPeer(
      { text: input },
      peer.username
    ).then(sendResult => {
      if (sendResult.hasPeerReceived) {
        chatRecord.push({ 'sender': senderDetails.username, 'message': input });
        setmessages(chatRecord);
        handleMessageFromPeer();
        setinput("");
        // setTimeout(() => {
        //   setinput("");
        // }, 500);
        
      } else {
        toast.error("message not reached ", {
          pauseOnHover: false,
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }).catch(error => {
      toast.error(error, {
        pauseOnHover: false,
        position: toast.POSITION.TOP_RIGHT,
      });
    });
  }
  }


  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  }

  function handleMessageFromPeer() {
    return userClient.on('MessageFromPeer', ({ text }, peerId) => {
      chatRecord.push({ 'sender': peerId, 'message': text });
      setmessages(chatRecord);
    
    });
  }

  const handleInpChange = (e) => {
    e.preventDefault();
    setinput(e.target.value);
  }

  useEffect(() => {
    userClient.on('MessageFromPeer', ({ text }, peerId) => {
      chatRecord.push({ 'sender': peerId, 'message': text });
      setmessages(chatRecord);
     
    });
  }, []);


  return (
    <React.Fragment>
      <div className="chat-area-box-root">
        <div className="card chat-box" id="chatbox">
          <div className="card-body chat-content">
            <div className="card-body-row">
              {messages.length > 0 && senderDetails &&
                messages.map((chatData, i) => {
                  return (
                    <div
                      className={`chat-item ${senderDetails.username !== chatData.sender ? 'chat-left' : 'chat-right'
                        }`}
                      key={i}
                    >
                      {senderDetails.username !== chatData.sender && (
                        <div className="user-img-thumb" >
                          <img src={peer.profile_image === null || peer.profile_image === "https://myapp-user-uploads154822-dev.s3.amazonaws.com/sample.jpg" || peer.profile_image === undefined ? dummyUserImg : peer.profile_image} className="img-fluid img-user" />
                        </div>
                      )}
                      <div className="chat-details">
                        <div className="chat-user">{chatData.sender}</div>
                        <div className={`chat-text ${senderDetails.username !== chatData.sender ? 'chat-text2' : ''}`} >
                          {chatData.message}
                        </div>
                        <br />
                      </div>
                    </div>
                  );
                })
              }
              <AlwaysScrollToBottom />
            </div>
          </div>

          <div className="card-footer chat-form">
            <div className="card-footer-row">
              <form className="card-form" id="chat-form">
                <textarea className="form-control" placeholder="Write a message" value={input} onChange={handleInpChange} onKeyPress={(e) => { handleKeyPress(e) }}></textarea>
                <Link className="btn btn-primary" type="submit" onClick={sendMessage} to="#">
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

export default ChatModalComponent;

ChatModalComponent.propTypes = {
  userClient: PropTypes.any,
  peer: PropTypes.any,
  senderDetails: PropTypes.any,
};
