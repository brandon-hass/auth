import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './src/components/common';
import LoginForm from './src/components/LoginForm';

export default class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
        apiKey: 'AIzaSyCbftTr6SPcsDUy9CdRZ4aV7IJOb3LQSL8',
        authDomain: 'auth-28515.firebaseapp.com',
        databaseURL: 'https://auth-28515.firebaseio.com',
        projectId: 'auth-28515',
        storageBucket: 'auth-28515.appspot.com',
        messagingSenderId: '903576823815'
    }); 

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true}) 
      } else {
        this.setState({ loggedIn: false}) 
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <View style={{ flexDirection: 'row' }}>
            <Button onPress={() => firebase.auth().signOut()}>
              Log Out
            </Button>
          </View>
        ); 
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    ); 
  }
}
