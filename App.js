import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SplashScreen } from './Screens/Splash';
import { Details } from './Screens/Details.js';

import React, {useEffect,useState} from 'react';
import { HomeScreen } from './Screens/Home';


const Stack = createNativeStackNavigator();

const App = () => {
  const [welcome,setisWelcoming] = useState(false);
 
   useEffect(()=>{
     setTimeout(()=>{
       setisWelcoming(true);
     },2000);
 
   },[welcome]);
 
   const Stack = createNativeStackNavigator();
   return (
     <View style={{flex: 1}}>
       <NavigationContainer>
             <Stack.Navigator initialRouteName="HomeScreen">
             { welcome ? (
                <>
             <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown :false,}}/>
             <Stack.Screen name="Details" component={Details} options={{title:'Details',headerStyle: {
             backgroundColor: '#367d99',
           },
           headerTitleStyle: {
             fontWeight: 'bold',
             color:'white',
           },}}/>
             </>
 
             ) : (
               <Stack.Screen name="SplashScreen" component={SplashScreen} options={{headerShown :false, }}/>
             )
       
             }
           </Stack.Navigator>
 
           </NavigationContainer>
      
     </View>
   );
 };
 
 const styles = StyleSheet.create({
   sectionContainer: {
     marginTop: 32,
     paddingHorizontal: 24,
   },
   sectionTitle: {
     fontSize: 24,
     fontWeight: '600',
   },
   sectionDescription: {
     marginTop: 8,
     fontSize: 18,
     fontWeight: '400',
   },
   highlight: {
     fontWeight: '700',
   },
 });
 
 export default App;
 