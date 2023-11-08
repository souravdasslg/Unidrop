import {Button, FlatList, StyleSheet, Text, View, Alert} from 'react-native';
import {useWebRTC} from '../webrtc/webrtc-hook';
import React from 'react';
import {useWebRTCSignal} from '../../hooks/useWebrtcSignal';

export const ShareScreen = () => {
  const {initiateSession, createAnswerOffer} = useWebRTC();
  const {sessions} = useWebRTCSignal();
  const showPeerData = (item: object) => {
    Alert.alert('Alert Title', item.offer, [
      {
        text: 'Create Answer',
        onPress: () => createAnswerOffer(item),
      },
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  };
  return (
    <View style={styles.container}>
      <Button title={'Start Session'} onPress={initiateSession} />
      <FlatList
        data={sessions}
        renderItem={({item}) => (
          <Button title={item.key} onPress={() => showPeerData(item)} />
        )}
        keyExtractor={item => item.key}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
  },
});
