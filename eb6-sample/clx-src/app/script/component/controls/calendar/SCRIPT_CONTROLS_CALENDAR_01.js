/************************************************
 * SCRIPT_CONTROLS_DATEINPUT_02.js
 * Created at 2021. 3. 9. 오후 3:52:30.
 *
 * @author hee73
 ************************************************/

function calActiveDisabeld(){
	
	var vcCalendar = app.lookup("calActiveDisabled");
 
	var vcCmbActiveDisabled = app.lookup("cmbActiveDisabled");
	
	if(vcCmbActiveDisabled.value == "value1"){
		vcCalendar.calendarType = "yearmonthdate";
		vcCalendar.enabledDateExp = "getDate() != 28";
		
	} else if(vcCmbActiveDisabled.value == "value2"){
		vcCalendar.calendarType = "yearmonth";
		vcCalendar.enabledDateExp = "this.getMonth() == 1 "
		 						   + "|| this.getMonth() == 3"
		 						   + "|| this.getMonth() == 5"
		 						   + "|| this.getMonth() == 7"
		 						   + "|| this.getMonth() == 9"
		 						   + "|| this.getMonth() == 11"
		 						   
	} else if(vcCmbActiveDisabled.value == "value3") {
		vcCalendar.calendarType = "year";
		vcCalendar.enabledDateExp = "getFullYear() == 2021";
		
	} else if(vcCmbActiveDisabled.value == "value4") {
		vcCalendar.calendarType = "yearmonthdate";
		vcCalendar.enabledDateExp = "this.getDate() == 15"
		 						   + "|| this.getDate() == 25"
		  						   + "|| this.getDate() == 28"
		  						   
	} else if(vcCmbActiveDisabled.value == "value5") {
		vcCalendar.calendarType = "yearmonthdate";
		vcCalendar.enabledDateExp = "this.getDate() != 15"
		 						   + "&& this.getDate() != 25"
		  						   + "&& this.getDate() != 28"
	}
}


/*
 * "실행" 버튼(btnMomentToday)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnMomentTodayClick(/* cpr.events.CMouseEvent */ e){
	/* 동작 실행 */
	calActiveDisabeld();
	
	/*에디터에 소스표시*/
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = calActiveDisabeld;
}
