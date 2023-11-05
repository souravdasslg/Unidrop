import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {AppProvider, UserProvider} from '@realm/react';
import {Login} from './features/login';
import {REALM_APP_ID} from '@env'; // Commented out as the module '@env' cannot be found

function App(): JSX.Element {
  return (
    <SafeAreaView>
      <AppProvider id={REALM_APP_ID}>
        <UserProvider fallback={Login}>
          <View style={style.container}>
            <Text>Unidrop</Text>
          </View>
        </UserProvider>
      </AppProvider>
    </SafeAreaView>
  );
}

export default App;

const style = StyleSheet.create({
  container: {
    alignSelf: 'center',
  },
});
