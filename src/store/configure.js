import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers'
import rootReducer from './reducer'
//import applyAppStateListener from 'redux-enhancer-react-native-appstate'
//import createSagaMiddleware from 'redux-saga'
//import rootSaga from './sagas'

const loggerMiddleware = createLogger({
    collapsed: true,
    duration: true,
})

const navigationMiddleware = createReactNavigationReduxMiddleware(
    'root',
    state => state.nav
)

const configureStore = (initialState, services = {}) => {
    //const sagaMiddleware = createSagaMiddleware()
    //const appStateMiddleware = applyAppStateListener()
    const middleware = [navigationMiddleware, loggerMiddleware]
    const store = createStore(
        rootReducer,
        initialState,
        compose(
            //appStateMiddleware,
            applyMiddleware(...middleware)
        )
    )

    //sagaMiddleware.run(rootSaga, services)

    return store
}

export default configureStore
