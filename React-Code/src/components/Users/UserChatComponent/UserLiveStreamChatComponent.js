import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import videoImage from '../../../assets/images/video/v2.mp4';
import ChatLiveStreamModalComponent from '../../ChatModalComponent/ChatLiveStreamModalComponent';
import AgoraRTC from 'agora-rtc-sdk-ng';
import useAgora from '../../../hooks/useAgora.tsx';
import LiveStreamMediaPlayer from '../../../components/LiveStreamMediaPlayer.tsx';
// import { chatVideoCredentials } from '../../../utils/constants';
import AgoraRTM from 'agora-rtm-sdk';
import { toast } from 'react-toastify';
import { getUrl } from '../../../network/url';
import { get, post } from '../../../network/requests';
import { tokenExpire } from '../../../services/auth';
import { useParams } from 'react-router-dom';
import ProfileImage from '../../../assets/images/profile.png';
import { useDispatch } from 'react-redux';
import { setCreatorId } from '../../../actions/creatorId.js';
// import MicOffIcon from '@material-ui/icons/MicOff';
// import PanToolIcon from '@material-ui/icons/PanTool';
// import MicIcon from '@material-ui/icons/Mic';

toast.configure();
const client = AgoraRTC.createClient({ mode: 'live', codec: 'vp8' });
const chatClient = AgoraRTM.createInstance('7b3ca442d36d4cf49bcc2cc4cb29e703');
const channel = chatClient.createChannel('livestream'); // Pass your channel ID here.
const messageSender = AgoraRTM.createInstance('966ec19969b84e558fc3b3e0d4794669');
const screenshareChannel = messageSender.createChannel('screenShare');
let remoteUserId = [];
let newCreatorId;
let creactorDetailsData = undefined
function UserLiveStreamChatComponent() {
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [isModalOpen, setisModalOpen] = useState(false);
  const [isWebCamactive, setisWebCamactive] = useState(false);
  const [isAudioTrackEnable, setisAudioTrackEnable] = useState(true);
  const [isVideoTrackEnable, setisVideoTrackEnable] = useState(true);
  const [isLogin, setisLogin] = useState(false);
  const [isCreatorAudioEnabled, setisCreatorAudioEnabled] = useState(true);
  const [isCreatorVideoEnabled, setisCreatorVideoEnabled] = useState(true);
  const [channelCredentials, setchannelCredentials] = useState('');
  // const [userDetails, setUserDetails] = useState('');
  const [userProfileData, setuserProfileData] = useState('');
  const [screenStream, setscreenStream] = useState('');
  const [creatorDetails, setcreatorDetails] = useState('');
  const [clientRole, setclientRole] = useState('audience');
  const [activeTab, setactiveTab] = useState('messages');
  // const [streamTitle, setStreamTitle] = useState('');
  // const [activeUserList, setactiveUserList] = useState([]);
  const [activeHostData, setActiveHostData] = useState([]);
  let userData = JSON.parse(localStorage.getItem('userCreatorData'));
  const [isScreenSharingActive, setisScreenSharingActive] = useState(false);
  const [isScreenShareByLocal, setisScreenShareByLocal] = useState(false);
  const [screenShareId, setscreenShareId] = useState('');
//   const creatorId = useSelector((state) => state.SetCreatorId.setCreatorId);
  const [isUserHandRaised, setisUserHandRaised] = useState(false);
  // const [userDetails, setuserDetails] = useState(userData);
  let arra = [...activeHostData];
  const {
    localVideoTrack,
    leave,
    joinState,
    join,
    remoteUsers,
    isEnableVideoFunc,
    isEnableAudioFunc,
    unpublishUser,
  } = useAgora(client);

  const handleChatModalClick = () => {
    setisModalOpen(!isModalOpen);
  };

  const handleJoinChannel = async (userRole, chatVideoCredentials) => {
    if (chatVideoCredentials !== undefined) {
      if (userRole === 'host') {
        join(
          chatVideoCredentials.appID,
          chatVideoCredentials.channel_name,
          chatVideoCredentials.token,
        );
      }
      if (userRole === 'audience') {
        client.join(
          chatVideoCredentials.appID,
          chatVideoCredentials.channel_name,
          chatVideoCredentials.token,
        );
      }
    }
    setisWebCamactive(true);
    if (!isLogin) {
     await messageSender
        .login({ uid: userData.username })
        .then(() => {
          setisLogin(true);
          screenshareChannel.join();
        })
        .catch(() => {
          setisLogin(false);
        });
     await chatClient
        .login({ uid: userData.username })
        .then(() => {
          channel.join();
          setisLogin(true);
        })
        .catch(() => {
          setisLogin(false);
        });
    }
  };

  const userJoinChannel = (userRole) => {
    // let channelJoinCredentials = localStorage.getItem('joinChannelCredentials');
    // let channelData = JSON.parse(channelJoinCredentials);
    const url = getUrl('user_stream_join');
    post(
      `${url}?call_type=stream&call_id=${params.streamId}&user_uid=${userProfileData.id}`,
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

              // if (channelData === null) {
               localStorage.setItem('joinChannelCredentials', JSON.stringify(data));
              if (data.uid === null || data.channel_name === null || data.token === null) {
                toast.error('This class has not started yet, please try joining again in a moment.', {
                  pauseOnHover: false,
                  position: toast.POSITION.TOP_RIGHT,
                });
                //   } else {
                //     handleJoinChannel(userRole, chatVideoCredentials);
                //     setchannelCredentials(chatVideoCredentials);
                //     if (channelData === null) {
                //       localStorage.setItem(
                //         'joinChannelCredentials',
                //         JSON.stringify(chatVideoCredentials),
                //       );
                //     }
              } else {
                handleJoinChannel(userRole, data);
                setchannelCredentials(data);
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
    setisLogin(false);
    setisWebCamactive(false);
    setisAudioTrackEnable(false);
    setisVideoTrackEnable(false);
    setclientRole('audience');
    unpublishUser();
    handleLeftStream();
    chatClient.logout();
    messageSender.logout();
    history.push(`/thanks-for-joining-live-stream/${newCreatorId}`);
    if (isScreenShareByLocal) {
      handleActiveScreenStatusChange('False', '');
    }
    // cancelHostRole(userProfileData.id);
  };

  // const cancelHostRole = (userId) => {
  //   console.log('userId: ', userId);
  //   const url = getUrl('post_active_host');
  //   remove(`${url}/${params.streamId}/?user=${userId}`, {}, true)
  //     .then((response) => {
  //       const {
  //         data: { code, status, message },
  //       } = response;
  //       switch (code) {
  //         case 200:
  //           if (status === true) {
  //             // setisScreenShareActive(status);
  //             setclientRole('audience');
  //           }
  //           break;
  //         case 400:
  //           toast.error(message, {
  //             pauseOnHover: false,
  //             position: toast.POSITION.TOP_RIGHT,
  //           });
  //           break;
  //         default:
  //           toast.error(message, {
  //             pauseOnHover: false,
  //             position: toast.POSITION.TOP_RIGHT,
  //           });
  //       }
  //     })
  //     .catch((error) => {
  //       tokenExpire(error.response, history);
  //     });
  // };

  const handleActiveUserList = () => {
    const url = getUrl('active_user_list');
    get(`${url}/${params.streamId}`, true)
      .then((response) => {
        const {
          data: { code, data, message },
        } = response;
        switch (code) {
          case 200:
            if (data.status === true) {
              for (let i = 0; i < data.data.length; i++) {
                if (data.data[i].host) {
                  if (arra.length === 0) {
                    arra.push(data.data[i].user);
                    setActiveHostData(arra);
                  } else {
                    for (let k = 0; k < arra.length; k++) {
                      if (arra[k].id !== data.data[i].user.id) {
                        arra.push(data.data[i].user);
                        setActiveHostData(arra);
                      }
                    }
                  }
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


  useEffect(() => {
    handleActiveUserList();
    channel.on('MemberJoined', () => {
      handleActiveUserList();
      handlleScreenShareIdSend();
    });
    channel.on('MemberLeft', (data) => {
      // if (remoteUsers.length === 0) {
      //   handleWebcamOff();
      // }
      if(data === creactorDetailsData.username) {
        if(remoteUsers.length === 0 ) {
          handleActiveScreenStatusChange('False','');
          handleWebcamOff();
        }
      }
      handleActiveUserList();
    });
  }, []);

  const handleAudioTrack = () => {
    isEnableAudioFunc(!isAudioTrackEnable);
    setisAudioTrackEnable(!isAudioTrackEnable);
  };

  const handleVideoTrack = () => {
    setisVideoTrackEnable(!isVideoTrackEnable);
    isEnableVideoFunc(!isVideoTrackEnable);
  };

  async function handleOnScreenSharing() {
    const screenClient = AgoraRTC.createClient({ codec: 'vp8', mode: 'rtc' });
    let uid = await screenClient.join(
      channelCredentials.appID,
      channelCredentials.channel_name,
      channelCredentials.token,
    );
    let textMsg = uid.toString();
    if(textMsg !== '' && textMsg !== undefined && textMsg !== null) {
      await screenshareChannel && screenshareChannel.sendMessage({ text: textMsg });
    }
    if(uid !== null && uid !== undefined && uid !== '') {
      setscreenShareId(uid);
      localStorage.setItem('screen-share', JSON.stringify(uid));
    }
    AgoraRTC.createScreenVideoTrack({
      encoderConfig: '1080p_1',
    }).then((localScreenTrack) => {
    screenClient.publish(localScreenTrack);
      setscreenStream(localScreenTrack);
      setisScreenShareByLocal(true);
      handleActiveScreenStatusChange('True', uid);
      handlleScreenShareIdSend();  
    });
    return screenClient;
  }

  useEffect(() => {
    screenshareChannel.on('ChannelMessage', ({ text }, senderId) => {
      console.log('message recieved from screen sharing: ', text, senderId);
      if (text !== '' && text !== undefined && text !== null) {
        setscreenShareId(text);
        localStorage.setItem('screen-share', JSON.stringify(text));
        setisScreenSharingActive(true);
      }
    });
  }, []);

  const handlleScreenShareIdSend = async () => {
    let textMsg = screenShareId.toString();
    if(textMsg !== '' && textMsg !== undefined && textMsg !== null) {
      await screenshareChannel.sendMessage({ text: textMsg });
      screenshareChannel.on('ChannelMessage', ({ text }, senderId) => {
        console.log('message recieved from screen sharing: ', text, senderId);
        if (text !== '' && text !== null && text !== undefined) {
          setscreenShareId(text);
          localStorage.setItem('screen-share', JSON.stringify(text));
          setisScreenSharingActive(true);
        }
      });
    }
    
  };

  const handleScreensharing = () => {
    let channelJoinCredentials = localStorage.getItem('joinChannelCredentials');
    let channelData = JSON.parse(channelJoinCredentials);
    const url = getUrl('get_stream_screen_share_status');
    get(`${url}/${params.streamId}/`, true)
      .then((response) => {
        const {
          data: { code, data, status, message },
        } = response;
        switch (code) {
          case 200:
            if (status === true) {
              if (data.screen_share) {
                handleActiveScreenStatusChange('True', data.screen_share_uuid)
                setisScreenSharingActive(data.screen_share);
                handleScreenSharingStatus();
                if(data.screen_share_uuid !== null && data.screen_share_uuid !== undefined && data.screen_share_uuid !== '') {
                  setscreenShareId(data.screen_share_uuid); 
                  localStorage.setItem('screen-share', JSON.stringify(data.screen_share_uuid));
                }               
              } else {
                if (!channelData) {
                  console.log('---------called---------')
                  setscreenShareId('');
                  localStorage.removeItem('screen-share');
                  setisScreenSharingActive(false);
                }
                handleOnScreenSharing(channelData);
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

  const handleActiveTab = (activetab) => {
    setactiveTab(activetab);
  };
  const handleSubmitBack = () => {
    history.push("/user-purchase")
  }
  const handleScreenSharingStatus = () => {
    toast.error('Screen is already shared by some one else in this channel', {
      pauseOnHover: false,
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const getActiveStatusOfScreen = () => {
    if(clientRole !== 'audience') {
    const url = getUrl('get_stream_screen_share_status');
    get(`${url}/${params.streamId}/`, true)
      .then((response) => {
        const {
          data: { code, data, status, message },
        } = response;
        switch (code) {
          case 200:
            if (status === true) {
              if (data.screen_share) {
                if(data.screen_share_uuid !== null && data.screen_share_uuid !== undefined && data.screen_share_uuid !== '') {
                  setscreenShareId(data.screen_share_uuid);
                  localStorage.setItem('screen-share', JSON.stringify(data.screen_share_uuid));
                }
                setisScreenSharingActive(true);
              }
               if (!data.screen_share) {
                 console.log('------called 2------');
                  setscreenShareId('');
                  localStorage.removeItem('');
                  setisScreenSharingActive(false);
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
    }
  };

  const handleActiveScreenStatusChange =  async (status, uid) => {
    const url = await getUrl('get_stream_screen_share_status');
    post(
      `${url}/${params.streamId}/?screen_share=${status}&screen_share_uuid=${uid};`,
      '',
      true,
    )
      .then((response) => {
        const {
          data: { code, data, status, message },
        } = response;
        switch (code) {
          case 200:
            if (status === true) {
              getActiveStatusOfScreen();
              setisScreenSharingActive(data.screen_share);
            } else {
              console.log('------called 3-------')
              setscreenShareId('')
              localStorage.removeItem('screen-share');
              setisScreenSharingActive(false);
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
    if (screenStream) {
      screenStream.on('track-ended', () => {
        handleActiveScreenStatusChange('False', '');
        if(isScreenShareByLocal) {
          screenStream.close();
        }
        // setscreenShareId('');
        setisScreenSharingActive(false);
        setisScreenShareByLocal(false);
      });
    }
  }, [screenStream]);

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

  const getCreatorDetails = () => {
    const url = getUrl('user_stream_listing');
    get(`${url}`, true)
      .then((response) => {
        const {
          data: { code, data, status, message },
        } = response;
        switch (code) {
          case 200:
            if (status === true) {
              for (let i = 0; i < data.data.length; i++) {
                if (parseInt(data.data[i].stream.id) === parseInt(params.streamId)) {
                  creactorDetailsData = data.data[i].stream.creator;
                  setcreatorDetails(data.data[i].stream.creator);
                  dispatch(setCreatorId(data.data[i].stream.creator.id));
                  newCreatorId = data.data[i].stream.creator.id;
                  // setStreamTitle(data.data[i].stream.title);
                  if (arra.length === 0) {
                    arra.push(data.data[i].stream.creator);
                    setActiveHostData(arra);
                  } else {
                    for (let i = 0; i < arra.length; i++) {
                      if (arra[i].id !== data.data[i].stream.creator.id) {
                        arra.push(data.data[i].stream.creator);
                        setActiveHostData(arra);
                      }
                    }
                  }
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

  const handleLeftStream = () => {
    const url = getUrl('user_left_stream');
    post(`${url}?call_type=stream&call_id=${params.streamId}`, {}, true)
      .then((response) => {
        const {
          data: { code, status, message },
        } = response;
        switch (code) {
          case 200:
            if (status === true) {
              toast.success(message, {
                pauseOnHover: false,
                position: toast.POSITION.TOP_RIGHT,
              });
              localStorage.removeItem('joinChannelCredentials');
              handleActiveUserList();
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

  const handleScreenShareOff = (evt) => {
    console.log('-------called 5--------', evt);
    var screenId = localStorage.getItem('screen-share');
    screenId = JSON.parse(screenId)
    console.log('screenId',screenId)
    if(parseInt(evt.uid) === parseInt(screenId)) {
      setTimeout(() => {
        setscreenShareId('');
        localStorage.removeItem('screen-share');
      }, 100);
      setisScreenSharingActive(false);
      setisScreenShareByLocal(false);
    }
  }

  useEffect(() => {
    const sId = screenShareId;
    console.log('sId', sId)
    client.on('user-unpublished', function (evt, mediaType) {
      handleScreenShareOff(evt);
      getActiveStatusOfScreen();
      console.log('========called 4======', evt, mediaType)
      if (mediaType === 'audio' && isCreatorAudioEnabled) {
        setisCreatorAudioEnabled(false);
      }
      if (mediaType === 'video' && isCreatorVideoEnabled) {
        setisCreatorVideoEnabled(false);
      }
    });
    client.on('user-published', function (evt, mediaType) {
      getCreatorDetails();
      if (mediaType === 'audio') {
        setisCreatorAudioEnabled(true);
      }
      if (mediaType === 'video') {
        setisCreatorVideoEnabled(true);
      }
    });
  }, []);

  useEffect(() => {
    // client.on("connection-state-change", (curState, revState, reason) => {
    //     console.log("connection state change: ", curState, revState, reason);
    // });

    client.on('live-streaming-error', function () {
      toast.error('Sorry, we had an issue while trying to live stream. Please try again.', {
        pauseOnHover: false,
        position: toast.POSITION.TOP_RIGHT,
      });
    });

    client.on('error', function (evt) {
      if (evt.reason === 'SOCKET_DISCONNECTED') {
        toast.error('agora_socket_disconnected', {
          pauseOnHover: false,
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    });
  }, []);

  // handle hand raise functions
  const handleOnhandRaise = async () => {
    try {
      if (creatorDetails !== undefined && creatorDetails !== null && creatorDetails !== '') {
        await chatClient.sendMessageToPeer(
          { text: `${userProfileData.username} need access for microphone` },
          creatorDetails.username,
        );
        setisUserHandRaised(true);
        toast.success('You have requested for hand raise', {
          pauseOnHover: false,
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.log(error);
      chatClient
        .login({ uid: userData.username })
        .then(() => {
          channel.join();
          setisLogin(true);
        })
        .catch(() => {
          setisLogin(false);
        });
    }
  };

  const audianceJoinChannel = async (clientRole) => {
    await client.setClientRole(clientRole);
    userJoinChannel(clientRole);
  };

  useEffect(() => {
    try {
      chatClient.on('MessageFromPeer', ({ text }) => {
        if (text === 'true') {
          client.leave();
          chatClient.logout();
          setclientRole('host');
          setisAudioTrackEnable(true);
          setisVideoTrackEnable(true);
          setTimeout(() => {
            audianceJoinChannel('host');
          }, 1000);
        }
        if (text === 'false') {
          leave();
          setisAudioTrackEnable(false);
          setisVideoTrackEnable(false);
          setclientRole('audience');
          setisUserHandRaised(false);

          chatClient.logout();
          setTimeout(() => {
            audianceJoinChannel('audience');
          }, 1000);
        }
      });
    } catch (error) {
      chatClient
        .login({ uid: userData.username })
        .then(() => {
          channel.join();
          setisLogin(true);
        })
        .catch(() => {
          setisLogin(false);
        });
    }
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
    client.on('user-online', function () {
      // console.log("user online", evt);
    });

    client.on('connection-state-change', function (current, prev) {
      console.log('current', current, prev);
    });

    client.on('user-joined', function (user) {
      getCreatorDetails();
      handleActiveUserList();
      getActiveStatusOfScreen();
      if (remoteUserId.length === 0) {
        for (let i = 0; i < 1; i++) {
          remoteUserId.push(user.uid);
        }
      }
    });
  }, []);
  {console.log('screen share', screenShareId)}
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
                            {/*  <div className="general-video-users-webcam"> */}
                            <>
                              {clientRole === 'audience' &&
                              creatorDetails &&
                              remoteUsers.length === 1 ? (
                                <>
                                  {remoteUsers.map((user, i) => {
                                    return (
                                      <React.Fragment key={i}>
                                        <LiveStreamMediaPlayer
                                          widthVideo={100}
                                          screenShareId={
                                            parseInt(screenShareId) !== undefined &&
                                            parseInt(screenShareId)
                                          }
                                          videoTrack={user.videoTrack}
                                          isScreenShare={isScreenSharingActive}
                                          localUserVideoEnabled={
                                            clientRole !== 'audience' ? true : false
                                          }
                                          audioTrack={user.audioTrack}
                                          userType="audience"
                                          isRemoteVideoEnable={isCreatorVideoEnabled}
                                          remoteUserList={user}
                                          remoteUserProfileImg={
                                            creatorDetails.profile_image ===
                                              'https://myapp-user-uploads154822-dev.s3.amazonaws.com/sample.jpg' ||
                                            creatorDetails.profile_image === null ||
                                            creatorDetails.profile_image === undefined
                                              ? ProfileImage
                                              : creatorDetails.profile_image
                                          }
                                        ></LiveStreamMediaPlayer>
                                      </React.Fragment>
                                    );
                                  })}
                                </>
                              ) : clientRole === 'audience' && remoteUsers.length === 2 ? (
                                <div
                                  style={
                                    isScreenSharingActive
                                      ? {}
                                      : { display: 'flex', flexWrap: 'wrap', width: '100%' }
                                  }
                                >
                                  {remoteUsers.map((user, i) => {
                                    return (
                                      <React.Fragment key={i}>
                                       
                                        {
                                          (user['isScreenshare'] =
                                            parseInt(screenShareId) === parseInt(user.uid)
                                              ? true
                                              : false)
                                        }
                                        {user._video_added_ && (
                                          <LiveStreamMediaPlayer
                                            widthVideo={
                                              parseInt(screenShareId) === parseInt(user.uid)
                                                ? 100
                                                : 50
                                            }
                                            videoTrack={user.videoTrack}
                                            screenShareId={
                                              parseInt(screenShareId) !== undefined &&
                                              parseInt(screenShareId)
                                            }
                                            isScreenShare={isScreenSharingActive}
                                            localUserVideoEnabled={
                                              clientRole !== 'audience' ? true : false
                                            }
                                            audioTrack={user.audioTrack}
                                            userType="audience"
                                            isRemoteVideoEnable={isCreatorVideoEnabled}
                                            remoteUserList={user}
                                            remoteUserProfileImg={
                                              creatorDetails.profile_image ===
                                                'https://myapp-user-uploads154822-dev.s3.amazonaws.com/sample.jpg' ||
                                              creatorDetails.profile_image === null ||
                                              creatorDetails.profile_image === undefined
                                                ? ProfileImage
                                                : creatorDetails.profile_image
                                            }
                                          ></LiveStreamMediaPlayer>
                                        )}
                                      </React.Fragment>
                                    );
                                  })}
                                </div>
                              ) : clientRole === 'audience' && remoteUsers.length > 2 ? (
                                remoteUsers.map((user, i) => {
                                  return (
                                    <React.Fragment key={i}>
                                      {
                                        (user['isScreenshare'] =
                                          parseInt(screenShareId) === parseInt(user.uid)
                                            ? true
                                            : false)
                                      }
                                      {user._video_added_ && (
                                        <LiveStreamMediaPlayer
                                          videoTrack={user.videoTrack}
                                          isScreenShare={isScreenSharingActive}
                                          localUserVideoEnabled={
                                            clientRole !== 'audience' ? true : false
                                          }
                                          audioTrack={user.audioTrack}
                                          userType="audience"
                                          isRemoteVideoEnable={isCreatorVideoEnabled}
                                          screenShareId={
                                            parseInt(screenShareId) !== undefined &&
                                            parseInt(screenShareId)
                                          }
                                          remoteUserList={user}
                                          remoteUserProfileImg={
                                            creatorDetails.profile_image ===
                                              'https://myapp-user-uploads154822-dev.s3.amazonaws.com/sample.jpg' ||
                                            creatorDetails.profile_image === null ||
                                            creatorDetails.profile_image === undefined
                                              ? ProfileImage
                                              : creatorDetails.profile_image
                                          }
                                        ></LiveStreamMediaPlayer>
                                      )}
                                    </React.Fragment>
                                  );
                                })
                              ) : null}
                            </>
                            <>
                              {clientRole === 'host' &&
                                creatorDetails &&
                                remoteUsers.map(
                                  (user) => (
                                    (
                                      <div key={user.uid}>
                                        {remoteUserId.map((data, i) => {
                                          return (
                                            <React.Fragment key={i}>
                                              {parseInt(screenShareId) === parseInt(user.uid) ? (
                                                <>
                                                  {(user['isScreenshare'] = true)}
                                                  {user._video_added_ && (
                                                    <LiveStreamMediaPlayer
                                                      videoTrack={user.videoTrack}
                                                      isScreenShare={isScreenSharingActive}
                                                      screenShareId={
                                                        parseInt(screenShareId) !== undefined &&
                                                        parseInt(screenShareId)
                                                      }
                                                      localUserVideoEnabled={
                                                        clientRole !== 'audience' ? true : false
                                                      }
                                                      audioTrack={user.audioTrack}
                                                      userType="remoteUser"
                                                      isRemoteVideoEnable={isCreatorVideoEnabled}
                                                      remoteUserList={user}
                                                      remoteUserProfileImg={
                                                        creatorDetails.profile_image ===
                                                          'https://myapp-user-uploads154822-dev.s3.amazonaws.com/sample.jpg' ||
                                                        creatorDetails.profile_image === null ||
                                                        creatorDetails.profile_image === undefined
                                                          ? ProfileImage
                                                          : creatorDetails.profile_image
                                                      }
                                                    ></LiveStreamMediaPlayer>
                                                  )}
                                                </>
                                              ) : (
                                                <>
                                                  {(user['isScreenshare'] = false)}
                                                  {user._video_added_ && (
                                                    <LiveStreamMediaPlayer
                                                      videoTrack={user.videoTrack}
                                                      isScreenShare={isScreenSharingActive}
                                                      audioTrack={user.audioTrack}
                                                      userType="remoteUser"
                                                      isRemoteVideoEnable={isCreatorVideoEnabled}
                                                      remoteUserProfileImg={
                                                        creatorDetails.profile_image ===
                                                          'https://myapp-user-uploads154822-dev.s3.amazonaws.com/sample.jpg' ||
                                                        creatorDetails.profile_image === null ||
                                                        creatorDetails.profile_image === undefined
                                                          ? ProfileImage
                                                          : creatorDetails.profile_image
                                                      }
                                                      remoteUserList={user}
                                                    ></LiveStreamMediaPlayer>
                                                  )}
                                                </>
                                              )}
                                            </React.Fragment>
                                          );
                                        })}
                                      </div>
                                    )
                                  ),
                                )}
                            </>
                            <div>
                              {clientRole !== 'audience' && (
                                <LiveStreamMediaPlayer
                                  userRole="user"
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
                                ></LiveStreamMediaPlayer>
                              )}
                            </div>
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
                                {!isLogin && (
                                  <Link
                                    to="#"
                                    className="btn btn-common-primary live-video no-cursor mr-16"
                                  >
                                    <i className="bg-custom-icon video-camera-new-icon"></i> Live
                                  </Link>
                                )}
                                  <Link
                                    to="#"
                                    className="btn btn-common-primary white-black-primary"
                                    onClick={handleSubmitBack}
                                  >
                                    Back
                                  </Link>
                              </div>
                            </div>
                            <div className={!isWebCamactive ? 'general-video-top-row2' : 'd-none'}>
                              {!isLogin && (
                                <div className="disc-div ">
                                  <p>{/* {streamTitle} */}</p>
                                </div>
                              )}
                            </div>
                            <div className="center-body-middle-div"></div>
                          </div>
                          <div className="general-video-bottom general-video-bottom-fixed">
                            {/* {joinSession ? */}
                            <div className="general-video-bottom-row">
                              <div className="white-icon-text-list">
                                <div className="white-icon-text-list-row">
                                  <div className="white-icon-text-box">
                                    {clientRole !== 'audience' ? (
                                      <a onClick={handleAudioTrack} href="#" className="white-icon-text-link">
                                        <span className="white-icon-span">
                                          {!isAudioTrackEnable ? (
                                            <i className="bg-custom-icon mic-off-icon"></i>
                                          ) : (
                                            <i className="bg-custom-icon mic-icon"></i>
                                          )}
                                        </span>
                                      </a>
                                    ) : (
                                      ''
                                    )}
                                  </div>
                                  <div className="white-icon-text-box" >
                                    {clientRole !== 'audience' ? (
                                      <a onClick={handleVideoTrack} href="#" className="white-icon-text-link">
                                        <span className="white-icon-span">
                                          {!isVideoTrackEnable ? (
                                            <i className="bg-custom-icon video-cam-off-icon"></i>
                                          ) : (
                                            <i className="bg-custom-icon video-cam-icon"></i>
                                          )}
                                        </span>
                                      </a>
                                    ) : (
                                      ''
                                    )}
                                  </div>
                                  <div
                                    className="white-icon-text-box"
                                    
                                  >
                                    {clientRole !== 'audience' ? (
                                      <a onClick={handleScreensharing} href="#" className="white-icon-text-link">
                                        <span className="white-icon-span">
                                          <i className="bg-custom-icon screenshare-icon"></i>
                                        </span>
                                      </a>
                                    ) : (
                                      ''
                                    )}
                                  </div>
                                  {/* hand raise icon */}
                                  <div className="white-icon-text-box">
                                    {isLogin && isUserHandRaised === false ? (
                                      <a onClick={handleOnhandRaise} href="#" className="white-icon-text-link">
                                        <span className="white-icon-span">
                                          <i className="bg-custom-icon hand-raise-icon"></i>
                                        </span>
                                      </a>
                                    ) : (
                                      ''
                                    )}
                                  </div>
                                  {!isLogin ? (
                                    <div
                                      className="white-icon-text-box"
                                      disabled={joinState}
                                     
                                    >
                                      <a
                                         onClick={() => {
                                          userJoinChannel('audience');
                                        }}
                                        href="#"
                                        className="btn btn-common-primary live-video no-cursor mr-16"
                                        style={{
                                          backgroundColor: '#ee2f46',
                                          backgroundImage: 'none',
                                        }}
                                      >
                                        Join Class
                                      </a>
                                    </div>
                                  ) : (
                                    <div
                                      className="white-icon-text-box"
                                      disabled={!joinState}
                                      
                                    >
                                      <a
                                        onClick={handleWebcamOff}
                                        href="#"
                                        className="btn btn-common-primary live-video no-cursor mr-16"
                                        style={{
                                          backgroundColor: '#ee2f46',
                                          backgroundImage: 'none',
                                        }}
                                      >
                                        {' '}
                                        Leave&nbsp;<span className="mb-hidden">class</span>
                                      </a>
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
                                    className={`nav-item-custom ${
                                      activeTab === 'messages' ? 'active' : ''
                                    }`}
                                    onClick={() => {
                                      handleActiveTab('messages');
                                    }}
                                  >
                                    <Link className="nav-link" to="#">
                                      Messages
                                    </Link>
                                  </li>
                                  <li
                                    className={`nav-item-custom ${
                                      activeTab === 'participants' ? 'active' : ''
                                    }`}
                                    onClick={() => {
                                      handleActiveTab('participants');
                                    }}
                                  >
                                    <Link className="nav-link active" data-toggle="tab" to="#">
                                      Participants
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                        {activeTab === 'messages' ? (
                          <ChatLiveStreamModalComponent
                            channelName={channel}
                            senderDetails={userProfileData}
                          />
                        ) : (
                          <div className="participent-list-main">
                            <div className="participent-list">
                              {arra.length === 0 ? (
                                <div
                                  style={{ fontSize: '20px', textAlign: 'center', color: 'white' }}
                                >
                                  <h3>No active user</h3>
                                </div>
                              ) : (
                                <ul className="list">
                                  {arra &&
                                    arra.length > 0 &&
                                    arra.map((userData, i) => {
                                      return (
                                        <li key={i}>
                                          <div className="participent-row-li">
                                            <div className="partcipent-user">
                                              <div className="user-img-div">
                                                <img
                                                  src={
                                                    userData.profile_image ===
                                                      'https://myapp-user-uploads154822-dev.s3.amazonaws.com/sample.jpg' ||
                                                    userData.profile_image === undefined ||
                                                    userData.profile_image === null
                                                      ? ProfileImage
                                                      : userData.profile_image
                                                  }
                                                  className="img-fluid"
                                                  alt="img"
                                                />
                                              </div>
                                              <div className="user-info">
                                                <h3>{userData.username}</h3>
                                                <p>Host</p>
                                              </div>
                                            </div>
                                            <div className="pr-user-right-text-div">
                                              <div className="btn-group-div">
                                                {!isCreatorAudioEnabled && (
                                                  <button className="btn-white-rounded" key={i}>
                                                    <span className="material-icons mic-off-icon">
                                                      mic_off
                                                    </span>
                                                  </button>
                                                )}
                                              </div>
                                            </div>
                                          </div>
                                        </li>
                                      );
                                    })}
                                </ul>
                              )}
                            </div>
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
      </section>
    </React.Fragment>
  );
}

export default UserLiveStreamChatComponent;
