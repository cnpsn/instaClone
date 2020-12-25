import React, { Component } from 'react'
import { Text, View,StyleSheet,Button } from 'react-native'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const options = {
    mediaType:'photo',
    maxWidth:100,
    maxHeight:100,
    videoQuality:'low',
};
launchCamera(options, (response) => {
    console.log(response)    
});
export default class PlusScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text> Plus Screen </Text>
                <Button 
                title='Kamera Aç'
                onPress={this.launchCamera}
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
