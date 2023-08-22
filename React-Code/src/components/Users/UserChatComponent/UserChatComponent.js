import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import videoImage from '../../../assets/images/video/WaitingScreen.mp4';
import ChatModalComponent from '../../ChatModalComponent/ChatModalComponent';
import AgoraRTC from 'agora-rtc-sdk-ng';
import useAgora from '../../../hooks/useAgora.tsx';
import MediaPlayer from '../../../components/MediaPlayer.tsx';
import AgoraRTM from 'agora-rtm-sdk';
import { useParams, useHistory } from 'react-router-dom';
import { tokenExpire } from '../../../services/auth';
import { toast } from 'react-toastify';
import { getUrl } from '../../../network/url';

import ProfileImage from '../../../assets/images/profile.png';
// import MicOffIcon from '@material-ui/icons/MicOff';
import { get, post } from '../../../network/requests';
import Loader from '../../UI/Loader/Loader';
// import { chatVideoCredentials } from '../../../utils/constants';

let remoteUserId = [];

toast.configure();
const client = AgoraRTC.createClient({ codec: 'h264', mode: 'rtc' });
const chatClient = AgoraRTM.createInstance('7b3ca442d36d4cf49bcc2cc4cb29e703');
function UserChatComponent() {
  const params = useParams();

  const {
    localVideoTrack,
    leave,
    join,
    joinState,
    remoteUsers,
    isEnableAudioFunc,
    isEnableVideoFunc,
  } = useAgora(client);
  const [isModalOpen, setisModalOpen] = useState(false);
  const history = useHistory();
  const [isWebCamactive, setisWebCamactive] = useState(false);
  const [isAudioTrackEnable, setisAudioTrackEnable] = useState(true);
  const [isVideoTrackEnable, setisVideoTrackEnable] = useState(true);
  const [isLogin, setisLogin] = useState(false);
  // const [timerDays, settimerDays] = useState('00');
  // const [timerHours, settimerHours] = useState('00');
  // const [timerMinutes, settimerMinutes] = useState('00');
  // const [timerSeconds, setTimerSeconds] = useState('00');
  // const [isTimerStart, setisTimerStart] = useState(false);
  // const [joinSession, setjoinSession] = useState(false);
  const [userProfileData, setuserProfileData] = useState('');
  const [isCreatorAudioEnabled, setisCreatorAudioEnabled] = useState(true);
  const [isCreatorVideoEnabled, setisCreatorVideoEnabled] = useState(true);
  const [screenStream, setscreenStream] = useState('');
  const [creatorDetails, setCreatorDetails] = useState('');
  // const [activeTab, setactiveTab] = useState('messages');
  const [isScreenSharingActive, setisScreenSharingActive] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const handleSubmitBack = () => {
    history.push("/user-purchase");
  }
 

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

  const handleChannelJoin = () => {
    const url = getUrl('user_channel_credentials');
    post(
      `${url}?call_type=session&call_id=${params.sessionId}&user_uid=${userProfileData.id}`,
      {},
      true,
    )
      .then((response) => {
        const {
          data: { data, code, status, message },
        } = response;
        switch (code) {
          case 200:
            if (status === true) {
              // console.log("data: ", data);
              // setchannelCrdenetials(data);
              // handleJoinChannel(data);
              // localStorage.setItem('joinChannelCredentials', JSON.stringify(data));
              if (
                data.channel_name === null &&
                data.token === null
              ) {
                toast.error("Session is not started yet, please try after sometime!", {
                  pauseOnHover: false,
                  position: toast.POSITION.TOP_RIGHT,
                });
              } else {
                handleJoinChannel(data);
                localStorage.setItem(
                  'joinChannelCredentials',
                  JSON.stringify(data),
                );
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

 
  const handleChatModalClick = () => {
    setisModalOpen(!isModalOpen);
  };

  const handleJoinChannel = (data) => {
    join(data.appID, data.channel_name, data.token);
    setisWebCamactive(true);
    if (!isLogin) {
      chatClient
        .login({ uid: userProfileData.username })
        .then(() => {
          setisLogin(true);
        })
        .catch(() => {
          setisLogin(false);
        });
    }
  };

  const getCreatorDetails = () => {
    const url = getUrl('user_session_listing');
    get(`${url}`, true)
      .then((response) => {
        const {
          data: { code, data, status, message },
        } = response;
        switch (code) {
          case 200:
            if (status === true) {
              for (let i = 0; i < data.data.length; i++) {
                if (data.data[i].time_slot.id === parseInt(params.sessionId)) {
                  setCreatorDetails(data.data[i].creator);

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

  const handleWebcamOff = () => {
    leave();
    setisWebCamactive(false);
    // setisScreenSharingActive(false);
    chatClient.logout();
    // let channelJoinCredentials = localStorage.getItem('joinChannelCredentials');
    // let channelData = JSON.parse(channelJoinCredentials);
    // if (channelData !== undefined || channelData !== null) {
    //   localStorage.removeItem('joinChannelCredentials');
    // }
    // history.push(`/thanks-for-joining-live-stream/${creatorDetails.id}`)
  };

  const handleAudioTrack = () => {
    isEnableAudioFunc(!isAudioTrackEnable);
    setisAudioTrackEnable(!isAudioTrackEnable);
  };

  const handleVideoTrack = () => {
    setisVideoTrackEnable(!isVideoTrackEnable);
    isEnableVideoFunc(!isVideoTrackEnable);
  };

  async function handleOnScreenSharing() {
    let channelJoinCredentials = localStorage.getItem('joinChannelCredentials');
    let channelData = JSON.parse(channelJoinCredentials);
    const screenClient = AgoraRTC.createClient({ codec: 'vp8', mode: 'rtc' });
    await screenClient.join(channelData.appID, channelData.channel_name, channelData.token);
    AgoraRTC.createScreenVideoTrack({
      encoderConfig: '1080p_1',
    }).then((localScreenTrack) => {
      screenClient.publish(localScreenTrack);
      setscreenStream(localScreenTrack);
      setisLoading(true);
      handleActiveScreenStatusChange('True');
    });
    return screenClient;
  }

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
              setisLoading(false);
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

  const getUserProfileData = () => {
    const url = getUrl('getUserProfileData');
    return get(`${url}`, true)
      .then((response) => {
        const {
          data: { code, data, status, message },
        } = response;
        switch (code) {
          case 200:
            if (status === true) {
              setuserProfileData(data);
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

  useEffect(() => {
    client.on('user-joined', function (user) {
      getActiveStatusOfScreen();

      setisCreatorVideoEnabled(true)
      if (remoteUserId.length === 0) {
        for (let i = 0; i < 1; i++) {
          remoteUserId.push(user.uid);
        }
      }
    });
    client.on('user-left', () => {
      handleWebcamOff();
    })
  }, []);

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
    getUserProfileData();
    getCreatorDetails();
  }, []);

  useEffect(() => {
    client.on('user-unpublished', function (evt, mediaType) {
      getActiveStatusOfScreen();
      if (mediaType === 'audio' && isCreatorAudioEnabled) {
        setisCreatorAudioEnabled(false);
      }
      if (mediaType === 'video' && isCreatorVideoEnabled) {
        setisCreatorVideoEnabled(false);
      }
    });
    client.on('user-published', function (evt, mediaType) {
      getActiveStatusOfScreen();
      if (mediaType === 'audio') {
        setisCreatorAudioEnabled(true);
      }
      if (mediaType === 'video') {
        setisCreatorVideoEnabled(true);
      }
    });
  }, []);

  useEffect(() => {
    if (screenStream) {
      screenStream.on('track-ended', () => {
        setisLoading(true);
        handleActiveScreenStatusChange('False');
        setisScreenSharingActive(false);
      });
    }
  }, [screenStream]);

  useEffect(() => {
    let channelJoinCredentials = localStorage.getItem('joinChannelCredentials');
    let channelData = JSON.parse(channelJoinCredentials);
    client.on('token-privilege-will-expire', async function () {
      if (channelData !== undefined || channelData !== null) {
        const res = await client.renewToken(channelData.token);
        console.log('res ==>>', res);
      }
    });
    client.on('token-privilege-did-expire', async function () {
      if (channelData !== undefined || channelData !== null) {
        const res = await client.renewToken(channelData.token);
        console.log('res 2 ====>>', res);
      }

    });
  }, []);
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
                            {creatorDetails &&
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
                                                  isScreenShare={isScreenSharingActive}
                                                  audioTrack={user.audioTrack}
                                                  userType="remoteUser"
                                                  isRemoteVideoEnable={!user._video_muted_}
                                                  remoteUserProfileImg={
                                                    creatorDetails.profile_image ===
                                                      'https://myapp-user-uploads154822-dev.s3.amazonaws.com/sample.jpg' ||
                                                      creatorDetails.profile_image === null ||
                                                      creatorDetails.profile_image === undefined
                                                      ? ProfileImage
                                                      : creatorDetails.profile_image
                                                  }
                                                  remoteUserList={user}
                                                ></MediaPlayer>
                                              </>
                                            ) : (
                                              <>
                                                {(user['isScreenshare'] = true)}
                                                <MediaPlayer
                                                  videoTrack={user.videoTrack}
                                                  audioTrack={user.audioTrack}
                                                  userType="remoteUser"
                                                  isRemoteVideoEnable={!user._video_muted_}
                                                  remoteUserProfileImg={
                                                    creatorDetails.profile_image ===
                                                      'https://myapp-user-uploads154822-dev.s3.amazonaws.com/sample.jpg' ||
                                                      creatorDetails.profile_image === null ||
                                                      creatorDetails.profile_image === undefined
                                                      ? ProfileImage
                                                      : creatorDetails.profile_image
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
                            <MediaPlayer
                              videoTrack={localVideoTrack}
                              userType="localUser"
                              isLocalVideoEnabled={isVideoTrackEnable}
                              localUserProfileImg={
                                userProfileData.profile_image ===
                                  'https://myapp-user-uploads154822-dev.s3.amazonaws.com/sample.jpg' ||
                                  userProfileData.profile_image === null ||
                                  userProfileData.profile_image === undefined
                                  ? ProfileImage
                                  : userProfileData.profile_image
                              }
                            ></MediaPlayer>
                          </>
                        ) : (
                          <video
                            className="video-full"
                            id="live-video-stream-play"
                            loop
                            autoPlay
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
                            <div
                              className={
                                !isWebCamactive
                                  ? 'general-video-top-row'
                                  : 'general-video-top-row d-none'
                              }
                            >
                              <div className="general-video-left">
                                <Link
                                  to="#"
                                  className="btn btn-common-primary live-video no-cursor mr-16"
                                >
                                  <i className="bg-custom-icon video-camera-new-icon"></i> Live
                                </Link>
                                {!isWebCamactive && <Link
                                  to="#"
                                  className="btn btn-common-primary white-black-primary"
                                  onClick={handleSubmitBack}
                                >
                                  Back
                                  </Link>}
                              </div>
                            </div>
                            <div className={!isWebCamactive ? 'general-video-top-row2' : 'd-none'}>
                              <div className="disc-div ">
                                {/* <p>
                                  Vivamus suscipit tortor eget felis porttitor volutpat Mauris
                                  blandit aliquet elit
                                </p> */}
                              </div>
                            </div>
                            <div className="center-body-middle-div"></div>
                          </div>
                          <div>
                            {/* {!joinSession && isTimerStart && <Link to="#" className="link link-black-sp-round" onClick={() => { setisTimerStart(false) }}>
                              <span className="text" style={{ fontSize: '18px', color: 'white', fontWeight: 'bold' }}>{`${timerDays}:${timerHours}:${timerMinutes}:${timerSeconds}`}</span> <br />
                              <span className="text" style={{ fontSize: '18px', color: 'white', fontWeight: 'bold' }}>{`D:H:M:S`}</span>
                            </Link>} */}
                          </div>
                          <div className="general-video-bottom general-video-bottom-fixed">
                            {/* {joinSession ? */}
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
                                      >Leave Session</Link>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                            {/* : ''} */}
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
                          peer={creatorDetails}
                          senderDetails={userProfileData}
                        />
                        {/* {activeTab === 'messages' ? (
                          <ChatModalComponent
                            userClient={chatClient}
                            peer={creatorDetails}
                            senderDetails={userProfileData}
                          />
                        ) : (
                          <div className="participent-list-main">
                            <div className="participent-list">
                              {creatorDetails.length === 0 ? (
                                <div
                                  style={{ fontSize: '20px', textAlign: 'center', color: 'white' }}
                                >
                                  <h3>No active participants</h3>
                                </div>
                              ) : (
                                <ul className="list">
                                  {creatorDetails && (
                                    <li>
                                      <div className="participent-row-li">
                                        <div className="partcipent-user">
                                          <div className="user-img-div">
                                            <img
                                              src={
                                                creatorDetails.profile_image ===
                                                  'https://myapp-user-uploads154822-dev.s3.amazonaws.com/sample.jpg'
                                                  ? ProfileImage
                                                  : creatorDetails.profile_image
                                              }
                                              className="img-fluid"
                                              alt="img"
                                            />
                                          </div>
                                          <div className="user-info">
                                            <h3>{creatorDetails.username}</h3>
                                            <p>Host</p>
                                          </div>
                                        </div>
                                        <div className="pr-user-right-text-div">
                                          <div className="btn-group-div">
                                            {!isCreatorAudioEnabled && (
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

export default UserChatComponent;
