export function copyText(text, callback){ // text: 要复制的内容， callback: 回调
    var tag = document.createElement('input');
    tag.setAttribute('id', 'cp_hgz_input');
    tag.value = text;
    document.getElementsByTagName('body')[0].appendChild(tag);
    document.getElementById('cp_hgz_input').select();
    document.execCommand('copy');
    document.getElementById('cp_hgz_input').remove();
    if(callback) {callback(text)}
}
export function delayTime(ms) {
	var timer;
	return new Promise((resolve, reject) => {
		timer = setTimeout(() => {
			resolve();
			clearTimeout(timer);
		}, ms ? ms : 500);
	})
}