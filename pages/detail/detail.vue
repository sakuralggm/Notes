<template>
	<view class="detail">
		<u-skeleton rows="7" title :loading="loading" :animate="true"></u-skeleton>
		<view class="title" v-if="!loading">
			<view class="title-text">{{data.title}}</view>
			<u-icon name="edit-pen" size="30" @click="editNote"></u-icon>
			<u-icon name="trash" size="30" class="trash" @click="deleteNote"></u-icon>
		</view>
		<view class="info" v-if="!loading">
			<view class="time">最后修改日期：<uni-dateformat :date="data.posttime" format='yyyy年MM月dd日 h:m:s'></uni-dateformat>
			</view>
		</view>
		<view class="content" v-if="!loading">
			<rich-text :nodes="data.content"></rich-text>
		</view>
		<u-loadmore status='nomore' line nomore-text="文章到底了（>﹏<）" v-if="noData" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bookname: '',
				classid: '',
				data: {},
				noData: false,
				loading: true
			};
		},
		onLoad(e) {
			this.bookname = e.bookname;
			this.classid = e.classid;
			this.getData(e.id);
		},
		onReachBottom() {
			this.noData = true;
		},
		methods: {
			async getData(id) {
				let res = await uniCloud.callFunction({
					name: 'getDetail',
					data: {
						id
					}
				})
				this.data = res.result.data[0];
				this.getBookname(this.data.classid);
				this.data.content = this.data.content.replace(/<img/gi, '<img style="max-width:100%"')
				console.log(this.data);
				this.loading = false;
				uni.setNavigationBarTitle({
					title: this.data.title
				});
			},
			async getBookname(classid) {
				console.log('getBookname', classid);
				if (classid == '-1') {
					this.classid = -1;
					this.bookname = '全部笔记';
				}
				else if (classid == 'undefined' || classid == null || classid == '0') {
					this.classid = 0;
					this.bookname = '未分类笔记';
				}
				else {
					let res = await uniCloud.callFunction({
						name: 'getBookName',
						data: {
							classid
						}
					})
					this.classid = classid;
					this.bookname = res.result.data[0].name;
				}
				
			},
			// 点击删除按钮删除这篇笔记
			deleteNote() {
				uni.showModal({
					title: '确认删除这篇笔记？',
					content: '删除后不可恢复',
					success: (res) => {
						if (res.confirm) {
							uni.showLoading({
								title: "删除中..."
							})
							uniCloud.callFunction({
								name: "deletaNote",
								data: {
									id: this.data._id
								}
							}).then(res => {
								uni.hideLoading();
								uni.showToast({
									title: '删除成功'
								})
								setTimeout(() => {
									uni.reLaunch({
										url: "/pages/index/index"
									})
								}, 800)
							})
						}
					}
				});
			},
			editNote() {
				uni.navigateTo({
					url: `/pages/edit/edit?id=${this.data._id}&classid=${this.classid}&bookname=${this.bookname}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.detail {
		padding: 30rpx;

		.title {
			display: flex;
			align-items: center;
			font-size: 46rpx;
			font-weight: 700;
			color: #333;

			.title-text {
				flex: 1;
			}

			.trash {
				margin-left: 30rpx;
			}
		}

		.info {
			background: #F6F6F6;
			padding: 20rpx;
			font-size: 25rpx;
			color: #666;
			display: flex;
			justify-content: space-between;
			margin: 40rpx 0;
		}

		.content {
			padding-bottom: 50rpx;

			p {
				line-height: 1.7em;
				padding-bottom: 10rpx;
			}

			img {
				margin: 10rpx 0;
			}
		}
	}
</style>
