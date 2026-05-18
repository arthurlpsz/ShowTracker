import {
View,
Text,
FlatList,
StyleSheet,
TouchableOpacity,
Alert,
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

getActiveEvents,
deleteEvent,
EventType

}
from '../../database';

import {
COLORS
}
from '../../constants/theme';

export default function Events(){

const [eventos,setEventos]=
useState<EventType[]>([]);

useFocusEffect(

useCallback(()=>{

setEventos(
getActiveEvents()
);

},[])

);

function atualizar(){

setEventos(
getActiveEvents()
);

}

function confirmarExcluir(
id:number
){

Alert.alert(

'Excluir evento',

'Deseja excluir este evento?',

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

atualizar();

}

}

]

);

}

return(

<View style={styles.container}>

<View style={styles.header}>

<Text style={styles.title}>
Meus Eventos
</Text>

<TouchableOpacity

style={styles.addButton}

onPress={()=>

router.push(
'/create-event'
)

}

>

<Ionicons
name='add'
size={20}
color='#FFF'
/>

<Text style={styles.addText}>
Adicionar
</Text>

</TouchableOpacity>

</View>

<FlatList

showsVerticalScrollIndicator={false}

data={eventos}

keyExtractor={(item)=>
item.id.toString()
}

renderItem={({item})=>(

<View style={styles.card}>

<Image

source={
require(
'../../assets/event-placeholder.jpg'
)
}

style={styles.banner}

/>

<Text style={styles.eventTitle}>
{item.title}
</Text>

<Text style={styles.info}>
📍 {item.location}
</Text>

<Text style={styles.info}>
📅 {item.date}
</Text>

<View style={styles.buttons}>

<TouchableOpacity

style={styles.actionButton}

onPress={()=>

router.push({

pathname:
'/event-details',

params:{
id:item.id
}

})

}

>

<Ionicons
name='eye-outline'
size={18}
color='#FFF'
/>

<Text style={styles.actionText}>
Abrir
</Text>

</TouchableOpacity>


<TouchableOpacity

style={styles.actionButton}

onPress={()=>

router.push({

pathname:
'/edit-event',

params:{
id:item.id
}

})

}

>

<Ionicons
name='create-outline'
size={18}
color='#FFF'
/>

<Text style={styles.actionText}>
Editar
</Text>

</TouchableOpacity>


<TouchableOpacity

style={styles.deleteButton}

onPress={()=>

confirmarExcluir(
item.id
)

}

>

<Ionicons
name='trash-outline'
size={18}
color='#EF4444'
/>

<Text style={styles.deleteText}>
Excluir
</Text>

</TouchableOpacity>

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
padding:20,
backgroundColor:COLORS.background
},

header:{
flexDirection:'row',
justifyContent:'space-between',
alignItems:'center',
marginBottom:25
},

title:{
fontSize:32,
fontWeight:'bold',
color:COLORS.text
},

addButton:{

backgroundColor:
COLORS.primary,

paddingHorizontal:15,
paddingVertical:10,

borderRadius:15,

flexDirection:'row',
alignItems:'center'

},

addText:{
marginLeft:5,
color:'#FFF',
fontWeight:'bold'
},

card:{

backgroundColor:
COLORS.card,

padding:15,

borderRadius:25,

marginBottom:20,

borderWidth:1,

borderColor:
COLORS.border

},

banner:{

width:'100%',
height:130,

borderRadius:18,

marginBottom:15

},

eventTitle:{
fontSize:24,
fontWeight:'bold',
color:COLORS.text,
marginBottom:10
},

info:{
fontSize:15,
color:COLORS.subText,
marginBottom:5
},

buttons:{
marginTop:18,
flexDirection:'row',
justifyContent:'space-between'
},

actionButton:{

width:'31%',

backgroundColor:
'rgba(124,58,237,0.25)',

paddingVertical:12,

borderRadius:14,

justifyContent:'center',
alignItems:'center',

flexDirection:'row',

borderWidth:1,

borderColor:
'rgba(124,58,237,0.35)'

},

deleteButton:{

width:'31%',

backgroundColor:
'rgba(239,68,68,0.15)',

paddingVertical:12,

borderRadius:14,

justifyContent:'center',
alignItems:'center',

flexDirection:'row',

borderWidth:1,

borderColor:
'rgba(239,68,68,0.25)'

},

actionText:{
marginLeft:6,
color:'#FFF',
fontWeight:'600'
},

deleteText:{
marginLeft:6,
color:'#EF4444',
fontWeight:'600'
}

});