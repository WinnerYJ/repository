(function() {
	var Messages=window.i18n.message;
	$(document).on("pagecreate","#taskPlanView",function(e){

	});
	$(document).on("pageinit", "#taskPlanView", function(e) {
		$.when(view.load("footer"))
			.done(function(){ 
				jq("#taskPlanView .footer_bar").html(view.views["footer"]);
				changeFootClass("taskPlanView","taskPlanTab");
				jq.mobile.i18n.applyI18n(jq("#taskPlanView .footer_bar"));
				jq("#taskPlanView .footer_bar").trigger("create");
			});
		
		//初始化，只显示日历，隐藏计划列表和节假日
	});
	jq(document).on("pagebeforeshow", "#taskPlanView", function(e) {
        //busy.show();

		 //渲染日历
       
    });
	jq(document).on("pageshow", "#taskPlanView", function(e) {
		console.log('pagecreate');
		/*
		jq("#taskPlanView .footer_bar").load("footer.html", function() {
            changeFootClass("taskPlanView","taskPlanTab");
            //changeFootLanguage("mainView");
			jq.mobile.i18n.applyI18n(jq("#taskPlanView .footer_bar"));
            jq("#taskPlanView .footer_bar").trigger("create");
        });*/
		 drawCalendar();
    });
	//------------------------------
	var drawCalendar = function() {
		var events=getEvents();
        var option = {
			header: {
				left: 'prev,next today',
				//center: 'title',
				right: 'month,agendaWeek,agendaDay'
			},
			events:events,
			editable:true,
            height : 500, 
			weekends: true,
            dayClick : dayClickFunc,
            weekNumbers : false
        };
        var option445 = {
            height : 500,        
            //dayClick : dayClickFunc,
            month445 : true,
            firstDay : 6
        };
		option=jq.extend(true,{},window.i18n.fullCalendar.option,option);
        jq('#calendar').fullCalendar(option);
		//fullCalendarChangeLanguage("#calendar");
		
        //jq('#calendar_445').fullCalendar(option445);

        return true;
    };
	jq(document).on("tap","#holidaysNavBtn",function(){
		//console.log($('#calendar').html());
	});
	/*********************************************
     * function:dayClickFunc
     * comment:点击日历中的任何一天，触发今日计划的渲染
     ********************************************/
    var dayClickFunc = function(date, allDay, jsEvent, view) {
        //WL.Logger.debug("===day click func");
		console.log('dayClickFunc');
        if (allDay) {
            jq('.fc-state-highlight').removeClass('fc-state-highlight');
            jq(this).addClass('fc-state-highlight');
            //coca.mobile.spv.taskPlan.curSelectedDate = date;
            //renderDayPlanList();
        }

    };
	var getEvents=function(){
		var date = new Date();
		var d = date.getDate();
		var m = date.getMonth();
		var y = date.getFullYear();
		var events=[];
		events.push({title: 'All Day Event',start: new Date(y, m, 1)});
		events.push({
					title: 'Long Event',
					start: new Date(y, m, d-5),
					end: new Date(y, m, d-2)
				});
		events.push({
					id: 999,
					title: 'Repeating Event',
					start: new Date(y, m, d-3, 16, 0),
					allDay: false
				});
		events.push({
					id: 999,
					title: 'Repeating Event',
					start: new Date(y, m, d+4, 16, 0),
					allDay: false
				});
		events.push({
					title: 'Meeting',
					start: new Date(y, m, d, 10, 30),
					allDay: false
				});
		events.push({
					title: 'Lunch',
					start: new Date(y, m, d, 12, 0),
					end: new Date(y, m, d, 14, 0),
					allDay: false
				});
		events.push({
					title: 'Birthday Party',
					start: new Date(y, m, d+1, 19, 0),
					end: new Date(y, m, d+1, 22, 30),
					allDay: false
				});
		events.push({
					title: 'Click for Google',
					start: new Date(y, m, 28),
					end: new Date(y, m, 29),
					url: 'http://google.com/'
				});
		return(events);
	};
})();

