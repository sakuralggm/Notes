<template>
	<view class="home">
		<view class="weixin"></view>
		<!-- 导航栏 -->
		<uni-nav-bar class="nav" height="110rpx" leftWidth="300rpx" rightWidth="300rpx">
			<!-- 左边，笔记本的创建和切换 -->
			<view slot="left" class="left">
				<view class="pic">
					<image src="../../static/images/notebook.png" mode="widthFix"></image>
				</view>
				<view class="title" @click="showNotesBook">
					<view>Notes</view>
					<view class="type">{{bookname}}
						<uni-icons type="right"></uni-icons>
					</view>
				</view>
			</view>
			<!-- 右边，笔记的创建和搜索 -->
			<view slot="right" class="right">
				<uni-icons type="search" color="#293544" size="50rpx" @click.native="clickSearch" class="icon">
				</uni-icons>
				<uni-icons color="#293544" type="trash" size="50rpx" class="icon" @click.native="deleteBook">
				</uni-icons>
				<uni-icons color="#293544" type="plusempty" size="50rpx" @click.native="clickAdd" class="icon">
				</uni-icons>
			</view>
		</uni-nav-bar>
		<!-- 主题内容部分 -->
		<view class="content" v-if="dataList.length">
			<!-- 骨架层 -->
			<view class="ske" v-if="loading">
				<u-skeleton rows="4" title :loading="loading" :animate="true" class="ske"></u-skeleton>
			</view>

			<scroll-view scroll-y="true" class="scroll-Y" v-if="!loading" @scrolltolower="reachBottom">
				<!-- 每一条笔记 -->
				<view class="row" v-for="(item, index) in dataList" :key="item._id" @click="goDetail(item._id)">
					<view class="title">{{item.title}}</view>
					<view class="detail">{{item.description}}</view>
					<view class="posttime">
						<uni-dateformat :date="item.posttime" :threshold="[60000, 3600000]" format="yyyy年M月d日">
						</uni-dateformat>
					</view>
				</view>
				<u-loadmore status='nomore' line nomore-text="没有更多了 ( •́ω•̩̥̀ )" class="nomore" v-if="noData" />
			</scroll-view>
		</view>
		<!-- 没有笔记时显示图片 -->
		<view class="noData" v-if="!dataList.length">
			<image src="../../static/images/nodata.png" class="img" mode="widthFix"></image>
			<view class="text">这页还没有笔记</view>
		</view>
		<!-- 笔记本 -->
		<uni-drawer ref="notesBook" class="drawer">
			<scroll-view style="height: 100%;" scroll-y="true" class="scroll-Y">
				<view class="notebook" v-for="book in bookList" @click="goBook(book.classid, book.name)">
					<view>
						<image src="../../static/images/notebook.png" class="img" mode="widthFix"></image>
					</view>
					<view class="text">{{book.name}}</view>
				</view>
				<view class="notebook">
					<view class="img">
						<uni-icons color="#293544" type="plusempty" size="50rpx" @click.native="addBook"></uni-icons>
					</view>
					<view class="text">新建笔记本</view>
				</view>
			</scroll-view>
		</uni-drawer>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bookname: '',
				classid: -1,
				dataList: [],
				loading: true,
				noData: false,
				defaultBookList: [{
					name: '全部笔记',
					classid: -1
				}, {
					name: '未分类笔记',
					classid: 0
				}],
				bookList: []
			}
		},
		onLoad(e) {
			if (!e.classid) {
				this.bookname = '全部笔记'
				this.classid = -1;
				this.getData(-1);
			} else {
				this.getData(e.classid);
				this.bookname = e.bookname;
			}
			this.getBookData();
		},
		methods: {
			// 显示对应的笔记本的内容
			async goBook(classid, bookname) {
				this.noData = false;
				this.classid = classid;
				this.bookname = bookname;
				await this.getData(classid);
				this.$refs.notesBook.close();
			},
			// 新建笔记本
			addBook() {
				uni.showModal({
					title: '新建笔记本',
					editable: true,
					placeholderText: '请输入笔记本名称',
					success: res => {
						if (res.confirm) {
							uni.showLoading({
								title: '新建笔记本中...'
							})
							uniCloud.callFunction({
								name: 'addBook',
								data: {
									name: res.content,
									classid: this.bookList.length > 2 ? this.bookList[2].classid + 1 : 1
								}
							}).then(res => {
								this.getBookData();
								uni.hideLoading();
								uni.showToast({
									title: '创建成功',
									duration: 200
								})
							})
						}
					}
				})
			},
			// 获取笔记本的数据
			getBookData() {
				uniCloud.callFunction({
					name: 'getNoteBookData'
				}).then(res => {
					this.bookList = [...this.defaultBookList, ...res.result.data];
					console.log(this.bookList)
				})
			},
			// 获取笔记的数据
			async getData(classid) {
				let res = await uniCloud.callFunction({
					name: 'getData',
					data: {
						classid
					}
				})
				this.dataList = res.result.data;
				console.log(this.dataList);
				this.loading = false;
			},
			// 点击搜索图标进入搜索页面
			clickSearch() {
				uni.navigateTo({
					url: "/pages/search/search"
				})
			},
			// 点击加号图标创建笔记
			clickAdd() {
				uni.navigateTo({
					url: `/pages/edit/edit?classid=${this.classid}&bookname=${this.bookname}`
				})
			},
			// 点击笔记进入详情页
			goDetail(id) {
				uni.navigateTo({
					url: `/pages/detail/detail?id=${id}&classid=${this.classid}&bookname=${this.bookname}`,
				})
			},
			// 滑动底部显示提示
			reachBottom() {
				this.noData = true
			},
			// 显示笔记本区
			showNotesBook() {
				this.$refs.notesBook.open('left');
			},
			// 点击删除键删除整本笔记本
			async deleteBook() {
				console.log(this.classid);
				uni.showModal({
					title: '确认删除这个笔记本吗？',
					content: '删除后该笔记本的所有笔记不可恢复，若要删除单篇笔记，请点击进入该笔记的详情页删除',
					success:async (res) => {
						if (res.confirm) {
							uni.showLoading({
								title: "删除中..."
							})
							// 删除每条笔记
							this.dataList.forEach(async item => {
								let res = await uniCloud.callFunction({
									name: "deletaNote",
									data: {
										id: item._id
									}
								})
								console.log(res);
							})
							// 删除笔记本
							let bookres = await uniCloud.callFunction({
								name: "deleteBook",
								data: {
									classid: this.classid
								}
							})
							console.log(bookres)
							uni.hideLoading();
							uni.showToast({
								title: '删除成功'
							})
							setTimeout(() => {
								uni.reLaunch({
									url: "/pages/index/index"
								})
							}, 800)
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	// 禁止页面滚动
	page {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.home {

		.weixin {
			height: calc(var(--status-bar-height) + var(--window-top) + 20rpx);
		}

		.nav {
			width: 100%;
			padding: 20rpx;

			// 左插槽样式
			.left {
				display: flex;
				margin-left: 20rpx;
				width: 500rpx;
				height: 80rpx;

				// 笔记本图片的样式
				.pic {
					width: 80rpx;
					height: 80rpx;
					background-color: #293544;
					padding: 20rpx;
					border-radius: 20rpx;

					image {
						width: 100%;
					}
				}

				// 文字的样式
				.title {
					display: flex;
					flex-direction: column;
					justify-content: center;
					margin-left: 10rpx;
					color: #2a3343;
					font-weight: 700;

					.type {
						display: flex;
						align-items: center;
						font-size: 30rpx;
					}
				}
			}

			// 右插槽的样式
			.right {
				// border: 1px solid red;
				display: flex;
				align-items: center;
				margin-right: 20rpx;
				height: 80rpx;
				margin-right: 0;

				.icon {
					padding: 10rpx;
					margin: 5rpx;
				}
			}
		}

		// 主体内容的样式
		.content {
			background-color: #fffdff;
			padding: 50rpx;
			padding-top: 0;

			// 设置骨架层上边距
			.ske {
				margin-top: 50rpx;
			}

			.scroll-Y {
				// border: 1px solid red;
				height: calc(100vh - 200rpx)
			}

			// 每一条笔记的样式
			.row {
				display: flex;
				position: relative;
				flex-direction: column;
				justify-content: center;
				border-bottom: 1rpx solid #f6f4f6;
				height: calc(100% / 6);

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
					margin-left: 5rpx;
					width: fit-content;
					background: #f6f4f6;
					color: #817f81;
					font-size: 20rpx;
					font-weight: 700;
				}
			}

			.nomore {
				margin-top: 0;
			}
		}

		.drawer {

			.notebook {
				margin-bottom: 20rpx;
				padding: 30rpx;
				width: 300rpx;
				height: 150rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;

				.img {
					width: 60rpx;
					height: 60rpx;
				}

				.text {
					margin-top: 10rpx;
					font-size: 20rpx;
				}
			}
		}

		.noData {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			height: 500px;

			.text {
				font-size: 30rpx;
				font-weight: 700;
				color: #bebebe;
			}
		}
	}
</style>
