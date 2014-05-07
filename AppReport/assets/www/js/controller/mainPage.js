(function() {
	var Messages=window.i18n.mainPage;
	$(document).on("pagecreate","#mainView",function(e){
		console.log('pagecreate...#mainView');
		//jq("#mainView .footer_bar").html(app.footerHTML);
	});
	$(document).on("pageinit", "#mainView", function(e) {
		console.log('pageinit...#mainView');
		$.when(view.load("footer"))
			.done(function(){ 
				jq("#mainView .footer_bar").html(view.views["footer"]);
				changeFootClass("mainView","mainTab");

				jq.mobile.i18n.applyI18n(jq("#mainView .footer_bar"));
				jq("#mainView .footer_bar").trigger("create");
			});
	});
	jq(document).on("pagebeforeshow", "#mainView", function(e) {
        //busy.show();
		
        // ------------------main page I18N-----------------------------------
        jq("#welcome").html(Messages.welcome);
		jq("#userName").html("demo");
        //jq("#mainMessageBoard").html(Messages.messageBoard);
        //jq("#planToday").html(Messages.planToday);
        //jq("#todayPlanHead").html(Messages.todayPlanHead);
        //jq("#logoutBtnLabel").html(Messages.logout);
        /*
        // 渲染信息数据
        renderMessageBoard();
        // 渲染默认的每日计划
        renderDefaultDayPlanList(new Date());

        // 每次跳转到主页，都启动一个scheduler
        scheduler.run();
		*/
    });
	jq(document).on("pageshow", "#mainView", function(e) {
		
        //主页KPI的渲染，这个报表必须在pageShow启用（DOM全部加载后）
        //mainPageKPIChart.render();
		

		chart.chart1();
		chart.chart2();
        //修改foot的高亮
        //changeFootClass("mainView","mainTab");
        //busy.hide();
    });
	jq(document).on("tap","#chart1_refresh",function(e){
		jq("#chart1").html('<div class="ui_loader"><span class="ui-icon ui-icon-loading"></span><h1>加载中...</h1></div>');
		$.when(app.dominoinfoLoad())
			.done(function(){
			jq("#chart1").html("");
			chart.chart1({animate: !$.jqplot.use_excanvas});
		});
		
	})
	jq(document).on("tap","#chart2_refresh",function(){
		jq("#chart2").html('<div class="ui_loader"><span class="ui-icon ui-icon-loading"></span><h1>加载中...</h1></div>');
		$.when(app.dominoinfoLoad())
			.done(function(){
			jq("#chart2").html("");
			chart.chart2({animate: !$.jqplot.use_excanvas});
		});
	})
	/*------------------------------------------------------------*/
	 var chart = (function() {
		 function chart2(option){
			 var data=app.dominoinfo.chart2;
			var s1 = data.s1;
			var grid = {
				gridLineWidth: 1.5,
				gridLineColor: 'rgb(235,235,235)',
				drawGridlines: true
			};
			 var myOptions={
				series:[{
					renderer:$.jqplot.BarRenderer,
					rendererOptions: {
						barWidth: 30
					}
				}],
				axesDefaults:{
					min:0,
					max:100,
					pad:10
				},
				axes: {
					xaxis: {
						renderer: $.jqplot.CategoryAxisRenderer
					}
				},
				grid: grid,
				canvasOverlay: {
					show: true,
					objects: [
						{horizontalLine: {
							name: 'pebbles',
							y: 90,
							lineWidth: 3,
							xOffset: '0',
							color: 'rgb(255, 0, 0)',
							shadow: false
						}},
						{dashedHorizontalLine: {
							name: 'bam-bam',
							y: 75,
							lineWidth: 3,
							dashPattern: [16, 12],
							lineCap: 'round',
							xOffset: 0,
							color: '#fff63f',
							shadow: false
						}}
					]
				}
			};
			myOptions=jq.extend(true,myOptions,option);	//将用户配置合并到 myOptions
			plot1 = $.jqplot('chart2', [s1], myOptions);
		}
		function chart1(option){
			var data=app.dominoinfo.chart1;
			
			var s1 = data.s1;
			var s2 = data.s2;
			var s3 = data.s3;
			var ticks = data.ticks;
			var series=data.series;
			var myOptions={
			seriesColors: [ "#4bb2c5", "#c5b47f", "#EAA228", "#579575", "#839557", "#958c12","#953579", "#4b5de4", "#d8b83f", "#ff5800", "#0085cc"],
			stackSeries: true,
			captureRightClick: true,
			seriesDefaults:{
			  renderer:$.jqplot.BarRenderer,
			  rendererOptions: {
				  // Put a 30 pixel margin between bars.
				  barMargin: 30,
				  // Highlight bars when mouse button pressed.
				  // Disables default highlighting on mouse over.
				  highlightMouseDown: true   
			  },
			  pointLabels: {show: true}
			},
			series:series,
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
			myOptions=jq.extend(true,myOptions,option);	//将用户配置合并到 myOptions
			plot3 = $.jqplot('chart1', [s1, s2, s3], myOptions);
			// Bind a listener to the "jqplotDataClick" event.  Here, simply change
			// the text of the info3 element to show what series and ponit were
			// clicked along with the data for that point.
			$('#chart1').bind('jqplotDataClick', 
			function (ev, seriesIndex, pointIndex, data) {
				console.log('ok');
			  $('#info').html('series: '+seriesIndex+', point: '+pointIndex+', data: '+data);
			}
			); 

		};
		 return {
            chart1 : chart1,
			chart2:chart2
         };
	 })();
  
})();

