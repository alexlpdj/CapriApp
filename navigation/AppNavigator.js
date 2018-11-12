import React from 'react';
import {createStackNavigator, createSwitchNavigator} from 'react-navigation';
import HomeScreen from "../screens/HomeScreen";
import AuthScreen from "../screens/AuthScreen/AuthScreen";

//Navigation for app screens
const AppStack = createStackNavigator({
    Home: HomeScreen
});

//Navigation only for auth screens
const AuthStack = createStackNavigator({
    Authentication: AuthScreen
});


export default createSwitchNavigator(
    {
        App: AppStack,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'Auth',
    }
);