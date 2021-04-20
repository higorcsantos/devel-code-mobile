import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SignUp from '../pages/SignUp';
import List from '../pages/List';
import Update from '../pages/Update'
import Main from '../pages/Main';
import { StyleSheet } from 'react-native';

const {Navigator,Screen} = createStackNavigator();
export default function Routes(){
    return(
        <NavigationContainer>
            <Navigator>
            <Screen
                name="Main"
                component={Main}/>
                <Screen
                name="SignUp"
                component={SignUp}/>
                <Screen
                name = "List"
                component={List}/>
                <Screen
                name = "Update"
                component={Update}/>
            </Navigator>
        </NavigationContainer>
    )
};

