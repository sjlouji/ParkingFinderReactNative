import React, { Component } from 'react';
import { Text,StyleSheet, TouchableOpacity, ToastAndroid, Platform, AlertIOS, RefreshControl, Alert } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Item, Input, View } from 'native-base';
import Notifications from '../../Demo/Notification.json';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-elements';
import { not } from 'react-native-reanimated';
import { ActivityIndicator, Dimensions } from 'react-native';


var {width, height} = Dimensions.get('window');

export default class NotificationScreen extends Component {

    constructor(props){
        super(props);
        this.state = { refreshing: false };
    }

    onRefresh() {
        console.log('make ur api call');
      }

      renderSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              width: "86%",
              backgroundColor: "#CED0CE",
              marginLeft: "14%"
            }}
          />
        );
      };

  render() {
    return (
      <Container style={{height: 0 }}>
          <FlatList 
          style={{ height: 0 }}
            data={Notifications}
            renderItem={({ item, index }) =>
                <NotificationItem notify={item} />
            }
            refreshControl={
                <RefreshControl
                  //refresh control used for the Pull to Refresh
                  refreshing={this.state.refreshing}
                  onRefresh={this.onRefresh.bind(this)}
                />
              }
          />
      </Container>
    );
  }
}

const NotificationItem = ({notify}) => {
    return (
        <TouchableOpacity onPress={()=> 
            ToastAndroid.show(notify.title, ToastAndroid.LONG)
        }>
        <View style={{paddingTop: 10, paddingRight: 60 ,elevation: 1, width: width,  height: 80}}>
            <Container style={{ display: 'flex', flexDirection: 'row', justifyContent :'flex-start', paddingTop:20, paddingLeft: 15, paddingRight: 15}}>
                <View style={{ }}>
                    <Avatar
                        rounded
                        size='medium'
                        source={{
                            uri:
                            notify.avatar,
                        }}
                    />
                </View>
                <View style={{  marginLeft: 20 }}>
                    <Text style={{  textAlign: 'justify', fontWeight: 'bold', color: '#696969'}} numberOfLines={1}>
                        {notify.notiName}
                    </Text>
                    <Text style={{  textAlign: 'justify'}} numberOfLines={1}>
                        {notify.title}
                    </Text>
                </View>
            </Container>
        </View>
        </TouchableOpacity>
    )
  }
