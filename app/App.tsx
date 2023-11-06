import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {AppProvider, createRealmContext, UserProvider} from '@realm/react';
import {Login} from './features/login';
import {REALM_APP_ID} from '@env';
import {Session} from './models';

const realmConfig: Realm.Configuration = {
  schema: [Session],
};

const {RealmProvider} = createRealmContext(realmConfig);

function App(): JSX.Element {
  return (
    <SafeAreaView>
      <AppProvider id={REALM_APP_ID}>
        <UserProvider fallback={Login}>
          <RealmProvider sync={{flexible: true}}>
            <View style={style.container}>
              <Text>Unidrop</Text>
            </View>
          </RealmProvider>
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
