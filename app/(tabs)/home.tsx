import { View, Text, Button, StyleSheet } from 'react-native';
import { router } from 'expo-router';

export default function Home(){

return(

<View style={styles.container}>

<Text style={styles.title}>ShowTracker</Text>

<Text style={styles.subtitle}>Gerencie seus eventos</Text>

<View style={styles.button}>

<Button title='Criar Evento' onPress={() => router.push('/create-event')}/>

</View>

</View>

);

}

const styles=StyleSheet.create({

container:{
flex:1,
justifyContent:'center',
padding:20
},

title:{
fontSize:30,
fontWeight:'bold',
marginBottom:10,
textAlign:'center'
},

subtitle:{
fontSize:18,
marginBottom:30,
textAlign:'center'
},

button:{
marginTop:20
}

});