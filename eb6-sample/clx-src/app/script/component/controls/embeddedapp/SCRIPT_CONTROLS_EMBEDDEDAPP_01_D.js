/************************************************
 * SCRIPT_CONTORLS_EMBEDDEDAPP_01_INITVALUE.js
 * Created at 2021. 2. 15. 오전 9:23:45.
 *
 * @author SUBBY
 ************************************************/

/**
 * 앱을 호출한 곳에서 전달한 값을 가져와서 output에 표시합니다.
 */
function initValue() {
	var vcOpt = app.lookup("optInitValue");
	
	var vsInitValue = app.getHost().initValue;
	
	vcOpt.value = "전달받은 값 : " + vsInitValue;
}

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad( /* cpr.events.CEvent */ e) {
	initValue();
}
