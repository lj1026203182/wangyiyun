<script>
	import { ToastThenLoading } from 'utils/utils.js'
	import { mapMutations } from 'vuex';
	export default {
		onLaunch: function() {
			console.log('App Launch')
			ToastThenLoading()
			const userInfo = uni.getStorageSync('userInfo')
			userInfo && this.setLogin(JSON.parse(userInfo))
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			...mapMutations(['setLogin', 'setLoginOut'])
		}
	}
</script>

<style lang="scss">
	@import "@/uview/index.scss";
	@import "@/common/css/common.scss"
</style>
