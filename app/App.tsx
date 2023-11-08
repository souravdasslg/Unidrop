import React from 'react';
import {SafeAreaView} from 'react-native';
import {ShareScreen} from './features/sharescreen';
import { Login } from './features/login';



function App(): JSX.Element {
  return (
    <SafeAreaView>
        <Login></Login>
      <ShareScreen />
    </SafeAreaView>
  );
}

export default App;
