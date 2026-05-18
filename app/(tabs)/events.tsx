import {
View,
Text,
FlatList,
StyleSheet,
Button,
Alert
}
from 'react-native';

import {
useState,
useCallback
}
from 'react';

import {
router,
useFocusEffect
}
from 'expo-router';

import {

getEvents,
deleteEvent,
EventType

}
from '../../database';

export default function Events(){

const [events,setEvents]=
useState<EventType[]>([]);

function carregar(){

setEvents(
getEvents()
);

}

useFocusEffect(

useCallback(()=>{

carregar();

},[])

);

function confirmarExcluir(
id:number
){

Alert.alert(

'Excluir',

'Deseja realmente excluir?',

[
{
text:'Cancelar'
},

{
text:'Excluir',

onPress:()=>{

deleteEvent(
id
);

carregar();

},

style:'destructive'

}

]

);

}

return(

<View style={styles.container}>

<Text style={styles.title}>
Meus Eventos
</Text>

<FlatList

data={events}

keyExtractor={(item)=>
item.id.toString()
}

renderItem={({item})=>(

<View style={styles.card}>

<Text style={styles.eventTitle}>
{item.title}
</Text>

<Text>
📍 {item.location}
</Text>

<Text>
📅 {item.date}
</Text>

<View
style={styles.buttons}
>

<Button
title='Editar'
onPress={()=>

router.push({

pathname:
'/edit-event',

params:{
id:item.id
}

})

}
/>

<Button
title='Excluir'
onPress={()=>

confirmarExcluir(
item.id
)

}
/>

</View>

</View>

)}

/>

</View>

);

}

const styles=
StyleSheet.create({

container:{
flex:1,
padding:20
},

title:{
fontSize:28,
fontWeight:'bold',
marginBottom:20
},

card:{
borderWidth:1,
borderRadius:10,
padding:15,
marginBottom:15
},

eventTitle:{
fontWeight:'bold',
fontSize:18,
marginBottom:5
},

buttons:{
marginTop:10,
flexDirection:'row',
justifyContent:'space-between'
}

});