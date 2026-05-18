import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  ScrollView
} from 'react-native';

import {
  useLocalSearchParams
} from 'expo-router';

import {
  useEffect,
  useRef,
  useState
} from 'react';

import * as Location from 'expo-location';

import {
  CameraView,
  useCameraPermissions
} from 'expo-camera';

import {
  getEventById,
  savePhoto,
  getPhotos,
  PhotoType
} from '../database';

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

if(!event)return;

const {granted}=

await Location
.requestForegroundPermissionsAsync();

if(!granted)return;

await Location
.getCurrentPositionAsync();

setPerto(true);

}

async function tirarFoto(){

if(!cameraRef.current)
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

<Text>
Evento não encontrado
</Text>

</View>

);

}

return(

<View style={styles.container}>

<Text style={styles.title}>
{event.title}
</Text>

<Text>
📍 {event.location}
</Text>

<Text>
📅 {event.date}
</Text>

{!perto ? (

<Text style={styles.message}>
Obtendo localização...
</Text>

):(

<>

<Text style={styles.message}>
Você chegou ao evento 🎉
</Text>

{!cameraPermission?.granted ? (

<Button
title='Permitir câmera'
onPress={
requestCameraPermission
}
/>

):(

<>

<CameraView
ref={cameraRef}
style={styles.camera}
/>

<Button
title='Registrar momento'
onPress={tirarFoto}
/>

</>

)}

<Text style={styles.galleryTitle}>
Fotos do evento
</Text>

<ScrollView horizontal>

{fotos.map(

(foto)=>(

<Image

key={foto.id}

source={{
uri:
foto.image_uri
}}

style={
styles.image
}

/>

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
padding:20
},

center:{
flex:1,
justifyContent:'center',
alignItems:'center'
},

title:{
fontSize:28,
fontWeight:'bold',
marginBottom:10
},

message:{
marginVertical:15,
fontSize:16
},

galleryTitle:{
fontSize:18,
fontWeight:'bold',
marginTop:20,
marginBottom:10
},

camera:{
height:300,
borderRadius:10,
marginBottom:20
},

image:{
width:150,
height:150,
borderRadius:10,
marginRight:10
}

});