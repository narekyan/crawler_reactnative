import React from 'react';

import { StyleSheet, Text, View, Button, Linking } from 'react-native';

import { authorize } from 'react-native-app-auth';

import * as Expo from 'expo';
import Axios from 'axios';


class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loggedIn: false,
            name: "", 
            photoUrl: "",
            accessToken: "",
            messages: "",
        }
    
    }

    messages = async() => {
        //set current user
        user = {
            first: 'daniel',
            last: 'acevedo',
            born: 'never',
        }

        try {
            this.state.messages = fetch("https://crawler-90244.firebaseapp.com/messages", {
                method: 'GET',
                body: user,
                headers: new Headers({
                    'Authorization': this.state.accessToken,
                }),
            }).then(function(response) {
                this.state.messages = response;
            })
        }
        catch(e){
            console.log("error", e);
        }
        
    }


    signIn = async () => {
        try {
            const result = await Expo.Google.logInAsync({
                iosClientId:
                    "531799385489-3afjbeu701pfvpasm9br77emtb5vrnk4.apps.googleusercontent.com",
                scopes: ["profile", "email"]
            })

            if(result.type === "success") {
                this.setState({
                    loggedIn: true,
                    name: result.user.name,
                    photoUrl: result.user.photoUrl,
                    accessToken: result.accessToken
                })
            }
            else{
                console.log("cancelled")
            }

        }
        catch(e) {
            console.log("error", e)
        }

    }

    render() {
        return(
            <View style={styles.container}>
                <Text>Your tasks</Text>
                
                <Button
                    title="Go to profile"
                    onPress={() => this.props.navigation.navigate('Profile')}
                />
                <Button
                    title="Authenticate Outlook"
                    onPress={() => Linking.openURL("https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=ba9633d6-4d45-4d8b-abc2-06ffcbcf74bf&redirect_uri=com.example.app://auth&response_type=code&scope=openid+Mail.Read")}
                />
                {this.state.loggedIn ? (
                        <LoggedIn messages={this.messages}/>
                    ) : (
                        <LoginPage signIn={this.signIn}/>
                    )}

                <Text>{this.state.messages}</Text>

                
            </View>
        );
    }
    
}

const LoginPage = props => {
    return(
        <View>
            <Text>Sign in With Google</Text>
            <Button title="Google Sign In" onPress={() => props.signIn()}/>
        </View>
    )
}

const LoggedIn = props => {
    return(
        <View>
            <Text>Logged In</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#4286f4',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
});

export default HomeScreen;