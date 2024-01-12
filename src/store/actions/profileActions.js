import axios from 'axios'
import {
	EDIT_PROFILE,
	EDIT_PROFILE_FAIL,
	EDIT_PROFILE_REQUEST,
	SET_PROFILE,
	SET_PROFILE_FAIL,
	SET_PROFILE_REQUEST,
} from '../constants/userConstants'

export const setProfile = (token) => async (dispatch) => {
	try {
		dispatch({
			type: SET_PROFILE_REQUEST,
		})

		const { data } = await axios.get(
			'https://tictactoe-yudiz-api.herokuapp.com/api/users/profile',
			{
				headers: {
					Authorization: token,
				},
			}
		)

		dispatch({ type: SET_PROFILE, payload: data })
	} catch (error) {
		dispatch({
			type: SET_PROFILE_FAIL,
			payload: error,
		})
	}
}
export const editProfile =
	(firstName, lastName, username, mobileNumber, dob, gender, token) =>
	async (dispatch) => {
		try {
			dispatch({
				type: EDIT_PROFILE_REQUEST,
			})
			const headers = {
				Authorization: token,
			}
			const { data } = await axios.put(
				'https://tictactoe-yudiz-api.herokuapp.com/api/users/editprofile',
				{
					sFirstName: firstName,
					sLastName: lastName,
					sUserName: username,
					nMobile: mobileNumber,
					sDateOfBirth: dob,
					sGender: gender,
				},
				{ headers }
			)

			dispatch({ type: EDIT_PROFILE, payload: data })
		} catch (error) {
			dispatch({
				type: EDIT_PROFILE_FAIL,
				payload: error,
			})
		}
	}
