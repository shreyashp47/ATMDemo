import Home from'./screens/Home'; 
import Pin from'./screens/Pin'; 
import Withdraw from'./screens/Withdraw'; 
import Deposit from'./screens/Deposit'; 
import Balance from'./screens/Balance'; 
import AddAccounts from './screens/AddAccount'
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'
import React from 'react';

const Stack =createStackNavigator();

const App =() => {
  return(

    <NavigationContainer>
      <Stack.Navigator
          screenOptions={{
          headerShow:false
    }}
    initialRouteName={"Enter Pin"}
    >
      <Stack.Screen name="Enter Pin" component={Pin}/>
      <Stack.Screen name="Home" component={Home}/>
      <Stack.Screen name="Cash Withdraw" component={Withdraw}/>
      <Stack.Screen name="Balance" component={Balance}/>
      <Stack.Screen name="Deposit" component={Deposit}/>
      <Stack.Screen name="AddAccounts" component={AddAccounts}/>
    </Stack.Navigator>

    </NavigationContainer>

  )
}
 
export default App;
