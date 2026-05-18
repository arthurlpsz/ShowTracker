import {
View,
Text,
StyleSheet,
Image,
ScrollView,
TouchableOpacity
}
from 'react-native';

import {
useLocalSearchParams
}
from 'expo-router';

import {
useEffect,
useRef,
useState
}
from 'react';

import * as Location from 'expo-location';

import {
CameraView,
useCameraPermissions
}
from 'expo-camera';

import {
Ionicons
}
from '@expo/vector-icons';

import {

getEventById,
savePhoto,
getPhotos,
PhotoType

}
from '../database';

import {
COLORS
}
from '../constants/theme';

export default function EventDetails(){

const {id}=
useLocalSearchParams();

const event=
getEventById(
Number(id)
);

const [perto,setPerto]=
useState(false);

const [fotos,setFotos]=
useState<PhotoType[]>([]);

const [flash,setFlash]=
useState<'off'|'on'>(
'off'
);

const [cameraType,setCameraType]=
useState<'back'|'front'>(
'back'
);

const cameraRef=
useRef<CameraView>(null);

const [

cameraPermission,
requestCameraPermission

]=
useCameraPermissions();

useEffect(()=>{

verificarLocalizacao();

carregarFotos();

},[]);

function carregarFotos(){

setFotos(
getPhotos(
Number(id)
)
);

}

async function verificarLocalizacao(){

if(!event)
return;

const {granted}=

await Location
.requestForegroundPermissionsAsync();

if(!granted)
return;

await Location
.getCurrentPositionAsync();

setPerto(true);

}

async function tirarFoto(){

if(
!cameraRef.current
)
return;

const imagem=

await cameraRef.current
.takePictureAsync();

if(!imagem)
return;

savePhoto(

Number(id),
imagem.uri

);

carregarFotos();

}

if(!event){

return(

<View style={styles.center}>

<Text style={{
color:COLORS.text
}}>
Evento não encontrado
</Text>

</View>

);

}

return(

<View style={styles.container}>

<View style={styles.headerCard}>

<Text style={styles.title}>
{event.title}
</Text>

<Text style={styles.date}>
📅 {event.date}
</Text>

</View>

{!perto ? (

<Text style={styles.message}>
Obtendo localização...
</Text>

):(

<>

{!cameraPermission?.granted ? (

<TouchableOpacity

style={styles.permissionButton}

onPress={
requestCameraPermission
}

>

<Text
style={styles.buttonText}
>

Permitir câmera

</Text>

</TouchableOpacity>

):(


<>

<CameraView

ref={cameraRef}

style={
styles.camera
}

flash={flash}

facing={cameraType}

/>

<View style={styles.cameraButtons}>


<TouchableOpacity

style={[

styles.smallButton,

flash==='on'
&&
styles.activeFlash

]}

onPress={()=>

setFlash(

flash==='off'
?
'on'
:
'off'

)

}

>

<Ionicons

name={

flash==='on'

?

'flash'

:

'flash-off'

}

size={24}

color={

flash==='on'

?

'#FFD700'

:

COLORS.text

}

/>

<Text
style={styles.flashText}
>

{

flash==='on'

?

'ON'

:

'OFF'

}

</Text>

</TouchableOpacity>



<TouchableOpacity

style={styles.captureButton}

onPress={
tirarFoto
}

>

<Ionicons
name="camera"
size={34}
color="#FFF"
/>

</TouchableOpacity>



<TouchableOpacity

style={styles.smallButton}

onPress={()=>

setCameraType(

cameraType==='back'
?
'front'
:
'back'

)

}

>

<Ionicons
name="camera-reverse"
size={24}
color={COLORS.text}
/>

</TouchableOpacity>

</View>

</>

)}

<Text style={styles.galleryTitle}>
Momentos registrados
</Text>

<ScrollView
horizontal
showsHorizontalScrollIndicator={
false
}
>

{fotos.map(

foto=>(

<View
key={foto.id}
style={styles.imageCard}
>

<Image

source={{
uri:
foto.image_uri
}}

style={
styles.image
}

/>

</View>

)

)}

</ScrollView>

</>

)}

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

center:{
flex:1,
justifyContent:'center',
alignItems:'center',
backgroundColor:COLORS.background
},

headerCard:{
backgroundColor:COLORS.card,
padding:20,
borderRadius:25,
marginBottom:20,
borderWidth:1,
borderColor:COLORS.border
},

title:{
fontSize:28,
fontWeight:'bold',
color:COLORS.text
},

date:{
marginTop:10,
color:COLORS.subText
},

message:{
color:COLORS.text
},

camera:{
height:420,
borderRadius:30,
overflow:'hidden'
},

cameraButtons:{
marginTop:20,
marginBottom:20,
flexDirection:'row',
justifyContent:'space-evenly',
alignItems:'center'
},

smallButton:{
backgroundColor:COLORS.cardHighlight,
width:70,
height:70,
borderRadius:50,
justifyContent:'center',
alignItems:'center',
borderWidth:1,
borderColor:COLORS.border
},

activeFlash:{
borderColor:'#FFD700',
backgroundColor:'rgba(255,215,0,0.15)'
},

flashText:{
fontSize:10,
fontWeight:'bold',
marginTop:4,
color:COLORS.text
},

captureButton:{
backgroundColor:COLORS.primary,
width:90,
height:90,
borderRadius:50,
justifyContent:'center',
alignItems:'center'
},

permissionButton:{
backgroundColor:COLORS.primary,
padding:18,
borderRadius:20,
alignItems:'center'
},

buttonText:{
color:COLORS.text,
fontWeight:'bold'
},

galleryTitle:{
fontSize:18,
fontWeight:'bold',
marginBottom:15,
color:COLORS.text
},

imageCard:{
backgroundColor:COLORS.card,
padding:6,
borderRadius:18,
marginRight:12
},

image:{
width:100,
height:100,
borderRadius:15
}

});