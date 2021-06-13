//loading js determine auth state then direct to proper screen

import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
//import firebase from 'react-native-firebase';


export default class Loading extends React.Component {
   /* componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? 'Profile' : 'SignUp')
            <ActivityIndicator size="large"/>
        })
    }*/
    render() {
        return (
            <View style={styles.container}>
                <Text>Loading</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})