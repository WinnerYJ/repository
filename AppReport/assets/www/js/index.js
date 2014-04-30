//var Messages=window.i18n.mainPage;
var local = {};
local.data = {}; //存放所有下载表数据
local.share = {}; //存放"库存审计","商业审计",...公共部分

function strTrim(r) { //去掉两端空格
	r = r.replace(/(^\s*)|(\s*$)/g, "");
	return (r);
}
//-------------------------------------------------------------------------------------------------------------------------------------库存审计对象(本地) end

function dataStorageSave() { //储存内存变量数据到硬盘

	jsonLocalSet('local.data', local.data);
	jsonLocalSet('local.share', local.share); //将产品信息储存
	jsonLocalSet('app.config', app.config);

	console.log('储存内存变量数据到硬盘');
}

function dataStorageClean() {
	//localStorage.clear(); 将清除所有数据，包括app.config，请不要执行

	local.data = {};
	local.share = {};
	/*
	local.invCheck.clear();
	local.dtCheck.clear();
	local.syCheck.clear();
	local.zdCheck.clear();
	*/
	dataStorageSave();
}

function dataLocalInit() { //请在登录后，local.data初始化完成后执行

	if (local.data.hasLocalData != null) {

	}
}

function dataStorageRestore() { //恢复硬盘数据到内存变量,并初始化所有前端应用数据

	var data = jsonLocalGet('local.data');
	var share = jsonLocalGet('local.share');
	var config = jsonLocalGet('app.config');

	local.data = (data === null) ? {} : data; //定义data数据对象
	local.share = (share === null) ? {} : share; //定义share数据对象,存放各种审计共用对象
	app.config = jq.extend(true, app.config, config); //将用户配置合并到app.config
	console.log('恢复硬盘数据到内存变量');

	if (local.share.route == null) return; //没有可用数据，取消后面的初始化

	if (local.data.hasLocalData != null) {

	}



}



//----------------------------------------------------------------------------------- common js
//
jq(document).on(app.click, "#gotoworkspace", function(e) {
	changePage('workspace.html');
	return (false);
});

//----------------------------------------------------------------------------------- workspace start
jq(document).on(app.click, "#productMoniter", function(e) {
	changePage("productMoniter.html");

	return false;
});

jq(document).on(app.click, "#reportForm", function(e) {
	changePage("reportForm.html");
	return false;
});

jq(document).on(app.click, "#exceptionList", function(e) {
	changePage("exceptionList.html");
	return false;
});

jq(document).on(app.click, "#exit_workspace", function(e) {
	e.stopImmediatePropagation();
	exitApp();
	return false;
});

//----------------------------------------------------------------------------------- workspace end


//-------------------------------------------------------------------------------------------------------------------------------------login.html start

function appLoad() {
	var url = "index.html";
	console.log('----------1:' + app.device.platform);
	switch (app.device.platform) {
		case "Android":
			url = "file:///android_asset/www/index.html";
			break;
		default:

	}
	console.log('....................更改过配置后，重新引导应用。');
	location.href = url;
}

jq(document).on(app.click, "#setting", function() {
	changePage("setting.html");
});
jq(document).on(app.click, "#loginBtn", function() {
	loginAction();

});
$(document).on("pageinit", "#loginView", function(e) {
	jq('#app_version').html('<div>版本号：' + app.version + '</div>');
	//
	//return;
	jq('#username').val('10003');
	jq('#password').val('123456');


});

function loginAction() {
	username = jq('#username').val();
	password = jq('#password').val();
	var gotoNextFlag = true;
	if (username === '') {
		myAlert('用户名不能空！', null, '错误', '关闭');
		jq('#username').focus();
		return;
	}
	if (password === '') {
		myAlert('密码不能空！', null, '错误', '关闭');
		jq('#password').focus();
		return;
	}

	if (local.data.hasLocalData && app.config.user.lastusername != null) { //上次已成功登录
		if (username != app.config.user.lastusername || password != app.config.user.password) { //检查与上次用户名/密码不一致，将清除所以数据
			myConfirm('本次登录用户名/密码与上次不一致，继续登录将清除所有数据\n你确定要继续吗？', onConfirm, '提示', '继续,取消')

			function onConfirm(button) {
				if (button == 1) {
					dataStorageClean();
					//
					loginExe(username, password);
				}
			}
		} else {
			loginExe(username, password);
		}

	} else {

		loginExe(username, password);
	}

}

function loginExe(username, password) { //执行登录
	app.config.user.username = username;
	app.config.user.password = password;
	if (local.data.hasLocalData) {
		loaderDelayShow({
			message: '获取本地数据成功,初始化系统，请稍候...',
			delay: 2000
		});
		changePage(app.view + "/workspace.html");
		return;
	}
	//---------------------------------- 执行数据同步

	//完成所有数据下载后进入主画面
	loaderShow({
		message: '初始化系统，请稍候...',
		delay: 2000
	});

	local.data.hasLocalData = true;
	dataLocalInit(); //实始化 local相关变更

	app.config.user.passed = true;
	app.config.user.lastusername = app.config.user.username;
	jsonLocalSet("app.config", app.config);
	//
	dataStorageSave();
	dataStorageRestore();
	if (app.web.page === 'login.html') {
		changePage(app.view + "/workspace.html");
	} else {
		changePage("workspace.html");
	}
	//---------------------------------- 执行数据同步 end
}
//

//-------------------------------------------------------------------------------------------------------------------------------------setting start
$(document).on("pageinit", "#settingView", function(e) {

});
jq(document).on("pagebeforeshow", "#settingView", function(e) {
	console.log('pagebeforeshow');

});
jq(document).on("pageshow", "#settingView", function(e) {
	settingFormInit();
});
jq(document).on(app.click, "#btnOk_settingView", function(e) {

	settingFormSubmit();


});
jq(document).on(app.click, "#btnClearAppData_setting", function() {
	cleanLocalData();
});
//
function cleanLocalData() {
	myConfirm('您确定要清除所有本地数据吗?', onConfirm, '提示', '确定,取消')

	function onConfirm(button) {
		//alert('You selected button ' + button);
		if (button == 1) {
			dataStorageClean();
			if (Object.prototype.toString.call(local.data.hasLocalData) === '[object Undefined]') {
				myAlert('清除完成！', null, '信息', '关闭');
			} else {
				myAlert('清除失败！', null, '警告', '关闭');
			}
		}
	}

}
jq(document).on(app.click, "#app_version_update", function() {
	myConfirm('您确定要下载最新版本吗?', onConfirm, '提示', '确定,取消')

	function onConfirm(button) {
		if (button == 1) {
			downloadFileApk();
		}
	}

});
jq(document).on(app.click, "#btnCancel_settingView", function(e) {
	appLoad();


});
//
jq(document).on(app.click, "#app_version_update", function(e) {

});
jq(document).on(app.click, "#passwordReset_settingView", function(e) {
	jq('#oldpassword').val('');
	jq('#newpassword').val('');
	jq('#newpassword2').val('');
});
jq(document).on(app.click, "#passwordChange_settingView", function(e) {
	changePassword();
});

function changePassword() {
	var username = jq('#username').val();
	var oldpassword = jq('#oldpassword').val();
	var newpassword = jq('#newpassword').val();
	var newpassword2 = jq('#newpassword2').val();
	if (username === '') {
		myAlert('用户名不能空！', null, '错误', '关闭');
		return;
	}
	if (oldpassword === '') {
		myAlert('当前密码不能空！', null, '错误', '关闭');
		return;
	}
	if (newpassword === '') {
		myAlert('新密码不能空！', null, '错误', '关闭');
		return;
	}
	if (newpassword2 === '') {
		myAlert('请再次输入新密码不能空！', null, '错误', '关闭');
		jq('#newpassword2').focus();
		return;
	}
	if (newpassword != newpassword2) {
		myAlert('两 次新密码输入必须相同！', null, '错误', '关闭');
		jq('#newpassword2').focus();
		return;
	}
	//提交密码修改
	$.mobile.loading("show", {
		text: '提交中，请稍候...',
		textVisible: true,
		theme: "e",
		textonly: false,
		html: ""
	});
	//var url='http://'+app.config.network.server+':'+app.config.network.port+'/SyncService/Service.asmx/ChangePassword';
	url = 'http://' + app.config.network.server + ':' + app.config.network.port + '/QTSync/Sync/AppPostData.ashx?gzip=1&user_code=' + app.config.user.username + '&syncode=' + app.config.user.password + '&version=V1&cv=1.0.00';
	var data = '';
	data += '<t n="QT_CPwd"><r>';

	data += username + '|';
	data += oldpassword + '|';
	data += newpassword;
	data += '</r></t>';
	console.log(data);
	$.ajax({
		type: "POST",
		url: url,
		data: data,
		async: true,
		//context: document.body,
		//crossDomain:true,
		dataType: "xml",
		timeout: 30000
	}).done(function(data) {

		var responseTxt = jq.xml2json(data);

		console.log('responseTxt=' + responseTxt);
		if (responseTxt === 'SUCCESS') {
			$.mobile.loading("hide");
			if (app.config.user.username === username) { //如果是当前已登录过的用户，则需要本地密码也保存
				app.config.user.password = newpassword;
				jsonLocalSet('app.config', app.config);
			}
			jq('#oldpassword').val(jq('#newpassword').val());
			jq('#newpassword').val('');
			jq('#newpassword2').val('');

			myAlert('用户[' + username + ']密码修改成功。', null, '成功', '关闭');
		} else {
			$.mobile.loading("hide");

			myAlert('用户[' + username + ']密码修改失败。原因：' + responseTxt, null, '失败', '关闭');
		}

	}).fail(function(xhr, textStatus, error) {
		$.mobile.loading("hide");
		myAlert('执行失败。可能是网络故障', null, '错误', '关闭');
	});
}
//
function settingFormSubmit() {
	var server = jq('#server').val();
	var port = jq('#port').val();
	var lang = $("input[name*=radio-choice-v-2]:checked").val();

	console.log('lang=' + lang + ',server=' + server + ',port=' + port);
	app.config.network.server = server;
	app.config.network.port = port;

	app.config.lang = $("input[name*=radio-choice-v-2]:checked").val();
	jsonLocalSet("app.config", app.config);
	appLoad();
}

function settingFormInit() {
	$("input[name*=radio-choice-v-2]").each(function() {

		if ($(this).val() === app.config.lang) {
			$(this).attr("checked", true).checkboxradio("refresh");
		} else {
			$(this).removeAttr("checked").checkboxradio("refresh");
		}
	});
	$('#server').val(app.config.network.server);
	$('#port').val(app.config.network.port);
	$('#device_name').val(app.device.name);
	$('#device_platform').val(app.device.platform);
	$('#app_version').val(app.version);
	var a = $('#username').val();
	$('#username').val(app.config.user.username);
}

/*------------------------------------------------------------*/
app.dominoinfo = {
	chart1: {
		s1: [2100, 1980, 1850, 1700, 1650, 1600, 1500],
		s2: [800, 900, 1000, 1200, 1201, 1300, 1350],
		s3: [20, 19, 31, 40, 60, 80, 100],
		ticks: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
		series: [{
			label: 'BJMA01'
		}, {
			label: 'BJMA01A'
		}, {
			label: 'MAIL02'
		}]
	},
	chart2: {
		s1: [
			['BJMA01', 40],
			['BJMA01A', 35],
			['MAIL02', 20],
			['BJSM01', 80],
			['BJSM02', 75],
			['BJSM03', 72]
		]
	}
};
var chart = (function() {
	function chart2(option) {
		var data = app.dominoinfo.chart2;
		var s1 = data.s1;
		var grid = {
			gridLineWidth: 1.5,
			gridLineColor: 'rgb(235,235,235)',
			drawGridlines: true
		};
		var myOptions = {
			series: [{
				renderer: $.jqplot.BarRenderer,
				rendererOptions: {
					barWidth: 30
				}
			}],
			axesDefaults: {
				min: 0,
				max: 100,
				pad: 10
			},
			axes: {
				xaxis: {
					renderer: $.jqplot.CategoryAxisRenderer
				}
			},
			grid: grid,
			canvasOverlay: {
				show: true,
				objects: [{
					horizontalLine: {
						name: 'pebbles',
						y: 90,
						lineWidth: 3,
						xOffset: '0',
						color: 'rgb(255, 0, 0)',
						shadow: false
					}
				}, {
					dashedHorizontalLine: {
						name: 'bam-bam',
						y: 75,
						lineWidth: 3,
						dashPattern: [16, 12],
						lineCap: 'round',
						xOffset: 0,
						color: '#fff63f',
						shadow: false
					}
				}]
			}
		};
		myOptions = jq.extend(true, myOptions, option); //将用户配置合并到 myOptions
		plot1 = $.jqplot('chart2', [s1], myOptions);
	}

	function chart1(option) {
		var data = app.dominoinfo.chart1;

		var s1 = data.s1;
		var s2 = data.s2;
		var s3 = data.s3;
		var ticks = data.ticks;
		var series = data.series;
		var myOptions = {
			seriesColors: ["#4bb2c5", "#c5b47f", "#EAA228", "#579575", "#839557", "#958c12", "#953579", "#4b5de4", "#d8b83f", "#ff5800", "#0085cc"],
			stackSeries: true,
			captureRightClick: true,
			seriesDefaults: {
				renderer: $.jqplot.BarRenderer,
				rendererOptions: {
					// Put a 30 pixel margin between bars.
					barMargin: 30,
					// Highlight bars when mouse button pressed.
					// Disables default highlighting on mouse over.
					highlightMouseDown: true
				},
				pointLabels: {
					show: true
				}
			},
			series: series,
			axes: {
				xaxis: {
					ticks: ticks,
					tickRenderer: $.jqplot.CanvasAxisTickRenderer,
					tickOptions: {
						angle: -40
					},
					renderer: $.jqplot.CategoryAxisRenderer

				},
				yaxis: {

					// Don't pad out the bottom of the data range.  By default,
					// axes scaled as if data extended 10% above and below the
					// actual range to prevent data points right on grid boundaries.
					// Don't want to do that here.
					padMin: 0
				}
			},
			legend: {
				show: true,
				location: 'ne',
				placement: 'inside'
			}
		};
		myOptions = jq.extend(true, myOptions, option); //将用户配置合并到 myOptions
		plot3 = $.jqplot('chart1', [s1, s2, s3], myOptions);
		// Bind a listener to the "jqplotDataClick" event.  Here, simply change
		// the text of the info3 element to show what series and ponit were
		// clicked along with the data for that point.
		$('#chart1').bind('jqplotDataClick',
			function(ev, seriesIndex, pointIndex, data) {
				console.log('ok');
				$('#info').html('series: ' + seriesIndex + ', point: ' + pointIndex + ', data: ' + data);
			}
		);

	};

	return {
		chart1: chart1,
		chart2: chart2,
	};
})();


$(document).on("pageshow", "#productMoniter_View", function(e) {
	var line1 = [20, 10, 15, 30, 70, 60];
	var line2 = [30, 15, 10, 40, 50, 60];
	var line3 = [20, 23, 30, 70, 80, 20];
	var line4 = [10, 20, 30, 40, 50, 60];


	$.jqplot('monitor1', [line1, line2, line3], {
		title: '主车速',
		series: [{
			label: 'line1',
			lineWidth: 2,
			markerOptions: {
				style: 'dimaond'
			}
		}, {
			label: 'line2',
			markerOptions: {
				style: "circle"
			}
		}, {
			label: 'line3',
			lineWidth: 5,
			markerOptions: {
				style: "filledSquare",
				size: 10
			}
		}],
		axes: {
			xaxis: {
				label: '时间(min)'
			},
			yaxis: {
				label: '速度(m)'
			}
		}
	});

	$.jqplot('monitor2', [line1, line2, line4], {
		title: '主温度',
		series: [{
			showMarker: false
		}],
		axes: {
			xaxis: {
				label: '时间(min)',
				labelRenderer: $.jqplot.CanvasAxisLabelRenderer
			},
			yaxis: {
				label: '温度(℃)',
				labelRenderer: $.jqplot.CanvasAxisLabelRenderer
			}
		}
	});
});

$(document).on("pageshow", "#reportForm_View", function(e) {
	var data = [
		['line1', 7000],
		['line2', 9000],
		['line3', 1500],
		['line4', 12000],
		['line5', 3000],
		['line6', 6000],
		['line7', 18000]
	];

	var plot1 = $.jqplot('report1', [data], {
		title: '生产线月产量统计',
		series: [{
			renderer: $.jqplot.BarRenderer
		}],
		axesDefaults: {
			tickRenderer: $.jqplot.CanvasAxisTickRenderer,
			tickOptions: {
				angle: -30,
				fontSize: '10pt'
			}
		},
		axes: {
			xaxis: {
				renderer: $.jqplot.CategoryAxisRenderer
			}
		}
	});
});