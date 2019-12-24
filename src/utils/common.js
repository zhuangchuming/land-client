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

/*
 * input change事件统一回调
 * @param {*} ev input 的change时间
 */
export function inputChange(e) {
	return new Promise(async(resolve, reject) => {
		let target = e.currentTarget; //target
		let arr =[];
		//可以存在多图
		if(window.FileReader){
			let len = target.files.length;
			for(let i=0;i<len;i++){
				let item=target.files[i];
				let p = await readFile(item);
				arr.push(p);
			}
			//判断是否是最后一个
			if(len===1){//如果是一张图片，则展开后
				resolve(arr[0]);
			}else{
				resolve(arr);
			}
		} else {
			this.$toast.fail("Not supported by your browser!");
		}
	})
}

function readFile(item){
	let maxSize = 500 * 1024,
		maxWidth = 1400,
		maxHeight = 1400;
	return new Promise((resolve,reject)=>{
		let params = {};
		let reader = new FileReader();
		reader.readAsDataURL(item);
		reader.onload = e => {
			let img = new Image();
			img.src = e.target.result;
			img.onload = function(){
				let orient;
				let width = this.width,
					height = this.height;
				EXIF.getData(this, function(){
					orient = EXIF.getTag(this, 'Orientation');
					if(orient===6){
						width = img.height;
						height = img.width;
					}
				});
				if(6===orient || e.target.result.length > maxSize || width > maxWidth || height > maxHeight){
					let W = ( width > maxWidth || height > maxHeight) ? (width > height ? width : height) : width;
					if(W > maxWidth) W = Math.floor(width*maxWidth/W);
					let canvas = document.createElement('canvas');
					canvas.width = W;
					canvas.height = Math.round(W * (height / width));
					let ctx = canvas.getContext("2d");
					if(6===orient){
						ctx.rotate(0.5 * Math.PI);
						ctx.drawImage(this, 0, -canvas.width, canvas.height, canvas.width);
					}else{
						ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
					}
					params.base64 = canvas.toDataURL('image/jpeg', 0.8);
				}else{
					params.base64 = e.target.result;
				}
				params.fileName = item.name;
				resolve(params);
			}
		};
	})
}

/*
 * @param {*} base64 图片裁剪后的base64图片，将base64转成blob
 * @return {Blob}
 */
export function dataURItoBlob(base64) {
	var byteString;
	var base64StrArr = base64.split(',');
	var str = base64StrArr[0],
		info = base64StrArr[1];
	if(str.indexOf('base64') >= 0){
		byteString = atob(info.replace(/\s/g, ""));
	}else{
		byteString = unescape(info);
	}
	var ia = new Uint8Array(byteString.length);
	for(var i=0; i<byteString.length; i++){
		ia[i] = byteString.charCodeAt(i);
	}
	return new Blob([ia], {type: "image/jpg"});
}