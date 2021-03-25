/************************************************
 * SCRIPT_DATACOMPONENT_DATASET_02.js
 * Created at 2021. 3. 2. 오후 1:38:04.
 *
 * @author SUBBY
 ************************************************/

/**
 * 전체 데이터에서 특정 컬럼의 값 중 중복되지 않은 값의 배열을 반환합니다.<br>
 * 사용자가 원하는 필터링 함수를 추가하여 사용할 수 있습니다.(데이터 셋의 setFilter API 사용)
 * @param {String} vsColumnName
 */
function getUnfilteredDistinctValues(vsColumnName) {
	var vcDsSample = app.lookup("dsSample");
	
	/* 전체 데이터에서 특정 컬럼의 값 중 중복되지 않은 값의 배열을 가져옴 */
	var vaColumnValues = vcDsSample.getUnfilteredDistinctValues(vsColumnName);
	
	var vaIndices = [];
	
	/* 중복되지 않은 값들 중에서 첫번째 행의 index 가져옴 */
	vaColumnValues.forEach(function(each) {
		vaIndices.push(vcDsSample.findFirstRow(vsColumnName + " == '" + each + "'").getIndex());
	});
	
	var vsFilter = "";
	
	/* 해당 행의 index로 dummy 컬럼인 index 컬럼을 사용하여 필터링 조건 생성 */
	vaIndices.forEach(function(each) {
		/* 필터링 조건식에서 마지막 index일 경우, ' || '를 붙이지 않음 */
		if(each == vaIndices[vaIndices.length - 1]) {
			vsFilter += "index == " + each;
		} else {
			vsFilter += "index == " + each + ' || ';
		}
	});
	
	/* 데이터 셋에 필터링 조건 설정 */
	vcDsSample.setFilter(vsFilter);
}

/**
 * 데이터 셋의 필터링 조건을 제거합니다.
 */
function clearFilter() {
	/* 데이터 셋의 필터링 조건을 제거 */
	var vcDsSample = app.lookup("dsSample");
	vcDsSample.clearFilter();
}

/*
 * "실행" 버튼(btnDistinctValue)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnDistinctValueClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnDistinctValue = e.control;
	
	/* 필터링 조건을 제거 */
	clearFilter();
	
	/* 콤보박스에서 columnName을 가져옴 */
	var vcCmbColumnName = app.lookup("cmbColumnName");
	var vsColumnName = vcCmbColumnName.value;
	
	/* 컬럼 값을 판별함 */
	if(vsColumnName == null) {
		alert("콤보박스에서 컬럼을 선택해주세요.");
		return;
	}
	
	/* 동작 실행 */
	getUnfilteredDistinctValues(vsColumnName);
	
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = getUnfilteredDistinctValues;
}

/*
 * "실행" 버튼(btnClearFilter)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnClearFilterClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnClearFilter = e.control;
	
	/* 동작 실행 */
	clearFilter();
	
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = clearFilter;
}
