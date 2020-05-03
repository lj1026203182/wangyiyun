import config from '@/config/index.js'

const requestList = {};

function addRequesKey(key) { //添加
	requestList[key] = true;
}

function removeRequestKey(key) { //删除
	delete requestList[key]
}

function hitRequestKey(key) { //查询
	return requestList[key]
}

const Request = ({ url, data, showLoading = true, method = "POST", resubmit = true, header = {} }) => {
	showLoading && uni.showLoading({ title: '加载中...', mask: true })
	uni.showNavigationBarLoading()
	return new Promise((resolve, reject) => {
		if (hitRequestKey(url) && resubmit) return;
		addRequesKey(url);

		uni.request({
			url: config.baseUrl + url,
			data: Object.assign({}, data),
			header: Object.assign({}, header),
			method: method,
			withCredentials: true,
			success: res => {
				if (res.data.code == 200) {
					resolve(res.data);
				} else {
					reject(res.data)
				}
			},
			fail: err => {
				console.log(err)
				uni.hideLoading()
				uni.showToast({
					title: err.msg || '请重试',
					icon: 'none'
				})
				reject()
			},
			complete: res => {
				removeRequestKey(url)
				uni.hideLoading()
				uni.hideNavigationBarLoading()
			}
		})
	})
}

export default Request
