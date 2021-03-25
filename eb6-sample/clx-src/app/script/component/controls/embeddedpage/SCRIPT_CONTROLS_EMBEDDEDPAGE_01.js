/************************************************
 * SCRIPT_CONTROLS_EMBEDDEDPAGE_01.js
 * Created at 2021. 3. 2. 오후 4:52:28.
 *
 * @author SUBBY
 ************************************************/

/**
 * 임베디드 페이지의 해당 메소드를 호출합니다.
 */
function callPageMethod() {
	var vcEmbeddedPageSample = app.lookup("embeddedPageSample");
	
	/* 임베디드 페이지 객체에 앱 객체를 속성으로 설정 */
	vcEmbeddedPageSample.setPageProperty("_ownerApp", app);
	
	/* 임베디드 페이지에 호출된 페이지에 해당 메소드가 있는지 판별 */
	if(vcEmbeddedPageSample.hasPageMethod("jspSendValueToClx")) {
		/* 해당 메소드를 호출 */
		vcEmbeddedPageSample.callPageMethod("jspSendValueToClx");
	}
}

/*
 * "실행" 버튼(btnCallPageMethod)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnCallPageMethodClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnCallPageMethod = e.control;
	
	var vcEmbeddedPageSample = app.lookup("embeddedPageSample");
	
	/* 동작 실행 */
	callPageMethod();
	
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = "/* 임베디드 페이지의 해당 메소드를 호출합니다. */" + callPageMethod;
	
	var vcAceEditorOfJsp = app.lookup("aceOfJsp");
	vcAceEditorOfJsp.value = "/* jsp 화면에서 eXBuilder6 화면으로 파라미터를 전송하는 메소드이며, jsp에서 선언되어있음 */" + vcEmbeddedPageSample.getPageProperty("jspFunc");
}
