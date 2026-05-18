import {
View,
Text,
TextInput,
TouchableOpacity,
StyleSheet,
ScrollView,
Alert
}
from 'react-native';

import {
useState
}
from 'react';

import * as Calendar from 'expo-calendar';
import * as Location from 'expo-location';

import {
Ionicons
}
from '@expo/vector-icons';

import {
router
}
from 'expo-router';

import {
createEvent
}
from '../database';

import {
COLORS
}
from '../constants/theme';

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

await Calendar
.requestCalendarPermissionsAsync();

if(status!=='granted')
return;

const calendars=

await Calendar
.getCalendarsAsync(
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

notes:`Evento registrado no ShowTracker: ${title}`,

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

const locais=

await Location.geocodeAsync(
location
);

if(locais.length===0){

Alert.alert(
'Erro',
'Endereço não encontrado'
);

return;

}

const latitude=
locais[0].latitude;

const longitude=
locais[0].longitude;

createEvent(

title,
location,

latitude,
longitude,

`${date} ${time}`

);

await adicionarCalendario();

Alert.alert(
'Sucesso',
'Evento criado'
);

router.back();

}

return(

<ScrollView

style={styles.container}
showsVerticalScrollIndicator={false}

>

<View style={styles.header}>

<View style={styles.iconContainer}>

<Ionicons
name="add-circle"
size={35}
color="#FFF"
/>

</View>

<Text style={styles.title}>
Novo Evento
</Text>

<Text style={styles.subtitle}>
Registre seu próximo show
</Text>

</View>

<View style={styles.card}>

<View style={styles.inputContainer}>

<Ionicons
name="musical-notes-outline"
size={22}
color={COLORS.neon}
/>

<TextInput

placeholder='Nome do evento'
placeholderTextColor={
COLORS.subText
}

style={styles.input}

value={title}
onChangeText={setTitle}

/>

</View>


<View style={styles.inputContainer}>

<Ionicons
name="location-outline"
size={22}
color={COLORS.neon}
/>

<TextInput

placeholder='Local'
placeholderTextColor={
COLORS.subText
}

style={styles.input}

value={location}
onChangeText={setLocation}

/>

</View>


<View style={styles.inputContainer}>

<Ionicons
name="calendar-outline"
size={22}
color={COLORS.neon}
/>

<TextInput

placeholder='Data (15/01/2026)'
placeholderTextColor={
COLORS.subText
}

style={styles.input}

value={date}
onChangeText={setDate}

/>

</View>


<View style={styles.inputContainer}>

<Ionicons
name="time-outline"
size={22}
color={COLORS.neon}
/>

<TextInput

placeholder='Horário (18:00)'
placeholderTextColor={
COLORS.subText
}

style={styles.input}

value={time}
onChangeText={setTime}

/>

</View>


<TouchableOpacity

style={styles.button}

onPress={salvar}

>

<Text style={styles.buttonText}>
Criar Evento
</Text>

</TouchableOpacity>

</View>

</ScrollView>

);

}

const styles=
StyleSheet.create({

container:{
flex:1,
backgroundColor:COLORS.background,
padding:20
},

header:{
alignItems:'center',
marginTop:25,
marginBottom:30
},

iconContainer:{

width:90,
height:90,

borderRadius:50,

backgroundColor:
COLORS.primary,

justifyContent:'center',
alignItems:'center',

borderWidth:2,

borderColor:
COLORS.neon,

marginBottom:15

},

title:{
fontSize:30,
fontWeight:'bold',
color:COLORS.text
},

subtitle:{
marginTop:8,
color:COLORS.subText
},

card:{

backgroundColor:
COLORS.card,

padding:25,

borderRadius:30,

borderWidth:1,

borderColor:
COLORS.border

},

inputContainer:{

flexDirection:'row',

alignItems:'center',

backgroundColor:
COLORS.cardHighlight,

paddingHorizontal:15,

borderRadius:18,

marginBottom:18,

borderWidth:1,

borderColor:
COLORS.border

},

input:{
flex:1,
padding:16,
marginLeft:10,
color:COLORS.text
},

button:{

backgroundColor:
COLORS.primary,

padding:18,

borderRadius:20,

alignItems:'center',

marginTop:10

},

buttonText:{
fontSize:18,
fontWeight:'bold',
color:'#FFF'
}

});