import React, {useState} from "react";
import {Text,View, StyleSheet,TouchableOpacity, ToastAndroid} from "react-native";
import Background2 from "./background2";
import Btn1 from "../assets/buttons/btn1";
import TextField2 from "./textField2";
import { SelectList } from 'react-native-dropdown-select-list';
import Icon from "react-native-vector-icons/Ionicons";
import { colors } from "../assets/constants/colors";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
export default function SignUp({navigation}){
    const [language, setLanguage] = React.useState();
    const data = [
        { key: '1', value: 'Urdu' },
        { key: '2', value: 'English' },
        { key: '3', value: 'French' }
      ];
      const [email, setEmail] = useState('')
      const [password, setPassword] = useState('')
      const [confirmPassword, setConfirmPassword] = useState('')
      const [firstName, setFirstName] = useState('')
      const [lastName, setLastName] = useState('')
      const [phoneNumber, setPhoneNumber] = useState('')
    
                    
            
    
  
      function SignUpAuth(){
       
          if(password===confirmPassword){
        
              auth().createUserWithEmailAndPassword(email, password).
               then((response) => {
                  database().ref(`/users/${response.user.uid}`).set({
                  firstName : firstName,
                  lastName : lastName,
                  phoneNumber : phoneNumber,
                  email: email,
                  language:language
  
              }).then((res) => {
                  ToastAndroid.show("User Created Successfully", ToastAndroid.SHORT)
                  navigation.navigate("Login")
              })
              }).
              
          catch((error) => {
              ToastAndroid.show(error.message, ToastAndroid.SHORT);
              console.log("Error : ", error.message)
          })
      }
      else{
          ToastAndroid.show("Your Password doesn't match!", ToastAndroid.SHORT);
      }
      }
    return(
        <View style = {{flex: 1 ,  backgroundColor:'white'}}>
        <View style = {{backgroundColor:'#1F4A83' , height:1000 , marginTop:100, width:370, borderTopLeftRadius:80 ,borderTopRightRadius:80}}>
        {/* color: colors.primary */}

            <Text style={{fontFamily: "Poppins-SemiBold", fontSize: 30, alignSelf:"center", marginTop :30,color:'white' }}>REGISTER</Text>
            <TextField2 placeholder="First Name" name="edit"   onChangeText={setFirstName} value={firstName}  />
            <TextField2 placeholder="Last Name" name="edit"  onChangeText={setLastName} value={lastName}/>
            <TextField2 placeholder="Email" keyboardType="numeric" name="mail-outline"  onChangeText={setEmail} value={email} />
            <TextField2 placeholder="Password"  keyboardType="email-address"  name="lock" secureTextEntry={true} onChangeText={setPassword} value={password}/>
            <TextField2 placeholder="Confirm Password" secureTextEntry={true} name="lock" onChangeText={setConfirmPassword} value={confirmPassword}  />
            <TextField2 placeholder="Phone Number"  name="phone"   onChangeText={setPhoneNumber} value={phoneNumber} 
            />
      
            <SelectList
              setSelected={(val) =>  setLanguage(val)}
              data={data}
              save="value"
              closeicon={ <MaterialIcons  style = {{marginTop:10 ,marginLeft:7}} name="clear" size = {25} color= {'white'}></MaterialIcons>}
              
              arrowicon={<Icon name="chevron-down" size={22} style={{ marginTop: 3}} color={'white'} />}
              searchicon={<Icon name="search-outline" style={{ marginBottom: 4 }} size={20} color={'white'} />}
              boxStyles={{
               marginLeft:20, width: 200, borderColor:'#1F4A83',
                borderRadius: 25 , marginTop:10
              }}
              searchTextInputStyle={{ color: 'red' }}
              placeholderTextColor={'white'}
             placeholder="Language"
              inputStyles={{
                fontSize: 17, color: 'white', fontFamily:"Poppins-Regular", marginLeft: 12
              }}
              closeIconColor="white"
              backgroundColor='white'
              fontFamily='Poppins-SemiBold'
              dropdownTextStyles={{ fontSize: 16, color: "white" }}
              dropdownStyles={{ backgroundColor: '#1F4A83' , height:100, width:200, marginLeft:30, borderColor:'#1F4A83' }}
              badgeTextStyles={{ fontfamily: 'Poppins-Regular', color:'white', fontSize: 14 }}
              badgeStyles={{ backgroundColor: 'white' }}
              labelStyles={{ fontSize: 2, fontFamily: 'Poppins-SemiBold' }}
              label="Categories"
            />
    
            {/* <TextField2 placeholder="Confirm Password" secureTextEntry={true} name="lock" onChangeText={setConfirmPassword} value={confirmPassword} /> */}
          
           <View style = {{marginTop :500, marginLeft:40, position: 'absolute'}}>
           
                        <TouchableOpacity style={{backgroundColor:'white', borderTopLeftRadius:100, alignItems: "center", marginLeft:180, marginTop: 40, height: 80, width: 170}} onPress={()=>SignUpAuth()}>
                        <Text style={{color: "#1F4A83", fontSize: 20,  fontFamily: "Poppins-SemiBold" , marginTop:25}}>Register</Text>
                      
                        </TouchableOpacity>
           </View>
           {/* onPress={SignUpAuth} */}
           
      </View>
     </View>
    );
}
const styles = StyleSheet.create({
    errormessage: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        backgroundColor: '#F50057',
        padding: 7,
        width: 300,
        marginLeft:40,
        borderRadius: 13,
    }
});
