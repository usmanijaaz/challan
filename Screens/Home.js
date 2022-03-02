import { View, Text,StyleSheet,Button,TouchableOpacity,TextInput,Alert,Image } from 'react-native';
import React, {useState,useEffect } from 'react'
import { Link } from '@react-navigation/native';
import {
    AdMobBanner,
    AdMobInterstitial,
    setTestDeviceIDAsync,
  } from 'expo-ads-admob';
  
  AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/1033173712');

export const  HomeScreen = ({navigation}) => {

    setTestDeviceIDAsync('EMULATOR');
    const [input,setinput] = useState('');
    const [vehiclestate, setvehicle] = useState(true);
    const [outertextt,setouttextt] = useState('Enter Vehicle Number');
    const [textt,settextt] = useState('TSO9BH0057');
    const [imgtext,setimgtextt] = useState(true);
    const [interbtn,setinternbtn] = useState(false);


    const callchallanScrapper = async () => {
      axios.post('http://10.0.2.2:3001/chscrapper',{challan: input})
      .then((res)=>{
         ///handle response data here
      })
      .catch((err)=>{
          alert(err);
      })
      
  }

  const callvehicleScrapper = async () => {
    axios.post('http://10.0.2.2:3001/vehscrapper',{challan: input})
    .then((res)=>{
       ///handle response data here
    })
    .catch((err)=>{
        alert(err);
    })
    
}


    const _openInterstitial = async () => {
        try {
          setinternbtn(true);
          await AdMobInterstitial.requestAdAsync()
          await AdMobInterstitial.showAdAsync()
        } catch (error) {
          console.error(error)
        } finally {
          setinternbtn(false);
        }
      }


    return (
    <View style= {styles.homee}>
        <View style= {styles.header}>
            <Text style={{color:'white',fontWeight:'bold',fontSize:35}}>Telengana State Police</Text>
            <Text style={{color:'white',fontWeight:'bold',fontSize:20}}>Integrated e-challan System</Text>
        </View>

        <View style= {styles.foot}>
          <View style={{flexDirection:'row',justifyContent:'space-evenly',paddingTop:30}}>
            <TouchableOpacity style={{height:50,width:200,borderRadius:10}} 
            onPress={()=>{
              setouttextt('Enter Vehicle Number');
              settextt('TSO9BH0057')
              setimgtextt(true);
              setvehicle(true);
            }}>
               <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#b8e4f5'}}>
                   <Text style={{color:'black',fontWeight:'bold',fontSize:16}}>Check Vehicle Number </Text>
               </View>
           </TouchableOpacity>
           <TouchableOpacity style={{height:50,width:200,borderRadius:10}} 
            onPress={()=>{
              settextt('LICENSE NO');
              setouttextt('Enter License Number');
              setimgtextt(false);
              setvehicle(false);
            }}>
               <View style={{flex:1,justifyContent:'center', alignItems:'center',backgroundColor:'#b8e4f5'}}>
                   <Text style={{color:'black',fontWeight:'bold',fontSize:16}}>Check License Number </Text>
               </View>
           </TouchableOpacity>

           </View>

           <View style={styles.input1}>
                <Text style={{fontSize:16,fontWeight:'bold',marginBottom:6}}>{outertextt}</Text>
                <TextInput placeholder={textt}
                textAlign='center'
                onChangeText={input => setinput(input)}
                defaultValue={input}
                style = {styles.textfield}
                />
            </View>

            <TouchableOpacity style={{paddingTop:25,justifyContent:'center',
                alignItems:'center',}} 
                onPress={async ()=>{
                await _openInterstitial();
                if(vehiclestate){
                  await callvehicleScrapper();
                }else{
                  await callchallanScrapper();
                }
                navigation.navigate('Details');
                }}>
            <View style={styles.button}>
                    <Text style={styles.buttontext}> Check </Text>
            </View>
            </TouchableOpacity>
            <View style={{flex:1,justifyContent:'center',alignItems:'center',paddingTop:110,}}>
               { imgtext ? (
               <Image source={require('./bike.png')}  />
               ) : (
                   <>
                   <Image source={require('./license.png')} />
                   </>
               )
            }
           </View>
            
            <View style={{flex:1,justifyContent:'flex-end',paddingBottom:2}}>
                <AdMobBanner
                bannerSize="fullBanner"
                adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id
                servePersonalizedAds= 'true' // true or false
                />
            </View>


        </View>
    </View>
    );
  }


  const styles = StyleSheet.create({
    homee:{
        flex:1,
        backgroundColor:'#367d99',
        
    },
    header:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',

    },
    foot:{
        flex:5,
        backgroundColor:'#fff',
        borderTopLeftRadius:40,
        borderTopRightRadius:40,

    },
    button:{
      width: 130,
      height: 35,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      backgroundColor:'#367d99',
    },
    buttontext:{
        color:'#ecebeb',
        fontWeight:'bold',
        fontSize:19

    },
    input1:{
      justifyContent:'center',
        alignItems:'center',
        paddingTop:20
    },
    textfield:{
        height:40,
        width:280,
        backgroundColor:'#b8e4f5', 
        borderRadius:10,
    
    }
})


          
{/*  */}