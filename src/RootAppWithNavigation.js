import React from 'react'
import { connect } from 'react-redux'
import { reduxifyNavigator } from 'react-navigation-redux-helpers'
import RootNavigation from './navigation/rootNavigator'

const RootApp = reduxifyNavigator(RootNavigation, 'root')

const mapStateToProps = state => ({
    state: state.nav,
})

export default connect(mapStateToProps)(RootApp)
