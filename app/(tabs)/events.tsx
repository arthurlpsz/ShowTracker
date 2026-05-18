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

'Excluir evento',

'Deseja realmente excluir este evento?',

[
{
text:'Cancelar'
},

{
text:'Excluir',

style:'destructive',

onPress:()=>{

deleteEvent(
id
);

carregar();

}

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
title='Abrir'
onPress={()=>

router.push({

pathname:
'/event-details',

params:{
id:item.id
}

})

}
/>

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
padding:15,
marginBottom:15,
borderRadius:10
},

eventTitle:{
fontSize:18,
fontWeight:'bold',
marginBottom:5
},

buttons:{
marginTop:10,
flexDirection:'row',
justifyContent:'space-between'
}

});