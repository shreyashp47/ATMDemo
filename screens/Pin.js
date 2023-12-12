 import React,{useState,useEffect} from 'react';
import { Component } from 'react';
 import {
    ScrollView,
    KeyboardAvoidingView,SafeAreaView,
     View,ImageBackground,
     Text,StyleSheet,Button
 }from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
 import { openDatabase } from 'react-native-sqlite-storage';

 import Mytextinput from './components/Mytextinput';
 import Mybutton from './components/Mybutton';

var db = openDatabase({ name: 'UserDatabase.db' });

 


 const Pin =({navigation})=> {
    useEffect(() => {
        db.transaction(function (txn) {
          txn.executeSql(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
            [],
            function (tx, res) {
              console.log('item:', res.rows.length);
              if (res.rows.length == 0) {
                txn.executeSql('DROP TABLE IF EXISTS table_user', []);
                txn.executeSql(
                  'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_contact INT(10), user_address VARCHAR(255),user_pin INT(4),bal INT(20))',
                  []
                );
              }
            }
          );
        });
      }, []);

      let [name, setName] = useState('');
      let [pin, setPasswd] = useState('');
      let [userpin, setUserPasswd] = useState('');
      let [userData, setUserData] = useState({});
      let checkPassword = () => { 
          if(name!="admin")
        {console.log('Name: '+name);
        setUserData({});
        db.transaction((tx) => {
          tx.executeSql(
            'SELECT * FROM table_user where user_name = ?',
            [name],
            (tx, results) => {
              var len = results.rows.length;
              console.log('len', len);
              if (len > 0) {
                let res = results.rows.item(0);
                console.log(res.user_pin)
                if(res.user_pin==pin)
                navigation.navigate('Home',{
                    name
                })
                else
                alert('Wrong Password');
                setUserData(results.rows.item(0));
              } else {
                alert('No user found');
              }
            }
          );
        });}
        else{
            if(pin=='1111')
            navigation.navigate('AddAccounts')
            else
            alert('Admin: Wrong Password')
        }
      };
     return (
        <SafeAreaView style={{ flex: 1 ,justifyContent: 'flex-end', alignItems: 'stretch'}}>
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <View style={{ flex: 1 }}>
        <ScrollView keyboardShouldPersistTaps="handled">
         <KeyboardAvoidingView
           behavior="padding"
           style={{ flex: 1, justifyContent: 'center' }}>
        <View style={ styles.container
        }>
            <Text >Enter Your PIN</Text>
        </View>
        <View style={ styles.container
        }>
            <TextInput 
             placeholder="Enter Name"
            onChangeText={(name) => setName(name)}
            style={styles.inputField}   
            />
            <TextInput 
        
             placeholder="Enter PIN"
           onChangeText={(pin) => setPasswd(pin)}
            secureTextEntry={true}
            keyboardType={"numeric"}
             style={styles.inputField}   
            maxLength={4} 
            />
        </View>
        <View style={styles.container}>
          
             
               <Mybutton title="Submit" customClick={checkPassword} /> 
            
        </View></KeyboardAvoidingView></ScrollView>
       </View></View></SafeAreaView>
     )
 }

 const styles = StyleSheet.create({
    bacground:{
        flex:1,
    },
    container: {   
        flex:1,  
        justifyContent: 'center',
        alignItems: 'center', 
      },
      inputField:{
          backgroundColor:"white", 
          height: 40, 
          width:100,
          borderColor: 'gray',
           borderWidth: 1 }
})


export default Pin
 