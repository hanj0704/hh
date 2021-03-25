/************************************************
 * SCRIPT_CONTROLS_GRID_08.js
 * Created at 2021. 2. 24. 오후 4:45:02.
 *
 * @author hee73
 ************************************************/
/**
 * 그리드 선택된 행과 체크된행 rowIndex
 * @param {#Grid} psSrcGridId  그리드 ID
 * @return {Number[]} 선택된 row index 배열.
 */
function checkOrSelectedRowIndex(){
	
	var vcGrd = app.lookup("sourceGrd");
	
	if(vcGrd.rowCount < 1) return[];
	
	var vaChkIndexs = vcGrd.getCheckRowIndices();
	if(vaChkIndexs != null && vaChkIndexs.length >0 ){
		return vaChkIndexs;
	}else{
		if(vcGrd.selectionUnit == "cell"){
			var vaSelIndices = vcGrd.getSelectedRowIndices();
			var rowIndices = [];
			for(var i = 0, len = vaSelIndices.length; i < len; i++){
				rowIndices.push(vaSelIndices[i]);
			}
			return rowIndices;
		} else {
			return vcGrd.getSelectedRowIndices();
		}
	}
	
}


/**
 * 그리드 선택한 한행을 복사합니다.
 * @param {#Grid} psSrcGridId 그리드ID
 * @param {#Grid} psDesGridId 복사할 그리드 ID
 * @param {Number} pnSrcRowIdx (Optional) 그리드 로우 인덱스
 *                 default : 체크된 row 나 선택된 row 인덱스를 취득 (check우선)
 * */
function copyToGridData(psSrcGridId,psDescGridId,pnSrcRowIdx){
	var vcSrcGrid = app.lookup(psSrcGridId);
	var vcDesGrid = app.lookup(psDescGridId);
	
	var rowIndexs = pnSrcRowIdx == null ? checkOrSelectedRowIndex(psSrcGridId) : pnSrcRowIdx;
	
	if (!(rowIndexs instanceof Array)) {
		rowIndexs = [rowIndexs];
	}	
	//복사할 ROW가 없으면 SKIP
	if (rowIndexs.length < 1) return;
	
	//기존 그리드 데이터셋
	var srcDataSet = vcSrcGrid.dataSet;
	//타겟 그리드 데이터셋
	var tarDataSet = vcDesGrid.dataSet;
	
	for (var i = 0, len = rowIndexs.length; i < len; i++) {
		//신규 후 삭제된 행은 제외
		if (srcDataSet.getRowState(rowIndexs[i]) == cpr.data.tabledata.RowState.INSERTDELETED) continue;
		
		var data = srcDataSet.getRowData(rowIndexs[i]);
		// json 형식의 row의 데이터
		var str = [];
		for (var key in data) {
			str.push(key + " == '" + data[key] + "'");
		}
		str = str.join(" && ");
		// 조건에 맞는 row 탐색
		var findRow = tarDataSet.findAllRow(str);
		// 조건에 해당하는 row가 없다면 target 그리드에 선택된 row를 추가
		if (findRow == null || findRow.length < 1) {
			tarDataSet.addRowData(data);
		}
	}
	vcDesGrid.redraw();
}

/**
 * 그리드 전체 데이터를 복사 합니다.
 * @param {#Grid} psSrcGridId 그리드ID
 * @param {#Grid} psDesGridId 복사할 그리드 ID
 */
function copyToAllGridData(psSrcGridId,psDesGrdiId){
	var vcSrcGrd = app.lookup(psSrcGridId);
	
	var indices = [];
	
	for(var i = 0, len = vcSrcGrd.rowCount; i < len; i++){
		indices.push(i);
	}
	
	copyToGridData(psSrcGridId,psDesGrdiId,indices);
}
/**
 * 그리드 선택한 한행을 이동합니다.
 * @param {#Grid} psSrcGridId 그리드Id
 * @param {#Grid} psDesGridId 복사할 그리드ID
 * @param {Number | Number[]} pnSrcRowIdx (Optional) 그리드 로우 인덱스<br/>
 *                            default : 체크된 row 나 선택된 row 인덱스를 취득 (check우선) 
 */
function moveToGridData(psSrcGridId,psDesGridId,pnSrcRowIdx){
	var vcSrcGrid = app.lookup(psSrcGridId);
	var vcDesGrid = app.lookup(psDesGridId);
	
	var rowIndexs = pnSrcRowIdx == null ? checkOrSelectedRowIndex(psSrcGridId) : pnSrcRowIdx;
	if (!(rowIndexs instanceof Array)){
		rowIndexs = [rowIndexs];
	}
	//이동할 Row가 없으면 SKIP
	if(rowIndexs.length < 1) return;
	
	//기존 그리드 데이터 셋
	var srcDataSet = vcSrcGrid.dataSet;
	//타겟 그리드 데이터 셋
	var tarDataSet = vcDesGrid.dataSet;
	for(var i = 0, len = rowIndexs.length; i < len; i++){
		//신규 후 갓제된 행은 제외
		if(srcDataSet.getRowState(rowIndexs[i]) == cpr.data.tabledata.RowState.INSERTDELETED) continue;
		
		tarDataSet.addRowData(srcDataSet.getRowData(rowIndexs[i]));
	}
	vcDesGrid.redraw();

}

/**
 * 그리드 전체를 이동합니다.
 * @param {Grid} psSrcGridId 그리드ID
 * @param {Grid} psDesGridId 이동할 그리드 ID
 */
function moveToAllGridData(psSrcGridId,psDesGridId){
	var vcSrcGrid = app.lookup(psSrcGridId);
	
	var indices = [];
	for(var i = 0, len = vcSrcGrid.rowCount; i < len; i++){
		indices.push(i);
	}
	moveToGridData(psSrcGridId, psDesGridId,indices);
}


/**
 * 대상 그리드 데이터를 초기화 시킵니다.
 */
function gridDataRevert(){
	var vcDesGrid = app.lookup("targetGrd");
	var tarDataSet = vcDesGrid.dataSet;
	
	tarDataSet.revert();
}

/*
 * "실행" 버튼(btnCopyToGridData)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnCopyToGridDataClick(/* cpr.events.CMouseEvent */ e){
	/* 동작 실행 */
	copyToGridData("sourceGrd", "targetGrd");
	
	/* 에디터에 소스표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = copyToGridData;
	
}


/*
 * "실행" 버튼(btnCopyToAllGridData)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnCopyToAllGridDataClick(/* cpr.events.CMouseEvent */ e){
	/* 동작 실행 */
	copyToAllGridData("sourceGrd", "targetGrd");
	
	/* 에디터에 소스표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = copyToAllGridData;
	
}




/*
 * "실행" 버튼(btnMoveToGridData)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnMoveToGridDataClick(/* cpr.events.CMouseEvent */ e){
	/* 동작 실행 */
	moveToGridData("sourceGrd", "targetGrd");
	
	/* 에디터에 소스표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = moveToGridData;
	
}

/*
 * "실행" 버튼(btnMoveToAllGridData)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnMoveToAllGridDataClick(/* cpr.events.CMouseEvent */ e){
	/* 동작 실행 */
	moveToAllGridData("sourceGrd", "targetGrd");
	
	/* 에디터에 소스표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = moveToAllGridData;
}



/*
 * "실행" 버튼(btnRevertData)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnRevertDataClick(/* cpr.events.CMouseEvent */ e){
	/* 동작 실행 */
	gridDataRevert();
	
	/* 에디터에 소스표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = gridDataRevert;
}
