import React from 'react';
import {SafeAreaView} from 'react-native';
import {AppProvider, RealmProvider, UserProvider} from '@realm/react';
import {Login} from './features/login';
import {REALM_APP_ID} from '@env';
import {Session} from './models';
import {ShareScreen} from './features/sharescreen';

const realmConfig: Realm.Configuration = {
  schema: [Session],
};


function App(): JSX.Element {
  return (
    <SafeAreaView>
      <AppProvider id={REALM_APP_ID}>
        <UserProvider fallback={Login}>
          <RealmProvider {...realmConfig} sync={{flexible: true}}>
            <ShareScreen />
          </RealmProvider>
        </UserProvider>
      </AppProvider>
    </SafeAreaView>
  );
}

export default App;

