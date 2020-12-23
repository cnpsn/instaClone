import React, { Component } from 'react'
import { Text, View } from 'react-native'
import auth from '@react-native-firebase/auth';

export default class WelcomeInstagramPage extends Component {
    render() {
        return (
            <View>
                <Text> İnstagrama hoşgeldin </Text>
            </View>
        )
    }
}
