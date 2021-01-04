import React, { Component } from 'react'
import { Text, View,StyleSheet,Dimensions,TouchableOpacity,SafeAreaView,Image,TextInput,Button,ActivityIndicator } from 'react-native'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Icon from 'react-native-vector-icons/FontAwesome';
import {AppContext} from '../../../Components/AppContext'
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

export default class PostShare extends Component {
    state={
        loading:false,
        comment:''
    }
    SharePhoto = () => {
        this.setState({loading:true})
        const reference = storage().ref(this.context.postPhotoRef);
        const pathToFile = this.context.postPhotoSource;
        const task = reference.putFile(pathToFile);
        reference.putFile(pathToFile);
        task.on('state_changed', taskSnapshot => {
            console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
        });  
        task.then(() => {
            storage()
            .ref(this.context.postPhotoRef)
            .getDownloadURL()
            .then(url => {
                this.context.setPostPhotoUrl(url)
            })
            .then(() => {
                firestore()
                .collection('Posts')
                .doc(this.context.user.uid)
                .collection('userPost')
                .add({
                  photo:this.context.postPhotoUrl,
                  comment:this.state.comment,
                  like:0,
                  postProfilPhoto:this.context.profilPhotoUrl,
                  username:this.context.username,
                })
                .then(() => {
                  this.setState({loading:false})
                  this.props.navigation.navigate('HomeScreen')
                });
            })
            .catch(error => {
                alert(error)
                this.setState({loading:false})
            })
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.header}>
                    <TouchableOpacity style={styles.button}  onPress={() => this.props.navigation.navigate('TabNavigation')} >
                        <Icon name="times" size={22} color="gray" />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button,{alignItems:'flex-end'}]} onPress={this.SharePhoto}>
                        {this.state.loading?<ActivityIndicator color='#000' />:<Text style={styles.buttonText}>Paylaş</Text>}
                    </TouchableOpacity>
                </SafeAreaView>
                <View style={styles.inputView}>
                    <View style={{flex:1}}>
                        <Image 
                        source={this.context.postPhotoSource?{uri:this.context.postPhotoSource}:null}
                        style={styles.image}
                        />
                    </View>
                    <View style={{flex:2}}>
                        <TextInput 
                        value={this.state.comment}
                        onChangeText={text => this.setState({comment:text})}
                        placeholder='Bir açıklama yaz...'
                        style={styles.textInput}
                        />
                    </View>
                </View>
                <View style={{flex:1,width:'100%',}}>
                    <View style={[styles.component]}>
                        <Text>Konum Ekle</Text>
                    </View>
                    <View style={[styles.component]}>
                        <Text>Kişilere Ekle</Text>
                    </View>
                    <View style={[styles.component,{height:windowWidth*0.5}]}>
                        <View style={[styles.componentView]}>
                            <Text style={styles.textStyle}>Şurada Paylaş:</Text>
                        </View>
                        <View style={[styles.componentView]}>
                            <View style={{flex:1,justifyContent:'center'}}><Text style={styles.textStyle}>Facebook</Text></View>
                            <View style={{flex:1,alignItems:'flex-end',justifyContent:'center'}}><Icon name="toggle-off" size={30} color="gray"/></View> 
                        </View>
                        <View style={[styles.componentView]}>
                            <View style={{flex:1,justifyContent:'center'}}><Text style={styles.textStyle}>Twitter</Text></View>
                            <View style={{flex:1,alignItems:'flex-end',justifyContent:'center'}}><Icon name="toggle-off" size={30} color="gray"/></View>
                        </View>
                        <View style={styles.componentView}>
                            <View style={{flex:1,justifyContent:'center'}}><Text style={styles.textStyle}>Twitter</Text></View>
                            <View style={{flex:1,alignItems:'flex-end',justifyContent:'center'}}><Icon name="toggle-off" size={30} color="gray"/></View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}
PostShare.contextType = AppContext;

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
    },
    header:{
        height:60,
        width:windowWidth,
        flexDirection:'row',
        backgroundColor:'#FAFAFA',
        borderBottomWidth:1,
        borderBottomColor:'rgb(220,220,220)'
    },
    button:{
        flex:1,
        justifyContent:'center',
        padding:10
    },
    buttonText:{
        color:'#2795F6',
        fontSize:18,
        fontWeight:'500'
    },
    inputView:{
        height:windowWidth*0.3,
        width:windowWidth,
        marginTop:15,
        flexDirection:'row',
        padding:10,
        borderBottomWidth:1,
        borderBottomColor:'rgb(200,200,200)',
        backgroundColor:'rgb(248,248,248)'

    },
    image:{
        height:'100%',
        width:'100%',
    },
    textInput:{
        height:'100%',
        width:'100%',
        padding:15,
    },
    body:{
        flex:1,
        backgroundColor:'gray',
        width:'100%'
    },
    component:{
        width:'100%',
        height:windowWidth*0.13,
        justifyContent:'center',
        padding:10,
        borderBottomWidth:1,
        borderBottomColor:'rgb(200,200,200)',
        backgroundColor:'rgb(248,248,248)'
    },
    componentView:{
        flex:1,
        justifyContent:'center',
        flexDirection:'row',
    },
    textStyle:{
        textAlign:'left',
        textAlignVertical:'center'
    }
})