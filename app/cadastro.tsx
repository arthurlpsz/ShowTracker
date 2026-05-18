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
Ionicons
}
from '@expo/vector-icons';

import {
createUser
}
from '../database';

import {
COLORS
}
from '../constants/theme';

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

<View style={styles.glowTop}/>
<View style={styles.glowBottom}/>

<View style={styles.logoContainer}>

<View style={styles.iconContainer}>

<Ionicons
name="headset"
size={42}
color={COLORS.text}
/>

</View>

<Text style={styles.logo}>
ShowTracker
</Text>

<Text style={styles.subtitle}>
Crie sua conta
</Text>

</View>

<View style={styles.card}>

<Text style={styles.cardTitle}>
Cadastro
</Text>

<Text style={styles.cardSubtitle}>
Preencha seus dados
</Text>

<View style={styles.inputContainer}>

<Ionicons
name="person-outline"
size={20}
color={COLORS.subText}
/>

<TextInput
placeholder='Usuário'
placeholderTextColor={
COLORS.subText
}
style={styles.input}
value={username}
onChangeText={setUsername}
/>

</View>

<View style={styles.inputContainer}>

<Ionicons
name="lock-closed-outline"
size={20}
color={COLORS.subText}
/>

<TextInput
placeholder='Senha'
placeholderTextColor={
COLORS.subText
}
secureTextEntry
style={styles.input}
value={password}
onChangeText={setPassword}
/>

</View>

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
padding:25,
backgroundColor:COLORS.background
},

glowTop:{

position:'absolute',

top:-150,
right:-100,

width:350,
height:350,

borderRadius:350,

backgroundColor:
COLORS.primary,

opacity:0.18

},

glowBottom:{

position:'absolute',

bottom:-100,
left:-100,

width:250,
height:250,

borderRadius:300,

backgroundColor:
COLORS.neon,

opacity:0.10

},

logoContainer:{
marginBottom:40,
alignItems:'center'
},

iconContainer:{

width:90,
height:90,

borderRadius:50,

backgroundColor:
COLORS.primary,

justifyContent:'center',
alignItems:'center',

marginBottom:15,

borderWidth:2,

borderColor:
COLORS.neon

},

logo:{
fontSize:38,
fontWeight:'bold',
color:COLORS.text
},

subtitle:{
marginTop:8,
fontSize:15,
color:COLORS.subText
},

card:{

backgroundColor:
COLORS.card,

padding:30,

borderRadius:35,

borderWidth:1,

borderColor:
COLORS.border

},

cardTitle:{
fontSize:28,
fontWeight:'bold',
color:COLORS.text
},

cardSubtitle:{
marginBottom:25,
color:COLORS.subText
},

inputContainer:{

flexDirection:'row',
alignItems:'center',

backgroundColor:
COLORS.cardHighlight,

paddingHorizontal:15,

borderRadius:18,

marginBottom:15,

borderWidth:1,

borderColor:
COLORS.border

},

input:{
flex:1,
padding:16,
color:COLORS.text
},

button:{

backgroundColor:
COLORS.primary,

padding:18,

borderRadius:18,

alignItems:'center',

marginTop:10

},

buttonText:{
fontSize:18,
fontWeight:'bold',
color:COLORS.text
},

link:{
marginTop:25,
textAlign:'center',
fontSize:16,
fontWeight:'bold',
color:COLORS.lightPurple
}

});