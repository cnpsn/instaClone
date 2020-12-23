import React, { Component } from 'react'
import { Text, View } from 'react-native'
import auth from '@react-native-firebase/auth';

export const AppContext = React.createContext();

export default class AppProvider extends Component {
    state={
        email:'',
        password:'',
        username:'',
        loading:false,

        user:'',
        initializing:true,
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
    render() {
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
                loading:this.state.loading,
                setLoading:(value) => this.setState({loading:value}),
                user:this.state.user,
                initializing:this.state.initializing,
            }}
            >
                {this.props.children}
            </AppContext.Provider>
        )
    }
}
const AppContextConsumer = AppContext.Consumer
export {AppContextConsumer}
