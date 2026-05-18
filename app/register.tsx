import { useState } from 'react';

import {
View,
Text,
TextInput,
Button,
StyleSheet,
Alert
}
from 'react-native';

import { router } from 'expo-router';

import { createUser } from '../database';

export default function Register(){

const [username,setUsername]=
useState('');

const [password,setPassword]=
useState('');

function salvar(){

createUser(
username,
password
);

Alert.alert(
'Sucesso',
'Conta criada'
);

router.push('/login');

}

return(

<View style={styles.container}>

<Text style={styles.title}>
Cadastro
</Text>

<TextInput
placeholder='Usuário'
style={styles.input}
value={username}
onChangeText={setUsername}
/>

<TextInput
placeholder='Senha'
secureTextEntry
style={styles.input}
value={password}
onChangeText={setPassword}
/>

<Button
title='Salvar'
onPress={salvar}
/>

</View>

);

}

const styles=
StyleSheet.create({

container:{
flex:1,
justifyContent:'center',
padding:20
},

title:{
fontSize:28,
fontWeight:'bold',
marginBottom:20
},

input:{
borderWidth:1,
padding:10,
marginBottom:10,
borderRadius:8
}

});