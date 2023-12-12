import React,{useState,useEffect} from 'react';
import { Component } from 'react';
 import {
     View,ImageBackground,
     Text,StyleSheet,Button
 }from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'UserDatabase.db' });

 const Balance =({route,navigation})=> { 
    let [name, setName] = useState('');
    let [userData, setUserData] = useState({});
     
    useEffect(() => {
        let {name}=route.params;
        setName(name);
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
                 
                setUserData(results.rows.item(0));
              } else {
                alert('No user found');
              }
            }
          );
        });
       
      }, []);

     return (
         <ImageBackground
         
         style={styles.container}
         source={
            {uri:"https://picsum.photos/200/300"}}
         >
        <View style={ styles.container
        }>
            <Text >Your Bank Balance</Text>
        </View>
        <View style={ styles.container
        }>
            <Text    
            >Bank Balance: {userData.bal}</Text>
        </View>
        <View style={styles.container}>
            <Button 
                color="green"
                style={styles.sectionContainer} 
                title="ok"
                onPress={() =>{
                    navigation.navigate('Home')
                    
                }               
                }
            />
        </View>
         </ImageBackground>
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

export default Balance
 