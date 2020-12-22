import React, { Component } from 'react'
import { Text, View, StyleSheet} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
/* StackScreen  */
import FirstPage from './pages/StackPages/FirstPage'
import SignInPage from './pages/StackPages/SignInPage'
import SignUpPage from './pages/StackPages/SignUpSteps/SignUpPage'
import SignUpPhotoUpdatePage from './pages/StackPages/SignUpSteps/SignUpPhotoUpdatePage'
/* TabBarScreen  */
import HomeScreen from './pages/TabBarPages/HomeScreen'
import SearchScreen from './pages/TabBarPages/SearchScreen'
import NotificationScreen from  './pages/TabBarPages/Notification'
import PlusScreen from  './pages/TabBarPages/PlusScreen'
import ProfileScreen from  './pages/TabBarPages/ProfileScreen'

export default class Router extends Component {
    render() {
        const Stack = createStackNavigator();
        const Tab = createBottomTabNavigator();

        const TabNavigation = () => {
            return(
            <Tab.Navigator initialRouteName='HomeScreen'>
                <Tab.Screen name="HomeScreen" component={HomeScreen} 
                options={{
                    tabBarLabel:props => false,
                    tabBarIcon:props => (
                        <Icon name="home" size={30} color="#495057" />
                    )
                }}
                />
                <Tab.Screen name="SearchScreen" component={SearchScreen} 
                options={{
                    tabBarLabel:props => false,
                    tabBarIcon:props => (
                        <Icon name="search" size={25} color="#495057" />
                    )
                }}
                />
                <Tab.Screen name="NotificationScreen" component={NotificationScreen} 
                options={{
                    tabBarLabel:props => false,
                    tabBarIcon:props => (
                        <Icon name="plus-square" size={28} color="#495057" />
                    )
                }}
                />
                <Tab.Screen name="ProfileScreen" component={ProfileScreen} 
                options={{
                    tabBarLabel:props => false,
                    tabBarIcon:props => (
                        <Icon name="heart" size={25} color="#495057" />
                    )
                }}
                />
                <Tab.Screen name="PlusScreen" component={PlusScreen} 
                options={{
                    tabBarLabel:props => false,
                    tabBarIcon:props => (
                        <Icon name="user-circle" size={26} color="#495057" />
                    )
                }}
                />
            </Tab.Navigator>
            )
        }
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName='SignUpPhotoUpdatePage'>
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
                    <Stack.Screen name='TabNavigation' component={TabNavigation} options={{
                        headerShown:false
                    }}
                    />
                    <Stack.Screen name='SignUpPhotoUpdatePage' component={SignUpPhotoUpdatePage} options={{
                        headerShown:false
                    }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}