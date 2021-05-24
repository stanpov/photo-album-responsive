import {combineReducers} from 'redux';
import authReducer from './authReducer';
import photoReducer from './photoReducer';





const rootReducer = combineReducers({
    user: authReducer,
    picture: photoReducer
})

export default rootReducer;