import * as React from 'react';
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer';
import { StyleSheet, View, Text, TouchableOpacity, ToastAndroid } from 'react-native';

import ProfileScreen from '../screens/ProfileScreen';
import { useSelector } from 'react-redux';
import { destroySessionStorage } from '../config/sessionStorage'
import { useDispatch } from 'react-redux'

import routes from '../config/routes';

const logout = (props) => {
  // props.navigation.closeDrawer()
  // props.navigation.goBack()
  alert('encerra')
}

const CustomDrawer = props => {
  const _authToken = useSelector(state =>  state._authToken)
  const dispatch = useDispatch()  

  return(
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 32}}>Drawer</Text>
      <Text>{props.navigation.state.index}</Text>
      <Text>{_authToken}</Text>
      <DrawerNavigatorItems {...props} />
      <TouchableOpacity
        onPress={()=> {
          props.navigation.closeDrawer()
          const destroySession = destroySessionStorage(); 
          destroySession
          .then(()=>{
            dispatch({ type: 'DESTROY_SESSION' });
          })
          .catch((err)=> {
            ToastAndroid.show(err, ToastAndroid.LONG);
          })
          props.navigation.navigate('Root', {screen: 'Login'})          
        }}
        >
        <Text>
          Sair
        </Text>
      </TouchableOpacity>
    </View>       
  ) 
}
const lockMode = () => {
  const _authToken = useSelector(state =>  state._authToken)
  if(_authToken){
    return 'unlocked'
  } else {
    return 'locked-closed'
  }
}

const MyDrawerNavigator = createDrawerNavigator(
  {
    Root: {
      screen: routes,
      navigationOptions: ({ navigation }) => ({
        drawerLockMode: lockMode,
      }),
    },
    Profile: {
      screen: ProfileScreen,
        navigationOptions: ({ navigation }) => ({
      }),
    }
  },
  {
    contentComponent: CustomDrawer
  }
);

export default MyDrawerNavigator;