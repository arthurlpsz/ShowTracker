import {
View,
Text,
StyleSheet,
TouchableOpacity
}
from 'react-native';

import {
router,
useFocusEffect
}
from 'expo-router';

import {
useState,
useCallback
}
from 'react';

import {
Ionicons
}
from '@expo/vector-icons';

import {

getNextEvent,
getEvents,
getTotalPhotos,
EventType

}
from '../../database';

import {
COLORS
}
from '../../constants/theme';

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

<View style={styles.header}>

<View style={styles.iconContainer}>

<Ionicons
name="headset"
size={24}
color={COLORS.text}
/>

</View>

<View>

<Text style={styles.logo}>
ShowTracker
</Text>

<Text style={styles.subtitle}>
Seus momentos em shows
</Text>

</View>

</View>

<View style={styles.mainCard}>

<Text style={styles.cardLabel}>
PRÓXIMO SHOW
</Text>

{evento ? (

<>

<Text style={styles.eventTitle}>
{evento.title}
</Text>

<Text style={styles.info}>
📍 {evento.location}
</Text>

<Text style={styles.info}>
📅 {evento.date}
</Text>

</>

):(

<Text style={styles.info}>
Nenhum evento cadastrado
</Text>

)}

</View>

<View style={styles.row}>

<View style={styles.smallCard}>

<Text style={styles.number}>
{totalEventos}
</Text>

<Text style={styles.smallText}>
Eventos
</Text>

</View>

<View style={styles.smallCard}>

<Text style={styles.number}>
{totalFotos}
</Text>

<Text style={styles.smallText}>
Memórias
</Text>

</View>

</View>

<TouchableOpacity

style={styles.createCard}

onPress={()=>

router.push(
'/create-event'
)

}

>

<View>

<Text style={styles.createTitle}>
Novo Evento
</Text>

<Text style={styles.createSubtitle}>
Registrar próximo show
</Text>

</View>

<Ionicons
name="add-circle"
size={40}
color={COLORS.neon}
/>

</TouchableOpacity>

</View>

);

}

const styles=
StyleSheet.create({

container:{
flex:1,
padding:20,
backgroundColor:COLORS.background
},

header:{
flexDirection:'row',
alignItems:'center',
marginTop:20,
marginBottom:30
},

iconContainer:{

width:50,
height:50,

borderRadius:25,

backgroundColor:
COLORS.primary,

justifyContent:'center',
alignItems:'center',

marginRight:15

},

logo:{
fontSize:30,
fontWeight:'bold',
color:COLORS.text
},

subtitle:{
color:COLORS.subText
},

mainCard:{
backgroundColor:COLORS.card,
padding:25,
borderRadius:30,
marginBottom:25,
borderWidth:1,
borderColor:COLORS.border
},

cardLabel:{
fontSize:13,
fontWeight:'bold',
color:COLORS.neon,
marginBottom:15
},

eventTitle:{
fontSize:26,
fontWeight:'bold',
color:COLORS.text,
marginBottom:15
},

info:{
fontSize:15,
color:COLORS.subText,
marginBottom:8
},

row:{
flexDirection:'row',
justifyContent:'space-between',
marginBottom:25
},

smallCard:{
backgroundColor:COLORS.card,
width:'48%',
padding:25,
borderRadius:25,
alignItems:'center',
borderWidth:1,
borderColor:COLORS.border
},

number:{
fontSize:30,
fontWeight:'bold',
color:COLORS.text
},

smallText:{
marginTop:8,
color:COLORS.subText
},

createCard:{

backgroundColor:
COLORS.primary,

padding:25,

borderRadius:30,

marginTop:10,

flexDirection:'row',

justifyContent:'space-between',

alignItems:'center'

},

createIconContainer:{

width:60,
height:60,

borderRadius:30,

backgroundColor:
'rgba(255,255,255,0.12)',

justifyContent:'center',
alignItems:'center'

},

createTitle:{
fontSize:22,
fontWeight:'bold',
color:COLORS.text
},

createSubtitle:{
marginTop:6,
fontSize:14,
color:'rgba(255,255,255,0.8)'
}

});