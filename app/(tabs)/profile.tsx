import {
View,
Text,
Button,
StyleSheet
}
from 'react-native';

import {
router
}
from 'expo-router';

import {
getEvents
}
from '../../database';

export default function Profile(){

const totalEventos=
getEvents().length;

function sair(){

router.replace(
'/login'
);

}

return(

<View style={styles.container}>

<Text style={styles.title}>
👤 Perfil
</Text>

<View style={styles.card}>

<Text style={styles.label}>
Usuário:
</Text>

<Text>
Usuário Local
</Text>

</View>

<View style={styles.card}>

<Text style={styles.label}>
Eventos criados:
</Text>

<Text>
{totalEventos}
</Text>

</View>

<View style={styles.card}>

<Text style={styles.label}>
Versão:
</Text>

<Text>
1.0
</Text>

</View>

<Button
title='Sair'
onPress={sair}
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
fontSize:30,
fontWeight:'bold',
marginBottom:20
},

card:{
borderWidth:1,
borderRadius:10,
padding:15,
marginBottom:15
},

label:{
fontWeight:'bold',
marginBottom:5
}

});