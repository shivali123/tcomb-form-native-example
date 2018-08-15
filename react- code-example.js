
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
  Modal,
  ActivityIndicator
} from 'react-native';
import { CheckBox } from 'native-base';

import {StackNavigator,NavigationActions} from 'react-navigation'
import {Navigation} from 'react-native-navigation'
import {Facebooklogin} from '../components/Facebooklogin';
import {Googlelogin} from '../components/Googlelogin';
import {Twitterlogin} from '../components/Twitterlogin';
import {LoginScreen} from '../screens/Login';
import Toast from 'react-native-simple-toast';

export class SpecificComponents extends Component<{}> {
  render() {
    return (
      <View style={styles.profileContainer}>
          <Image
          style={styles.image} source={require('../../assets/profile_default.png')} />
      </View>
    );
  }
}
export class CreateProfile extends Component<{}> {
  render() {
    return (
      <View style={styles.createContainer}>
          <Text style={styles.create}>Create Profile</Text>
          <Text style={styles.createD}> Create your profile and share your love for food with the world. Keep sharing delicious recipes  with the family and friends</Text>
      </View>
    );
  }
}

export class StartedNow extends Component<{}> {
  constructor (props){
     super(props)
     this.state = {
      emailAdd: '',
      name : '',
      pic: '',
    }
   }
   state = {
       isModalVisible: false,
       isEditProfile:false,
       user:{}
   };

  _toggleModal = () =>{
        this.setState({ isModalVisible: !this.state.isModalVisible });
        this.setState({ isEditProfile: false});
    }
    updateValue =(path)=>{
       this.setState({path:path})
    }
    updateDescription =(newDescription)=> {
      this.setState({newDescription:newDescription})
    }
    updateName =(newName)=> {
      this.setState({newName:newName})
    }
    _loggedIn=()=>{
      this.setState({ isModalVisible: false });
    }
    _stateValue=()=>{
      this.setState({checked:!this.state.checked})
    }
    _switchModal=()=>{
      if (this.state.isModalVisible){
        return(
          <Modal isVisible={this.state.isModalVisible} animationType={'slide'}>
            <View>
              <Image source={require('../../assets/splash.png')}
                  placeholder={require('../../assets/splash.png')}
                  />
             <View>
              <TouchableOpacity onPress={()=> this._toggleModal()} >
                  <Image source={require('../../assets/search-cancel1.png')}/>
              </TouchableOpacity>
              <View  style={styles.groupView} >
                 <Text style={styles.accountLabel}> CREATE AN ACCOUNT</Text>
                 <Facebooklogin navigate={this.props.navigation} callBack={this._onReply.bind(this)} checkboxvalue={this.state.checked}/>
                 <Googlelogin navigate={this.props.navigation} callBack={this._onReply.bind(this)} checkboxvalue={this.state.checked}  />
               </View>
              <View>
                    <View>
                        <CheckBox  checked={this.state.checked} onPress={this._stateValue.bind(this)}/>
                    </View>
                <View>
                      <Text >I agree to What To Cook</Text>
                      <Text onPress={() => Linking.openURL(Global.BASE_URL + 'WTCTermsOfServices.htm')}> Terms of Service </Text>
                      <Text>and</Text>
                      <Text onPress={() => Linking.openURL(Global.BASE_URL + 'T33PrivacyPolicy.htm')}> Privacy Policy</Text>
                     </View>
                  </View>
                </View>
              </View>
            </Modal>
        );
      }
      else {
        return(
          <View />
        );
      }
    }

    _onCancel=()=>{
      this.setState({ isEditProfile: false});
   }
    _onDone=()=>{

      this._onCancel()
      this._navigateToProfile()
    }
   _navigateToProfile =()=> {
     this._uploadUserDetails();
   }

render() {
    return (
      <View>
        <TouchableOpacity
            style={styles.get}
            onPress={() => this._toggleModal()}>
                  <Text >GET STARTED NOW</Text>
       </TouchableOpacity>
       {this._switchModal()}
       {this._editProfileCall()}
     </View>
    );
  }
}
export class TrendingNowGridView extends Component<{}> {
  constructor (props){
     super(props)
   }
  render() {
    return (
      <View>
      <Text style={styles.tR}>TRENDING RECIPES</Text>
      <TrendingNow navigation={this.props.navigation} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  profileContainer:{
    alignItems:'center',
    marginTop:Dimensions.get('window').height * 0.10,
    backgroundColor: 'rgb(231,231,231)',
    borderRadius:(Dimensions.get('window').width * 0.50)/2,
  },
  image: {
    height:Dimensions.get('window').width * 0.25,
    width:Dimensions.get('window').width * 0.25,
    borderRadius:(Dimensions.get('window').width * 0.25)/2,
    borderWidth:2,
    borderColor: 'rgb(231,231,231)'
  },
  createContainer: {
    alignItems:'center',
    marginTop:20
 },
 create:{
   color: 'rgb(54,195,186)',
   fontSize:15,
   fontWeight:"bold"

},
 accountLabel:{
   color:'rgb(38,74,74)',
   paddingTop:13,
   paddingLeft:Dimensions.get('window').width * 0.30,
   fontSize: 12,
   fontWeight: 'bold',
 },

get:{
alignItems:'center',
justifyContent:'center',
width:Dimensions.get('window').width * 0.5,
height:Dimensions.get('window').width * 0.10,
backgroundColor:'rgb(54,195,186)',
borderRadius:20,
marginTop:20,
},
tR:{
  fontSize:12,
  marginTop:20,
  marginLeft:20,
  color: 'rgb(164,167,167)',
  fontWeight:'bold'
},
view:{
  backgroundColor: 'rgb(249,249,249)',
  flex:1,
  width:Dimensions.get('window').width,
  height:Dimensions.get('window').height
}

});
