import Request from '@/utils/request.js'

export const login = data => {
	return Request({
		url: '/login/cellphone',
		data
	})
}

export const loginOut = data => {
	return Request({
		url: '/logout',
		data
	})
}