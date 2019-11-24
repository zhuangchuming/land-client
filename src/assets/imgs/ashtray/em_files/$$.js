/* ver 20190613 */
//原JS对象能力扩展部分=======================================================
String.prototype.len=function()//获得String的字节长度（汉字或全角符号的长度为2）
{
	return this.replace(/[^\x00-\xff]/g,"**").length;
};
String.prototype.trim=function()
{// 用正则表达式将前后空格
	return this.replace(/(^\s+)|(\s+$)/g,"");
};
String.prototype.trimW=function()
{//trim包括全角空格
	return this.replace(/(^[\s　]+)|([\s　]+$)/g,"");
};
String.prototype.toHTML=function()
{
	return this.replace(/&/g,"&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
};
String.prototype.toText=function()
{
	return this.replace(/&amp;/g,"&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
};
//页面全局对象、变量和环境初始化========================================
function $$(selector,root,incRoot)
{
	if(!selector) return new $$([]);
	if(selector.constructor==String)
	{//字串选择器
		if(/^<[^>]+>$/.test(selector))//创建
			return $$(document.createElement(selector.substr(1,selector.length-2)));
		if(!document.querySelectorAll) return null;
		if(root && String==root.constructor)
			root=$$(root)[0];
		return new $$((root?root:document).querySelectorAll(selector),(incRoot?root:undefined));
	}
	if($$==selector.constructor)
		return selector;
	if(selector.nodeType && 1===selector.nodeType)
		return new $$([selector]);//直接定位单个节点对象
	//:创建选择结果集
	this.length=selector.length+(root?1:0);
	var i0=0;
	if(root)
	{
		this[i0]=root;
		i0++;
	}
	for(var i=0;i<selector.length;i++,i0++)
		this[i0]=selector[i];
};
$$.prototype.each=function(each,par)
{//each=function(node,list,idx,par) return false to break each
	for(var i=0;i<this.length;i++)
	{
		if(false===each(this[i],this,i,par)) break;
	}
	return this;
};
$$.prototype.attr=function(k,v)
{
	if(String!=k.constructor)
	{
		for(var p in k)
			this.attr(p,k[p]);
		return this;
	}
	if(arguments.length<2)
		return this.length?this[0].getAttribute(k):undefined;
	for(var i=0;i<this.length;i++)
	{
		if(undefined===v) this[i].removeAttribute(k);
		else this[i].setAttribute(k,v);
	}
	return this;
};
$$.prototype.prop=function(k,v)
{
	if(String!=k.constructor)
	{
		for(var p in k)
			this.prop(p,k[p]);
		return this;
	}
	if(arguments.length<2)
		return this.length?this[0][k]:undefined;
	for(var i=0;i<this.length;i++)
	{
		if(undefined===v) delete this[i][k];
		else this[i][k]=v;
	}
	return this;
};
$$.prototype.css=function(k,v)
{
	if(String!=k.constructor)
	{
		for(var p in k)
			this.css(p,k[p]);
		return this;
	}
	if(arguments.length<2)
		return this.length?this[0].style[k]:undefined;
	for(var i=0;i<this.length;i++)
	{
		if(undefined===v)
		{
			this[i].style[k]='';
			delete this[i].style[k];
		}
		else this[i].style[k]=v;
	}
	return this;
};
$$.prototype.bind=function(type,handler,attach)
{//type:String 事件名|{'事件名':handler,'click':...,...}, handler:Function|null 响应函数, attach:Boolean true表示附加方式，默认是覆盖方式
	for(var i=0;i<this.length;i++)
	{
		var tgt=this[i];
		if(String!=type.constructor)
		{
			attach=handler;
			for(var t in type)
			{
				if(!attach || !tgt['on'+t])
					tgt['on'+t]=type[t];
				else if(type[t])
					tgt.addEventListener(t,type[t]);
			}
		}
		else if(!attach || !tgt['on'+type])
			tgt['on'+type]=handler;
		else if(handler)
			tgt.addEventListener(type,handler);
	}
	return this;
};
$$.prototype.text=function(v)
{
	if(undefined===v)
		return this.length?this[0].innerText:undefined;
	for(var i=0;i<this.length;i++)
		this[i].innerText=v;
	return this;
};
$$.prototype.html=function(v)
{
	if(undefined===v)
		return this.length?this[0].innerHTML:undefined;
	for(var i=0;i<this.length;i++)
		this[i].innerHTML=v;
	return this;
};
/** 坐标映射，将元件坐标系中的x,y坐标，映射到base元件坐标系中(结果是考虑了scroll的因素的)
 * @param {int} x
 * @param {int} y
 * @param {selector} base 空值表示body
 * @return {{x:int,y:int}}
 */
$$.prototype.mapXY=function(x,y,base)
{
	var from=this.rect();
	var to=$$(base || document.body).rect();
	return {x:from.left+x-to.left+to.dx,y:from.top+y-to.top+to.dy};
};
$$.prototype.rect=function()
{
	if(!this.length) return null;
	var rect=this[0].getBoundingClientRect();
	var ele=this[0];
	rect.dx=ele.scrollLeft;
	rect.dy=ele.scrollTop;
	rect.w=rect.right-rect.left;
	rect.h=rect.bottom-rect.top;
	rect.W=ele.scrollWidth;
	rect.H=ele.scrollHeight;
	return rect;
};
$$.prototype.parent=function()
{
	return this.length?$$(this[0].parentNode):$$();
};
$$.prototype.child=function(idx)
{
	if(!this.length) return $$();
	var c=this[0].childNodes;
	if(undefined===idx)
		return $$(c);
	return $$(c[idx<0?c.length-idx:idx]);
};
$$.prototype.first=function()
{
	return this.child(0);
};
$$.prototype.last=function()
{
	return this.child(-1);
};
$$.prototype.pre=function()
{
	return this.length?$$(this[0].previousSibling):$$();
};
$$.prototype.next=function()
{
	return this.length?$$(this[0].nextSibling):$$();
};
$$.prototype.array=function()
{
	return Array.prototype.slice.apply(this);
};
$$.jsAniName=(null!=document.documentElement.style.animation?'animation':'webkitAnimation');
$$.transition=(null!=document.documentElement.style.transition?'transition':'webkitTransition');
$$.transform=(null!=document.documentElement.style.transform?'transform':'webkitTransform');
$$.isAndroid=/Android|Linux/i.test(navigator.userAgent);
$$.isIOS=/iPhone|iPod|iPad/i.test(navigator.userAgent);
$$.isWap=((!$$.isAndroid && !$$.isIOS) || (!window.cordova));
$$.isCltEx=window.$$EX?1:0;//是否在自有客户端中
//BindData系列 ===================================================
$$.BindData=function(data,root,render)
{
	/*利用html标签中的data属性做data bind(data={数据对象},root=DOM容器或选择器,render={.开始的模板引用的方法对象}
	以节点root为根(不含root本身)的含有data属性的节点，为模板渲染目标节点
	data属性语法说明:
		非列表容器节点:data不是以'[]'或']'开始的节点
			一般形式:data被视作js代码被eval，eval返回结果用于设定节点的innerHTML，如结果为null或NaN，则不用结果设定innerHTML
			特殊形式:data以'.'开始，实现方式类似eval('render'+data)，其中render实际上就是BindData函数传入的render对象；
				eval返回结果用于设定节点的innerHTML，如结果为null或NaN，则不用结果设定innerHTML
			特殊形式:data以'<>.'开始，data被视作js代码执行=eval(data)，返回结果不用于设定节点innerHTML
		列表容器节点:data以'[]开始的节点
			列表容器节点中的HTML模板将整体作为列表项在容器节点中重复出现，列表容器节点可嵌套
			'[]'后的字串被视为js代码被eval执行，eval返回结果必须是一个数组或伪数组(可用[索引]访问且有合法length属性)
			列表项的重复次数由eval返回数组的length属性决定
			列表容器在第一次BindData时，会进行列表模板初始化工作，完成后列表容器节点的data属性会被去掉迪第一个'['字符，动态改为以']'作为初始化完成标记
		data中的特殊符号说明:
			'<>'表示data属性所在DOM节点,<css>表示节点的style对象,<"xxx">表示节点的"xxx"属性
			'[#]'表示列表项节点对应的列表索引,该节点的祖先节点中，应该至少有一个data属性以'[]'开始的节点(列表容器节点)
			'{}'表示数据对象，即BindData时的参数data，所以{}.x实际上指data的x成员，对列表项而言{}实际上是其父列表容器的{}[列表项索引]
	*/
	//列表模板初始化
	if(root) root=$$(root)[0];
	var rData=root?root.getAttribute("data"):'';
	if(!rData) rData='';
	$$('*[data^="[]"]',root,'[]'==rData.substr(0,2)).each(function(tag)
	{//列表模板尚未初始化
		if(tag['[]']) return;//已经初始化
		var box=$$('<span>')[0];
		for(;tag.firstChild;)
			box.appendChild(tag.removeChild(tag.firstChild));
		tag['[]']=box;
		var pat=tag.getAttribute("data");
		if(!pat) return;
		tag.setAttribute("data",pat.substr(1))
	});
	$$('*[data^="]"]',root,']'==rData.substr(0,1)).html('');//清空所有可能的列表容器
	$$('*[data]',root,rData.length).each(function(tag,lst,i,$P)
	{
		var h,pat=tag.getAttribute('data');
		if('<'==pat.substr(0,1))//只是想对这个标签进行一点操作
			pat='('+pat+'),null';
		pat=pat.replace(/\{\}/g,'$P.D').replace(/\[#\]/g,'$P.i').replace(/<>/g,'tag').replace(/<css>/ig,'tag.style').replace(/<"([^"]+)">/g,'tag.getAttribute("$1")');
		if(pat.indexOf("]")==0)
		{//是个列表容器
			try{h=eval(pat.substr(1))}
			catch(e)
			{
				tag.innerHTML='BindData error: '+e.message.toHTML();
				return;
			}
			if(!h.length || h.length<=0) return;
			var it=$$('<'+tag.tagName+'>');
			for(var i=0;i<h.length;i++)
			{
				var x=it.html(tag['[]'].innerHTML)[0];
				var y=$$('*[data^="]"]',tag['[]']);//获得母版数据列表
				$$('*[data^="]"]',x).each(function(xn,xs,n)
				{
					xn['[]']=y[n]['[]'];
				});
				$$.BindData(h[i],x,$P.R,i,true);
				for(;x.firstChild;)
					tag.appendChild(x.removeChild(x.firstChild));
			}
			if($P.it) tag.removeAttribute('data');//是个列表项
			return;
		}
		//:非列表容器
		if(pat.indexOf(".")==0)//调用render的方法
			pat='$P.R'+pat;
		try{h=eval(pat);}
		catch(e){
			console.error(e);
			h='BindData error: '+e.message.toHTML();
		};
		if(null!=h)
		{
			tag.innerHTML=NaN===h?'':h;
		}
		if($P.it) tag.removeAttribute('data');//是个列表项
	},{D:data,i:arguments[3],R:render,it:arguments[4]});
};
$$.DispRender=function(data,root,render)
{//利用html标签中的disp属性做data display判断(data={数据对象},root=DOM树根,render={.开始的模板引用的方法对象})
	if(root) root=$$(root)[0];
	var rDisp=root?root.getAttribute("disp"):'';
	$$('*[disp]',root,rDisp).each(function(tag,lst,i,$P)
	{
		var pat=tag.getAttribute("disp").replace(/\{\}/g,'$P.D').replace(/<>/g,'tag'),d;
		if(pat.indexOf(".")==0)//调用render方法
			pat='$P.R'+pat;
		try{d=eval(pat);}
		catch(e){d='none'};
		if('string'!=typeof d)
		{
			if(!d && null==tag._disp)
			{
				var dp=tag.style.display;
				tag._disp=(null!=dp && dp.toLowerCase()!='none')?dp:"";
			}
			d=d?(tag._disp || ''):'none';
		}
		tag.style.display=d;
	},{D:data,R:render});
};
//基本操作 =======================================================
/** * 在目标上执行css3的key-frame动画
 * @param {selector|{tgt:selector|[selector|{tgt:selector,ani:string},...]},ani:string|undefined}|} tgt : 目标(其中ani参数指key-frame的css3动画名)
 * @param {string|undefined} ani : 默认动画名，当tgt中的目标不是{tgt:...}或没有指定ani动画名时，使用此动画名
 */
$$.Animation=function(tgt,ani)
{
	if(Array!=tgt.constructor || $$!=tgt.constructor)
		tgt=[tgt];
	for(var i=0;i<tgt.length;i++)
	{
		var it=tgt[i];
		var a=(Object==it.constructor && it.ani)?it.ani:ani;
		if(!a) continue;
		var x=$$(String==it.constructor?it:(it.tgt?it.tgt:it));
		if(x.css($$.jsAniName)!=a)
			x.css($$.jsAniName,a);
		else
		{//如果原有动画和现有动画一样，为保证动画发生，清空原有动画
			x.css($$.jsAniName,'none');
			setTimeout(function(x,a)
			{
				x.css($$.jsAniName,a);
			},0,x,a);
		}
	}
};
/** * 发送一个ajax请求
 * 同步方式下返回对应的ajax对象,处理后需自行删除回收
 * 如为异步方式，本函数返回undefined，ajax对象会自动删除回收，不要在响应函数的实现中删除ajax对象
 * @param {string} url :目标网址
 * @param {boolean|int} isGet :是否get方式
 * @param {{head:[]|undefined,content:{}|undefined}} data :发送的头信息和数据{
	head:['headKey1','headValue1',...],//一定有偶数个成员，略去表示不特别指明头
	content:'...'//POST方式时要传送的数据/可以略去或是null
 * }
 * @param {{ready:function,evtHost:*,t:int,id:*}} asyner :异步响应对象（null或略去即为同步方式）{
	ready:异步响应函数，此函数参数：(a:对应的ajax对象,id)，可通过如a.readyState!=4，表示超时；
		不指定此响应函数视为同步方式,
	evtHost:响应函数中this所引用的对象，可略去，表示不关心this
	t:超时的毫秒数,不设定则表示无限等待
	id:指定回调中的id参数，不设定则没有这个参数
 * }
 * @param {{noCredentials:boolean,flashRet:boolean}} opt :选项{
	noCredentials:是否明确举止withCredentials,
	flashRet:仅当flash通过ExternalInterface调用页面此函数时会被置为true，否则应该取值null或false或0
 * }
 * @param {{*}}} proxy :代理参数(仅自有客户端有效){
	appPath:null或忽略表示代理参数(path,cPath)基于本页url(document.location.href)生成
		String表示代理参数(path,cPath)基于此参数表示的url生成(appPath可以是绝对或相对url)，一般用于跨应用的$$URLProxy生成
	ref:refrence，null或忽略表示代理自行从url中抽取根作为reference,
	cookies:null或忽略表示不特别规定，否则表示代理要用这个值作为cookie替代,
	cPath:设定【返回】的cookie的路径根，采用相对路径表示法，不能含有半角问号，尾部含结尾'/'
		调用$$.Ajax的页面url必然是'http://127.0.0.1:6111x/app/....'的形式(也可能是通过appPath计算得到的这个url形式)
			结构化记为'http://{rHost}/{rApp}/{rAPath}/{rFile}?{rQueryStr}'
			其中'{rAPath}/'部分和'?{rQueryStr}'部分可能没有
		cPath='': 空串表示不进行设定
		cPath=null或忽略: 返回的cookie值的path根强制变为'/{rApp}/{rAPath}/{tDomain}/'
		cPath为字串则分为两种情况
			如cPath以'//'开始，则返回的cookie值的path根强制变为'/{rApp}/{cPath去掉前面的两个//}/'
			若cPath以'http://x/{rAPath}/{tDomain}/'为基准路径，用cPath的值为相对路径计算得到路径'http://x/{...}'
				返回的cookie值的path根强制变为'/{rApp}/{...}/'
			否则表示返回的cookie值的path根强制变为'/{rApp}/{cPath}/{tDomain}/'
	cDomain:null或忽略表示清除所有domain并智能将domain反映到cookie path中，""表示不修改domain，其他字串表示强行设定domain
	path:设定【发送】的cookie路径，采用相对路径表示法，不能含有半角问号，尾部含结尾'/'
		path='': 空串表示使用'./'作为发送路径，发送该路径及其所有父路径的cookie
		path=null或忽略: 表示使用'/{rApp}/{rAPath}/{tDomain}/{tPath}/'为发送路径，发送该路径及其所有父路径的cookie
		path为字串则分为以下情况
			如path以'//'开始，发送路径为'/{rApp}/{path去掉前面的两个//}/'及其所有父路径的cookie
			若path以'/'或'.'开始，则以'http://x/{rAPath}/{tDomain}/'为基准路径，用path的值为相对路径计算得到路径'http://x/{...}'
				发送路径为'/{rApp}/{...}/'及其所有父路径的cookie
			否则表示使用'/{rApp}/{path}/{tDomain}/{tPath}/'为发送路径，发送该路径及其所有父路径的cookie
	ct:null或忽略表不特别规定，否则表示返回的content-type头强行指定为这个值
	charset:null或忽略表示不特别规定，否则表示在返回的head中强行指定charset为这个值,
	proc30x:null、0或忽略表示不特别规定(返回码不变，location头信息智能处理为代理方式,参见$$URLProxy)
		1表示把301,302,307原"location"头信息名改为"hasquare_Location"，原返回码放入"hasquare_response_no"头信息，返回码改为200
		2表示遇到301,302,307的返回遇到301, 302, 307三种返回时是否不做任何头信息修改，直接返回
 * }
 * @return {xhr}
 */
$$.Ajax=function(url,isGet,data,asyner,opt,proxy)
{
	//:这一段代码是为了老是Ajax函数使用方式的兼容性处理
	if('string'===typeof opt || ('object'===typeof opt && 'object'!==typeof proxy))
	{//说明是老的PC客户端方式(url,isGet,data,asyner,proxy,flashRet)
		var x=proxy;
		if('string'===typeof opt)
			try{proxy=JSON.parse(opt);} catch(e){proxy={};}
		else
			proxy=opt;
		opt={flashRet:x,noCredentials:1};
	}
	else if('object'!==typeof opt && !proxy)
	{//老的页面方式(url,isGet,data,asyner,noCredentials)
		opt={noCredentials:(opt?1:0)};
		proxy=undefined;
	}

	if(!$$.Ajax.Void) $$.Ajax.Void=function(){};//检查并添加空函数
	opt=opt || {};

	//:代理方式
	if(proxy && $$.isCltEx)
	{
		if(!$$.isCltEx || !$$.Ajax.ProxyParm)
		{
			console.error('非自有客户端或未加载$$EX.js，无法使用代理方式');
			return alert('非自有客户端或未加载$$EX.js，无法使用代理方式');
		}
		var isForm=window.FormData && data && data.content && window.FormData==data.content.constructor;
		var r=$$.Ajax.ProxyParm(url,isGet,data,proxy);
		if(isForm && !isGet)
		{
			r.path+='?$$EX_PROXY='+$$Esc(url);
			r.par=data.content;
			return $$.Ajax(r.path,false,({content:r.par}),asyner);
		}
		return $$.Ajax(r.path,false,({head:$$CT,content:r.par}),asyner);
	}

	//:非代理方式
	var a,i,f;
	if (window.XMLHttpRequest)
		a=new XMLHttpRequest();
	else if (window.ActiveXObject)
		a=new ActiveXObject("Microsoft.XMLHTTP");
	var isAsyn=((asyner && asyner.ready)?1:0);
	a.timeout=0;
	a.open((isGet?"GET":"POST"),url,isAsyn?true:false);
	if(data && data.head)
		for(i=1;i<data.head.length;i+=2)
			a.setRequestHeader(data.head[i-1],data.head[i]);
	if(!isAsyn)
		opt.flashRet=opt.flashRet?1:0;
	else
	{//指定了异步响应函数
		opt.flashRet=opt.flashRet?-1:0;
		f=function(evt,t)
		{
			var F=arguments.callee;
			try{if(!t && F._A.readyState!=4) return;}catch(e){return;};
			if(F._t) clearTimeout(F._t);//清除超时timer
			F._t=null;
			var A=F._A;
			F._A=null;//消除交叉引用
			A.onreadystatechange=$$.Ajax.Void;//消除交叉引用
			delete A.onreadystatechange;
			if(t) A.abort();
			var E=null;
			try
			{
				if(F._host)
				{
					if($$.isCltEx && $$.Ajax.Call) setTimeout($$.Ajax.Call,10,F._host,F._onReady,A,F._id);
					else F._onReady.call(F._host,A,F._id);
					delete F._host;
				}
				else if($$.isCltEx)
					setTimeout(F._onReady,10,A,F._id);
				else
					F._onReady(A,F._id);
			}
			catch(e){E=e;}//捕获响应函数中的实现错误
			delete F._onReady;
			A=null;//回收ajax对象
			F._id=undefined;
			if(null!=E) throw(E);
		};
		f._host=asyner.evtHost;
		f._onReady=asyner.ready;
		f._A=a;
		f._id=(null!=asyner.id)?asyner.id:null;
		if(asyner.t) f._t=setTimeout(f,asyner.t,null,1);
		a.onreadystatechange=f;
		f=undefined;
	}
	try
	{
		if(null!=a.withCredentials && !opt.noCredentials)
			a.withCredentials=true;
		if (!isGet) a.send((data && data.content)?data.content:null);
		else a.send();
	}
	catch(e)
	{//发生了服务端口被拒绝之类的错误
		if(isAsyn) f(null,1);
		else throw(e);
	}
	if(opt.flashRet)//表明要求flash格式返回
		return flashRet<0?a:({status:a.status,header:a.getAllResponseHeaders(),responseText:a.responseText});
	return a;//返回xhr对象
};
$$.Parm=function(name,raw)
{//获取页面的Get参数;raw:get参数是否不解码，保持原有数据
	var arr=(document.location.search || document.location.href).match(new RegExp("\\?(?:.*&|)\\s*"+name+"=([^&]*)&?","i"));
	if(arr!=null) return (raw?arr[1]:decodeURIComponent(arr[1]));
	return "";
};
$$.StrTime=function(D,fmt)
{//Date转换为字串表达(D=Date或Date的字串,fmt=格式，目前只支持"yyyy,mm,dd,hh,nn,ss"几个符号)
	if(String==D.constructor || Number==D.constructor)
		D=new Date(D);
	var d=(100000000+10000*D.getFullYear()+100*(D.getMonth()+1)+D.getDate()).toString();
	var t=(1000000+10000*D.getHours()+100*D.getMinutes()+D.getSeconds()).toString();
	return fmt.replace("yyyy",d.substr(1,4)).replace("mm",d.substr(5,2)).replace("dd",d.substr(7,2)).replace(
		"hh",t.substr(1,2)).replace("nn",t.substr(3,2)).replace("ss",t.substr(5,2)).replace("yy",d.substr(3,2));
};
/** * Cookie对象封装 ---------
 * @param {string} k 键名
 * @param {string} v 键值
 * @param {int} seconds 有效期(秒),<0表示删除
 * @return {string|null}
 */
$$.Cookie=function(k,v,seconds)
{
	if(null==seconds && null==v)
	{//读取
		var arr=document.cookie.match(new RegExp("(^| )"+k+"=([^;]*)(;|$$)"));
		if(arr != null) return unescape(arr[2]);
		return null;
	}
	if(seconds<0)//删除
		document.cookie=k+"=none;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT";//+exp.toGMTString();
	else
	{//设定
		var s=k+"="+escape(v)+";path=/";
		if(seconds)
		{
			var exp=new Date();
			exp.setTime(exp.getTime()+seconds*1000);
			s+=";expires="+exp.toGMTString();
		}
		document.cookie=s;
	}
};
/** * 本地存储对象封装 ---------------
 * @param {string} k 键名
 * @param {*} v 键值(op=='set')|默认值(op=='get' || op='json')
 * @param {string} op 'get'=获取文本(默认)|'json'=获取json对象|'set'=设定|'del'=删除|其他=等同'get'
 * @return {string|{}|[]|null}
 */
$$.Storage=function(k,v,op)
{
	var S=window.localStorage?window.localStorage:null;
	if(!S || !k) return S;
	if(!op) op=(undefined===v?'get':'set');
	if('set'==op)
		return S.setItem(k,(v.constructor==String?v:JSON.stringify(v)));
	if('del'==op)
		return S.removeItem(k);
	var x=S.getItem(k);
	if(null==x)
		return v;
	if('json'==op) try
	{
		x=JSON.parse(x);
	}
	catch(e)
	{
		x=v;
	};
	return x;
};
