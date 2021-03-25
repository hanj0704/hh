/************************************************
 * SCRIPT_CONTROLS_GRID_15.js
 * Created at 2021. 3. 9. 오전 11:05:31.
 *
 * @author SUBBY
 ************************************************/

/**
 * 컨텍스트 메뉴를 생성합니다.
 * @param {cpr.events.CMouseEvent} event 마우스 이벤트
 */
function setContextMenu(event) {
	/* 기존의 우클릭 시 나오던 메뉴를 실행하지 않음 */
	event.preventDefault();
	
	var targetItem = {
		cellIndex : event.targetObject.cellIndex,	// 이벤트가 발생한 셀 인덱스
		rowIndex : event.targetObject.rowIndex		// 이벤트가 발생한 행 인덱스
	}
	
	/* 그리드 헤더 셀을 제외한 나머지 셀에서만 컨텍스트 메뉴 생성 */
	if (targetItem.rowIndex >= 0) {
		/* 컨텍스트 메뉴를 동적으로 생성 */
		var vcContextMenu = new cpr.controls.Menu("contextMenu");
		
		/* 컨텍스트 메뉴의 하위 항목 생성 */
		vcContextMenu.addItem(new cpr.controls.TreeItem("label1", "value1", ""));
		vcContextMenu.addItem(new cpr.controls.TreeItem("label2", "value2", ""));
		vcContextMenu.addItem(new cpr.controls.TreeItem("label3", "value3", ""));
		vcContextMenu.addItem(new cpr.controls.TreeItem("label4", "value4", "value1"));
		vcContextMenu.addItem(new cpr.controls.TreeItem("label5", "value5", "value2"));
		vcContextMenu.addItem(new cpr.controls.TreeItem("label6", "value6", "value2"));
		
		/* 컨텍스트 메뉴의 위치를 지정 */
		var voAppRect = app.getActualRect();
		
		vcContextMenu.style.css({
			position: "absolute",
			top: "" + (event.clientY - voAppRect.top) + "px",
			left: "" + (event.clientX - voAppRect.left) + "px",
			width: "200px"
		});
		
		/* 앱 위에 컨텍스트 메뉴 배치 */
		app.floatControl(vcContextMenu);
		
		/* floatControl API를 통해 배치된 메뉴에 포커스 지정 */
		vcContextMenu.focus();
		
		/* 메뉴 컨트롤에 blur 이벤트 지정 이후, blur 될 때 dispose API를 통해 메뉴 객체 삭제 */
		vcContextMenu.addEventListener("blur", function(e) {
			vcContextMenu.dispose();
		});
	}
}

/*
 * 그리드에서 contextmenu 이벤트 발생 시 호출.
 * 마우스의 오른쪽 버튼이 클릭되거나 컨텍스트 메뉴 키가 눌려지면 호출되는 이벤트.
 */
function onGridContextMenuContextmenu( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Grid
	 */
	var gridContextMenu = e.control;
	
	/* 동작 실행 */
	setContextMenu(e);
	
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = setContextMenu;
}
