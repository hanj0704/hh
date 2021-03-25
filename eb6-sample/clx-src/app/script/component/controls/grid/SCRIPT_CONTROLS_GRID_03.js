/************************************************
 * SCRIPT_CONTROLS_GRID_03.js
 * Created at 2021. 2. 5. 오전 10:31:28.
 *
 * @author hee73
 ************************************************/


/**
 * 그리드 컬럼명에 대해 정렬합니다.
 */
function gridSortCondition() {
	var vcGrd = app.lookup("sortfilterGrd");
	var vcColumnName = app.lookup("cmbColName").value;
	var vcSortType = app.lookup("cmbSortType").value;
	var condition = vcColumnName + " " + vcSortType;
	vcGrd.sort(condition);
}

/**
 * 그리드 컬럼명과 컬럼값을 넣어 필터를합니다.
 */
function gridFilter() {
	var vcGrd = app.lookup("sortfilterGrd");
	var vcFilterColumnName = app.lookup("cmbFilterColName").value;
	var vcFilterValue = app.lookup("iptFilterValue").value;
	var Filter = vcFilterColumnName + "*= '" + vcFilterValue + "' ";
	vcGrd.filter(Filter);
	
}
/**
 * 그리드 정렬을 제거합니다.
 */
function gridClearSort() {
	var vcGrd = app.lookup("sortfilterGrd");
	
	/* 헤더 셀 필터를 제거 */
	vcGrd.header.clearSort();
	
	/* 입력 값 정렬을 제거 */
	vcGrd.clearSort();
}

/**
 * 그리드 필터를 제거합니다.
 */
function gridClearFilter() {
	var vcGrd = app.lookup("sortfilterGrd");
	
	/* 헤더 셀 필터를 제거 */
	vcGrd.header.clearFilter();
	
	/* 입력 값 필터를 제거 */
	vcGrd.clearFilter();
}

/*
 * "실행" 버튼(btnSort)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSortClick(/* cpr.events.CMouseEvent */ e){
	/* 동작 실행 */
	gridSortCondition();
	
	/* 에디터에 소스표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = gridSortCondition;
}


/*
 * "실행" 버튼(btnFilter)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnFilterClick(/* cpr.events.CMouseEvent */ e){
	/* 동작 실행 */
	gridFilter();
	
	/* 에디터에 소스표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = gridFilter;
}

/*
 * "실행" 버튼(btnCleanSortGrd)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnCleanSortGrdClick(/* cpr.events.CMouseEvent */ e){
	/* 동작 실행 */
	gridClearSort();
	
	/* 에디터에 소스표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = gridClearSort;
}


/*
 * "실행" 버튼(btnClearFilterGrd)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnClearFilterGrdClick(/* cpr.events.CMouseEvent */ e){
	/* 동작 실행 */
	gridClearFilter();
	
	/*에디터 소스표시*/
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = gridClearFilter;
}

