import React from 'react';
import { StyleSheet, View } from 'react-native';
import Home from './Screens/Home'
import CreateEmployee from './Screens/CreateEmployee'
import Profile from './Screens/Profile'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import { Provider } from 'react-redux'
import ConfigureStore from './Redux/Stores'

function App() {

  const homeOption ={
    headerTintColor:'white',
    headerStyle:{
      backgroundColor:'#006aff',
    },
  }

  return (
    <View style={styles.container}>
      <Stack.Navigator >
        <Stack.Screen name='Home' component={Home} options={{...homeOption, title: 'my beautifull home',}} />
        <Stack.Screen name='Profile' component={Profile} options={{...homeOption, title: 'my beautifull profile',}}/>
        <Stack.Screen name='CreateEmployee' component={CreateEmployee} options={{...homeOption, title: 'crete an employee',}} />
      </Stack.Navigator>
    </View>
  );
}

const Stack = createStackNavigator()
const store = ConfigureStore()

export default () =>{
  return(
    <Provider store={store} >
      <NavigationContainer>
        <App />
      </NavigationContainer>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
