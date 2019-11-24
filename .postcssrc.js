// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
	"plugins": {
		"postcss-import": {},
		"postcss-url": {},
		"autoprefixer": { remove: false, browsers: ["chrome >= 25"] },
		"postcss-plugin-px2rem": {
			rootValue: 75, //rem基准值
			unitPrecision: 5, //允许rem单位增长到几位数
			mediaQuery: true, //允许在媒体查询中转换px
			exclude: false, //要排除的文件目录
			selectorBlackList: ['mq-','van-'], //保留px的选择器,以mq-开头的mathquill方法不转换
			propWhiteList: [],
			propBlackList: []
		}
		// to edit target browsers: use "browserslist" field in package.json
	}
}
