/************************************************
 * SCRIPT_CONTROLS_DIALOG_01_A.js
 * Created at 2021. 2. 2. 오후 5:25:48.
 *
 * @author ryu
 ************************************************/

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	var voHostAppIns = app.getHostAppInstance();
	
	/* 해당 팝업이 팝업으로 열렸는지 부모로 확인 */
	if (voHostAppIns){
		/* initValue 가져옴 */
		var vsInitVal = app.getHostProperty("initValue");
		if (vsInitVal != null && vsInitVal != ""){
			app.lookup("lblVal").value = vsInitVal;
		}
	}
}


/*
 * "확인" 버튼(btnSubmit)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSubmitClick(/* cpr.events.CMouseEvent */ e){
	var vsRtrnVal = app.lookup("ipbRtnVal").value;
	
	app.close(vsRtrnVal);
}


/*
 * "닫기" 버튼(btnClose)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnCloseClick(/* cpr.events.CMouseEvent */ e){
	app.close();
}


/*
 * "실행" 버튼(btnRtrnVal)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnRtrnValClick(/* cpr.events.CMouseEvent */ e){
	var ace = app.lookup("acePop");
	ace.value = onBtnSubmitClick;
}
