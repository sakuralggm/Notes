<template>
	<view class="search">
		<!-- 搜索框 -->
		<uni-search-bar :focus="true" placeholder="搜索" @input="inputChange" @cancel="goback" />
		<u-loadmore status="loading" loading-text="正在努力搜索中" v-if="searching" icon/>
		<!-- 结果 -->
		<view class="content" v-if="!searching && searchRes.length">
			<!-- 搜索结果这四个字 -->
			<view class="caption">搜索结果</view>
			<!-- 搜索的结果 -->
			<scroll-view scroll-y="true" class="scroll-Y">
				<!-- 每一条结果 -->
				<view class="searchResult" v-for="item in searchRes" :key="item._id" @click="goDetail(item._id)">
					<view class="title">
						<rich-text :nodes="item.title"></rich-text>
					</view>
					<view class="detail">
						<rich-text :nodes="item.text"></rich-text>
					</view>
					<view class="posttime">
						<uni-dateformat :date="item.posttime" format='yyyy年MM月dd日 hh:mm:ss'>
						</uni-dateformat>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 没有结果时的图片 -->
		<view class="noResult" v-if="!searching && !searchRes.length">
			<image src="/static//images/no-result.png" mode="widthFix"></image>
			<view class="text">无搜索结果</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchRes: [],
				timer: null,
				searching: false
			};
		},
		onLoad() {

		},
		methods: {
			async getData(keyword) {
				let res = await uniCloud.callFunction({
					name: 'getSearch',
					data: {
						keyword
					}
				})
				this.searchRes = res.result.data;
			},
			goback() {
				uni.reLaunch({
					url: "/pages/index/index"
				})
			},
			// 输入框内容改变时触发,防抖
			inputChange(keyword) {
				// 防抖功能（多次触发只执行一次）
				// 每次触发，都会清空上一次的延时，重新设置一个延时，如果一直触发，就会一直清空，只剩下最后一次启动的延时
				if (this.timer !== null) {
					clearTimeout(this.timer);
				}
				this.timer = setTimeout(() => {
					this.search(keyword);
					this.timer = null;
				}, 300)

			},
			// 搜索框输入时执行搜索
			async search(keyword) {
				if (!keyword) {
					this.searchRes = [];
					return;
				}
				this.searching = true;
				await this.getData(keyword);
				if (!this.searchRes.length) {
					this.searching = false;
					return;
				}
				const regExp = new RegExp(keyword, 'gi')
				this.searchRes.forEach(item => {
					item.title = item.title.replace(regExp, `<span style="color: #1d9bf0;">${keyword}</span>`);
					let pos = item.text.indexOf(keyword);
					if (pos > 15) {
						item.text = '...' + item.text.slice(pos);
					}
					item.text = item.text.replace(regExp, `<span style="color: #1d9bf0;">${keyword}</span>`);
				})
				this.searching = false;
			},
			// 点击笔记进入详情页
			goDetail(id) {
				uni.navigateTo({
					url: `/pages/detail/detail?id=${id}`,
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	// 禁止页面滑动
	page {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.content {
		background: #fffdff;
		margin-left: 40rpx;
		margin-right: 40rpx;

		// 搜索结果这四个字的样式
		.caption {
			margin-top: 100rpx;
			margin-bottom: 50rpx;
			color: #bfbdbf;
			font-size: 28rpx;
			font-weight: 700;
		}

		// 控制sroll-view，高度要小于等于到屏幕底部的高度
		.scroll-Y {
			height: calc(100vh - 380rpx)
		}

		// 每一条笔记的样式
		.searchResult {
			display: flex;
			flex-direction: column;
			justify-content: center;
			border-bottom: 1rpx solid #f6f4f6;
			height: calc(100% / 5);

			// 文字标题的样式
			.title {
				color: #171517;
				font-size: 30rpx;
				font-weight: 700;
				margin-bottom: 5rpx;

				// 显示一行+省略号
				text-overflow: -o-ellipsis-lastline;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 1;
				line-clamp: 1;
				-webkit-box-orient: vertical;
			}

			// 文字内容的样式
			.detail {
				color: #c4c2c4;
				font-size: 28rpx;
				margin-bottom: 5rpx;

				// 显示一行+省略号
				text-overflow: -o-ellipsis-lastline;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 1;
				line-clamp: 1;
				-webkit-box-orient: vertical;
			}

			// 发布时间的样式
			.posttime {
				width: fit-content;
				margin-left: 5rpx;
				background: #f6f4f6;
				color: #817f81;
				font-size: 20rpx;
				font-weight: 700;
			}
		}
	}

	// 没有结果是显示图片的样式
	.noResult {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: 400rpx;

		image {
			width: 150rpx;
			height: 150rpx;
		}

		.text {
			margin-top: 30rpx;
			color: #dfdddf;
			font-size: 40rpx;
			font-weight: 700;
		}
	}
</style>
