import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer, TabActions} from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Login from './src/login';
import Aboutus from './src/Aboutus';
import Open from './src/open';
import Profile from './src/Profile';
import SignUp from './src/signUp';
import EditProfile from'./src/EditProfile'

import AdminNav from './src/AdminNav';
import  Splash from './src/splashScreen';
import BlindSignup from './src/blindsignup'
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { colors } from './assets/constants/colors';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
function Root() {
  return (
    <Tab.Navigator screenOptions={({route})=> ({
      headerShown: false,
      tabBarStyle: {
            paddingVertical: 5,
            elevation: 20,
            backgroundColor: "white",
            position: "absolute",
            height: 60,
            paddingBottom: 6,
          },
      tabBarIcon: ({focused, color, size}) => {
        let iconName;
  
       if (route.name === "Aboutus"){
          iconName = focused ? 'info' : 'info';
        }
        else if (route.name === "Profile"){
          iconName = focused ? 'person' : 'person';
        }
        return <MaterialIcons name={iconName} size = {size} color= {'#1F4A83'}></MaterialIcons>
      },
      tabBarActiveTintColor:'#1F4A83',      tabBarInactiveTintColor: '#1F4A83',
    })}>
  
      <Tab.Screen name="Aboutus" component= {Aboutus}/>
      <Tab.Screen name="Profile" component= {Profile}/>
    </Tab.Navigator>
  );
}
export default function App(){
 
  return(

    
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName = 'splashScreen'>
      <Stack.Screen name= "blindsignup" component={BlindSignup} />
      <Stack.Screen name= "open" component={Open} />
      <Stack.Screen name= "splashScreen" component={Splash} />
      <Stack.Screen name= "SignUp" component={SignUp}/> 
      <Stack.Screen name= "AdminNav" component={AdminNav} />
      <Stack.Screen name= "Login" component={Login} />  
    
      <Stack.Screen name= "EditProfile" component={EditProfile} /> 
      <Stack.Screen name= "Root" component={Root}/> 
      </Stack.Navigator>
     </NavigationContainer>
   

  );
}

