import {
View,
Text,
FlatList,
StyleSheet,
Button,
Alert,
TouchableOpacity
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

getActiveEvents,
getPastEvents,
deleteEvent,
EventType

}
from '../../database';

export default function Events(){

const [aba,setAba]=
useState('ativos');

const [eventos,setEventos]=
useState<EventType[]>([]);

function carregar(){

if(
aba==='ativos'
){

setEventos(
getActiveEvents()
);

}else{

setEventos(
getPastEvents()
);

}

}

useFocusEffect(

useCallback(()=>{

carregar();

},[aba])

);

function confirmarExcluir(
id:number
){

Alert.alert(

'Excluir',

'Deseja excluir?',

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

<View style={styles.tabs}>

<TouchableOpacity

style={[

styles.tab,

aba==='ativos'
&&
styles.activeTab

]}

onPress={()=>
setAba(
'ativos'
)
}

>

<Text>
Eventos
</Text>

</TouchableOpacity>

<TouchableOpacity

style={[

styles.tab,

aba==='lembrancas'
&&
styles.activeTab

]}

onPress={()=>
setAba(
'lembrancas'
)
}

>

<Text>
Lembranças
</Text>

</TouchableOpacity>

</View>

<FlatList

data={eventos}

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

{aba==='ativos' ? (

<View style={styles.buttons}>

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

):(

<TouchableOpacity

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

<Text
style={styles.arrow}
>

➜

</Text>

</TouchableOpacity>

)}

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

tabs:{
flexDirection:'row',
marginBottom:20
},

tab:{
flex:1,
padding:12,
alignItems:'center',
borderRadius:10,
backgroundColor:'#DDD',
marginHorizontal:5
},

activeTab:{
backgroundColor:'#B0C4DE'
},

card:{
borderWidth:1,
padding:15,
borderRadius:15,
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
},

arrow:{
fontSize:28,
alignSelf:'flex-end'
}

});