import {Button, FlatList, StyleSheet, Text, View, Alert} from 'react-native';
import {useWebRTC} from '../webrtc/webrtc-hook';
import React from 'react';
import {useWebRTCSignal} from '../../hooks/useWebrtcSignal';

export const ShareScreen = () => {
  const {initiateSession} = useWebRTC();
  const {sessions} = useWebRTCSignal();
  const showPeerData = (peerData: string) => {
    Alert.alert('Peer Details', peerData);
  };
  return (
    <View style={styles.container}>
      <Button title={'Start Session'} onPress={initiateSession} />
      <FlatList
        data={sessions}
        renderItem={({item}) => (
          <Button
            title={item.senderId}
            onPress={() => showPeerData(item.senderPeerDetails)}
          />
        )}
        keyExtractor={item => item._id.toString()} // add a key extractor if 'id' is present in the items
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
  },
});
