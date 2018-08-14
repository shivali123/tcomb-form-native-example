

import React, { Component } from 'react';
import { AppRegistry,AsyncStorage, FlatList, StyleSheet, Text, ActivityIndicator,View,Button,ScrollView } from 'react-native';
import t from 'tcomb-form-native';
import Toast from 'react-native-simple-toast';
const Global = require('./Globalpath')
const Form = t.form.Form;
const User = t.struct({
  email:t.String,
  password: t.String,


});

var signinobj;
const options = {
  fields: {
    email: {
      label: 'EMAIL',
      error: 'Without an email address how are you going to login?',

    },password: {
      label: 'PASSWORD',
      error: 'Choose something you use on a dozen other sites or something you won\'t remember'
    }

  },
  auto: 'placeholders'
};

export default class Signin extends Component {
  constructor(props){
      super(props);
      this.state = {
      value:{},
      status:0
    }
  }
  _isSending=()=>{
    if (this.state.status == 1){
      return (
        <View style={{alignItems:'center',justifyContent:'center',flex:1}}>
          <ActivityIndicator style={{width:150,height:150}}/>
        </View>
      );
    }
  }

  handleSubmit = () => {
      const value = this._form.getValue(); // use that ref to get the form value
      if (value) {
        console.log(value);
        this.setState({status:1})
        signinobj._saveuser(this.state.value)
       }
    }
    forgetPassword=()=>{

    }
    onChange(value) {
      signinobj.setState({value:value})
    }
    //  timeout:60000,
    _saveuser=(value)=>{
      var data = {
              "deviceid": "1230",
              "devicetype": "ios",
              "pushtoken": "1230",
              "email": value.email,
              "password": value.password,

             }
          var basepath =  Global.BASE_URL+'user/login'
          fetch(basepath, {

          method: "POST",
          headers: {'Content-Type': 'application/json',
          'x-api-key':Global.apikey},
          body:  JSON.stringify(data)
          })
         .then(response => response.json())
         .then(response => {
            this.setState({status:0})
             if (response.success == true){
               console.log(response)
               AsyncStorage.setItem('user',JSON.stringify(response.user))
               AsyncStorage.setItem('token',JSON.stringify(response.token))
               this.props.navigation.navigate('Teamstructure')
             }
             else{
               Toast.show(response.errors.message)
             }

      })
    .catch((error) => {
         this.setState({status:0})
         // alert(error)

       });
    }
    render() {
      signinobj = this;
      return (
        <View>
        <View><Text>My DunYet</Text>
        </View>
        {this._isSending()}

        <ScrollView style={{backgroundColor:'rgb(216,226,243)'}}>
          <Form
            ref={c => this._form = c}
            type={User}
            options={options}
            value={this.state.value}
            onChange={this.onChange} // pass the options via props
          />
          <Button
            title="Sign In!"
            onPress={this.handleSubmit}
          />
          <Button
            title="Forget password!"
            onPress={this.forgetPassword}
          />
        </ScrollView>
        </View>
      );
    }
  }

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
})
