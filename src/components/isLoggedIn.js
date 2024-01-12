export const logout = () => {
	localStorage.removeItem('token')
}

export const isLoggedIn = () => {
	if (localStorage.getItem('token')) {
		return true
	}
	return false
}
