import React, { Component } from 'react'
import { Text, View,StyleSheet,Dimensions,Image,TextInput,TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class SignUpPage extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.centerArea}>
                    <Image source={require('../image/logo.png')} style={styles.logo} />
                    <TextInput 
                    placeholder='E-posta'
                    placeholderTextColor='#8E8E8E'
                    style={styles.textInput}
                    />
                    <TextInput 
                    placeholder='Kullanıcı Adı'
                    placeholderTextColor='#8E8E8E'
                    style={[styles.textInput,{marginTop:15}]}
                    />
                    <TextInput 
                    placeholder='Şifre'
                    placeholderTextColor='#8E8E8E'
                    style={[styles.textInput,{marginTop:15}]}
                    />
                    <TouchableOpacity style={styles.logInButton}>
                        <Text style={styles.LogInButtonText}>Kayıt Ol</Text>
                    </TouchableOpacity>
                    <View style={styles.orView}>
                        <Text style={styles.orText}>YA DA</Text>
                    </View>
                    <TouchableOpacity style={styles.facebookView}>
                        <Icon name="facebook-square" size={22} color="#208EF6" />
                        <Text style={styles.facebookText}>Facebook İle Giriş Yap</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.signUpArea}>
                        <Text style={styles.signUpText}>Zaten bir besabın var mı ?</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('SignInPage')}>
                            <Text style={[styles.signUpText,{color:'#2795F6',fontWeight:'bold',marginLeft:5}]}>Giriş Yap</Text>
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
        backgroundColor:'#FFFFFF'
    },
    centerArea:{
        flex:10,
        width:'90%',
        height:windowHeight,
        justifyContent:'center',
        alignItems:'center',
    },
    logo:{
        width:'60%',
        height:windowWidth*0.2,
        marginBottom:20,
    },
    textInput:{
        height:windowWidth*0.12,
        width:windowWidth*0.9,
        borderRadius:4,
        padding:10,
        backgroundColor:'#FAFAFA',
        borderWidth:0.5,
        borderColor:'rgb(220,220,220)',
        color:'#262626',
        fontSize:13
    },
    logInButton:{
        width:windowWidth*0.9,
        height:windowWidth*0.12,
        backgroundColor:'#2795F6',
        borderRadius:2,
        justifyContent:'center',
        alignItems:'center',
        marginTop:20
    },
    LogInButtonText:{
        color:'#fff',
        fontSize:13,
        fontWeight:'bold'
    },
    orView:{
        width:'100%',
        height:windowWidth*0.12,
        justifyContent:'center',
        alignItems:'center',
        marginTop:20
    },
    orText:{
        color:'#8E8E8E',
        fontSize:12,
    },
    facebookView:{
        width:'100%',
        height:windowWidth*0.12,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    facebookText:{
        fontSize:12,
        color:'#208EF6',
        marginLeft:5,
    },
    signUpArea:{
        flex:1,
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        borderTopWidth:1,
        borderColor:'rgb(220,220,220)',
        backgroundColor:'#FAFAFA',
        flexDirection:'row'
    },
    signUpText:{
        color:'#262626',
        fontSize:13,
    }
})