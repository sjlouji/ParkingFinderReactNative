import React, { Component } from 'react';
import { Text,StyleSheet, TouchableOpacity, ToastAndroid, Platform, AlertIOS, View , Container, Modal} from 'react-native';
import { Header, Left, Body, Right, Button, Icon, Title, Item, Input } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';



export default class HeaderJS extends Component {

  constructor(props){
    super(props);
    this.state = { 
        
      ModalVisibleStatus: false 
  }
  }

  ShowModalFunction(visible) {
 
    this.setState({ModalVisibleStatus: visible});
    
  }

    searchPage(){
        return(
          <Container>
            
          </Container>
        )
    }

  render() {
    return (
        <Header style={{ backgroundColor: 'transparent', elevation: 0.6 }}>
          <Left>
            <View transparent>
              <Icon type='Entypo' name='medium-with-circle' style={{ color: '#3e2465' }} />
            </View>
          </Left>
          <Body>
            <Title style={{ color: 'black' }}>DocApp</Title>
          </Body>
          <Right>
            <Button transparent>
                <MaterialIcons name="search" color='#3e2465' size={25} />
            </Button>
            <Button transparent onPress={() => { this.ShowModalFunction(true) }}>
                <Feather name="more-vertical" color='#3e2465' size={25} />
            </Button>
          </Right>
        
        </Header>
    );
  }
}

const styles = StyleSheet.create({

  MainContainer :{
      
  flex:1,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: (Platform.OS == 'ios') ? 20 : 0
  
  },
  
  ModalInsideView:{
  
    justifyContent: 'center',
    alignItems: 'center', 
    backgroundColor : "#00BCD4", 
    height: 300 ,
    width: '90%',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff'
  
  },
  
  TextStyle:{
  
    fontSize: 20, 
    marginBottom: 20, 
    color: "#fff",
    padding: 20,
    textAlign: 'center'
  
  }
  
  });