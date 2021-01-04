import React, { Component } from 'react'
import { Text, View,StyleSheet,Button,Image,TouchableOpacity,SafeAreaView,ActivityIndicator} from 'react-native'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import {AppContext} from '../../../Components/AppContext'

const options = {
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
};
export default class SignUpPhotoUpdatePage extends Component {
    state={
        photoSource:'',
        photoRef:'',
        fotoİcon:true,
        loading:false,
    }
    ChoosePhoto = () => {
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
              const source = { uri: response.uri };
          
              this.setState({
                photoSource: source,
                photoRef:response.fileName,
                fotoİcon:false
              });
            }
        });
    }
    UpdatePhoto = () => {
        this.setState({loading:true})
        const reference = storage().ref(this.state.photoRef);
        // path to existing file on filesystem
        const pathToFile = this.state.photoSource.uri;
        const task = reference.putFile(pathToFile);
        // uploads file
        reference.putFile(pathToFile);
        task.on('state_changed', taskSnapshot => {
            console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
        });  
        task.then(() => {
            /* Fotoğraf karşıya yüklendikten sonra kullanıcı bilgilerini firestore'a yaz  */
            firestore()
            .collection('Users')
            .doc(this.context.user.uid)
            .set({
              username:this.context.username,
              email:this.context.email,
              photoRef:this.state.photoRef,
            })
            .then(() => {
              this.setState({loading:false})
              this.props.navigation.navigate('WelcomeInstagramPage')
            });
        });
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.centerArea}>
                    <Text style={{fontSize:16,fontWeight:'400',marginBottom:20}}>Fotoğraf Seç</Text>
                    <TouchableOpacity style={styles.imageView} onPress={this.ChoosePhoto}>
                        {this.state.fotoİcon ? <Icon name="user-circle" size={55} color="#2795F6" /> : 
                        <Image 
                        style={styles.image}
                        source={{uri:this.state.photoSource.uri}}
                        />
                        }
                    </TouchableOpacity>
                </View>
                <View style={styles.bottomArea}>
                    <TouchableOpacity style={styles.button} onPress={this.UpdatePhoto}>
                       {this.state.loading ? <ActivityIndicator color='#fff' /> : <Text style={styles.buttonText}>İleri</Text>} 
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }
}
SignUpPhotoUpdatePage.contextType = AppContext;

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
      width:300,
      height:300,  
      backgroundColor:'rgb(220,220,220)',
      justifyContent:'center',
      alignItems:'center',
      borderRadius:4
    },
    image:{
        width:'100%',
        height:'100%',
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