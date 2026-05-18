import {
View,
Text,
StyleSheet,
Image,
ScrollView,
TouchableOpacity
}
from 'react-native';

import {
useLocalSearchParams,
router
}
from 'expo-router';

import {
useEffect,
useState
}
from 'react';

import {
Ionicons
}
from '@expo/vector-icons';

import {

getEventById,
getPhotos,
PhotoType

}
from '../database';

import {
COLORS
}
from '../constants/theme';

export default function MemoryDetails(){

const {id}=
useLocalSearchParams();

const event=
getEventById(
Number(id)
);

const [fotos,setFotos]=
useState<PhotoType[]>([]);

useEffect(()=>{

setFotos(
getPhotos(
Number(id)
)
);

},[]);

if(!event){

return(

<View style={styles.center}>

<Text style={{
color:COLORS.text
}}>
Evento não encontrado
</Text>

</View>

);

}

const capa=

fotos.length>0

?

{
uri:
fotos[0].image_uri
}

:

require(
'../assets/event-placeholder.jpg'
);

return(

<ScrollView
style={styles.container}
showsVerticalScrollIndicator={false}
>

<TouchableOpacity

style={styles.backButton}

onPress={()=>
router.back()
}

>

<Ionicons
name="arrow-back"
size={24}
color="#FFF"
/>

</TouchableOpacity>

<Image

source={capa}

style={styles.banner}

/>

<View style={styles.infoCard}>

<Text style={styles.title}>
{event.title}
</Text>

<Text style={styles.info}>
📍 {event.location}
</Text>

<Text style={styles.info}>
📅 {event.date}
</Text>

</View>

<Text style={styles.sectionTitle}>
Momentos registrados
</Text>

{fotos.map(

foto=>(

<View

key={foto.id}

style={styles.photoCard}

>

<Image

source={{
uri:
foto.image_uri
}}

style={styles.image}

/>

</View>

)

)}

</ScrollView>

);

}

const styles=
StyleSheet.create({

container:{
flex:1,
backgroundColor:COLORS.background
},

center:{
flex:1,
justifyContent:'center',
alignItems:'center',
backgroundColor:COLORS.background
},

backButton:{

position:'absolute',

top:50,
left:20,

zIndex:10,

backgroundColor:
'rgba(0,0,0,0.4)',

padding:10,

borderRadius:30

},

banner:{
width:'100%',
height:250
},

infoCard:{

margin:20,

backgroundColor:
COLORS.card,

padding:20,

borderRadius:25,

marginTop:-40,

borderWidth:1,

borderColor:
COLORS.border

},

title:{
fontSize:28,
fontWeight:'bold',
color:COLORS.text
},

info:{
marginTop:10,
color:COLORS.subText
},

sectionTitle:{
fontSize:20,
fontWeight:'bold',
color:COLORS.text,
marginHorizontal:20,
marginBottom:15
},

photoCard:{

marginHorizontal:20,
marginBottom:20,

backgroundColor:
COLORS.card,

padding:8,

borderRadius:20,

borderWidth:1,

borderColor:
COLORS.border

},

image:{
width:'100%',
height:300,
borderRadius:15
}

});