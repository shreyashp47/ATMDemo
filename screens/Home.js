import { ImageBackground,StyleSheet,View,Button } from 'react-native';
import React,{useState,useEffect} from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

  const Home =({route,navigation})=> {

     let [name, setName] = useState('');

      useEffect(() => {

         let {name}=route.params;
         setName(name);
     })

      console.log(name)
    return (
       <ImageBackground 
       style={styles.bacground}
       source={
           {uri:"https://picsum.photos/200/300"}
       }>
        <View style={styles.container}></View>
        <View style={styles.container}></View>
        <View style={styles.container}></View>   
        
        <View style={styles.container}>
            <Button 
                color="orange"
                style={styles.sectionContainer} 
                title="Deposit"
                onPress={()=>
                    navigation.navigate('Deposit',{name})
            }/>
                <Button 
                color="orange"
                style={styles.sectionContainer} 
                title="Withdraw"
                onPress={()=>
                    navigation.navigate('Cash Withdraw',{name})
            }
                />
        </View>
        <View style={styles.container}>
            
            <Button 
              color="orange"
              style={styles.sectionContainer} 
              title="View my latest balance"
              onPress={() =>
                 navigation.navigate('Balance',{name})
                }
          />
      </View>

       </ImageBackground>
    );
}

const styles = StyleSheet.create({
    bacground:{
        flex:1,
    },
    container: {   
        flex:1,
        flexDirection:'row',
        justifyContent: 'space-evenly',
        alignItems: 'center', 
      },
})

export default Home;