import React, {useEffect,useState} from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Image
  } from 'react-native';


  export const  SplashScreen = () => {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor:'#367d99'}}>
       {/* <Text style={{color:'white',fontSize:'20px',fontWeight:'bold'}}> Splash Screen </Text>
            */}
            {/* <Text style={{color:'white',fontWeight:'bold',fontSize:34}}>Splashh</Text> */}
            <Image 
               source={require('./new.png')}
            
            />     
            
             </View>
      );
    }
  