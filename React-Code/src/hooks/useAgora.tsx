import { useState, useEffect } from 'react';
import AgoraRTC, {
  IAgoraRTCClient, IAgoraRTCRemoteUser, MicrophoneAudioTrackInitConfig, CameraVideoTrackInitConfig, IMicrophoneAudioTrack, ICameraVideoTrack, ILocalVideoTrack, ILocalAudioTrack, ScreenVideoTrackInitConfig
} from 'agora-rtc-sdk-ng';
import { toast } from 'react-toastify';
toast.configure();

export default function useAgora(client: IAgoraRTCClient | undefined)
  : {
    localAudioTrack: ILocalAudioTrack | undefined,
    localVideoTrack: ILocalVideoTrack | undefined,
    joinState: boolean,
    leave: Function,
    unpublishUser: Function,
    join: Function,
    createScreenSharingVideoTrack: Function,
    isEnableAudioFunc: Function,
    isEnableVideoFunc: Function,
    remoteUsers: IAgoraRTCRemoteUser[],
  } {
  const [localVideoTrack, setLocalVideoTrack] = useState<ILocalVideoTrack | undefined>(undefined);
  const [localAudioTrack, setLocalAudioTrack] = useState<ILocalAudioTrack | undefined>(undefined);
  const [joinState, setJoinState] = useState(false);

  const [remoteUsers, setRemoteUsers] = useState<IAgoraRTCRemoteUser[]>([]);

  async function createLocalTracks(audioConfig?: MicrophoneAudioTrackInitConfig, videoConfig?: CameraVideoTrackInitConfig)
    : Promise<[IMicrophoneAudioTrack, ICameraVideoTrack]> {
    if (!AgoraRTC.checkSystemRequirements()) {
          toast.error("Browser does not support live streaming", {
          pauseOnHover: false,
          position: toast.POSITION.TOP_RIGHT,
      })
    }

    const [microphoneTrack, cameraTrack] = await AgoraRTC.createMicrophoneAndCameraTracks(audioConfig, videoConfig);
    setLocalAudioTrack(microphoneTrack);
    setLocalVideoTrack(cameraTrack);
    return [microphoneTrack, cameraTrack];
  }

  async function createScreenSharingVideoTrack(config: ScreenVideoTrackInitConfig, withAudio: "enable")
    : Promise<[ILocalVideoTrack, ILocalAudioTrack]> {
    const [screenMicrophoneTrack, screenCameraTrack] = await AgoraRTC.createScreenVideoTrack(config, withAudio);
    return [screenMicrophoneTrack, screenCameraTrack];
  }

  async function isEnableAudioFunc() {
    // if (localAudioTrack) {
    //   await localAudioTrack.setEnabled(data);
    // }
  }

  async function isEnableVideoFunc() {
    // if (localVideoTrack) {
    //   await localVideoTrack.setEnabled(data);
    // }
  }

  async function join(appid: string, channel: string, token?: string) {
    if (!client) return;
    const [microphoneTrack, cameraTrack] = await createLocalTracks();
    // try {
        await client.join(appid, channel, token || null);
        await client.publish([microphoneTrack, cameraTrack]);
        setJoinState(true);
    // }
    // catch (error) {
    //   // console.log("error: ", error);
    //   setJoinState(false);
    //   toast.error("[ERROR] : join channel failed", {
    //     pauseOnHover: false,
    //     position: toast.POSITION.TOP_RIGHT,
    //   });
    // }
     

    // (window as any).client = client;
    // (window as any).videoTrack = cameraTrack;

    // setJoinState(true);
  }

  async function leave() {
    if (localAudioTrack) {
      console.log('called stop')
      localAudioTrack.stop();
      localAudioTrack.close();
    }
    if (localVideoTrack) {
      console.log('called stop video')
      localVideoTrack.stop();
      localVideoTrack.close();
    }
    setRemoteUsers([]);
    setJoinState(false);
    await client?.leave();
    window.location.reload();
  }


    async function unpublishUser() {
    setRemoteUsers([]);
    setJoinState(false);
    await client?.unpublish();
  }
  

  useEffect(() => {
    if (!client) return;
    setRemoteUsers(client.remoteUsers);

    const handleUserPublished = async (user: IAgoraRTCRemoteUser, mediaType: 'audio' | 'video') => {
      // try {
         await client.subscribe(user, mediaType);
      // toggle rerender while state of remoteUsers changed.
      var finalArr = client.remoteUsers.filter(function(val: any) { return val._video_added_ != false });
      setRemoteUsers(Array.from(finalArr));
       
      // }
      // catch (err) {
      //   console.log(err);
      //   toast.error("Error while subscribing", {
      //   pauseOnHover: false,
      //   position: toast.POSITION.TOP_RIGHT,
      // });
      // }
     
    }
    const handleUserUnpublished = () => {
      var finalArr = client.remoteUsers.filter(function(val: any) { return val._video_added_ != false });
      setRemoteUsers(Array.from(finalArr));
      
    }
    const handleUserJoined = () => {
      console.log('remote =>>>', client.remoteUsers)
      var finalArr = client.remoteUsers.filter(function(val: any) { return val._video_added_ != false });
      setRemoteUsers(Array.from(finalArr));
    }
    const handleUserLeft = () => {
      var finalArr = client.remoteUsers.filter(function(val: any) { return val._video_added_ != false });
      setRemoteUsers(Array.from(finalArr));
    }
    client.on('user-published', handleUserPublished);
    client.on('user-unpublished', handleUserUnpublished);
    client.on('user-joined', handleUserJoined);
    client.on('user-left', handleUserLeft);

    return () => {
      client.off('user-published', handleUserPublished);
      client.off('user-unpublished', handleUserUnpublished);
      client.off('user-joined', handleUserJoined);
      client.off('user-left', handleUserLeft);
    };
  }, [client]);

  return {
    localAudioTrack,
    localVideoTrack,
    joinState,
    leave,
    join,
    remoteUsers,
    isEnableAudioFunc,
    isEnableVideoFunc,
    createScreenSharingVideoTrack,
    unpublishUser,
  };
}