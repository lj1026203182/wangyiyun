<template>
	<view>
		<u-navbar back-icon-name="play-circle" title="" :border-bottom="false">
			<view class="slot-wrap">
				<u-search placeholder="日照香炉生紫烟" :show-action="false" :disabled="true"></u-search>
			</view>
		</u-navbar>
		<u-tabs-swiper ref="uTabs" :current="tabIndex" :list="navList" active-color="#ff2318" @change="tabsChange"></u-tabs-swiper>
		<swiper class="swiper" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
			<swiper-item class="swiper-item" v-for="(item, index) in navList" :key="index">
				<scroll-view class="scroll-view" scroll-y @scrolltolower="onreachBottom" v-if="item.list.length>0">
						<view class="item-wrapper" v-for="(imgItem,imgIndex) in item.list" :key="imgItem.data.vid">
							<image class="item-wrapper_img" :src="imgItem.data.coverUrl" mode="widthFix"></image>
							<view class="item-wrapper-content u-flex u-flex-nowrap u-align-between">
								<view class="item-wrapper-content_title diandiandian">
									{{imgItem.data.title}}
								</view>
								<image class="item-wrapper-content_img" :src="imgItem.data.creator.avatarUrl" mode="widthFix"></image>
							</view>
						</view>
				</scroll-view>
				<u-empty v-else text="所谓伊人，在水一方" mode="list"></u-empty>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import { getVideoNav, getVideoGroup } from '@/api/video.js'
	export default {
		data() {
			return {
				height: "400px",
				tabIndex: 1,
				swiperCurrent: 1,
				navList: [
					{ name: '推荐', id: 34571, list: [] }
				],
				relatedVideo: []
			};
		},
		onLoad() {
			this.getNavList()
		},
		methods: {
			getNavList() {
				getVideoNav().then(res => {
					res.data.length = 10
					res.data.forEach(item => {
						item.list = []
					})
					this.navList = res.data
					return this.setVideoList()
				}).catch(err => {
					this.$u.toast(err.msg || '请重试')
				})
			},
			setVideoList() {
				return new Promise((resolve, reject) => {
					getVideoGroup({ id: this.navList[this.tabIndex].id }).then(res => {
						this.navList[this.tabIndex].list = res.datas
						resolve(res)
					}).catch(err => {
						reject(err)
					})
				})
			},
			// tabs通知swiper切换
			tabsChange(index) {
				this.swiperCurrent = index;
			},
			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				let { dx } = e.detail;
				this.$refs.uTabs.setDx(dx);
			},
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinish(e) {
				let { current } = e.detail;
				this.$refs.uTabs.setFinishCurrent(current);
				this.tabIndex = current;
				this.current = current;
				this.setVideoList()
			},
			// scroll-view到底部加载更多
			onreachBottom() {

			}
		}
	}
</script>

<style lang="scss">
	Page {
		height: 100vh;
		overflow: hidden;
	}

	.slot-wrap {
		display: flex;
		align-items: center;
		flex: 1;
	}

	.swiper {
		width: 100%;
		height: calc(100vh - 0rpx);
	}

	.swiper-item {
		width: 100%;
		height: 100%;
	}

	.scroll-view {
		width: 100%;
		height: 100%;
	}

	.item-wrapper {
		width: 100%;
		padding: 20rpx 32rpx;

		&_img {
			width: 100%;
			height: 300rpx;
			border-radius: 20rpx;
		}

		.item-wrapper-content {
			height: 60rpx;
			color: #333333;
			font-size: 32rpx;
			font-weight: bold;

			&_img {
				width: 50rpx;
				height: 50rpx;
				border-radius: 50%;
			}
		}
	}
</style>
