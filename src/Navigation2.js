import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './Screens2/Main';
import Home from './Screens2/Home';
import Login from './Screens2/Login';
import SignUp from './Screens2/SignUp';
import Forget from './Screens2/Forget';
const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{contentStyle: { backgroundColor: "white" }, headerShown: false }} >
          <Stack.Screen name="Home" component={Home} screenOptions={{headerShown: false}} />
          <Stack.Screen name="Main" component={Main} screenOptions={{headerShown: false}} />
          <Stack.Screen name="Login" component={Login} screenOptions={{headerShown: false}} />
          <Stack.Screen name="SignUp" component={SignUp} screenOptions={{headerShown: false}} />
          {/* <Stack.Screen name="SocialLogin" component={SociaLogin} screenOptions={{headerShown: false}} /> */}
          <Stack.Screen name="Forget" component={Forget} screenOptions={{headerShown: false}} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default Navigation;
