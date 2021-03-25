/************************************************
 * SCRIPT_DATACOMPONENT_DATAMAP_01.js
 * Created at 2021. 3. 2. 오전 9:39:25.
 *
 * @author SUBBY
 ************************************************/

/**
 * 데이터 맵에서 특정 컬럼의 값을 가져옵니다.
 * @param {String} vsColumnName
 */
function getValue(vsColumnName) {
	/* 데이터 맵에서 columnName을 통해 해당하는 컬럼의 값을 가져옴 */
	var vcDmSample = app.lookup("dmSample");
	var vsGetValue = vcDmSample.getValue(vsColumnName);
	
	app.lookup("lblVal").value = vsGetValue;
}

/**
 * 데이터 맵에서 특정 컬럼의 값을 변경합니다.
 * @param {String} vsColumnName
 * @param {String} vsSetValue
 */
function setValue(vsColumnName, vsSetValue) {
	/* 데이터 맵에서 columnName을 통해 해당하는 컬럼의 값을 변경함 */
	var vcDmSample = app.lookup("dmSample");
	vcDmSample.setValue(vsColumnName, vsSetValue);
	
	/* 데이터 맵의 데이터를 바인딩한 컨트롤을 redraw */
	app.lookup("formSample").redraw();
}

/**
 * 데이터 셋의 데이터를 초기 설정값으로 초기화합니다.
 */
function reset() {
	/* 초기 설정값으로 초기화 할 데이터 맵을 가져옴 */
	var vcDmSample = app.lookup("dmSample");
	vcDmSample.reset();
	
	/* 데이터 맵의 데이터를 바인딩한 컨트롤을 redraw */
	app.lookup("formSample").redraw();
}

/**
 * 데이터 맵에 컬럼을 추가합니다.
 * @param {String} vsAddColumnName
 */
function addColumn(vsAddColumnName) {
	/* 추가할 컬럼의 데이터 타입 설정(string, number, decimal, expression) */
	var vsDataType = "string";
	
	/* 추가할 컬럼 객체 생성 */
	var vcColumn = new cpr.data.header.DataHeader(vsAddColumnName, vsDataType);
	
	/* 데이터 맵에 컬럼을 추가 */
	var vcDmSample = app.lookup("dmSample");
	vcDmSample.addColumn(vcColumn);
	
	/* 데이터 맵에 컬럼을 추가하였으므로, 기존 컬럼과 추가된 컬럼을 보여줌 */
	app.lookup("lblVal").value = vcDmSample.getColumnNames() + "";
}

/**
 * 데이터 맵에서 column을 삭제합니다.
 * @param {String} vsColumnName
 */
function deleteColumn(vsColumnName) {
	var vcDmSample = app.lookup("dmSample");
	vcDmSample.deleteColumn(vsColumnName);
	
	/* 데이터 맵의 데이터를 바인딩한 컨트롤을 redraw */
	app.lookup("formSample").redraw();
	
	/* column을 삭제하였으므로, 현재 데이터 맵에 남은 컬럼을 보여줌 */
	app.lookup("lblVal").value = vcDmSample.getColumnNames() + "";
}

/**
 * 현재 데이터 맵의 데이터를 다른 데이터 맵으로 복사합니다.
 */
function copyToDataMap() {
	/* 현재 데이터 맵과 타겟 데이터 맵을 가져옴 */
	var vcDmSample = app.lookup("dmSample");
	var vcDmCopy = app.lookup("dmCopy");
	
	/* 현재 데이터 맵의 데이터를 타겟 데이터 맵에 복사 */
	vcDmSample.copyToDataMap(vcDmCopy);
	
	/* 타겟 데이터 맵의 데이터를 바인딩한 컨트롤을 redraw */
	app.lookup("formCopy").redraw();
}

function clear() {
	var vcDmSample = app.lookup("dmSample");
	vcDmSample.clear();
	
	/* 데이터 맵의 데이터를 바인딩한 컨트롤을 redraw */
	app.lookup("formSample").redraw();
}

/*
 * "실행" 버튼(btnGetValue)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnGetValueClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnGetValue = e.control;
	
	/* 콤보박스에서 columnName을 가져옴 */
	var vcCmbGetValueColumnName = app.lookup("cmbGetValueColumnName");
	var vsColumnName = vcCmbGetValueColumnName.value;
	
	/* 컬럼 값을 판별함 */
	if(vsColumnName == null) {
		alert("콤보박스에서 컬럼을 선택해주세요.");
		return;
	}
	
	/* 동작 실행 */
	getValue(vsColumnName);
	
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = getValue;
}

/*
 * "실행" 버튼(btnSetValue)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSetValueClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnSetValue = e.control;
	
	/* 콤보박스에서 columnName을 가져옴 */
	var vcCmbSetValueColumnName = app.lookup("cmbSetValueColumnName");
	var vsColumnName = vcCmbSetValueColumnName.value;
	
	/* 변경할 값을 가져옴 */
	var vsSetValue = app.lookup("ipbSetValue").value;
	
	/* 컬럼 값, 변경할 값을 판별함 */
	if(vsColumnName == null) {
		alert("콤보박스에서 컬럼을 선택해주세요.");
		return;
	} else if(vsSetValue == null) {
		alert("변경할 값을 입력해주세요.");
		return;
	}
	
	/* 동작 실행 */
	setValue(vsColumnName, vsSetValue);
	
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = setValue;
}

/*
 * "실행" 버튼(btnReset)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnResetClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnReset = e.control;
	
	/* 동작 실행 */
	reset();
	
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = reset;
}

/*
 * "실행" 버튼(btnAddColumn)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnAddColumnClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnAddColumn = e.control;
	
	/* 추가할 컬럼명을 가져옴 */
	var vsAddColumnName = app.lookup("ipbAddColumnName").value;
	
	if(vsAddColumnName == null) {
		alert("추가할 컬럼명을 입력해주세요.");
		return;
	}
	
	/* 동작 실행 */
	addColumn(vsAddColumnName);
	
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = addColumn;
}

/*
 * "실행" 버튼(btnDeleteColumn)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnDeleteColumnClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnDeleteColumn = e.control;
	
	/* 콤보박스에서 columnName을 가져옴 */
	var vcCmbDeleteColumnName = app.lookup("cmbDeleteColumnName");
	var vsColumnName = vcCmbDeleteColumnName.value;
	
	/* 컬럼 값을 판별함 */
	if(vsColumnName == null) {
		alert("콤보박스에서 컬럼을 선택해주세요.");
		return;
	}
	
	/* 동작 실행 */
	deleteColumn(vsColumnName);
	
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = deleteColumn;
}

/*
 * "실행" 버튼(btnCopyToDataMap)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnCopyToDataMapClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnCopyToDataMap = e.control;
	
	/* 동작 실행 */
	copyToDataMap();
	
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = copyToDataMap;
}

/*
 * "실행" 버튼(btnClear)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnClearClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnClear = e.control;
	
	/* 동작 실행 */
	clear();
	
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = clear;
}
