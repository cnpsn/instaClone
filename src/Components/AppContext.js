import React, { Component } from 'react'
import { Text, View } from 'react-native'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

export const AppContext = React.createContext();

export default class AppProvider extends Component {
    state={
        email:'',
        password:'',
        username:'',
        loading:false,
        user:'',
        initializing:true,
        photoUrl:'',
    }
    onAuthStateChanged = (user) => {
        this.setState({user:user})
        if (this.state.initializing) this.setState({initializing:false});
    }
    componentDidMount(){
        const subscriber = auth().onAuthStateChanged(this.onAuthStateChanged);
        return subscriber;
    }
    signUpPress = ({email,password,navigate}) => {
        this.setState({loading:true})
        if(this.state.email === '' || this.state.password === '' || this.state.username === ''){
            alert('Lütfen boş alan bırakmayın')
            this.setState({loading:false})
        }else{
        auth()
        .createUserWithEmailAndPassword(email,password)
        .then(() => {
            this.setState({loading:false})
            navigate('SignUpPhotoUpdatePage')
        })
        .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
            alert('Verilen e-posta adresine sahip bir hesap zaten var');
            this.setState({loading:false})
            }
            if (error.code === 'auth/invalid-email') {
            alert('Lütfen geçerli bir e-posta adresi deneyin');
            this.setState({loading:false})
            }
            if(error.code === 'auth/weak-password'){
            alert('Lütfen daha güçlü bir şifre deneyin')
            this.setState({loading:false})
            }
            if(error.code === 'auth/operation-not-allowed'){
            alert('Hesap aktif değil')
            this.setState({loading:false})
            }
            console.log(error.code)
        });
        }
    }
    SignInButton = ({email,password,navigate}) => {
        this.setState({loading:true})
        if(email === '' || password === ''){
            alert('Lütfen boş alan bırakmayınız !')
            this.setState({loading:false})
        }else{
            auth()
            .signInWithEmailAndPassword(email,password)
            .then(() => {
                console.log(this.state.user)
                firestore()
                .collection('Users')
                .doc(this.state.user.uid)
                .get()
                .then(documentSnapshot => {
                    storage()
                    .ref(documentSnapshot.data().photoRef)
                    .getDownloadURL()
                    .then(url => {
                        this.setState({photoUrl:url})
                        this.setState({loading:false})
                        navigate('TabNavigation')
                    })
                });
            })
            .catch(error => {
                if (error.code === 'auth/invalid-email') {
                alert('Bu e-posta adresi geçerli değil !');
                this.setState({loading:false})
                }
                if (error.code === 'auth/user-disabled') {
                alert('Bu e-posta adresi devre dışı bırakılmış');
                this.setState({loading:false})
                }
                if (error.code === 'auth/user-not-found') {
                alert('Böyle bir e-posta adresi yok !');
                this.setState({loading:false})
                }
                if (error.code === 'auth/wrong-password') {
                alert('e-posta adresi veya şifre yanlış');
                this.setState({loading:false})
                }
            });   
        }
    }
    render() {
        console.log(this.state.photoUrl)
        return (
            <AppContext.Provider
            value={{
                email:this.state.email,
                setEmail:(text) => this.setState({email:text}),
                password:this.state.password,
                setPassword:(text) => this.setState({password:text}),
                username:this.state.username,
                setUsername:(text) => this.setState({username:text}),
                signUpPress:this.signUpPress,
                SignInButton:this.SignInButton,
                loading:this.state.loading,
                setLoading:(value) => this.setState({loading:value}),
                user:this.state.user,
                initializing:this.state.initializing,
                photoUrl:this.state.photoUrl,
                setPhotoUrl:(text) => this.setState({photoUrl:text})
            }}
            >
                {this.props.children}
            </AppContext.Provider>
        )
    }
}
const AppContextConsumer = AppContext.Consumer
export {AppContextConsumer}
