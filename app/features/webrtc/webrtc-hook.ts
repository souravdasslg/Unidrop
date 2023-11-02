import {RTCPeerConnection} from 'react-native-webrtc'
import {useCallback, useState} from "react";

const RTC_PEER_CONFIGURATION = {
  iceServers: [{urls: 'stun:stun.l.google.com:19302'}],
}


export const useWebRTC = () => {
  const [peerConnection, setPeerConnection] = useState(RTCPeerConnection)

  const createOffer = useCallback(async () => {
    const peerConnection = new RTCPeerConnection(RTC_PEER_CONFIGURATION)
    const offer = await peerConnection.createOffer({});
    await peerConnection.setLocalDescription(offer)
    // send this offer through the signalling channel
    return offer
  }, []);

  const answerOffer = useCallback(async (offer: any)=>{
    const peerConnection = new RTCPeerConnection(RTC_PEER_CONFIGURATION)
    await peerConnection.setRemoteDescription(offer)
    const answer = await peerConnection.createAnswer()
    await peerConnection.setLocalDescription(answer)

  },[])



  return {
    createOffer
  };
};
