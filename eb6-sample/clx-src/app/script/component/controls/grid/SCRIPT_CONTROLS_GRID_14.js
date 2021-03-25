/************************************************
 * SCRIPT_CONTROLS_GRID_14.js
 * Created at 2021. 3. 8. 오전 11:15:37.
 *
 * @author SUBBY
 ************************************************/

/**
 * 페이지인덱서 컨트롤을 사용하여 그리드의 데이터를 페이징합니다.
 * @param {Number} vnPageRow
 */
function gridPaging(vnPageRow) {
	var vcGridSample = app.lookup("gridPagingSample");
	var vcPageIndexer = app.lookup("pgxPagingSample");
	var currentPageIndex = vcPageIndexer.currentPageIndex;
	
	/* 넘버 에디터에 입력된 수로 페이지 인덱서의 pageRowCount를 지정합니다. */
	vcPageIndexer.pageRowCount = vnPageRow;
	vcPageIndexer.redraw();
	
	/* 페이징의 첫번째 행 번호와 마지막 행 번호를 지정합니다. */
	var startRowIndex = (currentPageIndex - 1) * vcPageIndexer.pageRowCount;
	var endRowIndex = currentPageIndex * vcPageIndexer.pageRowCount;
	
	/* 페이징이 될 때마다 그리드의 첫번째 행의 번호를 지정해줍니다. */
	vcGridSample.rowIndexerStartNum = (startRowIndex + 1);
	
	/* filter 조건을 통해 그리드를 페이징합니다. */
	vcGridSample.setFilter(startRowIndex + " < index && index <= " + endRowIndex);
}

/*
 * "실행" 버튼(btnPaging)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnPagingClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnPaging = e.control;
	
	var vcNumberEditor = app.lookup("nbePageRow");
	var vnPageRow = vcNumberEditor.value;
	
	if(vnPageRow == null || vnPageRow == "") {
		alert("한 페이지에 보여줄 행의 수를 입력해주세요.");
		return;
	}
	
	/* 동작 실행 */
	gridPaging(parseInt(vnPageRow));
	
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = gridPaging;
}

/*
 * 페이지 인덱서에서 selection-change 이벤트 발생 시 호출.
 * Page index를 선택하여 선택된 페이지가 변경된 후에 발생하는 이벤트.
 */
function onPgxPagingSampleSelectionChange( /* cpr.events.CSelectionEvent */ e) {
	/** 
	 * @type cpr.controls.PageIndexer
	 */
	var pgxPagingSample = e.control;
	
	gridPaging(pgxPagingSample.pageRowCount);
}

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad( /* cpr.events.CEvent */ e) {
	gridPaging(app.lookup("pgxPagingSample").pageRowCount);
}
