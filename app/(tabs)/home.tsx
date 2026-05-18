import {
View,
Text,
StyleSheet
}
from 'react-native';

export default function Home(){

return(

<View style={styles.container}>

<Text style={styles.title}>
🎵 ShowTracker
</Text>

<Text style={styles.subtitle}>
Organize seus eventos
</Text>

<View style={styles.card}>

<Text style={styles.cardTitle}>
📅 Eventos
</Text>

<Text>
Crie eventos e registre momentos especiais.
</Text>

</View>

<View style={styles.card}>

<Text style={styles.cardTitle}>
📍 Localização
</Text>

<Text>
Detecte quando chegar ao local do evento.
</Text>

</View>

<View style={styles.card}>

<Text style={styles.cardTitle}>
📷 Memórias
</Text>

<Text>
Registre fotos durante o evento.
</Text>

</View>

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
marginBottom:5
},

subtitle:{
fontSize:18,
marginBottom:25
},

card:{
borderWidth:1,
borderRadius:12,
padding:15,
marginBottom:15
},

cardTitle:{
fontSize:18,
fontWeight:'bold',
marginBottom:5
}

});