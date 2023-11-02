import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
} from 'react-native';
import {RealmProvider, AppProvider, UserProvider} from '@realm/react';

function App(): JSX.Element {
  return (
    <AppProvider>
      <UserProvider>
        <RealmProvider
          sync={{
            flexible: true,
        }}>
          <SafeAreaView>
            <StatusBar barStyle={'dark-content'} />
            <ScrollView contentInsetAdjustmentBehavior="automatic">
              <Text>Unidrop</Text>
            </ScrollView>
          </SafeAreaView>
        </RealmProvider>
      </UserProvider>
    </AppProvider>
  );
}

export default App;
