/************************************************
 * DesignGuide.js
 * Created at 2020. 8. 18. 오후 4:49:40.
 *
 * @author ryu
 ************************************************/

cpr.core.NotificationCenter.INSTANCE.subscribe("app-msg", this, function(msg) {
	var notifier = app.lookup("noti");
	if (msg.success == true) {
		notifier.success(msg.msg);
	} else if (msg.info == true) {
		notifier.info(msg.msg);
	} else if (msg.warning == true) {
		notifier.warning(msg.msg);
	} else if (msg.danger == true) {
		notifier.danger(msg.msg);
	} else {
		notifier.notify(msg.msg);
	}
});

/*
 * "Default" 버튼(btnDefault)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnDefaultClick(/* cpr.events.CMouseEvent */ e){
	cpr.core.NotificationCenter.INSTANCE.post("app-msg", {
		msg : "notify message"
	});
}


/*
 * "Info" 버튼(btnInfo)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnInfoClick(/* cpr.events.CMouseEvent */ e){
	cpr.core.NotificationCenter.INSTANCE.post("app-msg", {
		msg : "notify message",
		info : true
	});
}


/*
 * "Success" 버튼(btnSuccess)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSuccessClick(/* cpr.events.CMouseEvent */ e){
	cpr.core.NotificationCenter.INSTANCE.post("app-msg", {
		msg : "notify message",
		success : true
	});
}


/*
 * "Warning" 버튼(btnWarning)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnWarningClick(/* cpr.events.CMouseEvent */ e){
	cpr.core.NotificationCenter.INSTANCE.post("app-msg", {
		msg : "notify message",
		warning : true
	});
}


/*
 * "Danger" 버튼(btnDanger)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnDangerClick(/* cpr.events.CMouseEvent */ e){
	cpr.core.NotificationCenter.INSTANCE.post("app-msg", {
		msg : "notify message",
		danger : true
	});
}


/*
 * "Open" 버튼(btnDlg)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnDlgClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnDlg = e.control;
	
	app.getRootAppInstance().openDialog("theme/guide/imp/Popup", {
		width: 450,
		height: 320,
		headerMin : true,
		headerMax : true
	}, function(dialog) {
		
	});
}


/*
 * "추가" 버튼(btnAdd)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnAddClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnAdd = e.control;
	
	var vcGrid = app.lookup("grdMst");
	
	var vnSelectedRowIdx = vcGrid.getSelectedRowIndex();
	
	if (vnSelectedRowIdx != -1){
		vcGrid.insertRow(vnSelectedRowIdx, true);
	} else {
		vcGrid.insertRow(0, false);
	}
}


/*
 * "삭제" 버튼(btnDelete)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnDeleteClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnDelete = e.control;
	
	var vcGrid = app.lookup("grdMst");
	
	vcGrid.deleteRow(vcGrid.getCheckRowIndices());
}


/*
 * "저장" 버튼(btnSave)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSaveClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnSave = e.control;
	
	var vcGrid = app.lookup("grdMst");
	
	vcGrid.commitData();
}
