/************************************************
 * Ace.js
 * Created at 2021. 1. 26. 오후 5:21:36.
 *
 * @author ryu
 ************************************************/

var editor = null;
var vmCode ;
/**
 * Ace 에디터를 사용하기 위해 HTML 스니펫에 소스를 적용합니다.
 */
function setAceEditor() {
	var vsAceEditorId = app.getHost().id;
	var vcHspAce = app.lookup("hspAce");
	
	var vsCode = beautify();
	
	
	vcHspAce.value = "<div id='" + vsAceEditorId + "' class='ace-editor'></div>";
	
	if(editor){
		editor.setValue(vsCode, -1);
	}
}

/**
 * 소스 코드를 정렬합니다.
 * @return {String}
 */
function beautify() {
	var vsOriginCode = app.getAppProperty("value");
	
	if (vsOriginCode == null || vsOriginCode == ""){
		return "";
	}
	
	var vsCode = String(vsOriginCode);
	
	var vsSrcTy = app.getAppProperty("language");
	var vsSrcLng = vsSrcTy.substring(vsSrcTy.lastIndexOf("/") + 1, vsSrcTy.length);
	if (vsSrcLng == "javascript"){
		vsCode = js_beautify(vsCode);
	} else if (vsSrcLng == "css") {
		vsCode = css_beautify(vsCode);
	} else if (vsSrcLng == "html") {
		vsCode = html_beautify(vsCode);
	}
	
	return vsCode;
}

/**
 * Ace Editor를 실행합니다.
 */
function executeAceEditor() {
	var vsAceEditorId = app.getHost().id;
	
	var vsEditerId_ = "#" + vsAceEditorId;
	
	cpr.core.DeferredUpdateManager.INSTANCE.asyncExec(function() {
	
		editor = ace.edit(vsAceEditorId);
		editor.setTheme(app.getAppProperty("theme"));
		editor.session.setMode(app.getAppProperty("language"));
		editor.setOptions({
			fontSize: "15px"
		});
		
		heightUpdateFunction();
	});
}


/**
 * Ace Editor의 크기를 조절합니다.
 */
function heightUpdateFunction() {
	var vnNewHeight = editor.getSession().getScreenLength() * editor.renderer.lineHeight + editor.renderer.scrollBar.getWidth();
	
	var vcGrpCn = app.getContainer();
	var voGrpCnLt = vcGrpCn.getLayout();
	
	voGrpCnLt.setRowMinHeight(1, vnNewHeight + 20);
};


/*
 * 루트 컨테이너에서 before-draw 이벤트 발생 시 호출.
 * 그룹 컨텐츠가 그려지기 직전에 호출되는 이벤트 입니다. 내부 컨텐츠를 동적으로 구성하기위한 용도로만 사용됩니다.
 */
function onBodyBeforeDraw(/* cpr.events.CUIEvent */ e){
	setAceEditor();
	
	executeAceEditor();
}


/*
 * 루트 컨테이너에서 property-change 이벤트 발생 시 호출.
 * 앱의 속성이 변경될 때 발생하는 이벤트 입니다.
 */
function onBodyPropertyChange(/* cpr.events.CPropertyChangeEvent */ e){
	if (e.property == "value" && editor != null){
		setAceEditor();
	
		executeAceEditor();
	}
}


/*
 * 체크 박스에서 value-change 이벤트 발생 시 호출.
 * CheckBox의 value를 변경하여 변경된 값이 저장된 후에 발생하는 이벤트.
 */
function onCbxFldEdtValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.CheckBox
	 */
	var cbxFldEdt = e.control;
	
	var vcGrpCn = app.getContainer();
	var voGrpCnLt = vcGrpCn.getLayout();
	
	var vbFold = cbxFldEdt.checked;
	voGrpCnLt.setRowVisible(1, !vbFold);
}


/*
 * 버튼(btnCp)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnCpClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnCp = e.control;

	editor.selectAll();
	editor.focus();
	document.execCommand("copy");
	
	editor.clearSelection();
}
