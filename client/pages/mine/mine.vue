<template>
	<view>
		<u-navbar back-icon-name="reload" title="我的音乐" :border-bottom="false"></u-navbar>
		<!-- #ifdef APP-PLUS || MP-WEIXIN -->
		<scroll-view scroll-y="true" class="page-content">
			<!-- #endif -->
			<scroll-view class="nav-list scroll-view" scroll-x :show-scrollbar="false">
				<view class="item" v-for="(item, index) in navList" :key="index" @click="goUrl(item.id, index)">
					<image class="img" :src="'/static/mine/' + item.imd + '.png'"></image>
					<view class="desc">{{ item.name }}</view>
				</view>
			</scroll-view>
			<navigator class="line-item" hover-class="none" url="">
				<image class="icon" src="/static/mine/m_15.png" mode="widthFix"></image>
				<view class="con">
					<text class="lab">本地音乐</text>
				</view>
			</navigator>
			<navigator class="line-item" hover-class="none" url="">
				<image class="icon" src="/static/mine/m_17.png" mode="widthFix"></image>
				<view class="con">
					<text class="lab">最近播放</text>
				</view>
			</navigator>
			<navigator class="line-item" hover-class="none" url="">
				<image class="icon" src="/static/mine/m_19.png" mode="widthFix"></image>
				<view class="con">
					<text class="lab">我的电台</text>
				</view>
			</navigator>
			<navigator class="line-item" hover-class="none" url="">
				<image class="icon" src="/static/mine/m_21.png" mode="widthFix"></image>
				<view class="con">
					<text class="lab">我的收藏</text>
				</view>
			</navigator>
			<view class="recommend-list">
				<!-- 歌单分类块 -->
				<song-list title="推荐歌单" :list="recommendSongs"/>
			</view>
		<!-- #ifdef APP-PLUS || MP-WEIXIN -->
		</scroll-view>
		<!-- #endif -->
	</view>
</template>

<script>
	import SongList from '@/components/songList/SongList.vue'
	import {  getPersonalized } from '@/api/index.js'
	export default {
		data() {
			return {
			navList: [
				{ name: '私人FM', imd: 1 },
				{ name: '最嗨电音', imd: 2 },
				{ name: 'ACG专区', imd: 3 },
				{ name: 'Sati空间', imd: 4 },
				{ name: '私藏推荐', imd: 5 },
				{ name: '因乐交友', imd: 6 },
				{ name: '亲子频道', imd: 7 },
				{ name: '古典专区', imd: 8 }
			],
			recommendSongs: [],
			};
		},
		components: {
			SongList
		},
		onLoad() {
			this.getPersonalized()
		},
		methods: {
			getPersonalized() {
				getPersonalized({ limit: 6 }).then(res=>{
					this.recommendSongs = res.result
				})
			}
		},
	}
</script>

<style lang="scss">
.nav-list {
	height: 220rpx;
	padding-top: 30rpx;
	padding-bottom: 14rpx;
	white-space: nowrap;
	text-align: center;
	line-height: 76rpx;
	color: #666;
	border-bottom: 1rpx solid #e6e6e6;
	font-size: 24rpx;
	background: #fff;
	.item {
		position: relative;
		display: inline-block;
		height: 210rpx;
		width: 166rpx;
		
	}
	.img {
		display: block;
		width: 70rpx;
		height: 70rpx;
		margin: 0 auto;
		border-radius: 50%;
	}
}
.line-item {
	padding: 0 40rpx;
	.icon {
		float: left;
		width: 70rpx;
		height: 70rpx;
		margin-top: 24rpx;
		margin-right: 36rpx;
	}
	.lab{
		font-size: 32rpx;
		color:#444;
	}
	.con{
		position:relative;
		height:100rpx;
		overflow: hidden;
		display: flex;
		align-items: center;
		&:before{
			position:absolute;
			content:"";
			right:0;
			bottom:0;
			width:100%;
			border-bottom: 1rpx solid #e6e6e6;
		}
	}
}
.recommend-list{
	border-top:16rpx solid #f8f8f8;
}
</style>
