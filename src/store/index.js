import {
	legacy_createStore as createStore,
	combineReducers,
	applyMiddleware,
} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userSigninReducer, userSignupReducer } from './reducers/userReducers'
import {
	editProfileReducer,
	userProfileReducer,
} from './reducers/profileReducer'
import {
	changePasswordReducer,
	forgotPasswordReducer,
	resetPasswordReducer,
} from './reducers/passwordReducer'

const reducer = combineReducers({
	userSignIn: userSigninReducer,
	userSignup: userSignupReducer,
	userProfile: userProfileReducer,
	forgotPassword: forgotPasswordReducer,
	resetPassword: resetPasswordReducer,
	changePassword: changePasswordReducer,
	editProfile: editProfileReducer,
})

const initialState = {
	// userSignin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
)

export default store
