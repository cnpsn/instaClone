import React,{useState,useEffect} from 'react'
import { View, Text,StyleSheet,Image,Dimensions,TouchableHighlight,ImageBackground,TouchableOpacity} from 'react-native'
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/FontAwesome';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function HomePagePostDesign({item}) {
    const [likeDurumu, setlikeDurumu] = useState(false)
    const [likeAnimation, setlikeAnimation] = useState(false)

    const photoLike = () => { 
        if(likeDurumu === false){
            firestore()
            .collection('Posts')
            .doc(item.userId)
            .collection('userPost')
            .doc(item.postId)
            .update({
                like:+1,
            })
            .then(() => {
                firestore()
                .collection('Posts')
                .doc(item.userId)
                .collection('userPost')
                .doc(item.postId)
                .get()
                .then(querySnapshot => {
                    const like = querySnapshot.data().like
                    item.like = like
                    setlikeDurumu(true)
                    setlikeAnimation(true)
                }); 
            });
        }else if(likeDurumu === true){
            firestore()
            .collection('Posts')
            .doc(item.userId)
            .collection('userPost')
            .doc(item.postId)
            .update({
                like:-1,
            })
            .then(() => {
                firestore()
                .collection('Posts')
                .doc(item.userId)
                .collection('userPost')
                .doc(item.postId)
                .get()
                .then(querySnapshot => {
                    const like = querySnapshot.data().like
                    item.like = like
                    setlikeDurumu(false)
                    setlikeAnimation(false)
                }); 
            });
        }
    }
    const LikeAnimation = () => {
        setTimeout(() => {
            setlikeAnimation(false) 
        }, 1000);
        return(
            <View>
                <Icon name="heart" size={100} color="white" style={{marginRight:10}} /> 
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <View style={styles.item}>
                <View style={[styles.view,{flexDirection:'row',alignItems:'center'}]}>
                    <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                        <Image 
                        source={{uri:item.postProfilPhoto}}
                        style={{height:windowWidth*0.08,width:windowWidth*0.08,borderRadius:windowWidth*0.4,marginLeft:10}}
                        />
                        <Text style={{color:'#000',marginLeft:10,fontWeight:'500'}}>{item.username}</Text>
                    </View>
                    <View style={{flex:1,justifyContent:'center',alignItems:'flex-end'}}>
                        <Icon name="ellipsis-h" size={22} color="black" style={{marginRight:10}} />
                    </View>
                </View>
                <TouchableHighlight style={[styles.view,{backgroundColor:'white',flex:10}]} onPress={() => {
                    photoLike()
                }}>
                    <ImageBackground
                    style={{height:'100%',width:'100%',position:'absolute',justifyContent:'center',alignItems:'center'}}
                    source={{uri:item.photo}}
                    >
                        {likeAnimation === true ?<LikeAnimation /> :null}
                    </ImageBackground>
                </TouchableHighlight>
                <View style={[styles.view,{alignItems:'center',flexDirection:'row',flex:1.2,borderBottomWidth:0.7,borderBottomColor:'rgb(200,200,200)'}]}>
                    {likeDurumu 
                    ?   
                        <TouchableOpacity onPress={() => photoLike()}>
                            <Image 
                            source={require('../icon/heartTrue.png')}
                            style={{height:28,width:28,marginLeft:15}}
                            />
                        </TouchableOpacity>
                    :
                        <TouchableOpacity onPress={() => photoLike()}>
                            <Image 
                            source={require('../icon/heart.png')}
                            style={{height:28,width:28,marginLeft:15}}
                            />
                        </TouchableOpacity>
                    }
                    <Image 
                    source={require('../icon/balloon.png')}
                    style={{height:28,width:28,marginLeft:15}}
                    />
                    <Image 
                    source={require('../icon/arrow.png')}
                    style={{height:25,width:25,marginLeft:15}}
                    />
                    
                </View>
                <View style={[styles.view,{justifyContent:'center'}]}>
                    <View style={{flex:1,justifyContent:'center',marginLeft:10}}>
                        {
                            item.like === -1 ? <Text>Beğeni yok</Text> : <Text style={{color:'#000',fontWeight:'500'}}><Text>{item.like}</Text> Beğeni</Text>
                        }
                    </View>
                    <View style={{flex:1,alignItems:'center',marginLeft:10,flexDirection:'row'}}>
                        <Text style={{color:'#000',fontWeight:'600'}}>{item.username}</Text>
                        <Text style={{marginLeft:5}}> {item.comment} </Text>
                    </View>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    item:{
       width:windowWidth,
       height:windowWidth*1.3,
       marginBottom:15
    },
    view:{
        flex:1.5,
    }
})