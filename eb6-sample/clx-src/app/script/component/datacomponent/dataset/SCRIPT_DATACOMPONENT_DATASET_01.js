/************************************************
 * SCRIPT_DATACOMPONENT_DATASET_01.js
 * Created at 2021. 2. 25. 오전 11:38:53.
 *
 * @author SUBBY
 ************************************************/

/**
 * 데이터 셋에서 특정 행, 특정 컬럼의 값을 가져옵니다.
 * @param {Number} vnRowIndex
 * @param {String} vsColumnName
 */
function getValue(vnRowIndex, vsColumnName) {
	/* 데이터 셋에서 rowIndex와 columnName을 통해 원하는 값을 가져옴 */
	var vcDsSample = app.lookup("dsSample");
	var vsGetValue = vcDsSample.getValue(vnRowIndex, vsColumnName);
	
	app.lookup("lblVal").value = vsGetValue;
}

/**
 * 데이터 셋에서 특정 행, 특정 컬럼의 값을 변경합니다.
 * @param {Number} vnRowIndex
 * @param {String} vsColumnName
 * @param {String} vsSetValue
 */
function setValue(vnRowIndex, vsColumnName, vsSetValue) {
	/* 데이터 셋에서 rowIndex와 columnName을 통해 원하는 값을 가져옴 */
	var vcDsSample = app.lookup("dsSample");
	vcDsSample.setValue(vnRowIndex, vsColumnName, vsSetValue);
}

/**
 * 데이터 셋의 현재 행의 수를 반환합니다.
 */
function getRowCount() {
	/* 데이터 셋에서 행의 수를 가져옴 */
	var vcDsSample = app.lookup("dsSample");
	var vnRowCount = vcDsSample.getRowCount();
	
	app.lookup("lblVal").value = vnRowCount;
}

/**
 * 데이터 셋 특정 행의 데이터를 가져옵니다.
 * @param {Number} vnRowIndex
 */
function getRowData(vnRowIndex) {
	/* 선택된 행의 데이터를 가져옴 */
	var vcDsSample = app.lookup("dsSample");
	var voRowData = vcDsSample.getRowData(vnRowIndex);
	
	app.lookup("lblVal").value = JSON.stringify(voRowData);
}

/**
 * 데이터 셋에 행을 추가합니다.
 * @param {Number} vnRowIndex
 */
function insertRow(vnRowIndex) {
	/* 선택된 행 아래에 행을 추가 */
	var vcDsSample = app.lookup("dsSample");
	vcDsSample.insertRow(vnRowIndex);
}

/**
 * 데이터 셋에 컬럼을 추가합니다.
 * @param {String} vsAddColumnName
 */
function addColumn(vsAddColumnName) {
	/* 추가할 컬럼의 데이터 타입 설정(string, number, decimal, expression) */
	var vsDataType = "string";
	
	/* 추가할 컬럼 객체 생성 */
	var vcColumn = new cpr.data.header.DataHeader(vsAddColumnName, vsDataType);
	
	/* 데이터 셋에 컬럼을 추가 */
	var vcDsSample = app.lookup("dsSample");
	vcDsSample.addColumn(vcColumn);
	
	app.lookup("lblVal").value = vcDsSample.getColumnNames() + "";
}

/**
 * 선택된 행과 입력받은 행을 서로 바꿉니다.
 * @param {Number} vnRowIndex
 * @param {Number} vnChangeRowIndex
 */
function changeRowIndex(vnRowIndex, vnChangeRowIndex) {
	/* 선택된 행의 데이터를 입력받은 행 뒤로 이동 */
	var vcDataSet = app.lookup("dsSample");
	vcDataSet.changeRowIndex(vnRowIndex, vnChangeRowIndex);
	
	/* 그리드를 다시 불러옴 */
	app.lookup("dsToGrdSample").redraw();
}

/**
 * 선택된 행을 이동 시킵니다.
 * @param {Number} vnRowIndex
 * @param {Number} vnMoveRowIndex
 */
function moveRowIndex(vnRowIndex, vnMoveRowIndex) {
	/* 선택된 행의 데이터를 입력받은 행 뒤로 이동 */
	var vcDataSet = app.lookup("dsSample");
	vcDataSet.moveRowIndex(vnRowIndex, vnMoveRowIndex);
	
	/* 그리드를 다시 불러옴 */
	app.lookup("dsToGrdSample").redraw();
}

/**
 * 현재 데이터 셋의 데이터를 다른 데이터 셋으로 복사합니다.
 */
function copyToDataSet() {
	/* 복사할 데이터 셋 */
	var vcNowDataSet = app.lookup("dsSample");
	
	/* 복사된 데이터를 담을 데이터 셋 */
	var vcTargetDataSet = app.lookup("dsCopy");
	
	/* 복사된 데이터를 담을 데이터 셋에 데이터가 있으면 삭제 */
	var vnTarGetRow = vcTargetDataSet.getRowCount();
	if(vnTarGetRow > 0) {
		vcTargetDataSet.clear();
	}
	
	var a = vcNowDataSet.getRowStatedIndex(cpr.data.tabledata.RowState.DELETED);
	
	vcNowDataSet.getRow(a);
	
	/* 데이터 셋을 복사 */
	vcNowDataSet.copyToDataSet(vcTargetDataSet);
}

/**
 * 데이터 셋에 행을 제거합니다.
 * @param {Number} vnRowIndex
 */
function deleteRow(vnRowIndex) {
	/* 선택된 행을 제거 */
	var vcDsSample = app.lookup("dsSample");
	vcDsSample.deleteRow(vnRowIndex);
}

/**
 * 데이터 셋의 정보를 제거합니다.(data, sort, filter)
 */
function clear() {
	/* 데이터 셋의 정보를 제거 */
	var vcDsSample = app.lookup("dsSample");
	vcDsSample.clear();
}

/* 데이터 셋을 생성, 초기화합니다. */
function parseData() {
	var vcDsSample = app.lookup("dsSample");
	
	vcDsSample.parseData({
		/* dataType은 string이 기본값 입니다. */
		"columns": [
			{"name": "empId", "dataType": "string", "comment": "사번"},
			{"name": "empNm", "dataType": "string", "comment": "사원명"},
			{"name": "email", "dataType": "string", "comment": "이메일"},
			{"name": "phone", "dataType": "string", "comment": "핸드폰"},
			{"name": "address", "dataType": "string", "comment": "주소"},
			{"name": "regDt", "dataType": "string", "comment": "등록일자"}
		],
		"rows": [
			{"empId": 13182, "empNm": "황정민", "email": "jungmin@tomatosystem.co.kr", "phone": "010-2394-9631", "address": "서울시 송파구 잠실2동", "regDt": "20140218"},
			{"empId": 13898, "empNm": "배두나", "email": "duna@tomatosystem.co.kr", "phone": "010-3329-5820", "address": "서울시 관악구 신사동", "regDt": "20131127"},
			{"empId": 14348, "empNm": "하지원", "email": "jiwon@tomatosystem.co.kr", "phone": "010-4856-9912", "address": "서울시 서대문구 연희동", "regDt": "20150408"},
			{"empId": 14492, "empNm": "주지훈", "email": "jihoon@tomatosystem.co.kr", "phone": "010-4892-7710", "address": "서울시 용산구 한남동", "regDt": "20150728"},
			{"empId": 15624, "empNm": "이정재", "email": "jungjae@tomatosystem.co.kr", "phone": "010-5492-8589", "address": "서울시 강남구 논현동", "regDt": "20160819"},
			{"empId": 16024, "empNm": "조정석", "email": "jungseok@tomatosystem.co.kr", "phone": "010-9420-6832", "address": "서울시 금천구 독산제1동", "regDt": "20170124"},
			{"empId": 16432, "empNm": "조승우", "email": "sungwoo@tomatosystem.co.kr", "phone": "010-3275-0182", "address": "서울시 노원구 공릉2동", "regDt": "20170427"},
			{"empId": 16928, "empNm": "정우성", "email": "woosung@tomatosystem.co.kr", "phone": "010-6693-1892", "address": "서울시 서초구 반포1동", "regDt": "20171227"},
			{"empId": 17504, "empNm": "하정우", "email": "jungwoo@tomatosystem.co.kr", "phone": "010-2485-6790", "address": "서울시 동작구 대방동", "regDt": "20180530"},
			{"empId": 18702, "empNm": "손예진", "email": "yaejin@tomatosystem.co.kr", "phone": "010-7282-1810", "address": "서울시 중구 약수동", "regDt": "20180919"},
			{"empId": 18925, "empNm": "송강호", "email": "gangho@tomatosystem.co.kr", "phone": "010-8219-9825", "address": "서울시 영등포구 문래동", "regDt": "20181210"},
			{"empId": 19240, "empNm": "문채원", "email": "caewon@tomatosystem.co.kr", "phone": "010-1298-4055", "address": "서울시 도봉구 쌍문제1동", "regDt": "20190304"},
			{"empId": 20719, "empNm": "강동원", "email": "dongwon@tomatosystem.co.kr", "phone": "010-4382-1980", "address": "서울시 성동구 옥수동", "regDt": "20200914"},
			{"empId": 21054, "empNm": "박서준", "email": "seojoon@tomatosystem.co.kr", "phone": "010-1567-9867", "address": "서울시 중랑구 면목제2동", "regDt": "20210125"}
		]
	});
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
	
	/* 선택된 rowIndex의 값을 가져옴 */
	var vcGrd = app.lookup("dsToGrdSample");
	var vnRowIndex = vcGrd.getSelectedRowIndex();
	
	/* 콤보박스에서 columnName을 가져옴 */
	var vcCmbGetValueColumnName = app.lookup("cmbGetValueColumnName");
	var vsColumnName = vcCmbGetValueColumnName.value;
	
	/* 행, 컬럼 값을 판별함 */
	if(vnRowIndex < 0) {
		alert("그리드에서 행을 선택해주세요.");
		return;
	} else if(vsColumnName == null) {
		alert("콤보박스에서 컬럼을 선택해주세요.");
		return;
	}
	
	/* 동작 실행 */
	getValue(vnRowIndex, vsColumnName);
	
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
	
	/* 선택된 rowIndex의 값을 가져옴 */
	var vcGrd = app.lookup("dsToGrdSample");
	var vnRowIndex = vcGrd.getSelectedRowIndex();
	
	/* 콤보박스에서 columnName을 가져옴 */
	var vcCmbSetValueColumnName = app.lookup("cmbSetValueColumnName");
	var vsColumnName = vcCmbSetValueColumnName.value;
	
	/* 변경할 값을 가져옴 */
	var vsSetValue = app.lookup("ipbSetValue").value;
	
	/* 행 index, 컬럼 값, 변경할 값을 판별함 */
	if(vnRowIndex < 0) {
		alert("그리드에서 행을 선택해주세요.");
		return;
	} else if(vsColumnName == null) {
		alert("콤보박스에서 컬럼을 선택해주세요.");
		return;
	} else if(vsSetValue == null) {
		alert("변경할 값을 입력해주세요.");
		return;
	}
	
	/* 동작 실행 */
	setValue(vnRowIndex, vsColumnName, vsSetValue);
	
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = setValue;
}

/*
 * "실행" 버튼(btnGetRowCount)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnGetRowCountClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnGetRowCount = e.control;
	
	/* 동작 실행 */
	getRowCount();
	
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = getRowCount;
}

/*
 * "실행" 버튼(btnGetRowData)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnGetRowDataClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnGetRowData = e.control;
	
	/* 선택된 rowIndex의 값을 가져옴 */
	var vcGrd = app.lookup("dsToGrdSample");
	var vnRowIndex = vcGrd.getSelectedRowIndex();
	
	/* 행 index 값을 판별함 */
	if(vnRowIndex < 0) {
		alert("그리드에서 행을 선택해주세요.");
		return;
	}
	
	/* 동작 실행 */
	getRowData(vnRowIndex);
	
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = getRowData;
}

/*
 * "실행" 버튼(btnInsertRow)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnInsertRowClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnInsertRow = e.control;
	
	/* 선택된 rowIndex의 값을 가져옴 */
	var vcGrd = app.lookup("dsToGrdSample");
	var vnRowIndex = vcGrd.getSelectedRowIndex();
	
	/* 행 index 값을 판별함 */
	if(vnRowIndex < 0) {
		alert("그리드에서 행을 선택해주세요.");
		return;
	}
	
	/* 동작 실행 */
	insertRow(vnRowIndex);
	
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = insertRow;
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
 * "실행" 버튼(btnChangeRowIndex)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnChangeRowIndexClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnChangeRowIndex = e.control;
	
	/* 선택된 rowIndex의 값을 가져옴 */
	var vcGrd = app.lookup("dsToGrdSample");
	var vnRowIndex = vcGrd.getSelectedRowIndex();
	
	/* 바꿀 index를 가져옴 */
	var vcDataSet = app.lookup("dsSample");
	var vnDataSetRow = vcDataSet.getRowCount();
	var nbeChangeRowIndex = app.lookup("nbeChangeRowIndex").value;
	
	/* 행 index, 바꿀 index 값을 판별함 */
	if(vnRowIndex < 0) {
		alert("그리드에서 행을 선택해주세요.");
		return;
	} else if(nbeChangeRowIndex == null) {
		alert("이동시킬 index를 입력해주세요.");
		return;
	} else if(nbeChangeRowIndex > vnDataSetRow) {
		alert("데이터 셋 행의 개수보다 낮은 값을 입력하세요.");
		return;
	}
	
	/* 동작 실행 */
	changeRowIndex(vnRowIndex, parseInt(nbeChangeRowIndex));
	
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = changeRowIndex;
}

/*
 * "실행" 버튼(btnMoveRowIndex)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnMoveRowIndexClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnMoveRowIndex = e.control;
	
	/* 선택된 rowIndex의 값을 가져옴 */
	var vcGrd = app.lookup("dsToGrdSample");
	var vnRowIndex = vcGrd.getSelectedRowIndex();
	
	/* 이동시킬 index를 가져옴 */
	var vcDataSet = app.lookup("dsSample");
	var vnDataSetRow = vcDataSet.getRowCount();
	var vnMoveRowIndex = app.lookup("nbeMoveRowIndex").value;
	
	/* 행 index, 이동시킬 index 값을 판별함 */
	if(vnRowIndex < 0) {
		alert("그리드에서 행을 선택해주세요.");
		return;
	} else if(vnMoveRowIndex == null) {
		alert("이동시킬 index를 입력해주세요.");
		return;
	} else if(vnMoveRowIndex > vnDataSetRow) {
		alert("데이터 셋 행의 개수보다 낮은 값을 입력하세요.");
		return;
	}
	
	/* 동작 실행 */
	moveRowIndex(vnRowIndex, parseInt(vnMoveRowIndex));
	
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = moveRowIndex;
}

/*
 * "실행" 버튼(btnCopyToDataSet)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnCopyToDataSetClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnCopyToDataSet = e.control;
	
	/* 동작 실행 */
	copyToDataSet();
	
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = copyToDataSet;
}

/*
 * "실행" 버튼(btnDeletedRow)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnDeletedRowClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnDeletedRow = e.control;
	
	/* 선택된 rowIndex의 값을 가져옴 */
	var vcGrd = app.lookup("dsToGrdSample");
	var vnRowIndex = vcGrd.getSelectedRowIndex();
	
	/* 행 index 값을 판별함 */
	if(vnRowIndex < 0) {
		alert("그리드에서 행을 선택해주세요.");
		return;
	}
	
	/* 동작 실행 */
	deleteRow(vnRowIndex);
	
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = deleteRow;
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

/*
 * "실행" 버튼(btnParseData)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnParseDataClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnParseData = e.control;
	
	/* 동작 실행 */
	parseData();
	
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = parseData;
}
