/************************************************
 * STYLE_CONTROLS_DIALOG_01.js
 * Created at 2021. 2. 4. 오전 10:38:19.
 *
 * @author ryu
 ************************************************/

var handy = comeInHandy();

/*
 * "실행" 버튼(btnOpenDlg)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnOpenDlgClick(/* cpr.events.CMouseEvent */ e){
	
	app.getRootAppInstance().openDialog("app/style/component/controls/dialog/STYLE_CONTROLS_DIALOG_01_A", {width: 400, height: 250}, function(dialog) {
		dialog.style.addClass("modal");
		dialog.style.overlay.addClass("light-modal-overlay");
	});
}


/*
 * "다이얼로그 사용 샘플 바로보기" 버튼(btnLink)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnLinkClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnLink = e.control;
	
	handy.load(app, "app/script/component/controls/dialog/SCRIPT_CONTROLS_DIALOG_01");
}
