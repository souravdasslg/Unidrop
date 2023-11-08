import {View, StyleSheet, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';

export const Login = () => {
  const [authState, setAuthState] = useState<Boolean | undefined>(undefined);

  useEffect(() => {
    auth().onAuthStateChanged(authResult => {
      if (authResult === null) {
        setAuthState(false);
      } else {
        setAuthState(true);
      }
    });
  }, []);

  useEffect(() => {
    if (authState === false) {
      auth().signInAnonymously();
    }
  }, [authState]);

  return (
    <View style={style.container}>
      {authState === undefined ? <Text>Logging in ...</Text> : authState === true ? <Text>Logged in</Text> : <Text></Text>}

    </View>
  );
};

const style = StyleSheet.create({
  container: {
    alignSelf: 'center',
  },
});
