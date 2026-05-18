import { Tabs } from 'expo-router';

import {
useSafeAreaInsets
}
from 'react-native-safe-area-context';

import {
Ionicons
}
from '@expo/vector-icons';

import {
COLORS
}
from '../../constants/theme';

export default function TabLayout(){

const insets=
useSafeAreaInsets();

return(

<Tabs

screenOptions={({route})=>({

headerShown:false,

tabBarStyle:{

backgroundColor:
COLORS.secondaryBackground,

borderTopWidth:0,

height:
70+insets.bottom,

paddingBottom:
10+insets.bottom,

paddingTop:10

},

tabBarActiveTintColor:
COLORS.neon,

tabBarInactiveTintColor:
COLORS.subText,

tabBarLabelStyle:{
fontSize:12,
fontWeight:'600'
},

tabBarIcon:({

color,
size

})=>{

let iconName:
any;

switch(route.name){

case 'home':
iconName='home';
break;

case 'events':
iconName='calendar';
break;

case 'memories':
iconName='images';
break;

case 'profile':
iconName='person';
break;

default:
iconName='ellipse';
}

return(

<Ionicons
name={iconName}
size={size}
color={color}
/>

);

}

})}

>

<Tabs.Screen
name="home"
options={{
title:'Início'
}}
/>

<Tabs.Screen
name="events"
options={{
title:'Eventos'
}}
/>

<Tabs.Screen
name="memories"
options={{
title:'Memórias'
}}
/>

<Tabs.Screen
name="profile"
options={{
title:'Perfil'
}}
/>

</Tabs>

);

}