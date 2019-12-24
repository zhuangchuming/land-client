function setHtmlFontSize(doc, win){
	var timer = setTimeout(function(){
		var html = doc.getElementsByTagName("html")[0],
			docEl = doc.body||doc.documentElement;
		var clientWidth = docEl.clientWidth || win.innerWidth,
			clientHeight = docEl.clientHeight || win.innerHeight;
		if(!clientWidth) return;
		var benchmark = clientWidth;
		if(clientWidth > clientHeight){ //如果宽比高大，那计算的基准值要取小的一个
			benchmark = clientHeight;
		}
		html.style.fontSize = 75 * (benchmark / 750) + 'px';
		clearTimeout(timer);
	}, 200);
}
function setHtmlFontSizeID(el,fix){
	if(!fix){
		fix=750;
	}
	if(!el){
		el=document.body;
	}
	var timer = setTimeout(function(){
		var html = document.getElementsByTagName("html")[0];
		var clientWidth = el.clientWidth ,
			clientHeight = el.clientHeight;
		if(!clientWidth) return;
		var benchmark = clientWidth;
		// if(clientWidth > clientHeight){ //如果宽比高大，那计算的基准值要取小的一个
		// 	benchmark = clientHeight;
		// }
		html.style.fontSize = 75 * (benchmark / fix) + 'px';//75是  设计图的rem = 75
		clearTimeout(timer);
	}, 200);
}
document.addEventListener('DOMContentLoaded', function(){
	setHtmlFontSize(document, window);
});