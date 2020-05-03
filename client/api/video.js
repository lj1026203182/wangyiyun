import Request from '@/utils/request.js'
import store from '@/store/index.js'

export const getVideoNav = data => {
	return Request({
		url: '/video/group/list',
		data
	})
}

export const getVideoGroup = data => {
	return Request({
		url: '/video/group',
		data,
		resubmit: false
	})
}
