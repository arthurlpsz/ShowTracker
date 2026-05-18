import {
View,
Text,
TextInput,
TouchableOpacity,
StyleSheet,
Alert
}
from 'react-native';

import {
useState
}
from 'react';

import {
router
}
from 'expo-router';

import {
createUser
}
from '../database';

export default function Cadastro(){

const [username,setUsername]=
useState('');

const [password,setPassword]=
useState('');

function cadastrar(){

if(
!username ||
!password
){

Alert.alert(
'Erro',
'Preencha todos os campos'
);

return;

}

createUser(
username,
password
);

Alert.alert(
'Sucesso',
'Conta criada'
);

router.replace(
'/login'
);

}

return(

<View style={styles.container}>

<Text style={styles.logo}>
🎵 Cadastro
</Text>

<Text style={styles.subtitle}>
Crie sua conta
</Text>

<View style={styles.card}>

<TextInput
placeholder='Usuário'
style={styles.input}
value={username}
onChangeText={setUsername}
/>

<TextInput
placeholder='Senha'
secureTextEntry
style={styles.input}
value={password}
onChangeText={setPassword}
/>

<TouchableOpacity
style={styles.button}
onPress={cadastrar}
>

<Text style={styles.buttonText}>
Cadastrar
</Text>

</TouchableOpacity>

<TouchableOpacity

onPress={()=>

router.replace(
'/login'
)

}

>

<Text style={styles.link}>
Já possui conta? Entrar
</Text>

</TouchableOpacity>

</View>

</View>

);

}

const styles=
StyleSheet.create({

container:{
flex:1,
justifyContent:'center',
padding:20,
backgroundColor:'#F4F6F8'
},

logo:{
fontSize:36,
fontWeight:'bold',
textAlign:'center'
},

subtitle:{
textAlign:'center',
color:'#666',
marginBottom:30
},

card:{
backgroundColor:'#FFF',
padding:25,
borderRadius:25,
elevation:5
},

input:{
borderWidth:1,
borderColor:'#DDD',
padding:12,
borderRadius:12,
marginBottom:15
},

button:{
backgroundColor:'#4F46E5',
padding:15,
borderRadius:15,
alignItems:'center'
},

buttonText:{
color:'#FFF',
fontSize:18,
fontWeight:'bold'
},

link:{
marginTop:20,
textAlign:'center',
fontSize:15,
color:'#4F46E5',
fontWeight:'bold'
}

});