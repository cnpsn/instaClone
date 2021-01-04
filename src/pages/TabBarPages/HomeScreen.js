
import React, { Component } from 'react'
import { Text, View,FlatList,StyleSheet,SafeAreaView,ActivityIndicator,Image,Dimensions} from 'react-native'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {AppContext} from '../../Components/AppContext';
import HomePagePostDesign from '../../Components/HomePagePostDesign'
import HomePageStoryDesign from '../../Components/HomePageStoryDesign'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class HomeScreen extends Component {
    state={
        initial:false,
        userId:'',
    }
    DATA = []
    componentDidMount(){
        this.setState({user:this.context.user})
            firestore()
            .collection('Users')
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    firestore()
                    .collection('Posts')
                    .doc(documentSnapshot.id)
                    .collection('userPost')
                    .get()
                    .then(querySnapshot => {
                        this.setState({userId:documentSnapshot.id})
                        querySnapshot.forEach(documentSnapshot => {
                            this.DATA.push({
                                userId:this.state.userId,
                                postId:documentSnapshot.id,
                                comment:documentSnapshot.data().comment,
                                photo:documentSnapshot.data().photo,
                                like:documentSnapshot.data().like,
                                username:documentSnapshot.data().username,
                                postProfilPhoto:documentSnapshot.data().postProfilPhoto,
                            })
                            
                        });
                    })
                    .then(() => {
                        this.setState({initial:true})
                    })
                    .catch((error) => {
                        this.props.navigation.navigate('FirstPage')
                    })
                })
            })
    }
    RenderPost = ({item}) => {
        return(
            <HomePagePostDesign item={item} context={this.context} />
        )
    }
    RenderStory = () => {
        return(
            <HomePageStoryDesign />
        )
    }
    render() {
        if(this.state.initial === true){
            return(
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                        <Image 
                        source={require('../../icon/camera.png')}
                        style={{width:'45%',height:'45%'}}
                        />
                    </View>
                    <View style={{flex:4,justifyContent:'center',alignItems:'center'}}>
                        <Image 
                        source={require('../../image/logo.png')}
                        style={{width:'50%',height:'100%'}}
                        />
                    </View>
                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                        <Image 
                        source={require('../../icon/send.png')}
                        style={{width:'45%',height:'45%'}}
                        />
                    </View>
                </View>
                <FlatList 
                style={styles.body}
                data={this.DATA}
                ListHeaderComponent={() => <this.RenderStory />}
                renderItem={({item}) => (<this.RenderPost item={item} />)}/>
            </SafeAreaView>
            )
        }else{
            return(
            <View style={{flex:1,justifyContent:'center',alignContent:'center'}}>
                <ActivityIndicator color='#000' size='large' />
            </View>
            )

        }
    }
}
const styles = StyleSheet.create({
    container:{
      flex:1,
    },
    body:{

    },
    image:{
        width:windowWidth,
        height:windowWidth,
    },
    header:{
        width:windowWidth,
        height:windowWidth*0.13,
        flexDirection:'row',
    },

})
HomeScreen.contextType = AppContext;
/*
        firestore()
        .collection('Posts')
        .doc(this.context.user.uid)
        .collection('userPost')
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
                this.DATA.push({
                    comment:documentSnapshot.data().comment,
                    photo:documentSnapshot.data().photo,
                    like:documentSnapshot.data().like,
                    username:documentSnapshot.data().username,
                    postProfilPhoto:documentSnapshot.data().postProfilPhoto,
                })
                
            });
        })
        .then(() => {
            this.setState({initial:true})
        })

        this.props.navigation.navigate('FirstPage')
 *
 */
