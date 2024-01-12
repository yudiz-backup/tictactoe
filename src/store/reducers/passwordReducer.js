import {
	CHANGE_PASSWORD,
	CHANGE_PASSWORD_FAIL,
	CHANGE_PASSWORD_REQUEST,
	FORGOT_PASSWORD,
	FORGOT_PASSWORD_FAIL,
	FORGOT_PASSWORD_REQUEST,
	RESET_PASSWORD,
	RESET_PASSWORD_FAIL,
	RESET_PASSWORD_REQUEST,
} from '../constants/userConstants'

export const forgotPasswordReducer = (state = {}, action) => {
	switch (action.type) {
		case FORGOT_PASSWORD_REQUEST:
			return { loading: true }
		case FORGOT_PASSWORD:
			return { loading: false, forgotPasswordSuccess: action.payload }
		case FORGOT_PASSWORD_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}
export const resetPasswordReducer = (state = {}, action) => {
	switch (action.type) {
		case RESET_PASSWORD_REQUEST:
			return { loading: true }
		case RESET_PASSWORD:
			return { loading: false, resetPasswordSuccess: action.payload }
		case RESET_PASSWORD_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}
export const changePasswordReducer = (state = {}, action) => {
	switch (action.type) {
		case CHANGE_PASSWORD_REQUEST:
			return { loading: true }
		case CHANGE_PASSWORD:
			return { loading: false, changePasswordSuccess: action.payload }
		case CHANGE_PASSWORD_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}
