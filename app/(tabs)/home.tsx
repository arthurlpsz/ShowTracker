import {
View,
Text,
StyleSheet
}
from 'react-native';

import {
useFocusEffect
}
from 'expo-router';

import {
useState,
useCallback
}
from 'react';

import {

getNextEvent,
getEvents,
getTotalPhotos,
EventType

}
from '../../database';

export default function Home(){

const [evento,
setEvento]=

useState<EventType|null>(
null
);

const [totalEventos,
setTotalEventos]=
useState(0);

const [totalFotos,
setTotalFotos]=
useState(0);

function carregar(){

setEvento(
getNextEvent()
);

setTotalEventos(
getEvents().length
);

setTotalFotos(
getTotalPhotos()
);

}

useFocusEffect(

useCallback(()=>{

carregar();

},[])

);

return(

<View style={styles.container}>

<Text style={styles.logo}>
🎵 ShowTracker
</Text>

<Text style={styles.subtitle}>
Seus momentos em eventos
</Text>

<View style={styles.cardMain}>

<Text style={styles.cardTitle}>
📅 Próximo Show
</Text>

{evento ? (

<>

<Text style={styles.eventName}>
{evento.title}
</Text>

<Text>
📍 {evento.location}
</Text>

<Text>
🕒 {evento.date}
</Text>

</>

):(

<Text>
Nenhum evento cadastrado
</Text>

)}

</View>

<View style={styles.row}>

<View style={styles.smallCard}>

<Text style={styles.number}>
{totalEventos}
</Text>

<Text>
Eventos
</Text>

</View>

<View style={styles.smallCard}>

<Text style={styles.number}>
{totalFotos}
</Text>

<Text>
Memórias
</Text>

</View>

</View>

</View>

);

}

const styles=
StyleSheet.create({

container:{
flex:1,
padding:20,
backgroundColor:'#F3F4F6'
},

logo:{
fontSize:34,
fontWeight:'bold',
marginTop:20
},

subtitle:{
fontSize:16,
color:'#666',
marginBottom:25
},

cardMain:{
backgroundColor:'#FFF',
padding:20,
borderRadius:20,
marginBottom:20,
elevation:5
},

cardTitle:{
fontSize:18,
fontWeight:'bold',
marginBottom:10
},

eventName:{
fontSize:22,
fontWeight:'bold',
marginBottom:8
},

row:{
flexDirection:'row',
justifyContent:'space-between'
},

smallCard:{
backgroundColor:'#FFF',
width:'48%',
padding:20,
borderRadius:20,
alignItems:'center',
elevation:5
},

number:{
fontSize:30,
fontWeight:'bold'
}

});