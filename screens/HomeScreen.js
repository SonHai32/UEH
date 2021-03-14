import React from 'react'


import {createStackNavigator} from '@react-navigation/stack'

const Stack = createStackNavigator()

import DashboardSceen from './DashboardSceen'
import ProfileScreen from './ProfileScreen'
import ScheduleScreen from './ScheduleScreen'
const HomeScreen  = () =>(
    <Stack.Navigator headerMode="none">
        <Stack.Screen component={DashboardSceen} name='Dashboard' />
        <Stack.Screen component={ProfileScreen} name='Profile' />
        <Stack.Screen component={ScheduleScreen} name='Schedule' />
    </Stack.Navigator>
)

export default HomeScreen