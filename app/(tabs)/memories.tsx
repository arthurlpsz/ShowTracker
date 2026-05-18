import {
View,
Text,
FlatList,
TouchableOpacity,
StyleSheet,
Image
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

getPastEvents,
getPhotos,
EventType

}
from '../../database';

import {
COLORS
}
from '../../constants/theme';

export default function Memories(){

const [memorias,
setMemorias]=
useState<EventType[]>([]);

useFocusEffect(

useCallback(()=>{

setMemorias(
getPastEvents()
);

},[])

);

return(

<View style={styles.container}>

<Text style={styles.title}>
Memórias
</Text>

<Text style={styles.subtitle}>
Seus momentos registrados
</Text>

<FlatList

showsVerticalScrollIndicator={false}

data={memorias}

keyExtractor={(item)=>
item.id.toString()
}

renderItem={({item})=>{

const fotos=
getPhotos(item.id);

const imagem=

fotos.length>0

?

{
uri:
fotos[0].image_uri
}

:

require(
'../../assets/event-placeholder.jpg'
);

return(

<TouchableOpacity

style={styles.card}

onPress={()=>

router.push({

pathname:
'/memory-details',

params:{
id:item.id
}

})

}

>

<Image

source={imagem}

style={styles.banner}

/>

<View style={styles.content}>

<Text style={styles.event}>
{item.title}
</Text>

<Text style={styles.date}>
📅 {item.date}
</Text>

<View style={styles.openContainer}>

<Text style={styles.openText}>
Abrir álbum
</Text>

<Ionicons
name="chevron-forward"
size={18}
color={COLORS.neon}
/>

</View>

</View>

</TouchableOpacity>

);

}}

/>

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

title:{
fontSize:32,
fontWeight:'bold',
color:COLORS.text
},

subtitle:{
marginTop:5,
marginBottom:25,
color:COLORS.subText
},

card:{
backgroundColor:COLORS.card,
borderRadius:25,
overflow:'hidden',
marginBottom:20,
borderWidth:1,
borderColor:COLORS.border
},

banner:{
width:'100%',
height:180
},

content:{
padding:18
},

event:{
fontSize:22,
fontWeight:'bold',
color:COLORS.text
},

date:{
marginTop:8,
color:COLORS.subText
},

openContainer:{
marginTop:15,
flexDirection:'row',
alignItems:'center'
},

openText:{
color:COLORS.neon,
fontWeight:'bold',
marginRight:5
}

});