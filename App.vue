<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "@/uni_modules/uview-ui/index.scss";
	@import "@/static/iconfont/iconfont.css";
	view {
		box-sizing: border-box;
		::-webkit-scrollbar{ display:none;}
	}
</style>
