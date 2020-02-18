import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { useSelector } from 'react-redux';
 
const PanelScreen = () => {
  const _authToken = useSelector(state =>  state._authToken)
  return(
    <View>
      <Text>Painel de Atividades</Text>
      <Text>Olá, {_authToken}</Text>
    </View>
  );
}

export default PanelScreen; 
