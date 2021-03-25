/************************************************
 * SCRIPT_CONTROLS_GRID_01.js
 * Created at 2021. 2. 3. 오전 9:13:57.
 *
 * @author hee73
 ************************************************/


/**
 * 그리드 행 추가
 */
function insertRow(){
	var vcGrd = app.lookup("rowGrd");
	vcGrd.insertRow(vcGrd.getSelectedRowIndex(),true);
}

/**
 * 그리드 선택된 행을 삭제합니다.
 */
function selectDeleteRow(){
	var vcGrd = app.lookup("rowGrd");
	vcGrd.deleteRow(vcGrd.getSelectedRowIndex());
}


/**
 * 그리드 행 체크된 행 삭제합니다.
 */
function checkedDeleteRow(){
	var vcGrd = app.lookup("rowGrd");
	vcGrd.deleteRow(vcGrd.getCheckRowIndices());
}

/**
 * 그리드 행을 수정합니다.
 */
function updateRow(){
	var vcGrd = app.lookup("rowGrd");
	var rowIndex = vcGrd.getSelectedRowIndex();
	if(rowIndex < 0){
		alert("그리드에서 행을 선택 후 진행하시기 바랍니다.");
		return false;
	}
	var combo = app.lookup("cmbSelectColumn");
	var vsSelVal = combo.value;
	if(vsSelVal == null || vsSelVal == ""){
		alert("컬럼을 선택 후 진행하시기 바랍니다.");
		return false;
	}
	var vcInput = app.lookup("setCellValue");
	var vsValue = vcInput.value;
	vcGrd.setCellValue(rowIndex, vsSelVal, vsValue);
}


/**
 * 그리드 현재 선택된행을 제거합니다.
 */
function clearSelectionGrid(){
	var vcGrd = app.lookup("rowGrd");
	vcGrd.clearSelection();
}

/**
 * 그리드 체크박스에 체크를 제거합니다.
 */
function clearAllCheckGrid(){
	var vcGrd = app.lookup("rowGrd");
	vcGrd.clearAllCheck(); 
}

/**
 * 그리드 선택된 행 데이터 정보를 초기데이터로 세팅합니다.
 */
function revertRowDataGrid(){
	var vcGrd = app.lookup("rowGrd");
	var selectRow = vcGrd.getSelectedRowIndex();
	vcGrd.revertRowData(selectRow);
}

/**
 * 그리드 전체를 초기 데이터 정보로 세팅합니다.
 */
function revertAllDataGrid() {
	var vcGrd = app.lookup("rowGrd");
	vcGrd.revertData();
}

/**
 * 그리드 전체 초기화 세팅
 */
function grdInit(){
	var vcGrd = app.lookup("rowGrd");
 	
	/** @type cpr.controls.gridpart.GridConfig */
	var voGrdOption = {
		dataSet : app.lookup("dsList"),
		resizableColumns : "all",
		autoFit : "all",
		columns : [
			{"width" : "25px"},
			{"width" : "100px"},
			{"width" : "100px"},
			{"width" : "100px"},
			{"width" : "100px"},
			{"width" : "100px"},
			{"width" : "100px"}
		],
		"header" : {
			"rows" : [{"height" : "35px"}],
			"cells" : [
				{
					"constraint" : {"rowIndex" : 0 , "colIndex" : 0},
					"configurator" : function(cell){
						cell.columnType = "checkbox"
						cell.filterable = false;
						cell.sortable = false;
						
					}
				},
				{
					"constraint" : {"rowIndex" : 0 , "colIndex" : 1},
					"configurator" : function(cell){
						cell.targetColumnName = "empId";
						cell.filterable = false;
						cell.sortable = false;
						cell.text = "사번";
					}
				},
				{
					"constraint" : {"rowIndex" : 0, "colIndex" : 2},
					"configurator" : function(cell){
						cell.targetColumnName = "empNm",
						cell.filterable = false;
						cell.sortable =false;
						cell.text = "사원명";
					}
				},
				{
					"constraint" : {"rowIndex" : 0, "colIndex" : 3},
					"configurator" : function(cell){
						cell.targetColumnName = "email",
						cell.filterable = false;
						cell.sortable = false;
						cell.text = "이메일";
					}
				},
				{
					"constraint" : {"rowIndex" : 0, "colIndex" : 4},
					"configurator" : function(cell){
						cell.targetColumnName = "phone",
						cell.filterable = false;
						cell.sortable = false;
						cell.text = "핸드폰";
					}
						
				},
				{
					"constraint" : {"rowIndex" : 0, "colIndex" : 5},
					"configurator" : function(cell){
						cell.targetColumnName = "address",
						cell.filterable = false;
						cell.sortable = false;
						cell.text ="주소";
					}
				},
				{
					"constraint" : {"rowIndex" : 0, "colIndex" : 6},
					"configurator" : function(cell){
						cell.targetColumnName = "rgstDt",
						cell.filterable = false;
						cell.sortable = false;
						cell.text = "등록일자";
					}
				}
			]
		},
		"detail" : {
			"rows" : [{"height" : "30px"}],
			"cells" : [
				{
					"constraint" : {"rowIndex" : 0, "colIndex" : 0},
					"configurator" : function(cell){
						cell.columnType = "checkbox" 
						
					}
				},
				{
					"constraint" : {"rowIndex" : 0, "colIndex" : 1},
					"configurator" : function(cell){
						cell.columnName = "empId"
					}
				},
				{
					"constraint" : {"rowIndex" : 0, "colIndex" : 2},
					"configurator" : function(cell){
						cell.columnName = "empNm"
					}
				},
				{
					"constraint" : {"rowIndex" : 0, "colIndex" : 3},
					"configurator" : function(cell){
						cell.columnName = "email"
					}
				},
				{
					"constraint" : {"rowIndex" : 0, "colIndex" : 4},
					"configurator" : function(cell){
						cell.columnName = "phone"
					}
				},
				{
					"constraint" : {"rowIndex" : 0, "colIndex" : 5},
					"configurator" : function(cell){
						cell.columnName = "address"
					}
				},
				{
					"constraint" : {"rowIndex" : 0, "colIndex" : 6},
					"configurator" : function(cell){
						cell.columnName = "rgstDt"
					}
				}
			]
		}
	}
	vcGrd.init(voGrdOption);
	vcGrd.clearAllCheck();
	vcGrd.revertData();
}
/*
 * "실행" 버튼(btnInsertRow)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnInsertRowClick(/* cpr.events.CMouseEvent */ e){
	/* 동작 실행 */
	insertRow();
	
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = insertRow;
}


/*
 * "실행" 버튼(btnSelectRowDelete)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSelectRowDeleteClick(/* cpr.events.CMouseEvent */ e){
	/* 동작 실행 */
	selectDeleteRow();
	
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = selectDeleteRow;
	
}

/*
 * "실행" 버튼(btnCheckedDeleteRow)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnCheckedDeleteRowClick(/* cpr.events.CMouseEvent */ e){
 	/*동작 실행 */
 	checkedDeleteRow();
 	
 	/* 에디터에 소스 표시 */
 	var vcAceEditor = app.lookup("ace2");
 	vcAceEditor.value = checkedDeleteRow;
}


/*
 * "실행" 버튼(btnUpdateRow)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnUpdateRowClick(/* cpr.events.CMouseEvent */ e){
	/* 동작 실행 */
	updateRow();
	
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = updateRow;
}

/*
 * "실행" 버튼(btnClearAllCheck)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnClearAllCheckClick(/* cpr.events.CMouseEvent */ e){
	/* 동작 실행 */
	clearAllCheckGrid();
	
	/*에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = clearAllCheckGrid;
}


/*
 * "실행" 버튼(btnRevertRowData)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnRevertRowDataClick(/* cpr.events.CMouseEvent */ e){
	/* 동작 실행 */
	revertRowDataGrid();
	
	/* 에디터에 소스표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = revertRowDataGrid;

}

/*
 * "실행" 버튼(btnRevertAllData)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnRevertAllDataClick(/* cpr.events.CMouseEvent */ e){
	/* 동작 실행 */
	revertAllDataGrid();
	
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = revertAllDataGrid;
	
}



/*
 * "실행" 버튼(btnClearSelection)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnClearSelectionClick(/* cpr.events.CMouseEvent */ e){
	/* 동작 실행 */
	clearSelectionGrid();
	
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = clearSelectionGrid;	
}


/*
 * "실행" 버튼(btnInit)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnInitClick(/* cpr.events.CMouseEvent */ e){
	/* 동작 실행 */
	grdInit();
	
	/* 에디터에 소스표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = grdInit;	
}
