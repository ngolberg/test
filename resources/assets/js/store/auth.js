export default {
	state: {
		api_token: null,
		user_id: null,
		role: 0,
		admin: false
	},
	initialize() {
		this.state.api_token = localStorage.getItem('api_token')
		this.state.user_id = parseInt(localStorage.getItem('user_id'))
    this.state.role = parseInt(localStorage.getItem('role'))
		if (this.state.role==2) this.state.admin = true
			else this.state.admin = false
	},
	set(api_token, user_id, role) {
		localStorage.setItem('api_token', api_token)
		localStorage.setItem('user_id', user_id)
    localStorage.setItem('role', role)
		this.initialize()
	},
	remove() {
		localStorage.removeItem('api_token')
		localStorage.removeItem('user_id')
    localStorage.removeItem('role')
		this.initialize()
	}
}
