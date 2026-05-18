import { Tabs } from 'expo-router';

import {
useSafeAreaInsets
}
from 'react-native-safe-area-context';

import {
COLORS
}
from '../../constants/theme';

export default function TabLayout(){

const insets=
useSafeAreaInsets();

return(

<Tabs

screenOptions={{

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
COLORS.subText

}}

>

<Tabs.Screen
name='home'
options={{
title:'Início'
}}
/>

<Tabs.Screen
name='events'
options={{
title:'Eventos'
}}
/>

<Tabs.Screen
name='memories'
options={{
title:'Memórias'
}}
/>

<Tabs.Screen
name='create-event'
options={{
title:'Criar'
}}
/>

<Tabs.Screen
name='profile'
options={{
title:'Perfil'
}}
/>

</Tabs>

);

}