import * as React from 'react';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

//Pages
import HomeScreen from '../../Pages/Home/HomeScreen';
import NotificationScreen from '../../Pages/Notofication/NotificationScreen';
import Misc from '../../Pages/Other/Misc';

const Tab = createMaterialBottomTabNavigator();

export default class BottomNavigate extends React.Component  {
    render(){
        return (
            <NavigationContainer >
                
            <Tab.Navigator
              initialRouteName="Home"
              activeColor="#3e2465"
              inactiveColor="#694fad"
              barStyle={{ backgroundColor: 'white', elevation: 20 }}
            >
              <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                  tabBarLabel: 'Home',
                  tabBarIcon: ({ color }) => (
                    <AntDesign name="home" color={color} size={20} />
                  ),
                }}
              />
              <Tab.Screen
                name="Trending"
                component={Misc}
                options={{
                  tabBarLabel: 'Trending',
                  tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="trending-up" color={color} size={20} />
                  ),
                }}
              />
              <Tab.Screen
                name="CreatePost"
                component={Misc}
                options={{
                  tabBarLabel: 'Add Post',
                  tabBarIcon: ({ color }) => (
                    <MaterialIcons name="add-circle-outline" color={color} size={20} />
                  ),
                }}
              />
              <Tab.Screen
                name="Notification"
                component={NotificationScreen}
                options={{
                  tabBarLabel: 'Notification',
                  tabBarIcon: ({ color }) => (
                    <AntDesign name="notification" color={color} size={20} />
                    ),
                }}
              />
              <Tab.Screen
                name="Profile"
                component={Misc}
                options={{
                  tabBarLabel: 'Profile',
                  tabBarIcon: ({ color }) => (
                    <AntDesign name="user" color={color} size={20} />
                  ),
                }}
              />
            </Tab.Navigator>
          </NavigationContainer>
          );
    }
}
