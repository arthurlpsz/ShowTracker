import {
View,
Text,
StyleSheet,
Image,
ScrollView
}
from 'react-native';

import {
useLocalSearchParams
}
from 'expo-router';

import {

getEventById,
getPhotos,
PhotoType

}
from '../database';

import {
useEffect,
useState
}
from 'react';

export default function MemoryDetails(){

const {id}=
useLocalSearchParams();

const event=
getEventById(
Number(id)
);

const [fotos,
setFotos]=

useState<PhotoType[]>(
[]
);

useEffect(()=>{

carregarFotos();

},[]);

function carregarFotos(){

setFotos(

getPhotos(
Number(id)
)

);

}

if(!event){

return(

<View style={styles.center}>

<Text>
Evento não encontrado
</Text>

</View>

);

}

return(

<View style={styles.container}>

<Text style={styles.title}>
{event.title}
</Text>

<Text>
📍 {event.location}
</Text>

<Text>
📅 {event.date}
</Text>

<Text style={styles.subtitle}>
Memórias
</Text>

{fotos.length===0 ? (

<Text>
Nenhuma foto registrada
</Text>

):(

<ScrollView
horizontal
showsHorizontalScrollIndicator={
false
}
>

{fotos.map(

foto=>(

<Image

key={
foto.id
}

source={{

uri:
foto.image_uri

}}

style={
styles.image
}

/>

)

)}

</ScrollView>

)}

</View>

);

}

const styles=
StyleSheet.create({

container:{
flex:1,
padding:20
},

center:{
flex:1,
justifyContent:'center',
alignItems:'center'
},

title:{
fontSize:28,
fontWeight:'bold'
},

subtitle:{
fontSize:20,
fontWeight:'bold',
marginVertical:20
},

image:{
width:250,
height:300,
borderRadius:15,
marginRight:15
}

});