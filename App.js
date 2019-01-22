import React, { Component } from 'react'
import configureStore from './src/store/configure'
import { Provider } from 'react-redux'
import RootAppWithNavigation from './src/RootAppWithNavigation'

export const store = configureStore()

export default class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Provider store={store}>
              <RootAppWithNavigation />
            </Provider>
        )
    }
}
