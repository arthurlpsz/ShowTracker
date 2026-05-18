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

import { loginUser } from '../database';

export default function Login(){

const [username,setUsername]=
useState('');

const [password,setPassword]=
useState('');

function entrar(){

const user=
loginUser(
username,
password
);

if(user){

router.replace('/(tabs)/home')

}else{

Alert.alert(
'Erro',
'Usuário não encontrado'
);

}

}

return(

<View style={styles.container}>

<Text style={styles.title}>
Login
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
title='Entrar'
onPress={entrar}
/>

<Button
title='Cadastrar'
onPress={()=>
router.push('/register')
}
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