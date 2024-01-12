import axios from 'axios'
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

export const forgotPassword = (email) => async (dispatch) => {
	try {
		dispatch({
			type: FORGOT_PASSWORD_REQUEST,
		})

		const { data } = await axios.post(
			'https://tictactoe-yudiz-api.herokuapp.com/api/users/forgotPassword',
			{
				sEmail: email,
			}
		)

		dispatch({ type: FORGOT_PASSWORD, payload: data })
	} catch (error) {
		dispatch({
			type: FORGOT_PASSWORD_FAIL,
			payload: error,
		})
	}
}
export const resetPassword = (token, password) => async (dispatch) => {
	try {
		dispatch({
			type: RESET_PASSWORD_REQUEST,
		})

		const { data } = await axios.post(
			`https://tictactoe-yudiz-api.herokuapp.com/api/users/resetPassword?token=${token}`,
			{
				sNewPassword: password,
			}
		)

		dispatch({ type: RESET_PASSWORD, payload: data })
	} catch (error) {
		dispatch({
			type: RESET_PASSWORD_FAIL,
			payload: error,
		})
	}
}

export const changePassword =
	(currentPassword, newPassword, token) => async (dispatch) => {
		try {
			dispatch({
				type: CHANGE_PASSWORD_REQUEST,
			})

			const headers = {
				Authorization: token,
			}
			const { data } = await axios.put(
				'https://tictactoe-yudiz-api.herokuapp.com/api/users/changePassword',
				{
					sCurrentPassword: currentPassword,
					sNewPassword: newPassword,
				},
				{ headers }
			)

			dispatch({ type: CHANGE_PASSWORD, payload: data })
		} catch (error) {
			dispatch({
				type: CHANGE_PASSWORD_FAIL,
				payload: error,
			})
		}
	}
