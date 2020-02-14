import * as React from 'react';
import { Button, Text, TextInput, View, StyleSheet, ToastAndroid, AsyncStorage } from 'react-native';
import { setSessionStorage } from '../config/sessionStorage';

const LoginScreen = ({ navigation }) => {

  const [email, setEmail] = React.useState('');
  const [pass, setPass] = React.useState('');
  
  const signIn = async () => {
    try {

    //   await AsyncStorage.removeItem('currentUserEmail')
    //   await AsyncStorage.removeItem('authToken')

      let token = Math.random().toString(36).substring(7);
      let userData = { name:'Eduardo Thomé', email: email, token: token }
      setSessionStorage(userData)
      navigation.navigate('Panel')
      
    } catch( error ){
      ToastAndroid.show('erro ao iniciar sessão'+error, ToastAndroid.SHORT);
    }
  }   

  return(
    <View style={styles.container}>
      <View style={styles.form}>
        <Text>Login</Text>
        <TextInput
            placeholder='Email'
            style={styles.input}
            value={email}
            onChangeText={(val) => setEmail(val)}
            >
        </TextInput>
        <TextInput
            placeholder='Senha'
            style={styles.input}
            value={pass}
            secureTextEntry={true} 
            onChangeText={(val) => setPass(val)}
        >
        </TextInput>
        
        <Button 
            styles={styles.submit}
            onPress = {() => signIn() }
            title="LOGIN"
        />
      </View>
    </View>
  );
}

export default LoginScreen; 

const styles =  StyleSheet.create({
  container: {
    flex: 1,
    padding: 14
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  form: {
    marginTop: 40,
  },
  input: {
    backgroundColor: '#fff',
    paddingLeft:10,
    paddingRight:10,
    marginTop: 2,
    height: 46,
  },
  submit: {
    marginTop: 2
  }
})