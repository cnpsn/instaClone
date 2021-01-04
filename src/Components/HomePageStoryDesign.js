import React, { Component } from 'react'
import { Text, View,StyleSheet,Dimensions,Image } from 'react-native'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Icon from 'react-native-vector-icons/FontAwesome';
import {AppContext} from '../../src/Components/AppContext';

export default class HomePageStoryDesign extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.itemContainer}>
                    <View style={styles.item}>
                        <Image 
                        source={{uri:this.context.profilPhotoUrl}}
                        style={styles.image}
                        />
                        <Icon name="plus-circle" size={20} color="#208EF6" style={{textAlign:'right'}} />
                    </View>
                    <Text style={{fontSize:11}}>Yeni Hikaye</Text>
                </View>
            </View>
        )
    }
}
HomePageStoryDesign.contextType = AppContext;

const styles = StyleSheet.create({
    container:{
        width:windowWidth,
        height:windowWidth*0.22,
        justifyContent:'center',
        borderBottomWidth:1,
        borderBottomColor:'rgb(220,220,220)'
    },
    itemContainer:{
        width:windowWidth*0.22,
        height:windowWidth*0.22,
        alignItems:'center',
    },
    item:{
        height:windowWidth*0.16,
        width:windowWidth*0.16,
        borderRadius:windowWidth*0.8,
        marginTop:6,
        justifyContent:'flex-end'
    },
    text:{
        fontSize:11,
        fontWeight:'600',
        color:'#000',
    },
    image:{
        height:windowWidth*0.16,
        width:windowWidth*0.16,
        borderRadius:windowWidth*0.8,
        zIndex:0,
        position:'absolute',
    }
})