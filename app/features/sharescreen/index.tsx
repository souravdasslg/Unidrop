import {Button, StyleSheet, View} from 'react-native';
import {useWebRTC} from '../webrtc/webrtc-hook';
import React from 'react';

export const ShareScreen = () => {
  const {initiateSession} = useWebRTC();
  return (
    <View style={styles.container}>
      <Button title={'Start Session'} onPress={initiateSession} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
  },
});
