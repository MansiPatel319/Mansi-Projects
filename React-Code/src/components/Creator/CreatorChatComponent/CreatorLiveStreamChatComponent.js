import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import videoImage from '../../../assets/images/video/v2.mp4';
import ChatLiveStreamModalComponent from '../../ChatModalComponent/ChatLiveStreamModalComponent';
import AgoraRTC from 'agora-rtc-sdk-ng';
import useAgora from '../../../hooks/useAgora.tsx';
import LiveStreamMediaPlayer from '../../../components/LiveStreamMediaPlayer.tsx';
import AgoraRTM from 'agora-rtm-sdk';
import { toast } from 'react-toastify';
import Loader from '../../UI/Loader/Loader';
// import { chatVideoCredentials } from '../../../utils/constants';
import { getUrl } from '../../../network/url';
import { get, post, remove } from '../../../network/requests';
import { tokenExpire } from '../../../services/auth';
import { useParams } from 'react-router-dom';
import ProfileImage from '../../../assets/images/profile.png';
// import MicOffIcon from '@material-ui/icons/MicOff';
// import PanToolIcon from '@material-ui/icons/PanTool';
// import HighlightOffIcon from '@material-ui/icons/HighlightOff';
toast.configure();
let remoteUserId = [];
// let screenID = [];
const client = AgoraRTC.createClient({ codec: 'h264', mode: 'rtc' });
const chatClient = AgoraRTM.createInstance('7b3ca442d36d4cf49bcc2cc4cb29e703');
const channel = chatClient.createChannel('livestream');
const messageSender = AgoraRTM.createInstance('966ec19969b84e558fc3b3e0d4794669');
const screenshareChannel = messageSender.createChannel('screenShare');
function CreatorLiveStreamChatComponent() {
  const history = useHistory();
  const [isModalOpen, setisModalOpen] = useState(false);
  const [isWebCamactive, setisWebCamactive] = useState(false);
  const [isAudioTrackEnable, setisAudioTrackEnable] = useState(true);
  const [isVideoTrackEnable, setisVideoTrackEnable] = useState(true);
  const {
    localVideoTrack,
    leave,
    join,
    joinState,
    remoteUsers,
    isEnableAudioFunc,
    isEnableVideoFunc,
    unpublishUser,
  } = useAgora(client);
  // const [userDetails, setUserDetails] = useState('');
  const [screenStream, setscreenStream] = useState('');
  const [creatorProfileDetails, setcreatorProfileDetails] = useState('');
  // let userData = localStorage.getItem('userCreatorData');
  const params = useParams();
  const [isLogin, setisLogin] = useState(false);
  const [isLoading, setIsLoadning] = useState(false);
  const [isUserVideoEnable, setisUserVideoEnable] = useState(true);
  const [isUsersAudioEnable, setisUsersAudioEnable] = useState(true);
  const [activeUserList, setactiveUserList] = useState([]);
  const [revokeAccess, setrevokeAccess] = useState([]);
  const [channelCrede, setchannelCrede] = useState('');
  const [activeTab, setactiveTab] = useState('messages');
  const [activeHostProfileImg, setactiveHostProfileImg] = useState('');
  const [isScreenSharingActive, setisScreenSharingActive] = useState(false);
  const [isScreenShareByLocal, setisScreenShareByLocal] = useState(false);
  const [hostActive, setHostActive] = useState(false);
  const [screenShareId, setscreenShareId] = useState('');
  const [isMemberLeft, setIsMemberLeft] = useState(false);
  const [evt, setevt] = useState(undefined);
  const [isRevokeAccessDone, setisRevokeAccessDone] = useState(false);
  let arra = [...revokeAccess];
  let isMemberPresent = false;
  let isHost = false;
  let index = 0;

  const handleChatModalClick = () => {
    setisModalOpen(!isModalOpen);
  };

  const handleJoinChannel = async (chatVideoCredentials) => {
    let channelJoinCredentials = localStorage.getItem('joinChannelCredentials');
    let channelData = JSON.parse(channelJoinCredentials);
    if (
      chatVideoCredentials === '' ||
      chatVideoCredentials === undefined ||
      chatVideoCredentials === null
    ) {
      join(channelData.appID, channelData.channel_name, channelData.token);
    } else {
      join(
        chatVideoCredentials.appID,
        chatVideoCredentials.channel_name,
        chatVideoCredentials.token,
      );
    }
    setisWebCamactive(true);
    if (!isLogin) {
     await messageSender
      .login({ uid: creatorProfileDetails.username })
      .then(() => {
        setisLogin(true);
        screenshareChannel.join();
      })
      .catch(() => {
        setisLogin(false);
      });
     await chatClient
        .login({ uid: creatorProfileDetails.username })
        .then(() => {
          channel.join();
          setisLogin(true);
          })
          .catch(() => {
            setisLogin(false);
        });
    }
  };

  const createChannel = () => {
    // let channelJoinCredentials = localStorage.getItem('joinChannelCredentials');
    // let channelData = JSON.parse(channelJoinCredentials);
    const url = getUrl('join_channel');
    get(`${url}?call_type=stream&call_id=${params.streamId}`, true)
      .then((response) => {
        const {
          data: { data, code, status, message },
        } = response;
        switch (code) {
          case 200:
            if (status === true) {
              // console.log(data);
              handleJoinChannel(data);
              setchannelCrede(data);
              localStorage.setItem('joinChannelCredentials', JSON.stringify(data));
            }
            break;
          case 400:
            if (message === 'Call has already started!') {
              handleJoinChannel(channelCrede);
            } else {
              toast.error(message, {
                pauseOnHover: false,
                position: toast.POSITION.TOP_RIGHT,
              });
            }
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

  const handleActiveUserList = () => {
    const url = getUrl('active_user_list');
    get(`${url}/${params.streamId}`, true)
      .then((response) => {
        const {
          data: { code, data, status, message },
        } = response;
        switch (code) {
          case 200:
            if (status === true) {
              setactiveUserList(data);
              const checkIsHostActive = data.every(i => i.host === false)
              data.map((item) => {
                if (item.host) {
                  setactiveHostProfileImg(data.user.profile_image);
                } 
              });
              if(checkIsHostActive) {
                arra = [];
                setrevokeAccess(arra);
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
    handleActiveScreenStatusChange('False');
    setisScreenSharingActive(false);
    setisScreenShareByLocal(false);
    setisUsersAudioEnable(true);
    unpublishUser();
    setactiveUserList([]);
    setisWebCamactive(false);
    setisAudioTrackEnable(false);
    setisVideoTrackEnable(false);
    handleFinishStream();
    chatClient.logout();
    if (isScreenShareByLocal) {
      // handleActiveScreenStatusChange('False');
    }
    for (let i = 0; i < activeUserList.length; i++) {
      if (activeUserList.host) {
        isHost = false;
        cancelHostRole(activeUserList.user.id);

      }
    }


  };

  const handleFinishStream = () => {
    let channelJoinCredentials = localStorage.getItem('joinChannelCredentials');
    let channelData = JSON.parse(channelJoinCredentials);
    const url = getUrl('end_session');
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

  const handleAudioTrack = () => {
    isEnableAudioFunc(!isAudioTrackEnable);
    setisAudioTrackEnable(!isAudioTrackEnable);
  };

  const handleVideoTrack = () => {
    setisVideoTrackEnable(!isVideoTrackEnable);
    isEnableVideoFunc(!isVideoTrackEnable);
  };

  async function handleOnScreenSharing(chatVideoCredentials) {
    const screenClient = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
    let uid = await screenClient.join(
      chatVideoCredentials.appID,
      chatVideoCredentials.channel_name,
      chatVideoCredentials.token,
    );
    let textMsg = uid.toString();
    setscreenShareId(uid);
    handleActiveScreenStatusChange('True', uid);
    screenshareChannel.sendMessage({ text: textMsg }).then(() => {
      // Your code for handling the event when the channel message is successfully sent.
      }).catch(() => {
      // Your code for handling the event when the channel message fails to be sent.
      });

    AgoraRTC.createScreenVideoTrack({
      encoderConfig: '1080p_1',
    }).then((localScreenTrack) => {
      screenClient.publish(localScreenTrack);
      handleActiveScreenStatusChange('True', uid);
      setscreenStream(localScreenTrack);
      setisScreenShareByLocal(true);
    });
    return screenClient;
  }

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
              setisScreenSharingActive(data.screen_share);
              if (data.screen_share) {
                handleScreenSharingStatus();
                setscreenShareId(data.screen_share_uuid);
              } else {
                if (channelData !== undefined || channelData !== null) {
                  // isEnableVideoFunc(false);
                  handleOnScreenSharing(channelData);
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

  const handleActiveScreenStatusChange = (status, screen_id) => {
    const url = getUrl('get_stream_screen_share_status');
    post(`${url}/${params.streamId}/?screen_share=${status}&screen_share_uuid=${screen_id}`, '', true)
      .then((response) => {
        const {
          data: { code, status, message },
        } = response;
        switch (code) {
          case 200:
            if (status === true) {
              setisScreenSharingActive(status);
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

  const handleActiveHost = (userId) => {
    const url = getUrl('post_active_host');
    post(`${url}/${params.streamId}/?user=${userId}`, '', true)
      .then((response) => {
        const {
          data: { code, status, message },
        } = response;
        switch (code) {
          case 200:
            if (status === true) {
              // setisScreenShareActive(status);
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
    // const token = localStorage.getItem('token');
    // console.log('token', token)
    // if(token === null || token === '' || token === undefined) {
    //   history.push('/user/login')
    // }
    getProfileDetails();
  }, []);

  useEffect(() => {
    if (screenStream) {
      screenStream.on('track-ended', () => {
        screenStream.close();
        isEnableVideoFunc(true);
        handleActiveScreenStatusChange('False');    
        setisScreenSharingActive(false);
        setisScreenShareByLocal(false);
        setscreenShareId('');
      });
    }
  }, [screenStream]);

  const getActiveStatusOfScreen = () => {
    const url = getUrl('get_stream_screen_share_status');
    get(`${url}/${params.streamId}/`, true)
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


  useEffect(() => {
    channel.on('MemberJoined', () => {
      handleActiveUserList();
    });
  }, []);

  useEffect(() => {
    handleActiveUserList();
  }, []);

  useEffect(() => {
    channel.on('MemberLeft', function (evt) {
      // if (!isRevokeAccessDone) {
        // setTimeout(() => {
          handleActiveUserList();
        // }, 4000);
      // }
      setIsMemberLeft(true);
      setevt(evt);
    })
  }, [])

  useEffect(() => {
    if (isMemberLeft) {
      activeUserList.length > 0 && activeUserList.map((item) => {
        if (item.user.username === evt) {
          arra.map((data, i) => {
            if (data.peer === evt) {
              if (item.host === false && data.revokeAccess === (isRevokeAccessDone ? false : true) && data.isHandRaise === true) {
                arra.splice(i, 1);
              }
            }
          })
        }
      })
    }
    setrevokeAccess(arra);
    setIsMemberLeft(true);
    setisRevokeAccessDone(false);
   
  }, [isMemberLeft, activeUserList, evt])

  useEffect(() => {
    client.on('user-joined', function (user) {
      if (remoteUserId.length === 0 && hostActive) {
        for (let i = 0; i < 1; i++) {
          remoteUserId.push(user.uid);
        }
      }

      getActiveStatusOfScreen();
    });

  }, [hostActive]);

  useEffect(() => {
    client.on('user-joined', function (user) {
      ("user: ", user)
      handleActiveUserList();
      let text = screenShareId.toString();
      if(text !== '') {
        handleActiveScreenStatusChange('True', screenShareId);
        screenshareChannel.sendMessage({ text:  text}).then(() => {
          // Your code for handling the event when the channel message is successfully sent.
          }).catch(() => {
          // Your code for handling the event when the channel message fails to be sent.
          });
      }
    
    });
    client.on('user-left', function (user) {
      console.log('user ==>', user);
      // cancelHostRole
    });
  }, [])

  const handleHandRaiseClick = async (peerId, userID) => {

    for (let i = 0; i < arra.length; i++) {
      if (arra[i].revokeAccess === true) {
        isHost = true;
        toast.error('Two hosts are already active', {
          pauseOnHover: false,
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      if (arra[i].peer === peerId && arra[i].isHandRaise === true) {
        index = i;
      }
    }
    if (!isHost) {
      setIsLoadning(true);
      try {
        await chatClient.sendMessageToPeer({ text: 'true' }, peerId);
        setHostActive(true);
        setIsLoadning(false);
        handleActiveHost(userID);
        arra[index].revokeAccess = true;
        arra[index].isHandRaise = false;
        arra[index].user_uid = userID;
      }
      catch (error) {
        setIsLoadning(false);
        chatClient
          .login({ uid: creatorProfileDetails.username })
          .then(() => {
            channel.join();
            setisLogin(true);
            handleHandRaiseClick(peerId, userID);
          });
      }
    }
    setrevokeAccess(arra);
  };

  const cancelHostRole = (userId) => {
    const url = getUrl('post_active_host');
    remove(`${url}/${params.streamId}/?user=${userId}`, {}, true)
      .then((response) => {
        const {
          data: { code, status, message },
        } = response;
        switch (code) {
          case 200:
            if (status === true) {
              // setisScreenShareActive(status);
              setHostActive(false);
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

  const handleCancelHandRaise = async (peerId, userID) => {
    try {
      setisRevokeAccessDone(true);
      await chatClient.sendMessageToPeer({ text: 'false' }, peerId)
      cancelHostRole(userID);
      isHost = false;
      remoteUserId = [];
      setactiveHostProfileImg('');
      for (let i = 0; i < arra.length; i++) {
        if (arra[i].peer === peerId && arra[i].revokeAccess === true) {
          arra[i].revokeAccess = false;
        }
      }
      setrevokeAccess(arra);
    }
    catch (error) {
      chatClient
        .login({ uid: creatorProfileDetails.username })
        .then(() => {
          channel.join();
          setisLogin(true);
          handleCancelHandRaise(peerId, userID)
        });
    }
  };

  const handleActiveTab = (activetab) => {
    setactiveTab(activetab);
  };

  useEffect(() => {
    chatClient.on('MessageFromPeer', ({ text }, peerId) => {
      arra.map((item) => {
        if (item.peer === peerId && item.isHandRaise) {
          isMemberPresent = true;
          return item;
        }
      });
      if (!isMemberPresent) {
        arra.push({ peer: peerId, revokeAccess: false, isHandRaise: true });
        setrevokeAccess(arra);
        isMemberPresent = false;
        toast.success(text, {
          pauseOnHover: false,
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    });
  }, [arra.length]);

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

  const handleScreenShareRefresh = () => {
    handleActiveScreenStatusChange('False', screenShareId);
    toast.success('You can share your screen now');
  }

  useEffect(() => {
    screenshareChannel.on('ChannelMessage', ({ text }, senderId) => {
      console.log('message recieved from screen sharing: ', text, senderId);
      if (text !== '') {
        setscreenShareId(text);
        setisScreenSharingActive(true);
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
                            {remoteUsers.length === 0 ? (
                              <>
                                <LiveStreamMediaPlayer
                                  videoTrack={localVideoTrack}

                                  userRole="creator"
                                  isScreenShare={false}
                                  userType="localUser"
                                  isLocalVideoEnabled={isVideoTrackEnable}
                                  localUserProfileImg={
                                    creatorProfileDetails.profile_image ===
                                      'https://myapp-user-uploads154822-dev.s3.amazonaws.com/sample.jpg' ||
                                      creatorProfileDetails.profile_image === null ||
                                      creatorProfileDetails.profile_image === undefined
                                      ? ProfileImage
                                      : creatorProfileDetails.profile_image
                                  }
                                ></LiveStreamMediaPlayer>
                              </>
                            ) : (
                              <>
                                {remoteUsers.length > 0 &&
                                  remoteUsers.map((user) => (
                                    <div key={user.uid}>
                                      {remoteUserId.length === 0 ?
                                        parseInt(screenShareId) === parseInt(user.uid) && (
                                          <>
                                            {(user['isScreenshare'] = true)}
                                            {/* {screenID.push(user.uid)} */}
                                            <LiveStreamMediaPlayer
                                              userRole="creator"
                                              screenShareId={parseInt(screenShareId) !== undefined && parseInt(screenShareId)}
                                              videoTrack={user.videoTrack}
                                              audioTrack={user.audioTrack}
                                              isScreenShare={isScreenSharingActive}
                                              userType="remoteUser"
                                              isRemoteVideoEnable={isUserVideoEnable}
                                              remoteUserProfileImg={
                                                activeHostProfileImg ===
                                                  'https://myapp-user-uploads154822-dev.s3.amazonaws.com/sample.jpg' ||
                                                  activeHostProfileImg === undefined ||
                                                  activeHostProfileImg === null
                                                  ? ProfileImage
                                                  : activeHostProfileImg
                                              }
                                              remoteUserList={user}
                                            ></LiveStreamMediaPlayer>
                                          </>
                                        )
                                        :
                                        remoteUserId.map((data, i) => {
                                          return (
                                            <React.Fragment key={i}>
                                              {hostActive ? (
                                                <>
                                                  {parseInt(screenShareId) === parseInt(user.uid) ? (
                                            <>
                                                      {(user['isScreenshare'] = true)}
                                                      <LiveStreamMediaPlayer
                                                        videoTrack={user.videoTrack}
                                                        isScreenShare={isScreenSharingActive}
                                                        audioTrack={user.audioTrack}
                                                        screenShareId={parseInt(screenShareId) !== undefined && parseInt(screenShareId)}
                                                        remoteUserList={user}
                                                        userRole="creator"
                                                        userType="remoteUser"
                                                        isRemoteVideoEnable={isUserVideoEnable}
                                                        remoteUserProfileImg={
                                                          activeHostProfileImg ===
                                                            'https://myapp-user-uploads154822-dev.s3.amazonaws.com/sample.jpg' ||
                                                            activeHostProfileImg === undefined ||
                                                            activeHostProfileImg === null
                                                            ? ProfileImage
                                                            : activeHostProfileImg
                                                        }
                                                      ></LiveStreamMediaPlayer>
                                                    </>
                                                  ) : (
                                                    <>
                                                      {(user['isScreenshare'] = false)}
                                                      {/* {screenID.push(user.uid)} */}
                                                      <LiveStreamMediaPlayer
                                                        userRole="creator"
                                                        videoTrack={user.videoTrack}
                                                        audioTrack={user.audioTrack}
                                                        isScreenShare={isScreenSharingActive}
                                                        userType="remoteUser"
                                                        isRemoteVideoEnable={isUserVideoEnable}
                                                        remoteUserProfileImg={
                                                          activeHostProfileImg ===
                                                            'https://myapp-user-uploads154822-dev.s3.amazonaws.com/sample.jpg' ||
                                                            activeHostProfileImg === undefined ||
                                                            activeHostProfileImg === null
                                                            ? ProfileImage
                                                            : activeHostProfileImg
                                                        }
                                                        remoteUserList={user}
                                                      ></LiveStreamMediaPlayer>
                                                    </>
                                                  )}
                                                </>
                                              ) : (
                                                null
                                                // <>
                                                //   {parseInt(screenShareId) === parseInt(user.uid) && (
                                                //     <>
                                                //       {(user['isScreenshare'] = true)}
                                                //       {/* {screenID.push(user.uid)} */}
                                                //       <LiveStreamMediaPlayer
                                                //         userRole="creator"
                                                //         videoTrack={user.videoTrack}
                                                //         audioTrack={user.audioTrack}
                                                //         screenShareId={parseInt(screenShareId) !== undefined && parseInt(screenShareId)}
                                                //         isScreenShare={isScreenSharingActive}
                                                //         userType="remoteUser"
                                                //         isRemoteVideoEnable={isUserVideoEnable}
                                                //         remoteUserProfileImg={
                                                //           activeHostProfileImg ===
                                                //             'https://myapp-user-uploads154822-dev.s3.amazonaws.com/sample.jpg' ||
                                                //             activeHostProfileImg === undefined ||
                                                //             activeHostProfileImg === null
                                                //             ? ProfileImage
                                                //             : activeHostProfileImg
                                                //         }
                                                //         remoteUserList={user}
                                                //       ></LiveStreamMediaPlayer>
                                                //     </>
                                                //   )}
                                                // </>
                                              )}
                                            </React.Fragment>
                                          );
                                        })}
                                    </div>
                                  ))}
                                <>
                                  <LiveStreamMediaPlayer
                                    videoTrack={localVideoTrack}
                                    userRole="creator"
                                    userType="localUser"
                                    hostActive={hostActive}
                                    isScreenShare={isScreenSharingActive}
                                    isLocalVideoEnabled={isVideoTrackEnable}
                                    localUserProfileImg={
                                      creatorProfileDetails.profile_image ===
                                        'https://myapp-user-uploads154822-dev.s3.amazonaws.com/sample.jpg' ||
                                        creatorProfileDetails.profile_image === null ||
                                        creatorProfileDetails.profile_image === undefined
                                        ? ProfileImage
                                        : creatorProfileDetails.profile_image
                                    }
                                  ></LiveStreamMediaPlayer>
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
                                {/* {isWebCamactive && <Link
                                                                    to="#"
                                                                    className="btn btn-common-primary live-video no-cursor mr-10"
                                                                >
                                                                    <i className="bg-custom-icon video-camera-icon" ></i> Live
                                                                </Link>}
                                                                {isWebCamactive && <Link to="#" className="btn btn-common-primary white-black-primary">
                                                                    Finish the stream
                                                                </Link>} */}
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
                                  <div className="white-icon-text-box" onClick={handleScreenShareRefresh}>
                                    {joinState && (
                                      <Link to="#" className="white-icon-text-link">

                                        
                                        <span className="white-icon-span">
                                         <i className="material-icons-outlined refresh-custom-icon">refresh</i>
                                        </span>
                                      </Link>
                                    )}
                                  </div>
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
                                  {!joinState ? (
                                    <div
                                      className="white-icon-text-box"
                                      disabled={joinState}
                                      onClick={createChannel}
                                    >
                                      <Link
                                        to="#"
                                        className="btn btn-common-primary live-video no-cursor mr-16"
                                        style={{ backgroundColor: '#ee2f46', backgroundImage: 'none' }}
                                      >Join Class</Link>
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
                                      >Finish&nbsp;<span className="mb-hidden">Class</span></Link>
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
                            <h3>Group Chat</h3>

                            <div className="in-chat-mp-top-right-div">
                              <div className="in-chat-mp-btn-group-div">
                                <ul className="nav-tabs-custom">
                                  <li
                                    className={`nav-item-custom ${activeTab === 'messages' ? 'active' : ''
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
                                    className={`nav-item-custom ${activeTab === 'participants' ? 'active' : ''
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
                            senderDetails={creatorProfileDetails}
                          />
                        ) : (
                          <div className="participent-list-main">
                            <div className="participent-list">
                              {activeUserList.length === 0 ? (
                                <div
                                  style={{ fontSize: '20px', textAlign: 'center', color: 'white' }}
                                >
                                  <h3>No active user</h3>
                                </div>
                              ) : (
                                <ul className="list">
                                  {activeUserList &&
                                    activeUserList.map((userData, i) => {
                                      return (
                                        <li key={i}>
                                          <div className="participent-row-li">
                                            <div className="partcipent-user">
                                              <div className="user-img-div">
                                                <img
                                                  src={
                                                    userData.user.profile_image ===
                                                      'https://myapp-user-uploads154822-dev.s3.amazonaws.com/sample.jpg'
                                                      ? ProfileImage
                                                      : userData.user.profile_image
                                                  }
                                                  className="img-fluid"
                                                  alt="img"
                                                />
                                              </div>
                                              <div className="user-info">
                                                <h3>{userData.user.username}</h3>
                                                <p>{userData.host && isHost ? 'Host' : ''}</p>
                                              </div>
                                            </div>
                                            <div className="pr-user-right-text-div">
                                              {isLoading && <Loader />}
                                              <div className="btn-group-div">
                                                {arra &&
                                                  arra.length > 0 &&
                                                  arra.map((data, i) => {
                                                    return (
                                                      <React.Fragment key={i}>
                                                        {data.peer === userData.user.username ? (
                                                          <>
                                                            {data.isHandRaise && (
                                                              <button
                                                                className="btn-white-rounded"
                                                                style={{ marginRight: 'auto' }}
                                                                onClick={() =>
                                                                  handleHandRaiseClick(
                                                                    userData.user.username,
                                                                    userData.user.id,
                                                                  )
                                                                }
                                                              >
                                                                <span className="material-icons pan-tool">
                                                                  pan_tool
                                                                </span>
                                                              </button>
                                                            )}
                                                            {data.revokeAccess && (
                                                              <button
                                                                className="btn-white-rounded"
                                                                style={{ marginRight: 'auto' }}
                                                                onClick={() =>
                                                                  handleCancelHandRaise(
                                                                    userData.user.username,
                                                                    userData.user.id,
                                                                  )
                                                                }
                                                              >
                                                                <span className="material-icons pan-tool-cancel">
                                                                  do_not_touch
                                                                </span>
                                                              </button>
                                                            )}

                                                          </>
                                                        ) : (
                                                          ''
                                                        )}
                                                        {/* <HighlightOffIcon className="btn-icon btn-cancel-tool-icon" /> */}
                                                      </React.Fragment>
                                                    );
                                                  })}
                                                    {userData.host && !isUsersAudioEnable && i === 0 && (
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

export default CreatorLiveStreamChatComponent;
