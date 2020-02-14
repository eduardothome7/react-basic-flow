import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput, SectionList, ScrollView, ToastAndroid } from 'react-native';
import {AsyncStorage} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const AuthContext = React.createContext();

// import store from './src/store';

function SplashScreen({ navigation }){
  return(
    <View>
      <Text>Ok2</Text>
    </View>
  )  
}

function TextIconTextbox(props) {
  return (
    <View style={[ styles.inputIconTextbox ]}>
      <Icon name={props.icon} style={styles.iconTextBox}></Icon>
      <TextInput
        placeholder={props.title}
        secureTextEntry={props.isPass}
        onChangeText={props.onChange}
        placeholderTextColor="rgba(33,152,185,1)"
        style={styles.inputStyle}
      ></TextInput>
    </View>
  );
}

function ButtonBlock(props) {
  return (
    <TouchableOpacity
      onPress= { props.onClick }
      style={ styles.btnBlock }>
      <Text
        style={styles.caption}>{props.title}
      </Text>
    </TouchableOpacity>
  );
}

function ProfileScreen({ navigation }){
  return(
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Profile Screen</Text>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  )
}

function Page1Screen({ navigation }){

  navigation.setOptions({
    headerLeft: () => (
      <TouchableOpacity
        onPress={() => { navigation.openDrawer() } }
        style={styles.headerLeftButton}>
        <Icon name="menu" style={styles.leftIcon2}></Icon>
      </TouchableOpacity>
    ),
  });

  return(
    <View style={{ flex: 1, paddingTop: 20, }}>
      <SectionList
        sections={[
          {title: 'Agenda', icon: 'calendar', data: ['Reuniões de Hoje', 'Calendário de Agendamentos']},
          {title: 'Biblioteca', icon: 'book-open-variant', data: ['Retirada/Devolução', 'Livros', 'Buscar Livro',]},
        ]}
        renderItem={({item}) =>
          <TouchableOpacity>
            <Text style={styles.item}>{item}</Text>
          </TouchableOpacity>
        }
        renderSectionHeader={({ section }) =>
          <View style={styles.sectionHeader}>
            <Icon name={ section.icon } style={styles.iconHeaderSection} />
            <Text style={styles.textHeaderSection}>{section.title}</Text>
          </View>
        }
        keyExtractor={(item, index) => index}
      />
    </View>
  )
}

function Page2Screen({ navigation }){
  return(
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Page1Screen</Text>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  )
}

function LoginScreen({ navigation }) {
  
  navigation.setOptions({
    drawerLockMode: 'locked-closed',
  });

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  
  // const login = () => {

  //   navigation.navigate('Root', {
  //     screen: 'Page1',
  //   })

  //   if( email.length == 0 || pass.length == 0 ) {
  //     ToastAndroid.show('Preencha o email/senha', ToastAndroid.SHORT);
  //   } else {
  //     navigation.navigate('Root', {
  //       screen: 'Page1',
  //     })
  //   }
  // }

  const { signIn } = React.useContext(AuthContext);

  return(      
    
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "rgba(35,87,102,1)", }}>
      <TextIconTextbox
        title="Email"
        icon="account-box"
        isPass={false}
          onChange={val => setEmail(val)}>
      </TextIconTextbox>
      <TextIconTextbox
        title="Senha"
        icon="lock-open-outline"
        isPass={true}
        onChange={val => setPass(val)}>
      </TextIconTextbox>
      <ButtonBlock
        title="Entrar"
        onClick={ signIn }
      />
    </View>
  )

}

function Logout({navigation}){
  
  const { signOut } = () => alert('Ok2');

  return(
    <View>
      <Text>Sair</Text>
      <Button title="Sign out" onPress={signOut} />
    </View>
  )
}

function HomeScreen({ navigation }){

  navigation.setOptions({
    headerLeft: () => (
      <Button
        style={{ backgroundColor: 'transparent', marginLeft: 10}}
        // onPress={() => setCount(c => c + 1)}
        title="="
      />
    ),
  });

  return(
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button onPress={() => navigation.navigate('Page1')} title="Page1" />
    </View>
  )
}

const Stack = createStackNavigator();

function Root() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={ LoginScreen } options={{ headerShown: false, }} />
      <Stack.Screen name="Page1" component={ Page1Screen } options={{ title: 'Silveiro', }} />
      <Stack.Screen name="Page2" component={ Page2Screen } />
    </Stack.Navigator>
  );
}

const Drawer = createDrawerNavigator();

export default function App({ navigation }) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch(action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null
    }
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch(e) {

      }

      dispatch({type: 'RESTORE_TOKEN', token: userToken });
    };
    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token'});
      },
      signOut: dispatch({type: 'SIGN_OUT'})
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        { state.isLoading? (
            <Stack.Navigator>
              <Stack.Screen name="Splash" component={ SplashScreen } options={{ headerShown: false, }} />
            </Stack.Navigator>
          ) : state.userToken == null ? (
            <Stack.Navigator>
              <Stack.Screen name="Login" component={ LoginScreen } options={{ headerShown: false, }} />
            </Stack.Navigator>
          ): (
            <Drawer.Navigator initialRouteName="Root">
              <Drawer.Screen name="Root" component={Root} />
              <Drawer.Screen name="Profile" component={ProfileScreen} />
              <Drawer.Screen name="Logout" component={Logout} />
            </Drawer.Navigator>
          )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

Drawer.navigationOptions = ({navigation}) => {
  return {
    drawerLockMode: 'locked-closed',
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sideBarUserInfo: {
    backgroundColor: 'blue',
    alignItems: 'center',
    // height: 180,
    // width: 20,
  },
  headerLeftButton: {
    width: 46,
    height: 46,
    padding: 11
  },
  leftIcon2: {
    backgroundColor: "transparent",
    color: "#333",
    fontFamily: "Roboto",
    fontSize: 24
  },
  sectionHeader: {
    flexDirection: "row",
    backgroundColor: '#f7f7f7',
    paddingTop: 4,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 4,
    marginTop: 12,
    // marginBottom: 10,
  },
  iconHeaderSection: {
    marginTop: 4,
    color: 'rgba(128,128,128,1)',
    marginRight: 10,
  },
  textHeaderSection: {
    fontSize: 14,
    color: 'rgba(128,128,128,1)',
    fontWeight: 'bold',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    // borderBottomColor: '#e7e7e7',
    // borderBottomWidth: 1,
  },
  inputIconTextbox: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    width: 330,
    height: 43,
    backgroundColor: "rgba(48,113,132,1)",
    borderRadius: 6,
    shadowOpacity: 0.41,
    marginTop: 8,
    // marginLeft: 24
  },
  iconTextBox: {
    color: "rgba(33,152,185,1)",
    fontFamily: "Roboto",
    fontSize: 24,
    paddingLeft: 8,
  },
  inputStyle: {
    flex: 1,
    color: "#000",
    alignSelf: "stretch",
    marginLeft: 16,
    paddingTop: 14,
    paddingRight: 5,
    paddingLeft: 5,
    paddingBottom: 8,
    fontSize: 16,
    lineHeight: 16
  },
  btnBlock: {
    backgroundColor: "rgba(6,72,102,1)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 16,
    paddingLeft: 16,
    // borderRadius: 6,
    minWidth: 330,
    paddingTop: 12,
    paddingBottom: 12,
    marginTop: 10,
    borderRadius: 2,
    shadowOffset: {
      height: 5,
      width: 5
    },
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 5
  },
  caption: {
    // width: 57,
    // height: 15,
    // paddingBottom: 5,
    color: "#fff",
    fontSize: 14,
  }
});
