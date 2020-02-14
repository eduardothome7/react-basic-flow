import * as React from 'react';
import { AsyncStorage, Button, Text, TextInput, View, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useSelector } from 'react-redux';

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const AuthContext = React.createContext();

function TextIconTextbox( props ){
  return (
    <View style={[ styles.inputIconTextbox ]}>
      <Icon name={props.icon} style={styles.iconTextBox}></Icon>
      <TextInput
        placeholder={props.title}
        value={props.value}
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
      onPress= { props.onClick() }
      style={ styles.btnBlock }>
      <Text
        style={styles.caption}>{props.title}
      </Text>
    </TouchableOpacity>
  );
}

function SplashScreen() {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}

function Page1Screen({ navigation }){
  return (
    <View>
      <Text>Page1Screen</Text>
    </View>
  );
}

const PanelScreen = (props) => {
  const { signOut } = React.useContext(AuthContext);

  const userData = useSelector(state => state.userToken);
  
  return (
    <Provider store={authContext}>
      <Text>Olá, {props.userToken}</Text>
      <Button title="Sign out" onPress={signOut} />
    </Provider>
  );
}

function LoginScreen() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  
  const { signIn } = React.useContext(AuthContext);
  
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "#2c4663", }}>
      <TextIconTextbox
          title="Email"
          value={ username }
          icon="account-box"
          isPass={false}
            onChange={val => setUsername(val)}>
        </TextIconTextbox>
        
        <TextIconTextbox
          title="Senha"
          value={ password }
          icon="lock-open-outline"
          isPass={true}
          onChange={val => setPassword(val)}>
        </TextIconTextbox>
        
        <TouchableOpacity
          onPress= { () => signIn({username, password}) }
          style={ styles.btnBlock }>
          <Text
            style={styles.caption}>Entrar
          </Text>
        </TouchableOpacity>

    </View>
  );
}

function LogoutScreen() {
  
  const { signOut } = React.useContext(AuthContext);

  return(
    {signOut}
  )
}

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function Root() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Panel" component={ PanelScreen } options={{ title: 'Silveiro', }} />
      <Stack.Screen name="Page2" component={ Page1Screen } />
    </Stack.Navigator>
  );
}

function App() {
  
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
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
        case 'GET_USER':
          return {
            ...prevState,
            currentUser: action.currentUser,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );
  
  const{ userToken } = state;

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (error) {

      }
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {      
        if(data.username && data.password){
          await AsyncStorage.setItem('userToken', 'myToken');
          dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
        } else {
          ToastAndroid.show('Preencha o email/senha', ToastAndroid.SHORT);
        }
      },
      getUser: async () => {
        // GET STORAGE
        dispatch({ type: 'GET_USER', currentUser: 'eduardo.thome' });
        return 'eduardo.thome'
      },
      signOut: async () => {
        await AsyncStorage.removeItem('userToken');
        dispatch({ type: 'SIGN_OUT' })
      },
    }),
    []
  );

  // const mapStateToProps = function(state) {
  //   return {
  //     userToken: state.userToken,
  //   }
  // }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
          {state.isLoading ? (
            <Stack.Navigator>
              <Stack.Screen name="Splash" component={SplashScreen} />
            </Stack.Navigator>
          ) : state.userToken == null ? (
            <Stack.Navigator>
              <Stack.Screen
                name="SignIn"
                component={LoginScreen}
                options={{
                  headerShown: false,
                  animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                }}
              />
            </Stack.Navigator>
          ) : (
            <Drawer.Navigator initialRouteName="Root">
              <Drawer.Screen name="Root" component={Root} />
              <Drawer.Screen name="Sair" component={LogoutScreen} />
            </Drawer.Navigator>
          )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
    paddingTop: 10,
    paddingRight: 5,
    paddingLeft: 5,
    paddingBottom: 8,
    fontSize: 16,
    lineHeight: 16
  },
  btnBlock: {
    backgroundColor: "#1d3957",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 16,
    paddingLeft: 16,
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
    // fontSize: 14,
  }
});
