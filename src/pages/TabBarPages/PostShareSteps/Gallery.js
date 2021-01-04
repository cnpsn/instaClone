import React, { Component } from 'react'
import { Text, View,StyleSheet,Button ,Dimensions} from 'react-native'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import {AppContext} from '../../../Components/AppContext'

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const options = {
  mediaType:'photo',
  maxWidth:windowWidth,
  maxHeight:windowHeight,
};

export default class Gallery extends Component {
    componentDidMount(){
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                  console.log('User cancelled image picker');
                  this.props.navigation.goBack()
                } else if (response.error) {
                  console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                  console.log('User tapped custom button: ', response.customButton);
                } else {
                  const source = { uri: response.uri };

                  this.context.setPostPhotoSource(source.uri)
                  this.context.setPostPhotoRef(response.fileName)
                  this.props.navigation.navigate('PostShow')
                }
        });
    }
    render() {
      console.log(this.context.postPhotoRef)
      console.log(this.context.postPhotoSource)
        return null
    }
}
Gallery.contextType = AppContext;

