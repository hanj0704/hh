/************************************************
 * SCRIPT_CONTROLS_GRID_05.js
 * Created at 2021. 2. 17. 오후 5:06:49.
 *
 * @author hee73
 ************************************************/
/**
 * 그리드 행에 대한 데이터 값을 결과값에 보여줍니다.
 */
function selectRowData(){
	var vcGrd = app.lookup("rowGrd");
	var vsGrdData = vcGrd.getSelectedRow().getRowData();
	
	/* 결과값에 표시합니다. */
	app.lookup("lblVal").value = JSON.stringify(vsGrdData);
}

/**
 * 그리드 선택한 행,선택한 컬럼에 대한 셀 결과값에 보여줍니다.
 */
function cellValue(){
	var vcGrd = app.lookup("rowGrd");
	var vcCmb = app.lookup("cmbSelectColumn");
	var vsCellValue = vcGrd.getCellValue(vcGrd.getSelectedRowIndex(), vcCmb.value);
	
	/* 결과값에 표시합니다. */
	app.lookup("lblVal").value = vcCmb.value + " : " + vsCellValue;
}

/**
 * 그리드 체크박스 체크된 행에 대한 Index값을 결과값에 보여줍니다
 */
function checkedRowIndex(){
	var vcGrd = app.lookup("rowGrd");
	var vsCheckedRow = vcGrd.getCheckRowIndices();
	
	/* 결과값에 표시합니다. */
	app.lookup("lblVal").value = vsCheckedRow + "";
}

/**
 * 그리드 선택한 행에 대한 Index값을 결과값에 보여줍니다.
 */
function selectRowIndex(){
	var vcGrd = app.lookup("rowGrd");
	var vsSelectRow = vcGrd.getSelectedRowIndex();
	
	/* 결과값에 표시합니다. */
	app.lookup("lblVal").value = vsSelectRow
}
/**
 * 그리드 컬럼을 선택후 컬럼값을 입력 focus로 보여집니다.
 */
function searchRow(){
	var vcGrd = app.lookup("rowGrd");
	var vcSearchCmb = app.lookup("cmbSearch").value;
	var vcSearchIpb = app.lookup("ipbSearch").value;
	
	var vsSearch = vcSearchCmb + "*= '" + vcSearchIpb + "' ";
	
	var findRow = vcGrd.findFirstRow(vsSearch);
	
	var vnIndex = findRow.getIndex(); 
	
	vcGrd.focusCell(vnIndex, vcSearchCmb);
}

/*
 * 그리드에서 cell-click 이벤트 발생 시 호출.
 * Grid의 Cell 클릭시 발생하는 이벤트.
 */
function onRowGrdCellClick(/* cpr.events.CGridMouseEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var vcGrd = e.control;
	
	if(e.shiftKey == true){
		vcGrd.getSelectedRowIndices().forEach(function(each){	
			//현재 선택된 행의 체크박스를 체크합니다.
			vcGrd.setCheckRowIndex(each, true);
		});
	}
	
}

/*
 * "▲" 버튼(btnUpRow)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnUpRowClick(/* cpr.events.CMouseEvent */ e){
	
	var vcGrd = app.lookup("rowGrd");
	var vnRowIndex = vcGrd.getSelectedRowIndex();
	
	var vcDataSet = vcGrd.dataSet;
	
	if(vnRowIndex > 0){
		//데이터 셋 row를 변경합니다.
		vcDataSet.changeRowIndex(vnRowIndex, vnRowIndex -1);
		//변경된 row로 focus를 변경합니다.
		vcGrd.focusCell(vnRowIndex -1, 0);
	}
	
	vcGrd.redraw();
}

/*
 * "▼" 버튼(btnDownRow)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnDownRowClick(/* cpr.events.CMouseEvent */ e){
	var vcGrd = app.lookup("rowGrd");
	var vnRowIndex = vcGrd.getSelectedRowIndex();
	var vnRowCnt = vcGrd.getRowCount();
	
	var vcDataSet = vcGrd.dataSet;
	
	//그리드 focus가 그리드 내에 있을경우 & 총 row수보다 적을때 동작합니다.
	if(vnRowIndex > -1 && vnRowIndex < vnRowCnt -1){
		//데이터 셋 row를 변경합니다.
		vcDataSet.changeRowIndex(vnRowIndex, vnRowIndex + 1);
		//변경된 row로 focus를 변경합니다.
		vcGrd.focusCell(vnRowIndex +1, 0);
	}
	
	vcGrd.redraw();
}

/**
 * 그리드 초기 속성 및 디자인 정보를 세팅합니다.
 */
function gridInit(){
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
						cell.targetColumnName = "productNm";
						cell.filterable = false;
						cell.sortable = false;
						cell.text = "상품명";
					}
				},
				{
					"constraint" : {"rowIndex" : 0, "colIndex" : 2},
					"configurator" : function(cell){
						cell.targetColumnName = "brand",
						cell.filterable = false;
						cell.sortable =false;
						cell.text = "브랜드";
					}
				},
				{
					"constraint" : {"rowIndex" : 0, "colIndex" : 3},
					"configurator" : function(cell){
						cell.targetColumnName = "product",
						cell.filterable = false;
						cell.sortable = false;
						cell.text = "상품";
					}
				},
				{
					"constraint" : {"rowIndex" : 0, "colIndex" : 4},
					"configurator" : function(cell){
						cell.targetColumnName = "price",
						cell.filterable = false;
						cell.sortable = false;
						cell.text = "가격";
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
						cell.columnType = "checkbox" ;
						
					}
				},
				{
					"constraint" : {"rowIndex" : 0, "colIndex" : 1},
					"configurator" : function(cell){
						cell.columnName = "productNm";
						
					}
				},
				{
					"constraint" : {"rowIndex" : 0, "colIndex" : 2},
					"configurator" : function(cell){
						cell.columnName = "brand";
					}
				},
				{
					"constraint" : {"rowIndex" : 0, "colIndex" : 3},
					"configurator" : function(cell){
						cell.columnName = "product";
					}
				},
				{
					"constraint" : {"rowIndex" : 0, "colIndex" : 4},
					"configurator" : function(cell){
						cell.columnName = "price";
					}
				}
			]
		}
	};
	vcGrd.init(voGrdOption);
	vcGrd.clearAllCheck();
	vcGrd.clearSelection();
	vcGrd.redraw();
}
/*
 * "실행" 버튼(btnSelectRowData)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSelectRowDataClick(/* cpr.events.CMouseEvent */ e){
	/* 동작 실행 */
	selectRowData();
	
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = selectRowData;
}

/*
 * "실행" 버튼(btnCellValue)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnCellValueClick(/* cpr.events.CMouseEvent */ e){
	/*동작 실행 */
	cellValue();
	
	/* 에디터에 소스표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = cellValue;
}


/*
 * "실행" 버튼(btnCheckedRowIndex)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnCheckedRowIndexClick(/* cpr.events.CMouseEvent */ e){
	/* 동작 실헹 */
	checkedRowIndex();
	
	/* 에디터에 소스표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = checkedRowIndex;
}


/*
 * "실행" 버튼(btnSelectRow)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSelectRowClick(/* cpr.events.CMouseEvent */ e){
	/* 동작 실헹 */
	selectRowIndex();
	
	/* 에디터에 소스표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = selectRowIndex;
}


/*
 * "실행" 버튼(btnInit)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnInitClick(/* cpr.events.CMouseEvent */ e){
	/* 동작 실행 */
	gridInit();
	
	/* 에디터에 소스표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = gridInit;
}


/*
 * "실행" 버튼(btnRowMultiCheck)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnRowMultiCheckClick(/* cpr.events.CMouseEvent */ e){
	/* 에디터에 소스표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = onRowGrdCellClick;
}


/*
 * "실행" 버튼(btnRowChange)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnRowChangeClick(/* cpr.events.CMouseEvent */ e){
	/* 에디터에 소스표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = onBtnUpRowClick + onBtnDownRowClick;
	
}


/*
 * "실행" 버튼(btnSearchRow)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSearchRowClick(/* cpr.events.CMouseEvent */ e){
	/* 동작 실행 */
	searchRow();
	
	/* 에디터에 소스표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = searchRow; 
	
}

