<template>
	<view>
		<u-navbar back-icon-name="scan" :border-bottom="false">
		</u-navbar>
		<scroll-view scroll-y="true" class="page-content" :scroll-top="scrollTop">
			<view v-if="!userInfo.hasLogin" class="empty-user">
				<view>登录网易云音乐</view>
				<view>手机电脑多端同步，尽享海量高品质音乐</view>
				<navigator class="btn" url="/pages/login/login">
					立即登录
				</navigator>
			</view>
			<template v-if="userInfo.hasLogin">
				<view class="userinfo-box u-flex u-align-between">
					<view class="avator">
						<image v-if="userInfo.profile.avatarUrl" class="img" :src="userInfo.profile.avatarUrl"></image>
						<view v-else class="no-img">
							上传头像
						</view>
					</view>
					<view class="u-flex u-flex-1 u-align-between">
						<view class="u-flex">
							<view class="name">{{userInfo.profile.nickname}}</view>
							<view class="level">lv1</view>
						</view>
						<image class="sign" src="/static/account/a_03.png"></image>
					</view>
				</view>
				<view class="nav-bar u-flex ">
					<view class="u-flex-1">
						0
						<view class="txt">动态</view>
					</view>
					<view class="u-flex-1">
						0
						<view class="txt">关注</view>
					</view>
					<view class="u-flex-1">
						0
						<view class="txt">粉丝</view>
					</view>
					<view class="u-flex-1">
						0
						<view class="txt">编辑资料</view>
					</view>
				</view>
			</template>
			<view class="ad-bar" :class="{bgf: !userInfo.hasLogin}">
				<image class="img" src="/static/account/a_07.png"></image>
			</view>
			<view class="mall-bar u-flex u-align-around">
				<view class="flex-item u-flex u-flex-col">
					<image class="icon" src="/static/account/a_m1.png"></image>
					消息
				</view>
				<view class="flex-item">
					<image class="icon" src="/static/account/a_m2.png"></image>
					商城
					<view class="txt">现实29包邮</view>
				</view>
				<view class="flex-item">
					<image class="icon" src="/static/account/a_m3.png"></image>
					演出
					<view class="txt">天鹅湖</view>
				</view>
				<view class="flex-item">
					<image class="icon" src="/static/account/a_m4.png"></image>
					个性换肤
				</view>
			</view>

			<view v-if="userInfo.hasLogin" class="logout" @click="confirmOut">
				退出登录
			</view>
		</scroll-view>

		<u-modal v-model="showLoginOut" content="确定退出当前账号吗？" ref="loginOut"></u-modal>
	</view>
</template>

<script>
	import {  mapMutations } from 'vuex';
	import { loginOut } from '@/api/login.js'
	export default {
		data() {
			return {
				scrollTop: 0,
				isShowScan: false,
				showLoginOut: false,
			};
		},
		computed: {
			userInfo() {
				return this.$store.state.user.userInfo
			}
		},
		methods: {
			...mapMutations(['setLoginOut']),
			confirmOut() {
				this.showLoginOut = true
				this.$refs.loginOut.modalAction({
					confirm: res => {
						loginOut().then(res => {
							this.setLoginOut()
							uni.navigateTo({
								url: '/pages/login/login'
							})
						})
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.scan-box {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, .8);
		transform: translateX(100%);
		transition: transform 0.05s;

		&.active {
			transform: translateX(0)
		}
	}

	.tac {
		flex: 1;
		text-align: center;
	}

	.top-img {
		width: 50rpx;
		height: 40rpx;

		&.left {
			margin-left: 10rpx;
		}
	}


	.mt16 {
		margin-top: 16rpx;
	}

	.bgf {
		background: #fff;
	}

	.empty-user {
		background: #fff;
		padding-top: 40rpx;
		text-align: center;
		line-height: 50rpx;

		.btn {
			width: 710rpx;
			height: 80rpx;
			margin: 22rpx auto 0;
			text-align: center;
			line-height: 80rpx;
			border: 2rpx solid #cdcdcd;
			border-radius: 80rpx;
			font-size: 32rpx;
		}
	}

	.userinfo-box {
		padding-top: 46rpx;

		.avator {
			width: 120rpx;
			height: 120rpx;
			margin: 0 32rpx;
			border-radius: 120rpx;
			color: #fff;
			background: #d6d8da;
			overflow: hidden;
		}

		.img {
			width: 100%;
			height: 100%;
		}

		.name {
			color: #302f30;
			line-height: 68rpx;
			font-weight: 600;
		}

		.sign {
			width: 128rpx;
			height: 52rpx;
			margin-top: 16rpx;
			margin-right: 32rpx;
			border-radius: 52rpx;
		}

		.level {
			width: 100rpx;
			height: 50rpx;
			text-align: center;
			line-height: 50rpx;
			border-radius: 50rpx;
			color: #838080;
			background: #d7d3d4;
			transform: scale(0.8);
		}
	}

	.nav-bar {
		margin-top: 38rpx;
		text-align: center;
		font-weight: 600;

		.flex-item {
			height: 100%;
			border-right: 1rpx solid #cdcacb;

			&:last-child {
				border: 0;
			}
		}

		.txt {
			color: #939293;
			font-weight: 400;
		}
	}

	.ad-bar {
		padding-top: 32rpx;

		.img {
			display: block;
			width: 686rpx;
			height: 120rpx;
			margin: 0 auto;
		}
	}

	.mall-bar {
		height: 200rpx;
		padding: 40rpx 0 20rpx;
		text-align: center;
		font-weight: 600;
		font-size: 26rpx;
		background: #fff;
		line-height: 35rpx;

		.flex-item {
			height: 100%;
		}

		.icon {
			display: block;
			width: 48rpx;
			height: 48rpx;
			margin: 0 auto 24rpx;
		}

		.txt {
			color: #999;
			font-weight: 400;
			font-size: 24rpx;
			transform: scale(0.84);
		}
	}

	.line-item {

		.icon {
			float: left;
			width: 35rpx;
			height: 32rpx;
			margin-top: 30rpx;
			margin-right: 36rpx;
		}
	}

	.logout {
		height: 100rpx;
		margin-top: 16rpx;
		text-align: center;
		line-height: 100rpx;
		color: #000000;
		background: #fff;
	}
</style>
