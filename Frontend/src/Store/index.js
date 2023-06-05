
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { tabReducer } from '../reducers/tabReducer';
import { userRegisterReducer, userSigninReducer } from '../reducers/userReducer';

const initialState = {
    userSignin:{
        userInfo:localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null,
    }
};
const reducer = combineReducers({
    currentTab: tabReducer,
    userRegister: userRegisterReducer,
    userSignIn: userSigninReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer,initialState,composeEnhancer(applyMiddleware(thunk)));

export default store;