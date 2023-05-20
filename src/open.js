import React, {useState,  useEffect, useCallback} from "react";
import {View, Text, StyleSheet ,ImageBackground, Image ,ToastAndroid} from "react-native";
import Background from "./background";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Btn1 from "../assets/buttons/btn1";
import Back4  from "./back4";
import axios from 'axios';
import TextField from "./textField";
import Icon from "react-native-vector-icons/Ionicons";
import { colors } from "../assets/constants/colors";
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Sound from 'react-native-sound';
import Tts from 'react-native-tts';
import { io } from "socket.io-client";
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { useIsFocused } from "@react-navigation/native";
import Voice from '@react-native-community/voice';
import languages from './languages';

export default function Open({navigation}){
  const[lang,setlang] = useState("")
  const[result,setResult] = useState("")
  const[starttext,setstarttext] = useState("To start videocall speak videocall")
  const [audioData, setAudioData] = useState(null);
  const isFocused = useIsFocused();
    useEffect(() => { 
      if(isFocused){ 
     console.log("called"); 
    getUserId() }  
     }, [ isFocused]);

  async function getUserId() {
    try {
      const userString = await AsyncStorage.getItem('userId');
      if (userString !== null) {
        console.log('User ID:', userString);
        database().ref(`/blind/${userString}`).once("value").then(snapshot => {
          let language = snapshot.val().language
          AsyncStorage.setItem('language', language).then(() => {
            Promise.resolve(); // wrap in Promise.resolve()
          });
        }) 
      const condition = await AsyncStorage.getItem('language')
      if(condition === "English")
      {
       english()
      }
      if(condition === "Urdu")
      {
        urdu()
      }
      if(condition === "French")
      {
        french()
      }
      } 
      else {
        navigation.navigate("blindsignup")
        console.log('User ID not found.');
      }
    } catch (error) {
      console.error(error);
    }
  
  }
  const english = async () =>
  {
    Tts.setDefaultRate(0.4);
    Tts.speak("Welcome")
    Tts.speak("To start Video call speak Video call")
    Tts.speak("To start GPS voice guidance speak Voice guidance")
    Tts.speak("For offline help speak offline help")
      
  }
  const urdu = async () =>
  {
    const options = {
      method: 'GET',
      url: 'https://nlp-translation.p.rapidapi.com/v1/translate',
      params: {text:"welcome , To start Video call speak Video call , To start GPS voice guidance speak Voice guidance , For offline help speak offline help ", to: 'ur', from: 'en'},
      headers: {
        'X-RapidAPI-Key': 'bac0b4a01dmsh637f968c8035314p1dc8b0jsn281bde6eebf7',
        'X-RapidAPI-Host': 'nlp-translation.p.rapidapi.com'
      }
    };
    const sound2 = new Sound(require('./media14.mp3'),
(error, sound) => {
  if (error) {
    alert('error' + error.message);
    return;
  }
  sound2.play(() => {
    sound2.setSpeed(0.4);
    sound2.release();
  });
});
    // axios.request(options).then(function (response) {
    //   const result = response.data;
    //   const text = result.translated_text[result.to];
    //     setlang(text);
    //     Tts.setDefaultRate(0.4);
    //     Tts.speak(text);
    //     console.log(lang);
    
    //   //console.log(response.data);
    // })

    

  }
  const french = async () =>
  {
    const options = {
      method: 'GET',
      url: 'https://nlp-translation.p.rapidapi.com/v1/translate',
      params: {text:"Welcome , To start Video call speak Video call , To start GPS voice guidance speak Voice guidance , For offline help speak 'offline help'", to: 'fr', from: 'en'},
      headers: {
        'X-RapidAPI-Key': 'bac0b4a01dmsh637f968c8035314p1dc8b0jsn281bde6eebf7',
        'X-RapidAPI-Host': 'nlp-translation.p.rapidapi.com'
      }
    };
    axios.request(options).then(function (response) {
      const result = response.data;
      const text = result.translated_text[result.to];
        setlang(text);
        Tts.setDefaultRate(0.4);
        Tts.speak(text);
        console.log(lang);
    
      //console.log(response.data);
    })
  }

  const submit1 = useCallback(async() => { 
  {
    const result = await submit();
    console.log(result);
    console.log("hy")
    const text = result.translated_text[result.to];
    setlang(text);
    console.log(lang);
  }
})

    return(
       <Back4>
             <Animatable.View style = {{backgroundColor:'white' , marginTop:390 , height:365,width:360 , borderTopLeftRadius:60, borderTopRightRadius:60}} animation = "fadeInUpBig" >
             <Text style = {{marginTop : 100 , fontSize:25, marginLeft:110, fontFamily :"Poppins-Bold" , color :'#368BC1'}}>Listening....</Text>
             <Animatable.Image
          style={{ marginLeft: 140, borderRadius: 10, marginTop: 20, width: 75, height: 75 }}
          source={require('../assets/images/google.png')} animation = "bounceIn" duration={10000}
        />

<Icon name="arrow-forward-outline" style = {{marginTop:30}}marginLeft= {280}  size ={45}  color = {'#368BC1'} onPress={() => navigation.navigate('splashScreen')}/>
              </Animatable.View>
             
       </Back4>
    ) }
