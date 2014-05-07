//姣忎釜.html椤甸潰涓兘鍖呮嫭
//鍔犺浇浣嶇疆锛�
jq=$;
//app.config=jq.extend(true,app.config,config);	//灏嗙敤鎴烽厤缃悎骞跺埌app.config
//--------------------------------------------------------------------
$(document).bind("mobileinit", function(){
	//鍒濆鍖栭厤缃」
	$.mobile.i18nEnabled = true;					//璁剧疆鍥介檯鍖栵紝enable i18n
	$.mobile.i18nFolder = app.lang.i18nFolder;
    $.mobile.ignoreContentEnabled = true;
	//$.mobile.activeBtnClass="ui-btn-hover-a";		//璁剧疆鎸夐挳澶勪簬婵�椿鐘舵�鏃剁殑CSS鏍峰紡;瀛楃涓茬被鍨�鍦ㄩ粯璁�ui-page-active;瑕嗙洊鑼冨洿锛欱uttons銆丩ist views銆丼elect menus绛夌粍浠剁殑瑙﹀彂鐘舵�銆�
	//$.mobile.activePageClass="ui-page-custom";	//瀛楃涓茬被鍨嬶紝鍦ㄩ粯璁ょ姸鎬佷笅鍙傛暟鏄紩鐢ㄦ牱寮忚〃涓殑鈥�ui-page-active鈥濓紝鏍峰紡ui-page-active鏄敤鏉ュ皢椤甸潰璁剧疆涓烘樉绀虹姸鎬佺殑鏍峰紡銆傛墍浠ュ湪鑷畾涔夎繖涓牱寮忓埌鏃跺�蹇呴』瑕佸湪鏍峰紡涓０鏄庝互涓嬪睘鎬э細鈥漝isplay:block !important; overflow:visible !important;鈥�銆傦紙娉ㄦ剰锛氫笉鐔熸倝jQM鐨凜SS妗嗘灦鐨勬湅鍙嬬粡甯镐細閬囧埌鑷畾涔夌殑鏍峰紡涓嶈捣浣滅敤鐨勬儏鍐碉紝杩欎竴鑸槸鐢变簬鑷畾涔夌殑鏍峰紡鍜屽師鏈塁SS妗嗘灦鐨勭户鎵垮叧绯讳笉鍚屽紩璧风殑锛屽彲浠ュ湪涓嶈捣浣滅敤鐨勬牱寮忓悗闈㈠姞涓�important鏉ユ彁楂樿嚜瀹氫箟鏍峰紡鐨勪紭鍏堢骇锛�
	$.mobile.ajaxEnabled=true;						//甯冨皵绫诲瀷锛屽湪榛樿鐘舵�涓嬪弬鏁版槸true,濡傛灉浣犵殑椤圭洰涓病鏈夌敤鍒癆jax锛岄偅涔堝缓璁皢杩欓噷璁句负false
	//$.mobile.ajaxFormsEnabled =false;				//鍗曠嫭璁剧疆椤甸潰涓殑琛ㄥ崟鎻愪氦鏄惁浣跨敤Ajax鏂规硶
	//$.mobile.ajaxLinksEnabled =false;				//鍗曠嫭璁剧疆椤甸潰涓殑閾炬帴鏄惁浣跨敤Ajax鏂规硶
	$.mobile.autoInitializePage =true;				//璁剧疆椤甸潰鏄惁鑷姩鍒濆鍖栵紝褰撹缃负false鏃讹紝jQM灏嗘帹杩熷椤甸潰鐨勬覆鏌擄紝鏂逛究鎴戜滑鍔ㄦ�鏋勫缓椤甸潰鐨凞om鍏冪礌绛夊紓姝ユ搷浣滄椂寮曞彂鐨勯〉闈㈡覆鏌撳け璐ラ棶棰樸�鍦ㄩ〉闈㈠厓绱犳瀯寤哄畬鎴愬悗鐢�.mobile.initializePage();鏉ュ紑濮嬫覆鏌撻〉闈�
	//
	$.mobile.loader.prototype.options.text = "loading..."; 
	$.mobile.loader.prototype.options.textVisible = true; 
	$.mobile.loader.prototype.options.theme = "e"; 
	$.mobile.loader.prototype.options.html = "";
	$.mobile.defaultPageTransition = "none";			//瑙ｅ喅changePage闂睆
	//
	$.mobile.buttonMarkup.hoverDelay = "false";			//濡傛灉浣犲彂鐜版寜閽殑鎸変笅/鍒掕繃鐨�鐘舵�鎰熻鍙嶅簲鏈変簺杩熺紦,閭�.mobile.buttonMarkup.hoverDelay鐨勮缃�鍙兘灏辩敤寰椾笂浜�
	$.mobile.allowCrossDomainPages=true				//鎵�互濡傛灉PhoneGap搴旂敤鎯宠鍔犺浇杩滅▼鏈嶅姟鍣ㄧ殑鏂囦欢锛�.support.cors 鍜�$.mobile.allowCrossDomainPages 閮藉繀椤昏涓簍rue.骞朵笖 $.mobile.allowCrossDomainPages鐨勮缃繀椤昏鍦ㄨ法鍩熻姹備箣鍓嶅畬鎴�
	$.support.cors=true;							//$.support.cors蹇呴』璁句负true鏉ュ憡鐭�.ajax鍙互璺ㄥ煙鍔犺浇鏂囦欢
	//
	
});
var controller=(function(){							//鍏ㄥ眬鍙橀噺锛屾帶鍒禼ontroller鐩綍涓殑.js
	var files=[];
	var push=function(f){
		files.push({'js':app.controller+'/'+f+'.js'});
	}
	return{
		push:push,
		files:files
	}
})();
var view=(function(){								//鍏ㄥ眬鍙橀噺锛屾帶鍒秜iew鐩綍涓殑.html
	var views=[];
	var load=function(f){
		var dtd = $.Deferred();		//鏂板缓涓�釜deferred瀵硅薄
		if(views[f]){
			//console.log('get file [ '+f+' ] in cache!');
			dtd.resolve();			//鏀瑰彉Deferred瀵硅薄鐨勬墽琛岀姸鎬�
		}else{
			//setTimeout(function(){
			$.ajax({
			  url: app.view+'/'+f+'.html',
			  async:false,
			  context: document.body
			}).done(function(data) {
			  views[f]=data;
			  console.log('get file [ '+f+' ] successfully.');
			  dtd.resolve();		//鏀瑰彉Deferred瀵硅薄鐨勬墽琛岀姸鎬�
			});
			//},5000);
		}
		return dtd.promise();		// 杩斿洖promise瀵硅薄
	}
	return{
		load:load,
		views:views
	}
})();

app.push(app.includeFiles,app.jquerymobile.include);
//app.push(app.includeFiles,[{'js':app.lang.i18nFolder+'/'+app.config.lang+'.json'}]);	//鐣岄潰璇█鍥介檯鍖�
//app.push(app.includeFiles,[{'js':app.lang.i18nFolder+'/i18n.js'}]);		//鐣岄潰璇█鍥介檯鍖�閲囩敤闈瀉jax鏂瑰紡锛宎pple emulator涓嶆敮鎸乤jax鎻愬彇鏂囦欢
//鏃ユ湡閫夋嫨鍣紝鏉ヨ嚜http://dev.jtsage.com/jQM-DateBox
//app.push(app.includeFiles,[{'js':'js/jqueryMobile/jtsage/jqm-datebox.core.js'}]);
//app.push(app.includeFiles,[{'js':'js/jqueryMobile/jtsage/jqm-datebox.mode.flipbox.js'}]);
//app.push(app.includeFiles,[{'js':'js/jqueryMobile/jtsage/jquery.mobile.datebox.i18n.en_US.utf8.js'}]);
//
app.jqplot={};
app.jqplot.include=[];
app.jqplot.include.push({'css':'js/jqplot/jquery.jqplot.min.css'});
app.jqplot.include.push({'js':'js/jqplot/jquery.jqplot.min.js'});
app.jqplot.include.push({'js':'js/jqplot/plugins/jqplot.barRenderer.min.js'});
app.jqplot.include.push({'js':'js/jqplot/plugins/jqplot.categoryAxisRenderer.min.js'});
app.jqplot.include.push({'js':'js/jqplot/plugins/jqplot.pointLabels.min.js'});
app.jqplot.include.push({'js':'js/jqplot/plugins/jqplot.canvasTextRenderer.min.js'});
app.jqplot.include.push({'js':'js/jqplot/plugins/jqplot.canvasAxisLabelRenderer.min.js'});
app.jqplot.include.push({'js':'js/jqplot/plugins/jqplot.logAxisRenderer.min.js'});
app.jqplot.include.push({'js':'js/jqplot/plugins/jqplot.canvasAxisTickRenderer.min.js'});
app.jqplot.include.push({'js':'js/jqplot/plugins/jqplot.dateAxisRenderer.min.js'});
app.jqplot.include.push({'js':'js/jqplot/plugins/jqplot.BezierCurveRenderer.min.js'});
app.jqplot.include.push({'js':'js/jqplot/plugins/jqplot.pieRenderer.min.js'});
app.jqplot.include.push({'js':'js/jqplot/plugins/jqplot.donutRenderer.min.js'});
app.jqplot.include.push({'js':'js/jqplot/plugins/jqplot.canvasOverlay.min.js'});
app.push(app.includeFiles,app.jqplot.include);
//
app.push(app.includeFiles,[{'js':'js/index.js'}]);

app.push(app.includeFiles,controller.files);		//寮曞叆controller鐩綍涓嬬殑.js

includeFiles(app.includeFiles);
app.includeFiles=[];


//
/******************************************************************************/

/******************************************************************************/

/*
function jmb_initializePage(){
	if(!$.mobile.autoInitializePage){
		console.log('--- run $.mobile.initializePage() manually.');
		$.mobile.initializePage();
	}
}*/
//
function loaderDelayShow(option){
	var delayTime=1000;
	if(!(typeof option === "undefined")){
		delayTime=(typeof option.delay === "object")?option.delay:delayTime;
	}
	//console.log(delayTime);
	var delayTime=(option===undefined)?1000:option.delay;
	//console.log(delayTime);
	$.mobile.loading( "show", {
				text: option.message,
				textVisible: true,
				theme: "e",
				textonly: false,
				html: option.html
	});
	setTimeout((function(){
		$.mobile.loading( "hide" );
		//e.stopImmediatePropagation();
		if(!(option.changePage===undefined)){
			//console.log('loaderDelayShow...changePage');
			changePage("workspace.html");
		}
	}),delayTime);
    return false;
}
function loaderShow(option){
	$.mobile.loading( "show", {
			text: option.message,
			textVisible: true,
			theme: "e",
			textonly: false,
			html: option.html
	});
}
/**********************************************************************/
var jsonLocalSet=function(n,v){
	
/*	if(n=='local.dtCheck.data.products'){
		console.log('|||');
		console.log(v);
		console.log('|||');
	}*/
	localStorage.setItem(n,JSON.stringify(v));

}
var jsonLocalGet=function(n){
	var r=localStorage.getItem(n);
	/*
	if(n=='local.dtCheck.data.products'){
		console.log('***');
		console.log(JSON.parse(r));
		console.log('***');
	}*/
	return(JSON.parse(r))
}


function getObjectValue(o){	//鍊间紶閫掕祴鍊�
	return(JSON.parse(JSON.stringify(o)));
}
function setObjectValue(o,v){
	for(var i in o){
		if(v[i]!=null){
			o[i]=v[i];
		}
	}
}
function myAlert(message, alertCallback, title, buttonName){
	//navigator.notification.alert(message, alertCallback, [title], [buttonName])
	navigator.notification.alert(message, alertCallback, title, buttonName);
}
function myConfirm(message,onConfirm,title,buttonTxt){
	if(app.device.name===''){
		button=confirm('*'+message);
		onConfirm(button);
	}else{
		navigator.notification.confirm(
				message,  // message
	            onConfirm,              // callback to invoke with index of button pressed
	            title,            // title
	            buttonTxt          // buttonLabels
	        );
	}
}

/*********************************************************************/
