import {View, StyleSheet, Text} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {useApp, Realm} from '@realm/react';

export const Login = () => {
  const app = useApp();
  const signInAnonymously = useCallback(async () => {
    const credentials = Realm.Credentials.anonymous(true);
    await app.logIn(app.currentUser ?? credentials);
  }, [app]);

  useEffect(() => {
    signInAnonymously();
  }, [signInAnonymously]);

  return (
    <View style={style.container}>
      <Text>Login</Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    alignSelf: 'center',
  },
});
