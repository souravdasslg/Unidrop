import {RTCPeerConnection} from 'react-native-webrtc';
import {useCallback, useState} from 'react';
import {useWebRTCSignal} from '../../hooks/useWebrtcSignal';

const RTC_PEER_CONFIGURATION = {
  iceServers: [{urls: 'stun:stun.l.google.com:19302'}],
};

export const useWebRTC = () => {
  const [peerConnection, setPeerConnection] = useState();
   const {initiateSession} = useWebRTCSignal();

  const createOffer = useCallback(async () => {
    const peerConnection = new RTCPeerConnection(RTC_PEER_CONFIGURATION);
    const offer = await peerConnection.createOffer({});
    await peerConnection.setLocalDescription(offer);
    // send this offer through the signalling channel
    initiateSession(JSON.stringify(offer));
    return offer;
  }, [initiateSession]);

  const answerOffer = useCallback(async (offer: any) => {
    const peerConnection = new RTCPeerConnection(RTC_PEER_CONFIGURATION);
    await peerConnection.setRemoteDescription(offer);
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
  }, []);

  return {
    initiateSession: createOffer,
  };
};
