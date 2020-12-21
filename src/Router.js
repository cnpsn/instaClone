import React, { Component } from 'react'
import { Text, View, StyleSheet} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, Header, HeaderBackButton, HeaderBackground } from '@react-navigation/stack';
import FirstPage from './pages/FirstPage'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'

export default class Router extends Component {
    render() {
        const Stack = createStackNavigator();
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName='FirstPage'>
                    <Stack.Screen name="FirstPage" component={FirstPage} options={{
                        headerShown:false
                    }} />
                    <Stack.Screen name="SignInPage" component={SignInPage} options={{
                        headerShown:false
                    }}
                    />
                    <Stack.Screen name="SignUpPage" component={SignUpPage} options={{
                        headerShown:false
                    }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}