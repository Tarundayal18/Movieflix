import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './Screens/Main';
import Details from './Screens/Details';
import AllProducts from './Screens/AllProducts';
import Map from './Screens/Map';
import Animation from './Screens/Animation';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Animation" screenOptions={{
          contentStyle: { backgroundColor: "#09282B" },
        }}>
          {/* <Stack.Screen name="Movies" component={Main}  options={{ title: 'E-Cart', headerStyle: {
              backgroundColor: '#091C1C',
           },headerTitleStyle: {
            color: 'white'
          } }}
           />
           <Stack.Screen name="Details" component={Details}  options={{ headerStyle: {
              backgroundColor: '#091C1C',
           },headerTitleStyle: {
            color: 'white'
          },
          headerTintColor: 'white' }}
          />
          <Stack.Screen name="AllProducts" component={AllProducts}  options={{ headerStyle: {
              backgroundColor: '#091C1C',
           },headerTitleStyle: {
            color: 'white'
          },
          headerTintColor: 'white' }}
          /> */}
          {/* <Stack.Screen name="Map" component={Map} screenOptions={{
    headerShown: false
  }}/> */}
          <Stack.Screen name="Animation" component={Animation} screenOptions={{
            headerShown: false
          }} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default Navigation;
