import * as React from 'react';
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import ProfileScreen from '../screens/ProfileScreen';

import routes from '../config/routes';

const CustomDrawer = props => {
  return(
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 32}}>Drawer</Text>
      <Text>{props.navigation.state.index}</Text>
      <Text>{JSON.stringify(props)}</Text>
      <DrawerNavigatorItems {...props} />
      <TouchableOpacity
        onPress={()=> alert('Encerra sessão') }
      >
        <Text>
          Sair
        </Text>
      </TouchableOpacity>
    </View>       
  ) 
}

function stateDrawer(index) {
  if(index == 0){
    // return 'locked-closed'
  } else {
  }
  // alert(index.state.routeName)
  return 'unlocked'
}
  
const MyDrawerNavigator = createDrawerNavigator(
  {
    Root: {
      screen: routes,
      navigationOptions: ({ navigation }) => ({
        // drawerLockMode: stateDrawer(navigation.index),
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