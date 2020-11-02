import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, ToastAndroid, Platform, RefreshControl, View, Text, Alert } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Item, Input } from 'native-base';
import { Avatar,  Image } from 'react-native-elements';
import { ActivityIndicator, Dimensions } from 'react-native';
import { Divider } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { TouchableHighlight, TouchableNativeFeedback, FlatList } from 'react-native-gesture-handler';
import Feeds from '../../Demo/Home.json';
import Moment from 'moment';
import ImageView from "react-native-image-viewing";
import PostGrid from '../../Components/PostGridImageView/PostGrid';
import { Video } from 'expo-av';
import { MaterialIcons, Octicons } from '@expo/vector-icons';
import InViewport from '../../Components/ViewPort/ViewPort';

var {width, height} = Dimensions.get('window');


export default class HomeScreen extends Component {

    constructor(props){
      super(props);
      this.state = { refreshing: false };
      Moment.locale('en');
      this.state={
        visible : false,
        setIsVisible : false,
      };
    }
    
    handlePlayAndPause = () => {  
      this.setState((prevState) => ({
         shouldPlay: !prevState.shouldPlay  
      }));
    }
    
    handleVolume = () => {
      this.setState(prevState => ({
        mute: !prevState.mute,  
      }));
    }

    searchPage = () => {
      ToastAndroid.show("initial", ToastAndroid.SHORT)
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
      <Container>
        <FlatList 
          style={{ height: 'auto' }}
            data={Feeds}
            renderItem={({ item, index }) =>
              <FeedItem feed={item} keyIndex={index} />
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
    )
  }
}



class FeedItem extends React.Component{

  state = {
    mute: false,
    shouldPlay: false,
    isVisible: false,
  }
	
  handlePlayAndPause = () => {  
    this.setState((prevState) => ({
       shouldPlay: !prevState.shouldPlay,
    }));
  }

  pauseVideo = () => {
    if(this.video) {
      this.video.pauseAsync();

    }
  }

  playVideo = () => {
    if(this.video) {
      this.video.playAsync();

    }
  }

  handlePlaying = (isVisible) => {
    isVisible ? this.playVideo() : this.pauseVideo();
  }
  
  handleVolume = () => {
    this.setState(prevState => ({
      mute: !prevState.mute,  
    }));
  }

  render(){
    return (
      <View style={{paddingTop: 10 ,elevation: 1, width: width  ,flex: 1, flexDirection: 'column', backgroundColor: 'white' }} >
          <View style={{ height: 90, flex: 1 }}>
            <Container style={{ display: 'flex', flexDirection: 'row', justifyContent :'flex-start', paddingTop:20, paddingLeft: 15, paddingRight: 15}}>
                <View style={{ }}>
                    <Avatar
                        rounded
                        size='medium'
                        source={{
                            uri:
                            this.props.feed.userId.profileImage,
                        }}
                    />
                </View>
                <View style={{  marginLeft: 20 }}>
                    <Text style={{  textAlign: 'justify', fontWeight: 'bold', color: '#08070D'}} numberOfLines={1}>
                        {this.props.feed.userId.first_name}
                    </Text>
                    <Text style={{  textAlign: 'justify', fontSize: 12}} numberOfLines={1}>
                        {this.props.feed.userId.tagline}
                    </Text>
                    <Text style={{  textAlign: 'justify', fontSize: 12, color: 'grey'}} numberOfLines={1}>
                        {Moment(this.props.feed.published_at).fromNow()}
                    </Text>
                </View>
            </Container>
          </View>

        {/* Validation if the post has description */}
        {this.props.feed.post_descripltion!==""
        ?
        <TouchableOpacity onPress={()=> 
          ToastAndroid.show(this.props.feed.title, ToastAndroid.LONG)
          }
          >
            <View style={{ height: 'auto',}}>
              <Container style={{ display: 'flex', height: 'auto' ,flexDirection: 'row', justifyContent :'flex-start', paddingTop:0, paddingLeft: 10, paddingRight:10}}>
                  <View style={{  marginLeft: 10 }}>
                      <Text style={{  textAlign: 'auto', fontSize: 13,}}   numberOfLines={4}>
                          {this.props.feed.post_descripltion} 
                      </Text>
                      {this.props.feed.post_descripltion!=""?
                      <Text  style={{ color: 'blue' }}>View More</Text>
                      :
                      <Text></Text>
                      }
                  </View>
              </Container>
            </View>
          </TouchableOpacity>
        :
        <View style={{ height: 0 }}>

        </View>
        }
        {/* Validation if the post has image */}
        {this.props.feed.image_post === 'true'
        ?
        <View style={{ height: 300, flex: 1, justifyContent: "center" }}>
          <PostGrid imageUri={this.props.feed}/>
        </View>
        :
        <View></View>
        }
        {/* Validation if the post is of Video type */}
        {this.props.feed.video_post === 'true'?
          <TouchableOpacity style={{ height: 300, flex: 1, justifyContent: "center" }} onPress={()=>{
            
          }} >
            <View style={{ height: 300, flex: 1, justifyContent: "center" }}>
              <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                <View style={{}}>
                      <Video
                        ref={ref => {this.video = ref}}
                        source={{ uri: this.props.feed.video_url }}
                        rate={1.0}
                        volume={1.0}
                        isMuted={true}
                        resizeMode="cover"
                        shouldPlay={this.state.shouldPlay}
                        isLooping
                        usePoster
                        style={{ width: width, height: 290 }}
                      />
                    {/* {this.state.isVisible
                    ? */}
                    <View>
                    </View>
                    {/* : */}
                    <View style={styles.controlBar}>
                    <MaterialIcons 
                      name={this.state.shouldPlay ? "pause" : "play-arrow"} 
                      size={45} 
                      color="white" 
                      onPress={this.handlePlayAndPause} 
                                  />
                  </View>
                    {/* } */}
                  </View>
                  {/* <ActivityIndicator size={"large"} color={"red"} style={{position:"absolute"}}/> 
                  <Text style={{position:"absolute",color:"red",bottom:"45%"}} > Loading </Text> */}
              </View>
            </View>
          </TouchableOpacity>
        :
        <View></View>
        }
        {/* Like and Comment Count */}
        <View style={{ height: 50, flexDirection: 'row', flex: 1 , backgroundColor: 'white', justifyContent: 'space-around', paddingLeft: 15, paddingTop: 10}}>
          {/* Like count */}
          <View style={{ width: 50 , flex: 1, flexDirection: 'row'}}>
            <View style={{ height: 17, width: 17, borderRadius: 1000, backgroundColor: '#0E76A8', justifyContent: 'center',  alignContent: 'center' }}>
              <MaterialCommunityIcons name="thumb-up"  style={{ justifyContent: 'center',alignSelf: 'center', color: 'white' }}/>
            </View>
            <View style={{ paddingLeft: 10 }}>
              <Text>{this.props.feed.likeCount} Likes</Text>
            </View>
          </View>
          {/* Comment count */}
          <View style={{ width: 50 , flex: 1, flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 15}}>
              <View style={{ height: 17, width: 16, justifyContent: 'center',  alignContent: 'center' }}>
                <MaterialCommunityIcons name="comment-text-multiple-outline"  style={{ justifyContent: 'center',alignSelf: 'center', }}/>
              </View>
              <View style={{ paddingLeft: 5 }}>
                <Text style={{ justifyContent: 'center' }} >{this.props.feed.likeCount} Comments</Text>
              </View>
          </View>
        </View>
        <View
          style={{
            borderBottomColor: '#D3D3D3',
            borderBottomWidth: 2.3,
            marginLeft: 30,
            marginRight: 30
          }}
        />  
        {/* Buttons view */}
        <View style={{ height: 60, flexDirection: 'row', flex:1, backgroundColor: 'white', justifyContent: 'space-around' ,paddingLeft: 15, paddingTop: 15 }}>
          {/* Like Button */}
          <TouchableOpacity style={{ width: 50 , flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
          <View style={{ width: 50 , flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
                <View >
                  <AntDesign name="like2"  style={{ justifyContent: 'center',alignSelf: 'center', paddingLeft: 7 ,}} size={15} />
                </View>
                <View style={{ paddingLeft: 10, justifyContent: 'center', alignSelf: 'center', paddingTop: 7 }}>
                  <Text>Like</Text>
                </View>
          </View>
          </TouchableOpacity>
          {/* Comment Button */}
          <TouchableOpacity style={{ width: 50 , flex: 1, flexDirection: 'row', justifyContent: 'center' }}>

          <View style={{ width: 50 , flex: 1, flexDirection: 'column',  justifyContent: 'center'}}>
              <View >
                <MaterialCommunityIcons name="comment-plus-outline"  style={{ justifyContent: 'center',alignSelf: 'center', paddingLeft: 7 }} size={15}/>
              </View>
              <View style={{ paddingLeft: 10, justifyContent: 'center', alignSelf: 'center', paddingTop: 7 }}>
                <Text > Comment</Text>
              </View>
          </View>
          </TouchableOpacity>

          {/* Share Button */}
          <TouchableOpacity style={{ width: 50 , flex: 1, flexDirection: 'row', justifyContent: 'center' }}>

          <View style={{ width: 50 , flex: 1, flexDirection: 'column',  justifyContent: 'center'}}>

              <View >
                <AntDesign name="sharealt"  style={{ justifyContent: 'center',alignSelf: 'center', paddingLeft: 7 }} size={15}/>
              </View>
              <View style={{ paddingLeft: 10 , alignSelf: 'center', paddingTop: 7}}>
                <Text>Share</Text>
              </View>
          </View>
          </TouchableOpacity>

           {/* Send Button */}
          <TouchableOpacity style={{ width: 50 , flex: 1, flexDirection: 'row', justifyContent: 'center' }}>

          <View style={{ width: 50 , flex: 1, flexDirection: 'column',  justifyContent: 'center'}}>

              <View >
                <MaterialCommunityIcons name="send"  style={{ justifyContent: 'center',alignSelf: 'center' , paddingLeft: 7}} size={15}/>
              </View>
              <View style={{ paddingLeft: 10 , alignSelf: 'center', paddingTop: 7}}>
                <Text>Send</Text>
              </View>

          </View>
          </TouchableOpacity>

        </View>
        <View
          style={{
            borderBottomColor: '#D3D3D3',
            borderBottomWidth: 2.3,
            marginTop: 25
          }}
        />  
      </View>
  )
  }
}




const styles = StyleSheet.create({

    textColor: {
        color: 'black'
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    controlBar: {
      position: 'absolute',
      top: '50%',
      height: 45,
      flexDirection: 'column',
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    }
});