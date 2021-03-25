/************************************************
 * SCRIPT_CONTROLS_GRID_02.js
 * Created at 2021. 2. 4. 오전 10:11:29.
 *
 * @author hee73
 ************************************************/

/**
 * 그리드 내 트리셀 전체를 접었다 펼수 있습니다.
 */

function treecellAllFoldUnFold() {
	var vcTreecellGrd = app.lookup("treecellGrd");
	var vcRowCount = vcTreecellGrd.rowCount;
	
	for (var idx = 0; idx < vcRowCount; idx++) {
		var row = vcTreecellGrd.getRow(idx);
		row.expanded = !(row.expanded);
	}
}
/**
 * 그리드 내 원하는 행 트리셀을 접었다 펼수 있습니다.
 */
function treecellSelectFoldUnFold(){
	var vcTreecellGrd = app.lookup("treecellGrd");
	var vcSelectRow = vcTreecellGrd.getSelectedRow();

	vcSelectRow.expanded = !(vcSelectRow.expanded);
}

/**
 * 그리드 내 원하는 컬럼을 선택후 값을 입력시 트리셀에 focus가 선택됩니다.
 */
function treecellSearchFocus(){
	var vcTreecellGrd = app.lookup("treecellGrd");
	var vcTreecell = app.lookup("grdTreeCell");
	var vcCmb = app.lookup("cmbSelectColumn").value; 
	var vcIpb = app.lookup("setCellValue").value;
	
	var vsSearch = vcCmb + "*= '" + vcIpb + "' ";
	
	var findFirstRow = vcTreecell.getParent().findFirstRow(vsSearch);
	
	vcTreecellGrd.focusCell(findFirstRow.getIndex(), vcCmb);
}

/*
 * "실행" 버튼(btnFoldUnFold)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnFoldUnFoldClick(/* cpr.events.CMouseEvent */ e){
	/* 동작 실행 */
	treecellAllFoldUnFold();
	
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = treecellAllFoldUnFold;
}


/*
 * "실행" 버튼(btnSelectRow)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSelectRowClick(/* cpr.events.CMouseEvent */ e){
	/* 동작 실행 */
	treecellSelectFoldUnFold();
	
	/* 에디터에 소스표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = treecellSelectFoldUnFold;
	
}


/*
 * "실행" 버튼(btnSearchRowFocus)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSearchRowFocusClick(/* cpr.events.CMouseEvent */ e){
	/* 동작 실행 */
	treecellSearchFocus();
	
	/*에디터에 소스표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = treecellSearchFocus;
	
}
