<template>
	<view>
		<u-navbar back-icon-name="man-add" :border-bottom="false">
			<view class="slot-wrap">
				<u-tabs :list="navList" width="320rpx" :is-scroll="false" active-color="#ff2318" :current="currentNav" @change="onNavChange"></u-tabs>
			</view>
		</u-navbar>

		<!-- 滚动区域 -->
		<view class="page-content">
			<view class="date-bar u-flex">
				<view class="date-bar-left">
					云村热评墙 <u-icon name="arrow-right" size="26"></u-icon>
					<swiper class="date-bar-swiper" :autoplay="true" :duration="500" :circular="true" :vertical="true">
						<swiper-item v-for="(item, index) in dateMsg.msgList" :key="index"  @touchmove.stop>
							<view class="diandiandian">
								{{item.name}}
							</view>
						</swiper-item>
					</swiper>
				</view>
				<view>
					<view>{{dateMsg.curDate[1]}}.</view>
					<view class="date-bar-num">{{dateMsg.curDate[2]}}</view>
				</view>
			</view>

			<!-- 瀑布流 -->
			<u-waterfall :flowList="flowList">
				<template v-slot:left="{leftList}">
					<view class="water-wrapper" v-for="(item, index) in leftList" :key="index">
						<!-- 警告：微信小程序不支持嵌入lazyload组件，请自行如下使用image标签 -->
						<!-- #ifndef MP-WEIXIN -->
						<u-lazy-load threshold="-450" border-radius="10" :image="item.simpleResourceInfo.songCoverUrl" :index="index"></u-lazy-load>
						<!-- #endif -->
						<!-- #ifdef MP-WEIXIN -->
						<image class="water-img" :src="item.simpleResourceInfo.songCoverUrl" mode="widthFix"></image>
						<!-- #endif -->
						<view class="water-content">
							<view class="water-content-title diandiandian2">
								{{item.content}}
							</view>
							<view class="water-content-des u-flex">
								<image class="water-content-des_img" :src="item.simpleUserInfo.avatar" mode="widthFix"></image>
								<view class="water-content-des_name diandiandian">
									{{item.simpleUserInfo.nickname}}
								</view>
								<view class="water-content-des_like">
									{{item.likedCount}}
								</view>
							</view>
						</view>
					</view>
				</template>
				<template v-slot:right="{rightList}">
					<view class="water-wrapper" v-for="(item, index) in rightList" :key="index">
						<!-- #ifndef MP-WEIXIN -->
						<u-lazy-load threshold="-450" border-radius="10" :image="item.simpleResourceInfo.songCoverUrl" :index="index"></u-lazy-load>
						<!-- #endif -->
						<!-- #ifdef MP-WEIXIN -->
						<image class="water-img" :src="item.simpleResourceInfo.songCoverUrl" mode="widthFix"></image>
						<!-- #endif -->
						<view class="water-content">
							<view class="water-content-title diandiandian2">
								{{item.content}}
							</view>
							<view class="water-content-des u-flex">
								<image class="water-content-des_img" :src="item.simpleUserInfo.avatar" mode="widthFix"></image>
								<view class="water-content-des_name diandiandian">
									{{item.simpleUserInfo.nickname}}
								</view>
								<view class="water-content-des_like">
									{{item.likedCount}}
								</view>
							</view>
						</view>
					</view>
				</template>
			</u-waterfall>
		</view>


	</view>
</template>

<script>
	import { getCloudLit } from '@/api/cloud.js'
	export default {
		data() {
			return {
				navList: [{
					name: '广场'
				}, {
					name: '关注'
				}],
				currentNav: 0,
				dateMsg: {
					curDate: [],
					msgList: [
						{ name: '他是我见过最年少有为的人', id: '' },
						{ name: '因为一个人而失眠，这真的好吗', id: '' },
						{ name: '花开花落，没有悲愁怎么是少年？', id: '' },
					],
				},
				flowList: [],
				cloudList: []
			};
		},
		onLoad() {
			this.dateMsg.curDate = String(new Date()).split(' ')
			this.getCloudLit()
		},
		methods: {
			getCloudLit() {
				getCloudLit().then(res => {
					this.flowList = res.data
				})
			},
			onNavChange(index) {
				this.currentNav = index
			}
		}
	}
</script>

<style>
	Page {
		background-color: #f7f7f7;
	}
</style>
<style lang="scss">
	Page {
		background-color: #f7f7f7;
	}

	.slot-wrap {
		display: flex;
		align-items: center;
		width: 320rpx;
		margin: 0 auto;
	}

	.date-bar {
		width: 686rpx;
		height: 160rpx;
		padding: 20rpx 34rpx;
		margin: 20rpx auto;
		border-radius: 14rpx;
		color: #fff;
		background: rgba(0, 0, 0, .7);
		line-height: 70rpx;
		font-weight: 600;
		justify-content: space-between;

		.date-bar-left {
			font-size: 34rpx;
			font-weight: 600;
		}

		.date-bar-num {
			margin-top: -20rpx;
			font-size: 44rpx;
		}
	}

	.date-bar-swiper {
		width: 430rpx;
		height: 40rpx;
		line-height: 40rpx;
		color: #d0d2d3;
		font-size: 24rpx;
	}

	.water-wrapper {
		border-radius: 16rpx;
		margin: 16rpx;
		background-color: #FFFFFF;
		box-shadow: 0 0 4px 2px #eee;
		.water-img{
			width: 100%;
			border-radius: 16rpx;
		}
	}

	.water-content {
		padding: 20rpx;

		.water-content-title {
			font-size: 26rpx;
			color: #333333;
			line-height: 39rpx;
			height: 78rpx;
		}

		.water-content-des {
			font-size: 24rpx;
			color: #999;

			.water-content-des_img {
				width: 26rpx;
				height: 26rpx;
				border-radius: 50%;
				margin-right: 4rpx;
			}

			.water-content-des_name {
				max-width: 60%;
			}

			.water-content-des_like {
				flex: auto;
				white-space: nowrap;
				text-align: right;
			}
		}
	}
</style>
