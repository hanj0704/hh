/************************************************
 * SCRIPT_CONTROLS_GRID_07.js
 * Created at 2021. 2. 23. 오후 4:56:54.
 *
 * @author hee73
 ************************************************/
	
/**
 * 그리드 셀 병합을 확인합니다.
 */
function cellMerge(){
	var vcGrd = app.lookup("cellGrd");
	var vcCellIndex = app.lookup("cmbCellIndex").value;
	var vcColunmIndex = app.lookup("cmbColunmIndex").value;
	
	vcGrd.detail.getColumn(vcCellIndex).suppressRef = vcColunmIndex;
	
}
/**
 * 그리드 초기 속성 및 디자인 정보를 세팅합니다.
 */
function gridInit(){
	var vcGrd = app.lookup("cellGrd");
 	
	/** @type cpr.controls.gridpart.GridConfig */
	var voGrdOption = {
		dataSet : app.lookup("dsList"),
		resizableColumns : "all",
		autoFit : "all",
		columns : [
			{"width" : "25px"},
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
						cell.columnType = "rowindex"
						cell.filterable = false;
						cell.sortable = false;
						cell.text = "No";
						
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
						cell.targetColumnName = "product",
						cell.filterable = false;
						cell.sortable = false;
						cell.text = "상품";
					}
				},
				{
					"constraint" : {"rowIndex" : 0, "colIndex" : 3},
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
						cell.columnType = "rowindex" ;
						
					}
				},
				{
					"constraint" : {"rowIndex" : 0, "colIndex" : 1},
					"configurator" : function(cell){
						cell.columnName = "productNm";
						cell.suppressible = true;
						cell.mergeToIndexExpr = "product == productNm ? product == productNm ? 3 : 2 : 1"
						cell.mergedColumnName = "productNm"
						
					}
				},
				{
					"constraint" : {"rowIndex" : 0, "colIndex" : 2},
					"configurator" : function(cell){
						cell.columnName = "product";
						cell.suppressible = true;
					}
				},
				{
					"constraint" : {"rowIndex" : 0, "colIndex" : 3},
					"configurator" : function(cell){
						cell.columnName = "price";
						cell.suppressible = true;
					}
				}
			]
		}
	};
	vcGrd.init(voGrdOption);
	vcGrd.clearAllCheck();
}

/*
 * "실행" 버튼(btnCellMerge)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnCellMergeClick(/* cpr.events.CMouseEvent */ e){
	/* 동작 실행 */
	cellMerge();
	
	/*에디터에 소스표시*/
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = cellMerge;
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
