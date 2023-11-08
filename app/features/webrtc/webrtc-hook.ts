import {RTCPeerConnection, RTCSessionDescription} from 'react-native-webrtc';
import {useCallback, useEffect, useState} from 'react';
import {useWebRTCSignal} from '../../hooks/useWebrtcSignal';

const RTC_PEER_CONFIGURATION = {
  iceServers: [{urls: 'stun:stun.l.google.com:19302'}],
};

export const useWebRTC = () => {
  const [peerConnection, setPeerConnection] = useState();
  const {initiateSession, saveAnswer, sessions} = useWebRTCSignal();

  const createOffer = useCallback(async () => {
    const peerConnection = new RTCPeerConnection(RTC_PEER_CONFIGURATION);
    const offer = await peerConnection.createOffer({});
    await peerConnection.setLocalDescription(offer);
    // send this offer through the signalling channel
    await initiateSession(JSON.stringify(offer));
    return offer;
  }, [initiateSession]);

  const answerOffer = useCallback(async (offer: string) => {
    const parsedOffer = JSON.parse(offer.offer);
    console.log('parsed offer', parsedOffer);
    const pc = new RTCPeerConnection(RTC_PEER_CONFIGURATION);
    await pc.setRemoteDescription(parsedOffer);
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);
    await saveAnswer(offer, answer);
  }, []);

  useEffect(() => {
    console.log('Sessions from webrtc hook', sessions)
  }, []);

  return {
    initiateSession: createOffer,
    createAnswerOffer: answerOffer,
  };
};
