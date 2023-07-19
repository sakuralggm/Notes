<!-- 该文件的代码已在vscode中备份 -->
<template>
	<view>
		<view class="page-body">
			<view class='wrapper'>
				<!-- 工具栏 -->
				<view class='toolbar' @tap="format">
					<!-- 工具栏第一行 -->
					<view class="firstLine">
						<view :class="formats.bold ? 'ql-active' : ''" class="iconfont icon-bold" data-name="bold">
						</view>
						<view :class="formats.italic ? 'ql-active' : ''" class="iconfont icon-italic"
							data-name="italic"></view>
						<view :class="formats.underline ? 'ql-active' : ''" class="iconfont icon-zitixiahuaxian"
							data-name="underline"></view>
						<view :class="formats.strike ? 'ql-active' : ''" class="iconfont icon-strikethrough"
							data-name="strike"></view>
						<view :class="formats.align === 'left' ? 'ql-active' : ''" class="iconfont icon-alignLeft"
							data-name="align" data-value="left"></view>
						<view :class="formats.align === 'center' ? 'ql-active' : ''" class="iconfont icon-center"
							data-name="align" data-value="center"></view>
						<view :class="formats.align === 'right' ? 'ql-active' : ''" class="iconfont icon-alignRight"
							data-name="align" data-value="right"></view>
						<view :class="formats.align === 'justify' ? 'ql-active' : ''"
							class="iconfont icon-alignBothSides" data-name="align" data-value="justify"></view>
					</view>
					<!-- 工具栏第二行 -->
					<view class="secondLine">
						<view class="iconfont icon-shouhangsuojin" data-name="indent" data-value="+1"></view>
						<view :class="formats.list === 'ordered' ? 'ql-active' : ''" class="iconfont icon-orderedList"
							data-name="list" data-value="ordered"></view>
						<view :class="formats.list === 'bullet' ? 'ql-active' : ''" class="iconfont icon-unorderedList"
							data-name="list" data-value="bullet"></view>
						<view class="iconfont icon-title" :style="showHeader ? 'color: #06c;' : ''"
							@click="clickHeader"></view>
						<view class="iconfont icon-wenziyanse" :style="showFontColor ? 'color: #06c;' : ''"
							@click="clickFontColor"></view>
						<view class="iconfont icon-zitibeijingse" :style="showBkColor ? 'color: #06c;' : ''"
							@click="clickBkColor"></view>
						<view class="iconfont icon-daibanshixiang" data-name="list" data-value="check"></view>
						<view class="iconfont icon-image" @tap="insertImage"></view>
					</view>
				</view>
				<!-- 标题弹出窗口 -->
				<uni-transition :mode-class="['fade','zoom-in']" :show="showHeader">
					<view class="header">
						<view :class="formats.header === 1 ? 'ql-active' : ''" class="iconfont icon-h1"
							data-name="header" :data-value="1" @click="format"></view>
						<view :class="formats.header === 2 ? 'ql-active' : ''" class="iconfont icon-h2"
							data-name="header" :data-value="2" @click="format"></view>
						<view :class="formats.header === 3 ? 'ql-active' : ''" class="iconfont icon-h3"
							data-name="header" :data-value="3" @click="format"></view>
						<view :class="formats.header === 4 ? 'ql-active' : ''" class="iconfont icon-h4"
							data-name="header" :data-value="4" @click="format"></view>
						<view :class="formats.header === 5 ? 'ql-active' : ''" class="iconfont icon-h5"
							data-name="header" :data-value="5" @click="format"></view>
						<view :class="formats.header === 6 ? 'ql-active' : ''" class="iconfont icon-h6"
							data-name="header" :data-value="6" @click="format"></view>
					</view>
				</uni-transition>
				<!-- 字体颜色弹出窗口 -->
				<uni-transition :mode-class="['fade','zoom-in']" :show="showFontColor">
					<view class="color">
						<view :class="formats.color === '#1e1c1e' ? 'selected' : ''" class="iconfont icon-checkbox-full"
							data-name="color" data-value="#1e1c1e" style="color: #1e1c1e;" @click="format"></view>
						<view :class="formats.color === '#4c4a4c' ? 'selected' : ''"
							class="iconfont icon-checkbox-full color2" data-name="color" data-value="#4c4a4c"
							style="color: #4c4a4c;" @click="format"></view>
						<view :class="formats.color === '#9a989a' ? 'selected' : ''"
							class="iconfont icon-checkbox-full color3" data-name="color" data-value="#9a989a"
							style="color: #9a989a;" @click="format"></view>
						<view :class="formats.color === '#e93223' ? 'selected' : ''"
							class="iconfont icon-checkbox-full color4" data-name="color" data-value="#e93223"
							style="color: #e93223;" @click="format"></view>
						<view :class="formats.color === '#f08634' ? 'selected' : ''"
							class="iconfont icon-checkbox-full color5" data-name="color" data-value="#f08634"
							style="color: #f08634;" @click="format"></view>
						<view :class="formats.color === '#f4c343' ? 'selected' : ''"
							class="iconfont icon-checkbox-full color6" data-name="color" data-value="#f4c343"
							style="color: #f4c343;" @click="format"></view>
						<view :class="formats.color === '#57af5c' ? 'selected' : ''"
							class="iconfont icon-checkbox-full color7" data-name="color" data-value="#57af5c"
							style="color: #57af5c;" @click="format"></view>
						<view :class="formats.color === '#5ab5f8' ? 'selected' : ''"
							class="iconfont icon-checkbox-full color8" data-name="color" data-value="#5ab5f8"
							style="color: #5ab5f8;" @click="format"></view>
						<view :class="formats.color === '#151f66' ? 'selected' : ''"
							class="iconfont icon-checkbox-full color9" data-name="color" data-value="#151f66"
							style="color: #151f66;" @click="format"></view>
					</view>

				</uni-transition>
				<!-- 背景颜色弹出窗口 -->
				<uni-transition :mode-class="['fade','zoom-in']" :show="showBkColor">
					<view class="color bkColor">
						<view :class="formats.backgroundColor === '#1e1c1e' ? 'selected' : ''"
							class="iconfont icon-checkbox-full" data-name="backgroundColor" data-value="#1e1c1e"
							style="color: #1e1c1e;" @click="format"></view>
						<view :class="formats.backgroundColor === '#4c4a4c' ? 'selected' : ''"
							class="iconfont icon-checkbox-full color2" data-name="backgroundColor" data-value="#4c4a4c"
							style="color: #4c4a4c;" @click="format"></view>
						<view :class="formats.backgroundColor === '#9a989a' ? 'selected' : ''"
							class="iconfont icon-checkbox-full color3" data-name="backgroundColor" data-value="#9a989a"
							style="color: #9a989a;" @click="format"></view>
						<view :class="formats.backgroundColor === '#e93223' ? 'selected' : ''"
							class="iconfont icon-checkbox-full color4" data-name="backgroundColor" data-value="#e93223"
							style="color: #e93223;" @click="format"></view>
						<view :class="formats.backgroundColor === '#f08634' ? 'selected' : ''"
							class="iconfont icon-checkbox-full color5" data-name="backgroundColor" data-value="#f08634"
							style="color: #f08634;" @click="format"></view>
						<view :class="formats.backgroundColor === '#f4c343' ? 'selected' : ''"
							class="iconfont icon-checkbox-full color6" data-name="backgroundColor" data-value="#f4c343"
							style="color: #f4c343;" @click="format"></view>
						<view :class="formats.backgroundColor === '#57af5c' ? 'selected' : ''"
							class="iconfont icon-checkbox-full color7" data-name="backgroundColor" data-value="#57af5c"
							style="color: #57af5c;" @click="format"></view>
						<view :class="formats.backgroundColor === '#5ab5f8' ? 'selected' : ''"
							class="iconfont icon-checkbox-full color8" data-name="backgroundColor" data-value="#5ab5f8"
							style="color: #5ab5f8;" @click="format"></view>
						<view :class="formats.backgroundColor === '#151f66' ? 'selected' : ''"
							class="iconfont icon-checkbox-full color9" data-name="backgroundColor" data-value="#151f66"
							style="color: #151f66;" @click="format"></view>
					</view>
				</uni-transition>
				<!-- 标题输入框 -->
				<view class="title">
					<input type="text" placeholder="标题" class="inputTitle" name="title" v-model="artObj.title">
				</view>
				<!-- 正文输入框 -->
				<view class="editor-wrapper">
					<editor id="editor" class="ql-container" placeholder="正文" showImgSize showImgToolbar showImgResize
						@statuschange="onStatusChange" @ready="onEditorReady">
					</editor>
				</view>
				<!-- 底部的三个工具 -->
				<view class="footer">
					<view class="iconfont icon-undo" @tap="undo"></view>
					<view class="iconfont icon-redo" @tap="redo"></view>
					<view class="iconfont icon-qingkong" @tap="clear"></view>
					<view class="iconfont icon-top"
						:style="artObj.title.length ? 'background-color: #1d9bf0;' : 'background-color: #cdcdcd;'"
						@tap="submit"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bookname: '',
				classid: -1,
				id: '',
				showHeader: false,
				showFontColor: false,
				showBkColor: false,
				defaultFormats: {
					color: "#1e1c1e",
					backgroundColor: "#fffdff",
				},
				formats: {},
				// 要入库的内容
				artObj: {
					classid: -1,
					title: "", // 标题
					content: "", // html串
					description: "", // 80字的摘要
					text: "", // 纯文本
					posttime: ""
				}
			}
		},
		// 初始化时判断是否传入id
		onLoad(e) {
			this.classid = e.classid;
			this.bookname = e.bookname;
			if (!e.id) {
				console.log('添加新的笔记', e);
				return;
			} else {
				this.id = e.id;
				console.log('编辑笔记', this.id);
				uni.setNavigationBarTitle({
					title: '修改笔记'
				});

			}
		},
		methods: {
			// 获取editor上下文
			async onEditorReady() {
				uni.createSelectorQuery().select('#editor').context((res) => {
					this.editorCtx = res.context
				}).exec()
				if (this.id) {
					await this.getData();
					this.editorCtx.setContents({
						html: this.artObj.content
					})
				}
			},
			// 如果id存在,则从数据库里请求数据
			async getData(id) {
				let res = await uniCloud.callFunction({
					name: 'getDetail',
					data: {
						id: this.id
					}
				})
				console.log('getData请求到的数据', res);
				this.artObj = res.result.data[0];
				console.log('存到artObj里', this.artObj);

			},
			// 撤销
			undo() {
				this.editorCtx.undo()
			},
			// 反撤销
			redo() {
				this.editorCtx.redo()
			},
			// 清空输入框
			clear() {
				this.editorCtx.clear({
					success: function(res) {
						console.log("clear success")
					}
				})
			},
			// 设置格式
			format(e) {
				let {
					name,
					value
				} = e.target.dataset
				if (!name) return;
				this.editorCtx.format(name, value)
			},
			// 点击H后弹出窗口
			clickHeader() {
				if (this.showBkColor) this.showBkColor = !this.showBkColor;
				if (this.showFontColor) this.showFontColor = !this.showFontColor;
				this.showHeader = !this.showHeader;
			},
			// 点击字体颜色后弹出窗口
			clickFontColor() {
				if (this.showHeader) this.showHeader = !this.showHeader;
				if (this.showBkColor) this.showBkColor = !this.showBkColor;
				this.showFontColor = !this.showFontColor;
				// 再次点击时恢复默认颜色
				if (this.formats.color !== '#1e1c1e') {
					this.format({
						target: {
							dataset: {
								name: 'color',
								value: this.formats.color
							}
						}
					})
					this.formats.color = "#1e1c1e";
				}
			},
			// 点击背景颜色后弹出窗口
			clickBkColor() {
				if (this.showFontColor) this.showFontColor = !this.showFontColor;
				if (this.showHeader) this.showHeader = !this.showHeader;
				this.showBkColor = !this.showBkColor;
				// 再次点击时恢复默认颜色
				if (this.formats.backgroundColor !== '#fffdff') {
					this.format({
						target: {
							dataset: {
								name: 'backgroundColor',
								value: this.formats.backgroundColor
							}
						}
					})
				}
			},
			// 让header换行后自动消失
			checkStatus(name, detail, obj) {
				if (detail.hasOwnProperty(name)) {
					this[obj] = true;
				} else {
					this[obj] = false;
				}
			},
			// 通过context改变格式
			onStatusChange(e) {
				const formats = e.detail
				this.formats = formats;
				this.checkStatus("header", formats, "showHeader");
				if (!this.formats.color) this.formats.color = "#1e1c1e";
			},
			insertImage() {
				uni.chooseImage({
					success: async res => {
						uni.showLoading({
							title: "上传中请稍后",
							mask: true
						})
						for (let item of res.tempFiles) {
							let suffix = item.path.substring(item.path.lastIndexOf("."));
							let randomName = Date.now() + "" + String(Math.random()).substr(3, 6) + suffix
							let res = await uniCloud.uploadFile({
								filePath: item.path,
								cloudPath: item.name || randomName
							})
							this.editorCtx.insertImage({
								src: res.fileID
							})
						}
						uni.hideLoading()
					}
				})
			},
			// 提交输入的内容
			submit() {
				if (!this.artObj.title.length) {
					uni.showToast({
						title: "标题不能为空",
						icon: "none"
					})
					return;
				}
				this.editorCtx.getContents({
					success: res => {
						console.log(res);
						console.log(Date.now())
						this.artObj.classid = this.classid;
						this.artObj.description = res.text.slice(0, 80);
						this.artObj.content = res.html;
						this.artObj.text = res.text;
						this.artObj.posttime = Date.now();
						uni.showLoading({
							title: "提交中..."
						})
						if (!this.id) {
							this.addData();
						} else {
							this.updateNotes();
						}
					}
				})
			},
			// 创建笔记入数据库
			addData() {
				uniCloud.callFunction({
					name: 'addNote',
					data: {
						artObj: this.artObj
					}
				}).then(res => {
					uni.hideLoading();
					uni.showToast({
						title: "发布成功"
					})
					setTimeout(() => {
						uni.reLaunch({
							url: `/pages/index/index?classid=${this.classid}&bookname=${this.bookname}`
						})
					}, 800)
				})
			},
			// 编辑笔记时更新数据库的内容
			updateNotes() {
				uniCloud.callFunction({
					name: 'updateNote',
					data: {
						artObj: this.artObj
					}
				}).then(res => {
					uni.hideLoading();
					uni.showToast({
						title: "修改成功"
					})
					setTimeout(() => {
						uni.reLaunch({
							url: `/pages/index/index?classid=${this.classid}&bookname=${this.bookname}`
						})
					}, 800)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page-body {
		background-color: #fffdff;
		height: calc(100vh - var(--window-top) - var(--status-bar-height));
	}

	.wrapper {
		height: 100%;
	}

	.editor-wrapper {
		// border: 1px solid blue;
		height: calc(100vh - var(--window-top) - var(--status-bar-height) - 400rpx);
	}

	.iconfont {
		display: flex;
		justify-content: center;
		align-items: center;
		flex: 1;
		padding: 16rpx 0;
		font-size: 40rpx;
	}

	.toolbar {
		background-color: #f5f5f5;
		box-sizing: border-box;
		height: fit-content;
		border-bottom: 0;
		font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;

		.firstLine {
			display: flex;
		}

		.secondLine {
			display: flex;
		}
	}

	/deep/ .ql-blank::before {
		font-style: normal;
		color: #e0e0e0;
	}

	.ql-container {
		color: #1e1c1e;
		// border: 1px solid green;
		box-sizing: border-box;
		padding: 24rpx 30rpx;
		width: 100%;
		min-height: 30vh;
		height: 100%;
		margin-top: 0rpx;
		font-size: 32rpx;
		line-height: 1.5;
	}

	.ql-active {
		color: #06c;
	}

	.header {
		display: flex;
		position: fixed;
		margin-left: 150rpx;
		background-color: #fbe673;
		border-radius: 20rpx;

		.iconfont {
			padding-left: 16rpx;
			padding-right: 16rpx;
			font-size: 30rpx;
		}
	}

	.color {
		display: flex;
		position: fixed;
		margin-left: 150rpx;
		border-radius: 20rpx;

		.iconfont {
			padding-left: 16rpx;
			padding-right: 16rpx;
			font-size: 30rpx;
		}
	}

	.title {
		padding: 24rpx 30rpx;
		margin-top: 60rpx;
	}

	.inputTitle {
		font-size: 40rpx;
		font-weight: 700;
	}

	.bkColor {
		margin-left: 180rpx;
	}

	.selected {
		transition: transform 0.2s ease-in-out;
		transform: scale(1.3);
	}

	.footer {
		display: flex;
		position: fixed;
		background-color: #f5f5f5;
		width: 100%;
		bottom: 0;
		left: 0;

		.icon-undo {
			flex: 1;
		}

		button {}

		.icon-redo {
			flex: 1;
		}

		.icon-qingkong {
			display: flex;
			flex: 6;
			justify-content: flex-end;
			padding-right: 50rpx;
		}
	}
</style>
