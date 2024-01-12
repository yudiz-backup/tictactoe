import {
	EDIT_PROFILE,
	EDIT_PROFILE_FAIL,
	EDIT_PROFILE_REQUEST,
	SET_PROFILE,
	SET_PROFILE_FAIL,
	SET_PROFILE_REQUEST,
} from '../constants/userConstants'

export const userProfileReducer = (state = {}, action) => {
	switch (action.type) {
		case SET_PROFILE_REQUEST:
			return { loading: true }
		case SET_PROFILE:
			return { loading: false, userInfo: action.payload }
		case SET_PROFILE_FAIL:
			return { loading: false, error: action.payload }

		default:
			return state
	}
}
export const editProfileReducer = (state = {}, action) => {
	switch (action.type) {
		case EDIT_PROFILE_REQUEST:
			return { editLoading: true }

		case EDIT_PROFILE:
			return { editProfileInfo: action.payload }

		case EDIT_PROFILE_FAIL:
			return { error: action.payload }

		default:
			return state
	}
}
