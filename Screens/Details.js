import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    Button, 
    View,

  } from 'react-native';
  import * as Sharing from 'expo-sharing';
  import * as Print from 'expo-print';


  export const  Details = () => {
    const share = async () => {
      const html = `<h1> Teste </h1>`;
      const { uri } = await Print.printToFileAsync({ html });
      //alert(uri);
      Sharing.shareAsync(uri);
    }
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor:'white'}}>
          <Text>Details</Text>
          <Button title="share" onPress={async ()=>{
            await share();

          }}/>
      </View>
          );
    }

  
  