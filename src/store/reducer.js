import { combineReducers } from 'redux'
//import { reducer as formReducer } from 'redux-form'
import { createNavigationReducer } from 'react-navigation-redux-helpers'
import RootNavigator from '../navigation/rootNavigator'

const nav = createNavigationReducer(RootNavigator)

const appReducer = combineReducers({
    nav
})

/**
 * Do some extra on every reducer actions (maybe clear store on logout action)
 * @param state
 * @param action
 * @return {any}
 */
const rootReducer = (state, action) => {
    return appReducer(state, action)
}

export default rootReducer
