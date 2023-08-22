import { ILocalVideoTrack, IRemoteVideoTrack, ILocalAudioTrack, IRemoteAudioTrack } from "agora-rtc-sdk-ng";
import React, { useRef, useEffect, } from "react";
import '../assets/css/cc_style.css';

export interface VideoPlayerProps {
  videoTrack: ILocalVideoTrack | IRemoteVideoTrack | undefined;
  audioTrack: ILocalAudioTrack | IRemoteAudioTrack | undefined;
  userType: any;
  isRemoteVideoEnable: boolean;
  isLocalVideoEnabled: boolean;
  remoteUserProfileImg: any,
  localUserProfileImg: any,
  user: any,
  remoteUserList: any,
  isScreenShare: boolean,
  isCreatorOnly: boolean,
}

const MediaPlayer = (props: VideoPlayerProps) => {
  const container = useRef<HTMLDivElement>(null)
  // const [isRemoteVideEnable, setIsRemoteVideoEnable] = useState(false);
  useEffect(() => {
    if (!container.current) return;
    props.videoTrack?.play(container.current);
    return () => {
      props.videoTrack?.stop();
    };
  }, [container, props.videoTrack, props.isLocalVideoEnabled, props.remoteUserList]);

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
  }, [props.isScreenShare]);
  return (
    <>
      {
        props.userType === 'remoteUser' && props.remoteUserList ?
          <>
            {
              props.isScreenShare ?
                <>
                  {
                    props.remoteUserList.isScreenshare  ?
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
                        
                        {!props.isRemoteVideoEnable ?
                          <React.Fragment>
                            <img src={props.remoteUserProfileImg}  style={{ width: "100px", height: "90px", position: 'absolute', top: '5px', left: '120px',cursor:'pointer', zIndex: 1 }}/>
                          </React.Fragment>
                          :
                          <>
                            <div ref={container} style={{ width: "100px", height: "90px", position: 'absolute', top: '5px', left: '120px',cursor:'pointer', zIndex: 1 }}>
                            </div>
                          </>
                        }
                      </>
                  }
                </>
                : 
              <>
                
                {!props.isRemoteVideoEnable ?
                  <React.Fragment>
                    <img src={props.remoteUserProfileImg}  style={{ width: '150px',height:'150px',position:'absolute',top:'40%',left:'50%', display:'block',marginLeft:'-75px',marginRight:'-75px',borderRadius:'50%' }}/>
                  </React.Fragment>
                :
                <>
                {props.remoteUserList._video_added_ === true &&
                                       <div className="main-video-one-to-one-relative">

                  <div ref={container} style={{ width: '100%', position: 'relative', height: '100vh' }}>
                  </div>
                  </div>
                }
                </>
                }
              </>
            }
          </>
        : 
        props.isCreatorOnly ? 
          <>
            {props.isLocalVideoEnabled?
                                   <div className="main-video-one-to-one-relative">

              <div ref={container} style={{ width: '100%', position: 'relative', height: '100vh' }}>
              </div>
              </div>
            :
            <img src={props.localUserProfileImg} style={{ width: '150px',height:'150px',position:'absolute',top:'40%',left:'50%', display:'block',marginLeft:'-75px',marginRight:'-75px',borderRadius:'50%' }}/>
          }
        </>
         :
          <>
            {props.isLocalVideoEnabled ?
              <div ref={container} style={{  width: "100px", height: "90px", position: 'absolute', top: '5px', left: '10px',cursor:'pointer', zIndex: 1  }}>
              </div>
            :
            <img src={props.localUserProfileImg} style={{  width: "100px", height: "90px", position: 'absolute', top: '5px', left: '10px',cursor:'pointer', zIndex: 1  }}/>
          }
        </>
      }
    </>
  );
}

export default MediaPlayer;
