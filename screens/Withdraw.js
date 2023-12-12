import React,{useState,useEffect} from 'react';
import { Component } from 'react';
 import {
     View,ImageBackground,
     Text,StyleSheet,Button, Alert
 }from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'UserDatabase.db' });
 const Withdraw =({navigation,route})=> { 

    let [name, setName] = useState('');
    let [bal, setbal] = useState();
    let [baltxt, setbaltxt] = useState();
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
                  console.log('your bal: '+res.bal)
                   setbal(res.bal)
                  setUserData(results.rows.item(0));
                 
                } else {
                  alert('No user found');
                }
              }
            );
          });
       // checkBal()
       
      }, []);
      let checkBal=()=>{
        db.transaction((tx) => {
          tx.executeSql(
            'SELECT * FROM table_user where user_name = ?',
            [name],
            (tx, results) => {
              var len = results.rows.length;
              console.log('len', len);
              if (len > 0) {
                let res = results.rows.item(0);
                console.log('your bal: '+res.bal)
                 setbal(res.bal)
                setUserData(results.rows.item(0));

              } else {
                alert('No user found');
              }
            }
          );
        });
      }
      let withdrawBal = () => { 
        if (!baltxt) {
            alert('Please Enter');
            return;
          }
          if (baltxt>bal) {
            alert('Insufficient balance');
            return;
          }

          console.log(parseInt(bal)-parseInt(baltxt))
          db.transaction((tx) => {
            tx.executeSql(
              'UPDATE table_user set bal=? where user_name=?',
              [parseInt(bal)-parseInt(baltxt),name],
              (tx, results) => {
                console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                    console.log("show");
                    checkBal();
                  Alert.alert(
                    'Success',  
                    'Withdraw successfully',
                    [
                      {
                        text: 'Ok',
                        onPress: () => {
                            checkBal();
                            navigation.navigate('Home',{name})
                        },
                      },
                    ],
                    { cancelable: false }
                  );// checkBal();
                } else alert('Failed');
              }
            );
          });

      }


     return (
         <ImageBackground
         
         style={styles.container}
         source={
            {uri:"https://picsum.photos/200/300"}}
         >
        <View style={ styles.container
        }>
            <Text >Withdraw Money</Text>
        </View>
        <View style={ styles.container
        }>
            <TextInput
            onChangeText={(baltxt) => setbaltxt(baltxt)}
            
            keyboardType={"numeric"}
            style={styles.inputField}    
            />
        </View>
        <View style={styles.container}>
            <Button 
                color="green"
                style={styles.sectionContainer} 
                title="Withdraw"
                onPress={() =>{
                    withdrawBal()
                    
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

export default Withdraw
 