/************************************************
 * SCRIPT_CONTROLS_GRID_04.js
 * Created at 2021. 2. 10. 오전 11:32:01.
 *
 * @author ryu
 ************************************************/


/**
 * 그리드 초기 속성 및 디자인 정보를 세팅합니다.
 */
function initGrid() {
	var grd = app.lookup("sampleGrd");
	
	/** @type cpr.controls.gridpart.GridConfig */
	var voGrdOption = {
		dataSet: app.lookup("dsList"),
		resizableColumns : "all",
		autoFit : "all",
		columns: [
			{"width": "100px"},
			{"width": "100px"},
			{"width": "100px"},
			{"width": "100px"},
			{"width": "100px"},
			{"width": "100px"}
		],
		"header" : {
			"rows" : [{"height" : "35px"}],
			"cells" : [
				{
					"constraint": {"rowIndex": 0, "colIndex": 0},
					"configurator": function(cell){
						cell.targetColumnName = "empId";
						cell.filterable = false;
						cell.sortable = false;
						cell.text = "사번";
					}
				},
				{
					"constraint": {"rowIndex": 0, "colIndex": 1},
					"configurator": function(cell){
						cell.targetColumnName = "empNm";
						cell.filterable = false;
						cell.sortable = false;
						cell.text = "사원명";
					}
				},
				{
					"constraint": {"rowIndex": 0, "colIndex": 2},
					"configurator": function(cell){
						cell.targetColumnName = "email";
						cell.filterable = false;
						cell.sortable = false;
						cell.text = "이메일";
					}
				},
				{
					"constraint": {"rowIndex": 0, "colIndex": 3},
					"configurator": function(cell){
						cell.targetColumnName = "phone";
						cell.filterable = false;
						cell.sortable = false;
						cell.text = "핸드폰";
					}
				},
				{
					"constraint": {"rowIndex": 0, "colIndex": 4},
					"configurator": function(cell){
						cell.targetColumnName = "address";
						cell.filterable = false;
						cell.sortable = false;
						cell.text = "주소";
					}
				},
				{
					"constraint": {"rowIndex": 0, "colIndex": 5},
					"configurator": function(cell){
						cell.targetColumnName = "rgstDt";
						cell.filterable = false;
						cell.sortable = false;
						cell.text = "등록일자";
					}
				}
			]
		},
		"detail" : {
			"rows": [{"height": "30px"}],
			"cells": [
				{
					"constraint": {"rowIndex": 0, "colIndex": 0},
					"configurator": function(cell){
						cell.columnName = "empId";
					}
				},
				{
					"constraint": {"rowIndex": 0, "colIndex": 1},
					"configurator": function(cell){
						cell.columnName = "empNm";
					}
				},
				{
					"constraint": {"rowIndex": 0, "colIndex": 2},
					"configurator": function(cell){
						cell.columnName = "email";
					}
				},
				{
					"constraint": {"rowIndex": 0, "colIndex": 3},
					"configurator": function(cell){
						cell.columnName = "phone";
					}
				},
				{
					"constraint": {"rowIndex": 0, "colIndex": 4},
					"configurator": function(cell){
						cell.columnName = "address";
					}
				},
				{
					"constraint": {"rowIndex": 0, "colIndex": 5},
					"configurator": function(cell){
						cell.columnName = "rgstDt";
					}
				}
			]
		}
	}
	
	grd.init(voGrdOption);
}


/**
 * 컬럼 생성 시 참조하는 값
 */
var mnColCnt = 1;

/**
 * 그리드 컬럼을 추가 합니다. 
 * 추가한 컬럼은 맨 뒤에 배치됩니다. 
 */
function addColumn() {
	var grd = app.lookup("sampleGrd");
	
	var colIndex = grd.getColumnLayout().header.length;
	
	grd.addColumn({
		columnLayout: [{
			width: "100px"
		}],
		header: [{
			constraint: {
				rowIndex: 0,
				colIndex: colIndex
			},
			configurator: function(cell) {
				//TODO 추가할 헤더 텍스트를 입력하세요
				cell.text = "컬럼" + mnColCnt++;
				//cell.targetColumnName = columnName;
			}
		}],
		detail: [{
			constraint: {
				rowIndex: 0,
				colIndex: colIndex
			},
			configurator: function(cell) {
				//TODO 데이터셋에 컬럼이 있을경우 해당하는 컬럼을 바인딩 해주세요.
				//cell.columnName = "columnName";
				//TODO 디테일 셀에 컨트롤을 동적으로 배치하는 경우 다음의 소스를 참고하십시오.
				/*
				 cell.control = (function() {
				 var output = new cpr.controls.Output();
				 output.value = "";
				 return output;
				 })();
				 */
			}
		}]
	});
}


/**
 * 그리드 컬럼을 제거합니다. 
 * @param {Number} cellIndex
 */
function deleteColumn(cellIndex) {
	var grd = app.lookup("sampleGrd");
	grd.deleteColumn(cellIndex);
}


/**
 * 특정 cell의 위치를 변경합니다. 
 * 이동시키고자 하는 header cell(source cell)이나, 
 * 이동할 영역에 위치한 header cell(target cell)이 colSpan이나 rowSpan에 의해 연결된 다른 cell이 있을 경우 
 * 연결된 다른 cell들도 모두 같이 이동합니다. 
 * @param {Number} sourceHeaderIndex
 * @param {Number} targetHeaderIndex
 */
function moveColumn(sourceHeaderIndex, targetHeaderIndex) {
	var grd = app.lookup("sampleGrd");
	grd.moveColumn(sourceHeaderIndex, targetHeaderIndex);
}


/*
 * "실행" 버튼(btnInit)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnInitClick(/* cpr.events.CMouseEvent */ e){
	/* 동작 실행 */
	initGrid();
	
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = initGrid;
}


/*
 * "실행" 버튼(btnAddCol)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnAddColClick(/* cpr.events.CMouseEvent */ e){
	/* 동작 실행 */
	addColumn();
	
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = addColumn;
}


/*
 * "실행" 버튼(btnDeleteCol)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnDeleteColClick(/* cpr.events.CMouseEvent */ e){
	/* 동작 실행 */
	var vnCellIdx = app.lookup("nbeDelCellIdx").value;
	deleteColumn(vnCellIdx);
	
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = deleteColumn;
}


/*
 * "실행" 버튼(btnMoveCol)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnMoveColClick(/* cpr.events.CMouseEvent */ e){
	/* 동작 실행 */
	var vnSourceCellIdx = app.lookup("nbeMvSrcCellIdx").value;
	var vnTargetCellIdx = app.lookup("nbeMvTrgtCellIdx").value;
	
	moveColumn(vnSourceCellIdx, vnTargetCellIdx);
	
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = moveColumn;
}
