import * as React from 'react';
import { Button, Text, TextInput, View, StyleSheet, ToastAndroid, AsyncStorage } from 'react-native';

import { setSessionStorage } from '../config/sessionStorage';
import { getSessionStorage } from '../config/sessionStorage';

import { authSigninService } from '../services/authService';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'

const LoginScreen = ({ navigation }) => {
  
  const [email, setEmail] = React.useState('');
  const [pass, setPass] = React.useState('');
  
  const [loading, stopLoading] = React.useState(true);

  setTimeout(
    function(){
      // this.setS = false
      stopLoading(false)
    }.bind(this),2000
  )

  const dispatch = useDispatch()  

  const signIn = async () => {
    try {

      if(email && pass){
        ToastAndroid.show('Aguarde...', ToastAndroid.SHORT);
          let data = { email: email, pass: pass }
          const authRequest = authSigninService(data);
          
          await authRequest
            .then((response) => response.json())
            .then((responseJson) => {
              // return responseJson.movies;
              if(responseJson.status==200) {
                ToastAndroid.show('Login realizado com sucesso', ToastAndroid.SHORT);
                dispatch({ type: 'REGISTER_SESSION', token: '113231o32132k47' });
              } else {
                // ToastAndroid.show('Usuário/senha incorretos. Tente novamente', ToastAndroid.SHORT);
                ToastAndroid.show(responseJson.message, ToastAndroid.SHORT);
                alert(responseJson.postdata)
                // alert(data.pass)
              }
            })
            .catch((error) => {
              ToastAndroid.show('error', ToastAndroid.SHORT);
              alert(error);
            });
        
      } else {
        ToastAndroid.show('Preencha email/senha', ToastAndroid.SHORT);
      }
      // let token = Math.random().toString(36).substring(7);
      // let userData = { name:'Eduardo Thomé', email: email, token: token }
      // setSessionStorage(userData)
      // navigation.navigate('Panel')
      
    } catch( error ){
      ToastAndroid.show('erro ao iniciar sessão'+error, ToastAndroid.LONG);
    }
  }   
  const _authToken = useSelector(state =>  state._authToken)

  // let _authToken = null

  let sessionStorage = getSessionStorage()
  sessionStorage.then((value) => {
    if(value){
      // _authToken = value
      dispatch({ type: 'REGISTER_SESSION', token: value }); 
      try {
        // ToastAndroid.show('redirect 2 ', ToastAndroid.LONG);
        
        navigation.navigate('Panel') 
      
      } catch(err){
        ToastAndroid.show('redirect', ToastAndroid.LONG);
      }
    }
    })
    .catch((err)=>{
      alert(err)
    })
    
    if(!_authToken && !loading){

     return(
       <View style={styles.container}>
         <View style={styles.form}>
           <Text>Login</Text>
           <Text>{ _authToken }</Text>
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

   } else {
     return(
       <View>
         <Text>carregando...</Text>
       </View>
     )
   }
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