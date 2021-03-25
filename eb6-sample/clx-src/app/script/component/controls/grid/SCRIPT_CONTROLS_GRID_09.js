/************************************************
 * SCRIPT_CONTROLS_GRID_09.js
 * Created at 2021. 3. 4. 오후 2:17:44.
 *
 * @author hee73
 ************************************************/
/**
 * 그리드 디테일 컬럼네임으로 헤더 컬럼 취득
 * @param {#Grid} psGridId 그리드ID
 * @param {String} psColumnName 컬럼명
 */
function getHeaderColumn(psGridId, psColumnName){
	/** @type cpr.controls.Grid*/
	var vcGrd = app.lookup(psGridId);
	var vaDetailColumn = vcGrd.detail.getColumnByName(psColumnName);
	
	var vaHeaderColumns = new Array();
	vaDetailColumn.forEach(function(aColumn){
		var vaHeaderColumn = vcGrd.header.getColumnByColIndex(aColumn.colIndex, aColumn.colSpan);
		vaHeaderColumn.forEach(function(bColumn){
			vaHeaderColumns.push(bColumn);
		});
	});
	
	return vaHeaderColumns;
}


/**
 * 그리드 컬럼을 숨기도록 변경한다.
 * @param {#Grid} psGridId 그리드 ID
 * @param {String} psColumnName 컬럼 명
 */
function hideColumn(psGridId, psColumnName){
	var vcGrd = app.lookup(psGridId);
	var vaColumns = getHeaderColumn(psGridId, psColumnName);
	if(vaColumns.length > 0){
		vcGrd.columnVisible(vaColumns[0].cellIndex, false)
	}

}

/**
 * 그리드 컬럼을 보이도록 변경한다.
 * @param {#Grid} psGridId 그리드 ID
 * @param {String} psColumnName 컬럼 명
 */
function showColumn(psGridId, psColumnName){
	var vcGrd = app.lookup(psGridId);
	var vaColumns = getHeaderColumn(psGridId, psColumnName);
	if(vaColumns.length > 0){
		vcGrd.columnVisible(vaColumns[0].cellIndex, true);
	}
}


/**
 * 그리드 초기 속성 및 디자인 정보를 세팅합니다.
 */
function gridInit(){
	var vcGrd = app.lookup("columnGrd");
	
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
	vcGrd.visible = true
}
/*
 * "실행" 버튼(btnHideColumn)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnHideColumnClick(/* cpr.events.CMouseEvent */ e){
	/* 동작 실행 */
	var cmbHideColumn = app.lookup("cmbHideColumn").value;
	hideColumn("columnGrd", cmbHideColumn);
	
	
	/* 에디터에 소스표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = hideColumn;
}


/*
 * "실행" 버튼(btnShowColumn)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnShowColumnClick(/* cpr.events.CMouseEvent */ e){
	/* 동작 실행 */
	var cmbShowColumn = app.lookup("cmbShowColumn").value;
	showColumn("columnGrd", cmbShowColumn);
	
	/* 에디터에 소스표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = showColumn;
	
}


/*
 * "실행" 버튼(btninit)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtninitClick(/* cpr.events.CMouseEvent */ e){
	/* 동작 실행 */
	gridInit();
	
	/* 에디터에 소스표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = gridInit;
	
}
