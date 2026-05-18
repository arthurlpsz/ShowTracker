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
useLocalSearchParams,
router
}
from 'expo-router';

import {
useState
}
from 'react';

import {
getEventById,
updateEvent
}
from '../database';

export default function EditEvent(){

const {id}=
useLocalSearchParams();

const event=
getEventById(
Number(id)
);

const [title,setTitle]=
useState(
event?.title || ''
);

const [location,setLocation]=
useState(
event?.location || ''
);

const [date,setDate]=
useState(
event?.date || ''
);

function salvar(){

updateEvent(

Number(id),
title,
location,

-23.55052,
-46.633308,

date

);

Alert.alert(
'Sucesso',
'Evento atualizado'
);

router.back();

}

return(

<View style={styles.container}>

<Text style={styles.title}>
Editar Evento
</Text>

<TextInput
style={styles.input}
value={title}
onChangeText={setTitle}
/>

<TextInput
style={styles.input}
value={location}
onChangeText={setLocation}
/>

<TextInput
style={styles.input}
value={date}
onChangeText={setDate}
/>

<Button
title='Salvar alterações'
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