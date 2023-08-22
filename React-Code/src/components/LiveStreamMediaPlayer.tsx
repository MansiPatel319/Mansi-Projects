import { ILocalVideoTrack, IRemoteVideoTrack, IRemoteAudioTrack } from "agora-rtc-sdk-ng";
import React, { useRef, useEffect } from "react";
import '../assets/css/cc_style.css';

export interface VideoPlayerProps {
  videoTrack: ILocalVideoTrack | IRemoteVideoTrack | undefined;
  audioTrack: IRemoteAudioTrack | undefined;
  userType: any;
  isRemoteVideoEnable: boolean;
  isLocalVideoEnabled: boolean;
  remoteUserProfileImg: any,
  localUserProfileImg: any,
  userRole: any,
  remoteUserList: any,
  isScreenShare: boolean,
  localUserVideoEnabled: boolean,
  hostActive: boolean,
  widthVideo: number,
  screenShareId: number
}
const LiveStreamMediaPlayer = (props: VideoPlayerProps) => {
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!container.current) return;
    props.videoTrack?.play(container.current);
    return () => {
      props.videoTrack?.stop();
    };
  }, [container, props.videoTrack, props.isLocalVideoEnabled,props.isScreenShare,props.remoteUserList, props.hostActive,props.screenShareId,props.remoteUserProfileImg]);
  useEffect(() => {
    props.audioTrack?.play();
    return () => {
      props.audioTrack?.stop();
    };
  }, [props.audioTrack]);

  useEffect(() => {
    if (!container.current) return;
    props.videoTrack?.play(container.current);
    return () => {
      props.videoTrack?.stop();
    };
  }, [props && props.remoteUserList && props.remoteUserList.isScreenShare, props.isScreenShare])
    
  return (
    <>
      {props.userType === 'remoteUser' && props.remoteUserList ?
        <>
          {
              props.isScreenShare ?
                <>
                  {
                  props.remoteUserList.isScreenshare ?
                    <>
                    {props.remoteUserList._video_added_ === true &&
                    <div className="main-video-one-to-one-relative">
                       <div ref={container} style={{ width: '100%', position: 'relative', height: '100vh' }}>
                      </div>
                      </div>
                    }
                    </>
                    :
                      <>
                     
                        {props.remoteUserList._video_muted_ ?
                          <>
                            <img src={props.remoteUserProfileImg}  style={{  width: "100px", height: "90px", position: 'absolute', top: '5px', left: '120px',cursor:'pointer', zIndex: 1  }}/>
                          </>
                          :
                        <>
                          {props.userRole === 'creator' ?
                          <>
                          {props.remoteUserList._video_added_ &&
                                <div ref={container} style={{  width: "100px", height: "90px", position: 'absolute', top: '5px', left: '120px',cursor:'pointer', zIndex: 1  }}>
                          </div>
                          }
                            </>
                            :
                            <>
                              {
                                props.isRemoteVideoEnable ?
                                  <div ref={container} style={{  width: "100px", height: "90px", position: 'absolute', top: '5px', left: '120px',cursor:'pointer', zIndex: 1  }}>
                                  </div>
                                  :
                                  <>
                                  <img src={props.localUserProfileImg} style={{  width: "100px", height: "90px", position: 'absolute', top: '5px', left: '10px',cursor:'pointer', zIndex: 1  }} />
                                  </>
                              }
                            </>
                          } 
                          </>
                        }
                      </>
                  }
                </>
                :
              <>
                {props.remoteUserList._video_muted_ ?
                  <>
                    <img src={props.remoteUserProfileImg} style={{ width: '150px', height: '150px', position: 'absolute', top: '40%', left: '50%', display: 'block', marginLeft: '-75px', marginRight: '-75px', borderRadius: '50%' }} />
                    </>
                    :
                    <>
                    {props.remoteUserList._video_added_ === true &&
                      <div className="main-video-one-to-one-relative">
                      <div ref={container} style={{ width: '100%', position: 'relative', height:'100vh' }}>
                      </div>
                      </div>
                    }
                    </>
                }
              </>
            }
        </>
        :
        <>        
            {props.userRole === "creator" ? 
              <>
              {props.isScreenShare? 
              <>

               {
                props.isLocalVideoEnabled ?
                <>
                  <div ref={container} style={{  width: "100px", height: "90px", position: 'absolute', top: '5px', left: '10px',cursor:'pointer', zIndex: 1  }}>
                  </div>
                  </>
                  :
                  <>
                  <img src={props.localUserProfileImg} style={{  width: "100px", height: "90px", position: 'absolute', top: '5px', left: '10px',cursor:'pointer', zIndex: 1  }} />
                 </>
              }
              </>
            : 
            <>
     {  props.hostActive ?
       <>
       {props.isLocalVideoEnabled ?
             <div ref={container} style={{  width: "100px", height: "90px", position: 'absolute', top: '5px', left: '10px',cursor:'pointer', zIndex: 1, objectFit:'cover'  }}>
           </div>
           : 
           <img src={props.localUserProfileImg}  style={{  width: "100px", height: "90px", position: 'absolute', top: '5px', left: '10px',cursor:'pointer', zIndex: 1, objectFit:'cover'  }}/>
       } 
   </>
   :
       <>
            {props.isLocalVideoEnabled ?
              <div className="main-video-one-to-one-relative">
                  <div ref={container} style={{ width: '100%', position: 'relative', height: '100vh' }}>
              </div>
                </div>
                : 
                <img src={props.localUserProfileImg}  style={{ width: '150px',height:'150px',position:'absolute',top:'40%',left:'50%', display:'block',marginLeft:'-75px',marginRight:'-75px',borderRadius:'50%' }}/>
            } 
        </>
        }
        </>
            
            }
              </>
             
                    :
                <>
              {props.isLocalVideoEnabled ?
                <div ref={container} style={{ width: "100px", height: "90px", position: 'absolute', top: '5px', left: '10px', cursor: 'pointer', zIndex: 1 }}>
                </div>
                :
              <>
                  { props.userType !== 'audience' && <img src={props.localUserProfileImg} style={{ width: "100px", height: "90px", position: 'absolute', top: '5px', left: '10px', cursor: 'pointer', zIndex: 1 }} />}
                  </>
                    }    
                </>
            }
        </>
      }
      {props.userType === 'audience' &&
        <>
        {console.log('audiance 01', props.isScreenShare)}
        { props.isScreenShare ?
          <>
          {console.log('audiance', props.isScreenShare, props.remoteUserList)}
            {props.remoteUserList && props.remoteUserList.isScreenshare
              ?
              <>
                {props.remoteUserList._video_added_ === true &&
                  <div className="main-video-one-to-one-relative">
                    <div ref={container} style={{ width: '100%', position: 'relative', height: '100vh' }}>
                    </div>
                  </div>
                }
              </>
              :
              <>
                {props.remoteUserList._video_muted_ ?
                <>
                  <img src={props.remoteUserProfileImg} style={{ width: "100px", height: "90px", position: 'absolute', top: '5px', left: '120px', cursor: 'pointer', zIndex: 1 }} />
                 </> :
                  <>
                    {
                      props.remoteUserList._video_added_ === true &&
                      <div ref={container} style={{ width: "100px", height: "90px", position: 'absolute', top: '5px', left: '10px', cursor: 'pointer', zIndex: 1 }}>
                      </div>
                    }
                  </>
                }
              </>
            }
            </>
          :
          
          <div className={props.widthVideo === 50? "w-50" : "w-100"}>
            <div className={props.widthVideo === 50? "main-video-one-to-one-relative-audience" : "main-video-one-to-one-relative"} >
                <div ref={container} style={{ width: '100%', position: 'relative', height: '100vh' }}>
                </div>
            </div>
          </div>
        }
        </>
        
      }
    </>
  );
}

export default LiveStreamMediaPlayer;
