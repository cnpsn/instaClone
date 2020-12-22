import React, { Component, useCallback } from 'react'
import { Text, View,StyleSheet,Dimensions,Image,TextInput,TouchableOpacity,ActivityIndicator,Button } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import { Input } from 'react-native-elements';
import {AppContext} from '../../../Components/AppContext'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class SignUpPage extends Component {  
    state={
        usernameWaiting:false,
        usernameSuccess:false,
        usernameError:false,
    }
    Icon = () => {
        if(this.state.usernameWaiting === true){
            return <ActivityIndicator color='gray' /> 
        }else if(this.state.usernameSuccess === true){
            return <Icon name="check-circle" size={22} color="#62BA46" />
        }else if(this.state.usernameError === true){
            return <Icon name="exclamation-circle" size={22} color="#ED4D54" />
        }
        else{return null}
    }
    textChange = (text) => {
        setTimeout(() => {
            this.setState({usernameWaiting:false})
            firestore()
            .collection('Users')
            // Filter results
            .where('username', '==', this.context.username)
            .get()
            .then(querySnapshot => {
              if(querySnapshot.size >= 1){
                this.setState({
                    usernameWaiting:false,
                    usernameSuccess:false,
                    usernameError:true,  
                })
              }else{
                  this.setState({
                      usernameWaiting:false,
                      usernameError:false,
                      usernameSuccess:true
                  })
              }
            });
        }, 100);
        this.context.setUsername(text)
        this.setState({usernameWaiting:true})
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.centerArea}>
                    <Image source={require('../../../image/logo.png')} style={styles.logo} />
                    <Input 
                    onEndEditing={() => {
                        this.context.username === '' ? this.setState({usernameSuccess:false}) : null
                        this.setState({usernameWaiting:false})
                        firestore()
                        .collection('Users')
                        // Filter results
                        .where('username', '==', this.context.username)
                        .get()
                        .then(querySnapshot => {
                          if(querySnapshot.size >= 1){
                            this.setState({
                                usernameWaiting:false,
                                usernameSuccess:false,
                                usernameError:true,  
                            })
                          }else{
                            if(this.context.username !== ''){
                                this.setState({
                                    usernameWaiting:false,
                                    usernameError:false,
                                    usernameSuccess:true
                                })
                            }
                          }
                        });
                    }} 
                    onChangeText={text => this.textChange(text)}
                    autoCapitalize='none'
                    value={this.context.username}
                    placeholder='Kullanıcı Adı'
                    placeholderTextColor='#8E8E8E'
                    inputContainerStyle={{borderBottomWidth:0}}
                    inputStyle={styles.textInputInputStyle}
                    containerStyle={styles.textInputContainerStyle}
                    rightIcon={
                        <this.Icon />
                    }
                    />
                    <Input 
                    autoCapitalize='none'
                    value={this.context.email}
                    onChangeText={text => this.context.setEmail(text)}
                    placeholder='E-posta'
                    placeholderTextColor='#8E8E8E'
                    inputContainerStyle={{borderBottomWidth:0}}
                    inputStyle={styles.textInputInputStyle}
                    containerStyle={[styles.textInputContainerStyle,{marginTop:15}]}
                    />
                    <Input 
                    autoCapitalize='none'
                    secureTextEntry={true}
                    value={this.context.password}
                    onChangeText={text => this.context.setPassword(text)}
                    placeholder='Şifre'
                    placeholderTextColor='#8E8E8E'
                    inputContainerStyle={{borderBottomWidth:0}}
                    inputStyle={styles.textInputInputStyle}
                    containerStyle={[styles.textInputContainerStyle,{marginTop:15}]}
                    />
                    <TouchableOpacity style={styles.logInButton} onPress={() => {
                        this.state.usernameError ? alert('Bu kullanıcı adı daha önce alınmış') : this.context.signUpPress({
                            email:this.context.email,
                            password:this.context.password,
                            navigate:this.props.navigation.navigate,
                            
                        })
                    }}>
                        {this.context.loading ? <ActivityIndicator color='#fff' /> : <Text style={styles.LogInButtonText}>Kayıt Ol</Text>}
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
SignUpPage.contextType = AppContext;

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
    textInputContainerStyle:{
        height:windowWidth*0.12,
        width:windowWidth*0.9,        
        borderRadius:4,
        backgroundColor:'#FAFAFA',
        borderWidth:0.5,
        borderColor:'rgb(220,220,220)',
    },
    textInputInputStyle:{
        color:'#262626',
        fontSize:13
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
/*
 
*/