import Request from '@/utils/request.js'

export const getCloudLit = data => {
	return Request({
		url: '/comment/hotwall/list',
		data
	})
}