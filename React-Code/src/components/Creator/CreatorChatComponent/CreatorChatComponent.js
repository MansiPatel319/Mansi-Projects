import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import videoImage from '../../../assets/images/video/WaitingScreen.mp4';
import ChatModalComponent from '../../ChatModalComponent/ChatModalComponent';
import AgoraRTC from 'agora-rtc-sdk-ng';
import useAgora from '../../../hooks/useAgora.tsx';
import MediaPlayer from '../../../components/MediaPlayer.tsx';
import AgoraRTM from 'agora-rtm-sdk';
import { useParams, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getUrl } from '../../../network/url';
import { get, post } from '../../../network/requests';
import { tokenExpire } from '../../../services/auth';
import ProfileImage from '../../../assets/images/profile.png';
import Loader from '../../UI/Loader/Loader';
toast.configure();
const client = AgoraRTC.createClient({ codec: 'h264', mode: 'rtc' });
let remoteUserId = [];
let screenID = [];
const chatClient = AgoraRTM.createInstance('7b3ca442d36d4cf49bcc2cc4cb29e703');

function CreatorChatComponent() {
  const history = useHistory();
  const [isModalOpen, setisModalOpen] = useState(false);
  const [isWebCamactive, setisWebCamactive] = useState(false);
  const [isAudioTrackEnable, setisAudioTrackEnable] = useState(true);
  const [isVideoTrackEnable, setisVideoTrackEnable] = useState(true);
  const [isUserVideoEnable, setisUserVideoEnable] = useState(true);
  const [isUsersAudioEnable, setisUsersAudioEnable] = useState(true);
  const [creatorProfileDetails, setcreatorProfileDetails] = useState('');
  const [userDetails, setUserDetails] = useState('');
  // const [activeTab, setactiveTab] = useState('messages');
  const [isScreenSharingActive, setisScreenSharingActive] = useState(false);
  const {
    localVideoTrack,
    leave,
    join,
    joinState,
    remoteUsers,
    isEnableAudioFunc,
    isEnableVideoFunc,
  } = useAgora(client);
  const [screenStream, setscreenStream] = useState('');

  const [isLogin, setisLogin] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const handleChatModalClick = () => {
    setisModalOpen(!isModalOpen);
  };
  const params = useParams();

  const handleChannelJoin = () => {
    // let channelJoinCredentials = localStorage.getItem('joinChannelCredentials');
    // let channelData = JSON.parse(channelJoinCredentials);
    // if (channelData === undefined || channelData === null) {
    const url = getUrl('join_channel');
    get(`${url}?call_type=session&call_id=${params.sessionId}`, true)
      .then((response) => {
        const {
          data: { data, code, status, message },
        } = response;
        switch (code) {
          case 200:
            if (status === true) {
              // console.log(data);
              handleJoinChannel(data);
              localStorage.setItem('joinChannelCredentials', JSON.stringify(data));
            }
            break;
          case 400:
            toast.error(message, {
              pauseOnHover: false,
              position: toast.POSITION.TOP_RIGHT,
            });
            break;
          default:
            toast.error(message, {
              pauseOnHover: false,
              position: toast.POSITION.TOP_RIGHT,
            });
        }
      })
      .catch((error) => {
        tokenExpire(error.response, history);
      });
    // } else {
    //   handleJoinChannel(channelData);
    // }
  };

  const userJoinChannel = () => {
    const url = getUrl('get_all_creator_session-seat-holder');
    get(`${url}`, true)
      .then((response) => {
        const {
          data: { code, data, status, message },
        } = response;
        switch (code) {
          case 200:
            if (status === true) {
              for (let i = 0; i < data.length; i++) {
                if (data[i].time_slot_id === parseInt(params.sessionId)) {
                  setUserDetails(data[i].user);
                }
              }
            }
            break;
          case 400:
            toast.error(message, {
              pauseOnHover: false,
              position: toast.POSITION.TOP_RIGHT,
            });
            break;
          default:
            toast.error(message, {
              pauseOnHover: false,
              position: toast.POSITION.TOP_RIGHT,
            });
        }
      })
      .catch((error) => {
        tokenExpire(error.response, history);
      });
  };

  // const handleActiveTab = (activetab) => {
  //   setactiveTab(activetab);
  // };

  const handleJoinChannel = (data) => {

    join(data.appID, data.channel_name, data.token);
    setisWebCamactive(true);
    if (!isLogin) {
      chatClient
        .login({ uid: creatorProfileDetails.username })
        .then(() => {
          setisLogin(true);
        })
        .catch(() => {
          setisLogin(false);
        });
    }
  };

  const handleWebcamOff = () => {
    leave();
    setisWebCamactive(false);
    chatClient.logout();
    handleSessionEnd();
    // setisScreenSharingActive(false);
  };

  const handleAudioTrack = () => {
    isEnableAudioFunc(!isAudioTrackEnable);
    setisAudioTrackEnable(!isAudioTrackEnable);
  };

  const handleVideoTrack = () => {
    setisVideoTrackEnable(!isVideoTrackEnable);
    isEnableVideoFunc(!isVideoTrackEnable);
  };
  const screenClient = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

  async function handleOnScreenSharing() {
    let channelJoinCredentials = localStorage.getItem('joinChannelCredentials');
    let channelData = JSON.parse(channelJoinCredentials);
    await screenClient.join(channelData.appID, channelData.channel_name, channelData.token);
    AgoraRTC.createScreenVideoTrack({
      encoderConfig: '1080p_1',
    }).then((localScreenTrack) => {
      screenClient.publish(localScreenTrack);
      setscreenStream(localScreenTrack);
      setisLoading(true)
      handleActiveScreenStatusChange('True');
    });
    return screenClient;
  }

  const handleSessionEnd = () => {
    let channelJoinCredentials = localStorage.getItem('joinChannelCredentials');
    let channelData = JSON.parse(channelJoinCredentials);
    const url = getUrl('end_session');
    post(`${url}?call_type=session&call_id=${params.sessionId}`, {}, true)
      .then((response) => {
        const {
          data: { code, status, message },
        } = response;
        switch (code) {
          case 200:
            if (status === true) {
              setisLoading(true)
              handleActiveScreenStatusChange('False');
              if (channelData !== undefined || channelData !== null) {
                localStorage.removeItem('joinChannelCredentials');
              }
            }
            break;
          case 400:
            toast.error(message, {
              pauseOnHover: false,
              position: toast.POSITION.TOP_RIGHT,
            });
            break;
          default:
            toast.error(message, {
              pauseOnHover: false,
              position: toast.POSITION.TOP_RIGHT,
            });
        }
      })
      .catch((error) => {
        tokenExpire(error.response, history);
      });
  };

  const handleScreensharing = () => {
    let channelJoinCredentials = localStorage.getItem('joinChannelCredentials');
    let channelData = JSON.parse(channelJoinCredentials);
    const url = getUrl('get_screen_share_status');
    get(`${url}/${params.sessionId}/`, true)
      .then((response) => {
        const {
          data: { code, data, status, message },
        } = response;
        switch (code) {
          case 200:
            if (status === true) {
              setisScreenSharingActive(data.screen_share);
              if (data.screen_share) {
                handleScreenSharingStatus();
              } else {
                if (channelData !== undefined || channelData !== null) {
                  handleOnScreenSharing();
                }
              }
              // setisScreenShareActive(data.screen_share);
            }
            break;
          case 400:
            toast.error(message, {
              pauseOnHover: false,
              position: toast.POSITION.TOP_RIGHT,
            });
            break;
          default:
            toast.error(message, {
              pauseOnHover: false,
              position: toast.POSITION.TOP_RIGHT,
            });
        }
      })
      .catch((error) => {
        tokenExpire(error.response, history);
      });
  };

  const handleScreenSharingStatus = () => {
    toast.error('Screen is already shared by some one else in this channel', {
      pauseOnHover: false,
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const handleActiveScreenStatusChange = (status) => {
    const url = getUrl('get_screen_share_status');
    post(`${url}/${params.sessionId}/?screen_share=${status}`, '', true)
      .then((response) => {
        const {
          data: { code, status, message },
        } = response;
        switch (code) {
          case 200:
              setisScreenSharingActive(status);
              setisLoading(false)
            break;
          case 400:
            toast.error(message, {
              pauseOnHover: false,
              position: toast.POSITION.TOP_RIGHT,
            });
            break;
          default:
            toast.error(message, {
              pauseOnHover: false,
              position: toast.POSITION.TOP_RIGHT,
            });
        }
      })
      .catch((error) => {
        tokenExpire(error.response, history);
      });
  };

  useEffect(() => {
    if (screenStream) {
      screenStream.on('track-ended', function () {
        setisLoading(true)
        handleActiveScreenStatusChange('False');
        setisScreenSharingActive(false);
      });
    }
  }, [screenStream]);

  useEffect(() => {
    client.on('user-joined', function (user) {
      if (remoteUserId.length === 0) {
        for (let i = 0; i < 1; i++) {
          remoteUserId.push(user.uid);
        }
      }
      setTimeout(() => {
        getActiveStatusOfScreen();
      }, 5000);
    });
    client.on('user-left', () => {
      handleWebcamOff();
    })
  }, []);

  const getProfileDetails = () => {
    const url = getUrl('creator_profile');
    get(url, true)
      .then((response) => {
        const {
          data: { code, data, status, message },
        } = response;
        switch (code) {
          case 200:
            if (status === true) {
              setcreatorProfileDetails(data);
            }
            break;
          case 400:
            toast.error(message, {
              pauseOnHover: false,
              position: toast.POSITION.TOP_RIGHT,
            });
            break;
          default:
            toast.error(message, {
              pauseOnHover: false,
              position: toast.POSITION.TOP_RIGHT,
            });
        }
      })
      .catch((error) => {
        tokenExpire(error.response, history);
      });
  };

  const getActiveStatusOfScreen = () => {
    const url = getUrl('get_screen_share_status');
    get(`${url}/${params.sessionId}/`, true)
      .then((response) => {
        const {
          data: { code, data, status, message },
        } = response;
        switch (code) {
          case 200:
            if (status === true) {
              setisScreenSharingActive(data.screen_share);
            }
            break;
          case 400:
            toast.error(message, {
              pauseOnHover: false,
              position: toast.POSITION.TOP_RIGHT,
            });
            break;
          default:
            toast.error(message, {
              pauseOnHover: false,
              position: toast.POSITION.TOP_RIGHT,
            });
        }
      })
      .catch((error) => {
        tokenExpire(error.response, history);
      });
  };

  useEffect(() => {
    getProfileDetails();
    userJoinChannel();
  }, []);

  useEffect(() => {
    client.on('user-unpublished', function (evt, mediaType) {
      getActiveStatusOfScreen();
      if (mediaType === 'audio' && isUsersAudioEnable) {
        setisUsersAudioEnable(false);
      }
      if (mediaType === 'video' && isUserVideoEnable) {
        setisUserVideoEnable(false);
      }
    });
    client.on('user-published', function (evt, mediaType) {
      getActiveStatusOfScreen();

      if (mediaType === 'audio') {
        setisUsersAudioEnable(true);
      }
      if (mediaType === 'video') {
        setisUserVideoEnable(true);
      }
    });
  }, []);

  useEffect(() => {
    let channelJoinCredentials = localStorage.getItem('joinChannelCredentials');
    let channelData = JSON.parse(channelJoinCredentials);
    client.on('token-privilege-will-expire', async function () {
      if (channelData !== undefined || channelData !== null) {
        await client.renewToken(channelData.token);
      }
    });
    client.on('token-privilege-did-expire', async function () {
      if (channelData !== undefined || channelData !== null) {
        await client.renewToken(channelData.token);
      }
    });
  }, []);
  const handleSubmitBack = () => {
    history.push("/creator-home")
  }

  return (
    <React.Fragment>
      <section className="general-chat-section general-chat-section" id="user-chat-section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 col-md-12 p-0">
              <div className={`general-chat-div ${isModalOpen ? 'active' : ''}`} id="chat-div">
                <div className="general-chat-row">
                  <div
                    className={`container-general-video-div ${isModalOpen ? 'active' : ''}`}
                    id="video-content-left"
                  >
                    <div className="general-video-root">
                      <div className="general-video-back">
                        {isWebCamactive ? (
                          <>
                            {userDetails && remoteUsers.length === 0 ? (
                              <>

                                <MediaPlayer
                                  videoTrack={localVideoTrack}
                                  userType="localUser"
                                  isLocalVideoEnabled={isVideoTrackEnable}
                                  isCreatorOnly={true}
                                  localUserProfileImg={
                                    creatorProfileDetails.profile_image ===
                                      'https://myapp-user-uploads154822-dev.s3.amazonaws.com/sample.jpg' ||
                                      creatorProfileDetails.profile_image === null ||
                                      creatorProfileDetails.profile_image === undefined
                                      ? ProfileImage
                                      : creatorProfileDetails.profile_image
                                  }
                                ></MediaPlayer>
                              </>
                            ) : (
                              <>
                                {userDetails &&
                                  remoteUsers.map(
                                    (user) => (
                                      (
                                        <div key={user.uid}>
                                          {remoteUserId.map((data, i) => {
                                            return (
                                              <React.Fragment key={i}>
                                                {data === user.uid ? (
                                                  <>
                                                    {(user['isScreenshare'] = false)}
                                                    <MediaPlayer
                                                      videoTrack={user.videoTrack}
                                                      audioTrack={user.audioTrack}
                                                      isScreenShare={isScreenSharingActive}
                                                      userType="remoteUser"
                                                      isRemoteVideoEnable={!user._video_muted_}
                                                      remoteUserProfileImg={
                                                        userDetails.profile_image ===
                                                          'https://myapp-user-uploads154822-dev.s3.amazonaws.com/sample.jpg' ||
                                                          userDetails.profile_image === undefined ||
                                                          userDetails.profile_image === null
                                                          ? ProfileImage
                                                          : userDetails.profile_image
                                                      }
                                                      remoteUserList={user}
                                                    ></MediaPlayer>
                                                  </>
                                                ) : (
                                                  <>
                                                    {(user['isScreenshare'] = true)}
                                                    {screenID.push(user.uid)}
                                                    <MediaPlayer

                                                      videoTrack={user.videoTrack}
                                                      audioTrack={user.audioTrack}
                                                      isScreenShare={isScreenSharingActive}
                                                      userType="remoteUser"
                                                      isRemoteVideoEnable={!user._video_muted_}
                                                      remoteUserProfileImg={
                                                        userDetails.profile_image ===
                                                          'https://myapp-user-uploads154822-dev.s3.amazonaws.com/sample.jpg' ||
                                                          userDetails.profile_image === undefined ||
                                                          userDetails.profile_image === null
                                                          ? ProfileImage
                                                          : userDetails.profile_image
                                                      }
                                                      remoteUserList={user}
                                                    ></MediaPlayer>
                                                  </>
                                                )}
                                              </React.Fragment>
                                            );
                                          })}
                                        </div>
                                      )
                                    ),
                                  )}
                                <>
                                  <MediaPlayer
                                    videoTrack={localVideoTrack}
                                    userType="localUser"
                                    isLocalVideoEnabled={isVideoTrackEnable}
                                    isCreatorOnly={false}
                                    localUserProfileImg={
                                      creatorProfileDetails.profile_image ===
                                        'https://myapp-user-uploads154822-dev.s3.amazonaws.com/sample.jpg' ||
                                        creatorProfileDetails.profile_image === null ||
                                        creatorProfileDetails.profile_image === undefined
                                        ? ProfileImage
                                        : creatorProfileDetails.profile_image
                                    }
                                  ></MediaPlayer>
                                </>
                              </>
                            )}

                          </>
                        ) : (
                          <video
                            className="video-full"
                            id="live-video-stream-play"
                            loop
                            autoPlay={true}
                            muted={false}
                          >
                            <source src={videoImage} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        )}
                      </div>
                      <div className="general-video-content">
                        <div className="general-video-content-row">
                          <div className="general-video-top general-video-top-fixed">
                            <div className="general-video-top-row">
                              <div className="general-video-left">
                                {!isWebCamactive && (
                                  <Link
                                    to="#"
                                    className="btn btn-common-primary live-video no-cursor mr-16"
                                  >
                                    <i className="bg-custom-icon video-camera-new-icon"></i> Live
                                  </Link>
                                )}
                                {!isWebCamactive && (
                                  <Link
                                    to="#"
                                    className="btn btn-common-primary white-black-primary"
                                    onClick={handleSubmitBack}
                                  >
                                    Back
                                  </Link>
                                )}
                              </div>
                            </div>
                            <div
                              className={
                                isWebCamactive
                                  ? 'general-video-top-row2 d-none'
                                  : 'general-video-top-row2'
                              }
                            >
                              <div className="disc-div">
                                {/* <p>
                                  Vivamus suscipit tortor eget felis porttitor volutpat Mauris
                                  blandit aliquet elit
                                </p> */}
                              </div>
                            </div>
                            <div className="center-body-middle-div"></div>
                          </div>
                          <div className="general-video-bottom general-video-bottom-fixed">
                            <div className="general-video-bottom-row">
                              <div className="white-icon-text-list">
                                <div className="white-icon-text-list-row">
                                  <div className="white-icon-text-box" onClick={handleAudioTrack}>
                                    {joinState && (
                                      <Link to="#" className="white-icon-text-link">
                                        <span className="white-icon-span">
                                          {!isAudioTrackEnable ? (
                                            <i className="bg-custom-icon mic-off-icon"></i>
                                          ) : (
                                            <i className="bg-custom-icon mic-icon"></i>
                                          )}
                                        </span>
                                      </Link>
                                    )}
                                  </div>
                                  <div className="white-icon-text-box" onClick={handleVideoTrack}>
                                    {joinState && (
                                      <Link to="#" className="white-icon-text-link">
                                        <span className="white-icon-span">
                                          {!isVideoTrackEnable ? (
                                            <i className="bg-custom-icon video-cam-off-icon"></i>
                                          ) : (
                                            <i className="bg-custom-icon video-cam-icon"></i>
                                          )}
                                        </span>
                                      </Link>
                                    )}
                                  </div>
                                  {remoteUsers.length > 0 && (
                                    <div
                                      className="white-icon-text-box"
                                      onClick={handleScreensharing}
                                    >
                                      {joinState && (
                                        <Link to="#" className="white-icon-text-link">
                                          <span className="white-icon-span">
                                            <i className="bg-custom-icon screenshare-icon"></i>
                                          </span>
                                        </Link>
                                      )}
                                    </div>
                                  )}
                                  {!joinState ? (
                                    <div
                                      className="white-icon-text-box"
                                      disabled={joinState}
                                      onClick={handleChannelJoin}
                                    >
                                      <Link
                                        to="#"
                                        className="btn btn-common-primary live-video no-cursor mr-16"
                                        style={{ backgroundColor: '#ee2f46', backgroundImage: 'none' }}
                                      >Join Session</Link>
                                    </div>
                                  ) : (
                                    <div
                                      className="white-icon-text-box"
                                      disabled={!joinState}
                                      onClick={handleWebcamOff}
                                    >
                                      <Link
                                        to="#"
                                        className="btn btn-common-primary live-video no-cursor mr-16"
                                        style={{ backgroundColor: '#ee2f46', backgroundImage: 'none' }}
                                      >Finish Session</Link>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`chatting-general-div ${isModalOpen ? 'active' : ''}`}
                    id="chatting-group-right"
                  >
                    <div className="backdrop-progress"></div>
                    <div className="arrow-group-box">
                      <Link
                        to="#"
                        className="btn-arrow-bar"
                        id="chat-slider-button"
                        onClick={handleChatModalClick}
                      >
                        <span className="text-span-row">
                          <span className="round-span">
                            <i className="fe fe-chevron-left arrow"></i>
                          </span>
                        </span>
                      </Link>
                    </div>

                    <div className="chatting-general-row">
                      <div className="chat-progress-group-inner">
                        <div className="chat-progress-group-header">
                          <div className="progress-group-header-left">
                            <h3>Chat</h3>
                            <div className="in-chat-mp-top-right-div">
                              <div className="in-chat-mp-btn-group-div">
                                <ul className="nav-tabs-custom">
                                  <li
                                    className={`nav-item-custom active`}
                                  // onClick={() => {
                                  //   handleActiveTab('messages');
                                  // }}
                                  >
                                    <Link className="nav-link" to="#">
                                      Messages
                                    </Link>
                                  </li>
                                  {/* <li
                                    className={`nav-item-custom ${activeTab === 'participants' ? 'active' : ''
                                      }`}
                                    onClick={() => {
                                      handleActiveTab('participants');
                                    }}
                                  >
                                    <Link className="nav-link active" data-toggle="tab" to="#">
                                      Participants
                                    </Link>
                                  </li> */}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                        <ChatModalComponent
                          userClient={chatClient}
                          peer={userDetails}
                          senderDetails={creatorProfileDetails}
                        />
                        {/* {activeTab === 'messages' ? (
                        
                        ) : (
                          <div className="participent-list-main">
                            <div className="participent-list">
                              {userDetails.length === 0 ? (
                                <div
                                  style={{ fontSize: '20px', textAlign: 'center', color: 'white' }}
                                >
                                  <h3>No active participants</h3>
                                </div>
                              ) : (
                                <ul className="list">
                                  {userDetails && (
                                    <li>
                                      <div className="participent-row-li">
                                        <div className="partcipent-user">
                                          <div className="user-img-div">
                                            <img
                                              src={
                                                userDetails.profile_image ===
                                                  'https://myapp-user-uploads154822-dev.s3.amazonaws.com/sample.jpg'
                                                  ? ProfileImage
                                                  : userDetails.profile_image
                                              }
                                              className="img-fluid"
                                              alt="img"
                                            />
                                          </div>
                                          <div className="user-info">
                                            <h3>{userDetails.username}</h3>
                                            <p>Host</p>
                                          </div>
                                        </div>
                                        <div className="pr-user-right-text-div">
                                          <div className="btn-group-div">
                                            {!isUsersAudioEnable && (
                                              <button className="btn-white-rounded">
                                                <span className="material-icons mic-off-icon">
                                                  mic_off
                                                </span>
                                              </button>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </li>
                                  )}
                                </ul>
                              )}
                            </div>
                          </div>
                        )} */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {isLoading && <Loader />}
    </React.Fragment>
  );
}

export default CreatorChatComponent;
