let BASE_URL = process.env.NODE_ENV == 'development' ? 'http://192.168.31.173:3000' : 'https://www.gzamon.wang'

const config = {
	baseUrl: BASE_URL,
	appId: 'wx196166336f29c92e',
	appKey: '675aeecfdac05b6b82b9910a8fd00e88',
	loading: '@/static/loading.gif'
}

export default config
