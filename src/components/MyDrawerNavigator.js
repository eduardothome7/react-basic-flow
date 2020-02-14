import * as React from 'react';
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer';
import { StyleSheet, View, Text } from 'react-native';

import ProfileScreen from '../screens/ProfileScreen';

import routes from '../config/routes';

const CustomDrawer = props => {
  return(
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 32}}>Drawer</Text>
      <Text>{props.navigation.state.index}</Text>
      <DrawerNavigatorItems {...props} />
    </View>       
  ) 
}

function stateDrawer(index) {
  if(index == 0){
    return 'locked-closed'
  } else {
    return 'unlocked'
  }
}
  
const MyDrawerNavigator = createDrawerNavigator(
  {
    Root: {
      screen: routes,
      navigationOptions: ({ navigation }) => ({
        drawerLockMode: stateDrawer(navigation.state.index),
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