import { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert
} from 'react-native';

import * as Calendar from 'expo-calendar';
import * as Location from 'expo-location';

import { createEvent } from '../../database';

export default function CreateEvent(){

const [title,setTitle]=
useState('');

const [location,setLocation]=
useState('');

const [date,setDate]=
useState('');

const [time,setTime]=
useState('');

async function adicionarCalendario(){

const {status}=
await Calendar.requestCalendarPermissionsAsync();

if(status!=='granted') return;

const calendars=
await Calendar.getCalendarsAsync(
Calendar.EntityTypes.EVENT
);

if(calendars.length===0)
return;

await Calendar.createEventAsync(

calendars[0].id,

{
title,

startDate:new Date(),

endDate:new Date(
new Date().getTime()
+3600000
),

location
}

);

}

async function salvar(){

if(
!title||
!location||
!date||
!time
){

Alert.alert(
'Erro',
'Preencha todos os campos'
);

return;

}

const {granted}=
await Location
.requestForegroundPermissionsAsync();

if(!granted){

Alert.alert(
'Erro',
'Permissão de localização negada'
);

return;

}

const posicao=
await Location
.getCurrentPositionAsync();

createEvent(

title,
location,

posicao.coords.latitude,
posicao.coords.longitude,

`${date} ${time}`

);

await adicionarCalendario();

Alert.alert(
'Sucesso',
'Evento criado'
);

setTitle('');
setLocation('');
setDate('');
setTime('');

}

return(

<View style={styles.container}>

<Text style={styles.title}>
Novo Evento
</Text>

<TextInput
placeholder='Nome do evento'
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

<TextInput
placeholder='Data (DD/MM/AAAA)'
style={styles.input}
value={date}
onChangeText={setDate}
/>

<TextInput
placeholder='Horário (20:00)'
style={styles.input}
value={time}
onChangeText={setTime}
/>

<Button
title='Salvar Evento'
onPress={salvar}
/>

</View>

);

}

const styles=
StyleSheet.create({

container:{
flex:1,
padding:20,
justifyContent:'center'
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
borderRadius:10
}

});