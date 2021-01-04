import React, { Component } from 'react'
import { Text, View,StyleSheet,Button,Image,TouchableOpacity,SafeAreaView,ActivityIndicator} from 'react-native'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import {AppContext} from '../../../Components/AppContext'

export default class WelcomeInstagramPage extends Component {
    state={
        loading:false,
        photoRef:'',
        userUid:'',
        username:'',
    }
    componentDidMount(){
        firestore()
        .collection('Users')
        .doc(this.context.user.uid)
        .get()
        .then(documentSnapshot => {
            this.setState({username:documentSnapshot.data().username})
            storage()
            .ref(documentSnapshot.data().photoRef)
            .getDownloadURL()
            .then(url => {
                this.context.setProfilPhotoUrl(url)
            })
        });
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.centerArea}>
                    <Text style={{fontSize:16,fontWeight:'400',marginBottom:20}}>Hoşgeldin {this.state.username}</Text>
                    <TouchableOpacity style={styles.imageView} onPress={this.ChoosePhoto}>
                    <Image 
                    style={styles.image}
                    source={this.context.profilPhotoUrl ? {uri: this.context.profilPhotoUrl } : null}
                    />
                    </TouchableOpacity>
                </View>
                <View style={styles.bottomArea}>
                    <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('TabNavigation')}>
                       {this.state.loading ? <ActivityIndicator color='#fff' /> : <Text style={styles.buttonText}>İleri</Text>} 
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }
}
WelcomeInstagramPage.contextType = AppContext;

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    centerArea:{
        flex:10,
        width:'90%',
        justifyContent:'center',
        alignItems:'center'
    },
    bottomArea:{
        flex:1,
        width:'90%',
        alignItems:'center'
    },
    imageView:{
      width:200,
      height:200,  
      backgroundColor:'rgb(220,220,220)',
      justifyContent:'center',
      alignItems:'center',
      borderRadius:100
    },
    image:{
        width:200,
        height:200,
        borderRadius:100,
    },
    button:{
        width:'90%',
        height:40,
        backgroundColor:"#2795F6",
        justifyContent:'center',
        alignItems:'center',
        borderRadius:2
    },
    buttonText:{
        color:'#fff',
        fontSize:15,
        fontWeight:'500'
    }
})
/**
 * Fotoğraf Seçme 
 * launchImageLibrary(options, (response) => {
                        if (response.didCancel) {
                          console.log('User cancelled image picker');
                        } else if (response.error) {
                          console.log('ImagePicker Error: ', response.error);
                        } else if (response.customButton) {
                          console.log('User tapped custom button: ', response.customButton);
                        } else {
                          const source = { uri: response.uri };
                      
                          // You can also display the image using data:
                          // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                      
                          this.setState({
                            file: source,
                            fileName:response.fileName
                          });
                        }
                    });



                 upload
                 
                 onPress={async () => {
                    // path to existing file on filesystem
                    const pathToFile = this.state.file.uri;
                    const task = reference.putFile(pathToFile);
                    // uploads file
                    await reference.putFile(pathToFile);
                    task.on('state_changed', taskSnapshot => {
                        console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
                    });  
                    task.then(() => {
                        alert('Image uploaded to the bucket!');
                    });
                    }}
 * 
 */