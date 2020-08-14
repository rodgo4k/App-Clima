import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import EntypoIcons from 'react-native-vector-icons/Entypo';

import FirstScreen from './Screens/First';
import HomeScreen from './Screens/Home';
import LastScreen from './Screens/Last';
import ClimaButton from './components/Button';

const Tab = createBottomTabNavigator();

export default function Navigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="Home"
                tabBarOptions={{
                    style: {
                        backgroundColor: '#131418',
                        borderTopColor: 'rgba(255, 255, 255, 0.3)',
                    },
                    activeTintColor: '#fff',
                }}
            >
                <Tab.Screen name="First" component={FirstScreen}
                            options={{
                                title: 'Info',
                                tabBarIcon: ({ size, color }) => (
                                    <EntypoIcons name="dots-three-horizontal" size={size} color={color} />
                                ),
                            }}
                />
                <Tab.Screen name="Home" component={HomeScreen}
                            options={{
                                title: '',
                                tabBarIcon: ({ size, color, focused }) => (
                                    <ClimaButton focused={focused}  />
                                ),
                            }}
                />
                <Tab.Screen name="Last" component={LastScreen}
                            options={{
                                title: 'Dev',
                                tabBarIcon: ({ size, color }) => (
                                    <EntypoIcons name="user" size={size} color={color} />
                                ),
                            }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
