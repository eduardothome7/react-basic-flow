import * as React from 'react';
import { AsyncStorage, ToastAndroid, } from 'react-native';
 
export const setSessionStorage = (user) => {
  
  try {
    AsyncStorage.setItem('authToken', user.token);
  }catch(error){
    ToastAndroid.show('erro ao salvar sessão'+error, ToastAndroid.LONG);
  }
}

export const getSessionStorage = async() => {
  return await AsyncStorage.getItem('authToken');
}

export const destroySessionStorage = async() => {
  // unset
  try {
    await AsyncStorage.removeItem('authToken')
  } catch(error){
    ToastAndroid.show('erro ao encerrar sessão'+error, ToastAndroid.LONG);
  }
}
