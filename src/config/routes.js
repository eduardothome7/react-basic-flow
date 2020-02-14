import * as React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { ToastAndroid, AsyncStorage } from 'react-native';
import LoginScreen from '../screens/LoginScreen';
import PanelScreen from '../screens/PanelScreen';
import { getSessionStorage } from '../config/sessionStorage';

var logged      = false;
var _authToken  = null;
const PANEL_TITLE = 'Silveiro';
const initRouteTitle = (logged)? PANEL_TITLE : 'Login'; 

const InitialRoute = (logged) => { 
  let sessionStorage = getSessionStorage()
    sessionStorage.then((value) => {
      _authToken = value
    if(_authToken){
      logged = true
    }
    if(logged){
      return PanelScreen
    } else {
      return LoginScreen
    }
  })
}

const routes = createStackNavigator({
    Home: {
      screen: InitialRoute(logged), 
      navigationOptions: ({ navigation }) => ({
        title: initRouteTitle,
      }),
    },
    Panel: {
      screen: PanelScreen,
      navigationOptions: ({ navigation }) => ({
        title: PANEL_TITLE,
      }),
    },
  }, 
);

// export default connect( state => state ))(routes);
export default routes;
