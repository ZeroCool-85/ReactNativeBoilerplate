/* eslint-disable no-unused-vars */
import React from 'react'
import { createSwitchNavigator } from 'react-navigation'
import { InitialScreen } from 'screens'

const RootNavigation = createSwitchNavigator(
    {
        ExampleScreen: InitialScreen,
    },
    {
        initialRouteName: 'ExampleScreen',
    }
)

export default RootNavigation
