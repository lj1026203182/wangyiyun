import Request from '@/utils/request.js'

export const getBanner = data => {
	return Request({
		url: '/banner',
		data
	})
}

export const getCatList = data => {
	return Request({
		url: '/playlist/catlist',
		data
	})
}

export const getPersonalized = data => {
	return Request({
		url: '/personalized',
		data
	})
}

export const getTopAlbum = data => { // 新碟
	return Request({
		url: '/top/album',
		data
	})
}

export const getNewAlbum = data => { // 新专辑
	return Request({
		url: '/album/newest',
		data
	})
}
