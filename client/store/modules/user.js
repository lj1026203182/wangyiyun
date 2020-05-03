const user = {
	state: {
		userInfo: {},
		hasLogin: false
	},
	mutations: {
		setLogin(state, payload) {
			const temp = {
				hasLogin: true,
				token: payload.token,
				profile: payload.profile
			}
			state.userInfo = Object.assign({}, state.userInfo, temp)
			uni.setStorageSync('userInfo', JSON.stringify(state.userInfo))
		},
		setLoginOut(state) {
			const temp = {
				hasLogin: false,
				token: '',
				profile: {}
			}
			state.userInfo = Object.assign({}, state.userInfo, temp)
			uni.removeStorageSync('userInfo')
		}
	},
	actions: {},
}

export default user
