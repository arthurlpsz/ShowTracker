import {
View,
Text,
FlatList,
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
getEvents,
EventType
}
from '../../database';

export default function Events(){

const [events,setEvents]=
useState<EventType[]>([]);

useFocusEffect(

useCallback(()=>{

const data=
getEvents();

setEvents(data);

},[])

);

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
marginBottom:10,
borderRadius:10
},

eventTitle:{
fontSize:18,
fontWeight:'bold'
}

});