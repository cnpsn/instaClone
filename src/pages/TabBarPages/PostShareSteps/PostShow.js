import React, { Component } from 'react'
import { Text, View,StyleSheet,Dimensions,Image,TouchableOpacity,SafeAreaView} from 'react-native'
import {AppContext} from '../../../Components/AppContext'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class PostShow extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image 
                style={styles.image}
                source={this.context.postPhotoSource?{uri:this.context.postPhotoSource}:null}
                />
                <SafeAreaView style={styles.header}>
                    <TouchableOpacity style={[styles.button]} onPress={() => this.props.navigation.navigate('TabNavigation')}>
                        <Text style={styles.buttonText}>Geri</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button,{alignItems:'flex-end'}]} onPress={() => this.props.navigation.navigate('PostShare')}>
                        <Text style={styles.buttonText}>İleri</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </View>
        )
    }
}
PostShow.contextType = AppContext;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'black'
    },
    header:{
        height:60,
        width:windowWidth,
        flexDirection:'row'
    },
    image:{
        width:windowWidth,
        height:windowHeight,
        zIndex:0,
        position:'absolute'
    },
    button:{
        flex:1,
        justifyContent:'center',
        padding:10
    },
    buttonText:{
        color:'#2795F6',
        fontSize:20,
        zIndex:1,
        fontWeight:'600'
    }
})