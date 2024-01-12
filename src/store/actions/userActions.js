import axios from 'axios'
import {
	USER_LOGOUT,
	USER_SIGNIN_FAIL,
	USER_SIGNIN_REQUEST,
	USER_SIGNIN_SUCCESS,
	USER_SIGNUP_FAIL,
	USER_SIGNUP_REQUEST,
	USER_SIGNUP_SUCCESS,
} from '../constants/userConstants'

export const signin = (email, password) => async (dispatch) => {
	try {
		dispatch({
			type: USER_SIGNIN_REQUEST,
		})

		const { data } = await axios.post(
			'https://tictactoe-yudiz-api.herokuapp.com/api/users/login',
			{
				sEmail: email,
				sPassword: password,
			}
		)

		dispatch({ type: USER_SIGNIN_SUCCESS, payload: data })

		localStorage.setItem('token', data.token)
	} catch (error) {
		dispatch({
			type: USER_SIGNIN_FAIL,
			payload: error,
		})
	}
}

export const signup =
	(firstName, lastName, email, username, mobileNumber, dob, gender, password) =>
	async (dispatch) => {
		try {
			dispatch({
				type: USER_SIGNUP_REQUEST,
			})

			const { data } = await axios.post(
				'https://tictactoe-yudiz-api.herokuapp.com/api/users/signup',
				{
					sFirstName: firstName,
					sLastName: lastName,
					sEmail: email,
					sUserName: username,
					nMobile: mobileNumber,
					sDateOfBirth: dob,
					sGender: gender,
					sPassword: password,
				}
			)

			dispatch({ type: USER_SIGNUP_SUCCESS, payload: data })

			localStorage.setItem('userInfo', JSON.stringify(data))
		} catch (error) {
			dispatch({
				type: USER_SIGNUP_FAIL,
				payload: error,
			})
		}
	}

export const logout = () => async (dispatch) => {
	localStorage.removeItem('token')

	dispatch({ type: USER_LOGOUT })
}
