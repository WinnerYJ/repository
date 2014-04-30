/*
 * jQuery Mobile Framework : plugin to provide a date and time picker.
 * Copyright (c) JTSage
 * CC 3.0 Attribution.  May be relicensed without permission/notifcation.
 * https://github.com/jtsage/jquery-mobile-datebox
 *
 * Translation by: J.T.Sage <jtsage@gmail.com>
 *
 */

jQuery.extend(jQuery.mobile.datebox.prototype.options.lang, {
	'en': {
		setDateButtonLabel: "Set Date",
		setTimeButtonLabel: "Set Time",
		setDurationButtonLabel: "Set Duration",
		calTodayButtonLabel: "Jump to Today",
		titleDateDialogLabel: "Choose Date",
		titleTimeDialogLabel: "Choose Time",
		daysOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
		daysOfWeekShort: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
		monthsOfYear: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
		monthsOfYearShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
		durationLabel: ["Days", "Hours", "Minutes", "Seconds"],
		durationDays: ["Day", "Days"],
		tooltip: "Open Date Picker",
		nextMonth: "Next Month",
		prevMonth: "Previous Month",
		timeFormat: 12,
		headerFormat: '%A, %B %-d, %Y',
		dateFieldOrder: ['m', 'd', 'y'],
		timeFieldOrder: ['h', 'i', 'a'],
		slideFieldOrder: ['y', 'm', 'd'],
		dateFormat: "%-m/%-d/%Y",
		useArabicIndic: false,
		isRTL: false,
		calStartDay: 0,
		clearButton: "Clear",
		durationOrder: ['d', 'h', 'i', 's'],
		meridiem: ["AM", "PM"],
		timeOutput: "%l:%M %p",
		durationFormat: "%Dd %DA, %Dl:%DM:%DS",
		calDateListLabel: "Other Dates"
	},
	'zh': {
		setDateButtonLabel: "设置日期",
		setTimeButtonLabel: "设置时间",
		setDurationButtonLabel: "Set Duration",
		calTodayButtonLabel: "Jump to Today",
		titleDateDialogLabel: "选择日期",
		titleTimeDialogLabel: "选择时间",
		daysOfWeek: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
		daysOfWeekShort: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
		monthsOfYear: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
		monthsOfYearShort: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
		durationLabel: ["Days", "Hours", "Minutes", "Seconds"],
		durationDays: ["Day", "Days"],
		tooltip: "Open Date Picker",
		nextMonth: "Next Month",
		prevMonth: "Previous Month",
		timeFormat: 12,
		headerFormat: '%Y年%m月%d日,%A',
		dateFieldOrder: ['y', 'm', 'd'],
		timeFieldOrder: ['h', 'i', 'a'],
		slideFieldOrder: ['y', 'm', 'd'],
		dateFormat: "%Y-%m-%d",
		useArabicIndic: false,
		isRTL: false,
		calStartDay: 0,
		clearButton: "Clear",
		durationOrder: ['d', 'h', 'i', 's'],
		meridiem: ["AM", "PM"],
		timeOutput: "%l:%M %p",
		durationFormat: "%Dd %DA, %Dl:%DM:%DS",
		calDateListLabel: "Other Dates"
	}
});
jQuery.extend(jQuery.mobile.datebox.prototype.options, {
	useLang: 'zh'
});

