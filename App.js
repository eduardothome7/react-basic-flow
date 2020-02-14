import * as React from 'react';
// import { StyleSheet, } from 'react-native';
import { createAppContainer, } from 'react-navigation';
import {Provider} from 'react-redux';
import store from './src/store';

import MyDrawerNavigator from './src/components/MyDrawerNavigator';

const AppContainerSidebar = createAppContainer(MyDrawerNavigator);

function App(){
  global.myauth = null;
  return(
    <Provider store={store}>
      <AppContainerSidebar />
    </Provider>
  )
}

export default App;
