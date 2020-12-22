import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, Dimensions,TouchableOpacity } from 'react-native'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class FirstPage extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.CenterArea}>
                    <Image source={require('../../image/logo.png')} style={styles.logo} />
                    <TouchableOpacity 
                    style={styles.button}
                    onPress={() => this.props.navigation.navigate('SignUpPage')}
                    >
                        <Text style={styles.buttonText}>Yeni Hesap Oluştur</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('SignInPage')}>
                        <Text style={styles.logInText}>Giriş Yap</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    CenterArea:{
        width:'90%',
        height:windowHeight,
        justifyContent:'center',
        alignItems:'center',
    },
    logo:{
        width:'60%',
        height:windowWidth*0.2,
        marginBottom:40,
    },
    button:{
        width:'90%',
        height:windowWidth*0.12,
        backgroundColor:'#2795F6',
        borderRadius:2,
        justifyContent:'center',
        alignItems:'center',
    },
    buttonText:{
        color:'#fff',
        fontSize:13,
        fontWeight:'bold'
    },
    logInText:{
        fontSize:13,
        color:'#2795F6',
        marginTop:20
    }
})
