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

import {
createEvent
}
from '../../database';

export default function CreateEvent(){

const [title,setTitle]=
useState('');

const [location,setLocation]=
useState('');

function salvar(){

createEvent(

title,
location,

-23.55052,
-46.633308,

new Date()
.toLocaleDateString()

);

Alert.alert(
'Sucesso',
'Evento criado'
);

}

return(

<View style={styles.container}>

<Text style={styles.title}>
Novo Evento
</Text>

<TextInput
placeholder='Nome'
style={styles.input}
value={title}
onChangeText={setTitle}
/>

<TextInput
placeholder='Local'
style={styles.input}
value={location}
onChangeText={setLocation}
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