import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {DiscoveryScreen} from './screens/DiscovertScreen';

function App(): JSX.Element {
  return (
    <SafeAreaView>
      <StatusBar barStyle={'light-content'} />
      <DiscoveryScreen />
    </SafeAreaView>
  );
}

export default App;
