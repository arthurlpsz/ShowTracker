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

getEvents,
getPastEvents,
getTotalPhotos

}
from '../../database';

import {
COLORS
}
from '../../constants/theme';

export default function Profile(){

const [totalEventos,
setTotalEventos]=
useState(0);

const [totalMemorias,
setTotalMemorias]=
useState(0);

const [totalFotos,
setTotalFotos]=
useState(0);

useFocusEffect(

useCallback(()=>{

setTotalEventos(
getEvents().length
);

setTotalMemorias(
getPastEvents().length
);

setTotalFotos(
getTotalPhotos()
);

},[])

);

function sair(){

router.replace(
'/login'
);

}

return(

<View style={styles.container}>

<View style={styles.header}>

<View style={styles.avatar}>

<Ionicons
name="person"
size={45}
color="#FFF"
/>

</View>

<Text style={styles.name}>
Usuário Local
</Text>

<Text style={styles.subtitle}>
Suas experiências musicais
</Text>

</View>

<View style={styles.row}>

<View style={styles.statCard}>

<Text style={styles.number}>
{totalEventos}
</Text>

<Text style={styles.label}>
Eventos
</Text>

</View>

<View style={styles.statCard}>

<Text style={styles.number}>
{totalMemorias}
</Text>

<Text style={styles.label}>
Memórias
</Text>

</View>

</View>

<View style={styles.bigCard}>

<View style={styles.infoRow}>

<Ionicons
name="images-outline"
size={22}
color={COLORS.neon}
/>

<Text style={styles.infoText}>
Fotos registradas: {totalFotos}
</Text>

</View>

<View style={styles.infoRow}>

<Ionicons
name="musical-notes-outline"
size={22}
color={COLORS.neon}
/>

<Text style={styles.infoText}>
ShowTracker v1.0
</Text>

</View>

</View>

<TouchableOpacity

style={styles.logoutButton}

onPress={sair}

>

<Ionicons
name="log-out-outline"
size={22}
color="#FFF"
/>

<Text style={styles.logoutText}>
Sair
</Text>

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
alignItems:'center',
marginTop:30,
marginBottom:30
},

avatar:{

width:110,
height:110,

borderRadius:55,

backgroundColor:
COLORS.primary,

justifyContent:'center',
alignItems:'center',

borderWidth:2,

borderColor:
COLORS.neon

},

name:{
fontSize:28,
fontWeight:'bold',
color:COLORS.text,
marginTop:15
},

subtitle:{
marginTop:5,
color:COLORS.subText
},

row:{
flexDirection:'row',
justifyContent:'space-between',
marginBottom:25
},

statCard:{

width:'48%',

backgroundColor:
COLORS.card,

padding:25,

borderRadius:25,

alignItems:'center',

borderWidth:1,

borderColor:
COLORS.border

},

number:{
fontSize:30,
fontWeight:'bold',
color:COLORS.text
},

label:{
marginTop:8,
color:COLORS.subText
},

bigCard:{

backgroundColor:
COLORS.card,

padding:25,

borderRadius:25,

borderWidth:1,

borderColor:
COLORS.border

},

infoRow:{
flexDirection:'row',
alignItems:'center',
marginBottom:20
},

infoText:{
marginLeft:12,
fontSize:16,
color:COLORS.text
},

logoutButton:{

marginTop:30,

backgroundColor:
COLORS.danger,

padding:18,

borderRadius:20,

flexDirection:'row',

justifyContent:'center',
alignItems:'center'

},

logoutText:{
marginLeft:10,
fontSize:18,
fontWeight:'bold',
color:'#FFF'
}

});