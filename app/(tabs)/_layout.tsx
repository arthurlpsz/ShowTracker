import { Tabs } from 'expo-router';

export default function TabsLayout(){

return(

<Tabs>

<Tabs.Screen
name="home"
options={{
title:'Home'
}}
/>

<Tabs.Screen
name="create-event"
options={{
title:'Criar'
}}
/>

<Tabs.Screen
name="events"
options={{
title:'Eventos'
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