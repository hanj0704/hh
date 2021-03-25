/************************************************
 * SCRIPT_CONTROLS_DIALOG_01.js
 * Created at 2021. 2. 2. 오후 4:13:05.
 *
 * @author ryu
 ************************************************/

/**
 * 
 * @param {#app} psAppId 앱 ID
 * @param {
 *   width : Number <!-- 다이얼로그 너비 -->,
 *   height : Number <!-- 다이얼로그 높이 -->,
 *   left? : Number <!-- 다이얼로그 left 위치 -->,
 *   top? : Number <!-- 다이얼로그 top 위치 -->,
 *   right? : Number <!-- 다이얼로그 right 위치 -->,
 *   bottom? : Number <!-- 다이얼로그 bottom 위치 -->,
 *   headerClose? : Boolean <!-- 닫기 버튼 표시 여부 -->,
 *   headerMax? : Boolean <!-- 최대화 버튼 표시 여부 -->,
 *   headerMin? : Boolean <!-- 최소화 버튼 표시 여부 -->,
 *   headerMovable? : Boolean <!-- 다이얼로그 위치 이동 여부 -->,
 *   headerVisible? : Boolean <!-- 다이얼로그 헤더 표시 여부 -->,
 *   modal? : Boolean <!-- 다이얼로그 모달 표시 여부 -->,
 *   resizable : Boolean <!-- 다이얼로그 크기 변경 가능 여부 -->
 * } poProp 다이얼로그 속성을 정의할 프로퍼티
 * @param {any} poInitValue? 임베디드 앱 시작 시 전달받을 값
 */
function openDialog(psAppId, poProp, poInitValue) {
	/* 타켓 AppInstance에 따라 다이얼로그가 열리는 위치가 달라질 수 있음 */
	app.getRootAppInstance().openDialog(psAppId, poProp, function(/* cpr.controls.Dialog */ dialog){
		/* 다이얼로그 헤더 텍스트 */
		dialog.headerTitle = app.lookup("ipbHdTxt").value;
		
		/* 임베딩이 준비된 후 처리할 작업 등록 */
		dialog.ready(function(ea){
			ea.initValue = poInitValue;
		});
		
		/* 다이얼로그가 닫혔을 때에 대한 이벤트 정의 */
		dialog.addEventListener("close", function(/* cpr.events.CUIEvent */ e){
			var control = e.control;
			
			/** @type String */
			var vsRtrnVal = control.returnValue;
			
			/* 결과값에 returnValue를 설정 */
			app.lookup("lblVal").value = vsRtrnVal;
		});
	});
}

/*
 * "실행" 버튼(btnOpenDlg)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnOpenDlgClick(/* cpr.events.CMouseEvent */ e){
	if (ValueUtil.isNull(app.lookup("nbeWidth").value) || ValueUtil.isNull(app.lookup("nbeHeight").value)){
		alert("다이얼로그 크기값(width, height)은 필수입니다.");
		return;
	}
	
	/* 동작 실행 */
	var voProp = {
		"width" : app.lookup("nbeWidth").numberValue,
		"height" : app.lookup("nbeHeight").numberValue,
		"headerClose" : app.lookup("cbxClose").checked,
		"headerMax" : app.lookup("cbxMax").checked,
		"headerMin" : app.lookup("cbxMin").checked,
		"headerMovable" : app.lookup("cbxMvable").checked,
		"headerVisible" : app.lookup("cbxHdVisible").checked,
		"modal" : app.lookup("cbxModal").checked,
		"resizable" : app.lookup("cbxRszable").checked
	}
	
	/* left나 top이 빈값인 경우 다이얼로그가 가운데 위치할 수 있도록 따로 값 설정 */
	var vnLeftVal = app.lookup("nbeLeft").numberValue;
	if (vnLeftVal > 0){
		voProp["left"] = vnLeftVal;
	}
	
	var vnTopVal = app.lookup("nbeTop").numberValue;
	if (vnLeftVal > 0){
		voProp["top"] = vnTopVal;
	}
	
	/* 다이얼로그로 넘길 초기 값 */
	var vsInitValue = app.lookup("ipbInitVal").value;
	
	openDialog("app/script/component/controls/dialog/SCRIPT_CONTROLS_DIALOG_01_A", voProp, vsInitValue);
	
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = openDialog;
}
