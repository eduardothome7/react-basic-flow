import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { destroySessionStorage } from '../config/sessionStorage';
 
function PanelScreen() {
  return(
    <View>
      <Text>Painel de Atividades</Text>
      <Button title="Sair" onPress={()=> destroySessionStorage() }></Button>
    </View>
  );
}

export default PanelScreen; 
