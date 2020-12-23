import React, { Component } from 'react'
import { Text, View, StyleSheet,Button } from 'react-native'
import auth from '@react-native-firebase/auth';

export default class HomeScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text> Home Screen </Text>
                <Button 
                title='çıkış yap'
                onPress={() => {
                    auth()
                    .signOut()
                    .then(() => {
                        this.props.navigation.navigate('FirstPage')
                    });
                }}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    }
})
