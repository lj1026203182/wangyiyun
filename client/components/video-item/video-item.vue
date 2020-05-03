<template>
	<view v-show="i === index">
		<mescroll-uni ref="mescrollRef" @init="mescrollInit" height="100%" top="60" :down="downOption" @down="downCallback" :up="upOption" @up="upCallback" @emptyclick="emptyClick">
			<image style="width: 100%; height: 200rpx;" :src="item.data.coverUrl" v-for="item in goods"
			 :key="item.data.vid"></image>
		</mescroll-uni>
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import MescrollMoreItemMixin from "@/components/mescroll-uni/mixins/mescroll-more-item.js";
	import { getVideoGroup } from '@/api/video.js'
	export default {
		mixins: [MescrollMixin, MescrollMoreItemMixin],
		props:{
			tabs: Array // tab菜单,此处用于取关键词
		},
		data() {
			return {
				downOption:{
					auto:false // 不自动加载 (mixin已处理第一个tab触发downCallback)
				},
				upOption:{
					auto:false, // 不自动加载
					// page: {
					// 	num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
					// 	size: 10 // 每页数据的数量
					// },
					noMoreSize: 4, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
					empty:{
						tip: '~ 空空如也 ~', // 提示
						btnText: '去看看'
					}
				},
				goods: [] //列表数据
			};
		},
		methods: {
			/*下拉刷新的回调 */
			downCallback() {
				// 这里加载你想下拉刷新的数据, 比如刷新轮播数据
				// loadSwiper();
				// 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
				this.mescroll.resetUpScroll()
			},
			upCallback(page) {
				console.log(page)
				getVideoGroup({ id: this.tabs[this.i].id }).then(res => {
					//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
					this.mescroll.endSuccess(res.length);
					//设置列表数据
					this.goods = res.datas; //如果是第一页需手动制空列表
					console.log(this.goods)
				}).catch(() => {
					//联网失败, 结束加载
					this.mescroll.endErr();
				})
			},
			//点击空布局按钮的回调
			emptyClick() {
				uni.showToast({
					title: '点击了按钮,具体逻辑自行实现'
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
