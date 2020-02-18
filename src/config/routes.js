import * as React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { ToastAndroid, AsyncStorage } from 'react-native';
import LoginScreen from '../screens/LoginScreen';
import PanelScreen from '../screens/PanelScreen';
import { getSessionStorage } from '../config/sessionStorage';

// var logged      = false;
// var _authToken  = null;
// const PANEL_TITLE = 'Silveiro';
// const initRouteTitle = (logged)? PANEL_TITLE : 'Login'; 

// let sessionStorage = getSessionStorage()
//   sessionStorage.then((value) => {
//     _authToken = value
//     ToastAndroid.show(_authToken, ToastAndroid.LONG);
//     if(_authToken){
//       // logged = true
//       // ToastAndroid.show(_authToken, ToastAndroid.LONG);
//     } 
//   })

//   const InitialRoute = (logged) => { 
//     if(logged){
//       ToastAndroid.show('logged', ToastAndroid.LONG);
//       return PanelScreen
//     } else {
//       // ToastAndroid.show('not logged', ToastAndroid.LONG);
//       return LoginScreen
//   }
// }

const routes = createStackNavigator({

  Home: {
      screen: LoginScreen, 
      // navigationOptions: ({ navigation }) => ({
      //   title: initRouteTitle,
      // }),
    },
    Panel: {
      screen: PanelScreen,
      // navigationOptions: ({ navigation }) => ({
      //   title: PANEL_TITLE,
      // }),
    },
  }, 
);

// export default connect( state => state ))(routes);
export default routes;
