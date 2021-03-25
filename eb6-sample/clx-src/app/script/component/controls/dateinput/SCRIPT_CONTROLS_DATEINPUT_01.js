/************************************************
 * SCRIPT_CONTROLS_DATEINPUT_01.js
 * Created at 2021. 3. 4. 오후 1:39:33.
 *
 * @author SUBBY
 ************************************************/

/**
 * moment.js를 통해 현재 날짜를 가져옵니다.
 */
function momentToday() {
	/* 데이트 인풋 컨트롤의 포맷 지정합니다. */
	var vcDateInput = app.lookup("dtiSample");
	vcDateInput.format = "YYYY-MM-DD HH:mm:ss";
	
	/* moment.js를 통해 오늘 날짜와 시간을 위에서 지정한 format 형식으로 가져옵니다. */
	var vsToday = moment().format(vcDateInput.format);
	
	/* 해당 날짜와 시간 데이터를 데이트 인풋과 결과값에 대입해줍니다. */
	app.lookup("dtiSample").value = vsToday;
	app.lookup("lblVal").value = vcDateInput.value;
}

/**
 * 데이트 인풋 컨트롤의 값에서 일정 수 만큼 년, 월, 일을 증가시킵니다.
 * @param {Number} vnNumber
 * @param {String} vsDateType
 */
function momentAdd(vnNumber, vsDateType) {
	var vcDateInput = app.lookup("dtiSample");
	var vsDateInputValue = vcDateInput.value;
	var vsDateInputFormat = vcDateInput.format;
	
	/* 데이트 인풋에 저장되어있는 값을 토대로 선택된 년, 월, 일을 입력한 수 만큼 이후 날짜로 가져옵니다. */
	var vsAddDate = moment(vsDateInputValue).add(vnNumber, vsDateType).format(vsDateInputFormat);
	
	vcDateInput.value = vsAddDate;
	app.lookup("lblVal").value = vcDateInput.value;
}

/**
 * 데이트 인풋 컨트롤의 값에서 일정 수 만큼 년, 월, 일을 감소시킵니다.
 * @param {Number} vnNumber
 * @param {String} vsDateType
 */
function momentSubtract(vnNumber, vsDateType) {
	var vcDateInput = app.lookup("dtiSample");
	var vsDateInputValue = vcDateInput.value;
	var vsDateInputFormat = vcDateInput.format;
	
	/* 데이트 인풋에 저장되어있는 값을 토대로 선택된 년, 월, 일을 입력한 수 만큼 이전 날짜로 가져옵니다. */
	var vsSubtractDate = moment(vsDateInputValue).subtract(vnNumber, vsDateType).format(vsDateInputFormat);
	
	vcDateInput.value = vsSubtractDate;
	app.lookup("lblVal").value = vcDateInput.value;
}

/**
 * 데이트 인풋의 값에서 년도를 반환합니다.
 */
function getYear() {
	var vcDateInput = app.lookup("dtiSample");
	var vsDateInputValue = vcDateInput.value;
	
	app.lookup("lblVal").value = moment(vsDateInputValue).year();
}

/**
 * 데이트 인풋의 값에서 월을 반환합니다.
 */
function getMonth() {
	var vcDateInput = app.lookup("dtiSample");
	var vsDateInputValue = vcDateInput.value;
	
	app.lookup("lblVal").value = moment(vsDateInputValue).month();
}

/**
 * 데이트 인풋의 값에서 일을 반환합니다.
 */
function getDate() {
	var vcDateInput = app.lookup("dtiSample");
	var vsDateInputValue = vcDateInput.value;
	
	app.lookup("lblVal").value = moment(vsDateInputValue).date();
}

/**
 * 데이트 인풋의 값에서 시간을 반환합니다.
 */
function getHour() {
	var vcDateInput = app.lookup("dtiSample");
	var vsDateInputValue = vcDateInput.value;
	
	app.lookup("lblVal").value = moment(vsDateInputValue).hour();
}

/**
 * 데이트 인풋의 값에서 분을 반환합니다.
 */
function getMinute() {
	var vcDateInput = app.lookup("dtiSample");
	var vsDateInputValue = vcDateInput.value;
	
	app.lookup("lblVal").value = moment(vsDateInputValue).minute();
}

/**
 * 데이트 인풋의 값에서 초를 반환합니다.
 */
function getSecond() {
	var vcDateInput = app.lookup("dtiSample");
	var vsDateInputValue = vcDateInput.value;
	
	app.lookup("lblVal").value = moment(vsDateInputValue).second();
}

/*
 * "실행" 버튼(btnMomentToday)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnMomentTodayClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnMomentToday = e.control;
	
	/* 동작 실행 */
	momentToday();
	
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = momentToday;
}

/*
 * "실행" 버튼(btnMomentAdd)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnMomentAddClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnMomentAdd = e.control;
	
	var vcDti = app.lookup("dtiSample");
	var vsDtiVal = vcDti.value;
	
	var vcNbe = app.lookup("nbeAddNumber");
	var vsNbeVal = vcNbe.value;
	
	var vcCmb = app.lookup("cmbAddDateType");
	var vsCmbVal = vcCmb.value;
	
	if (vsDtiVal == "" || vsDtiVal == null) {
		alert("데이트 인풋 컨트롤에 값을 설정해주세요.");
		return;
	} else if (vsNbeVal == "" || vsNbeVal == null) {
		alert("변경할 숫자를 입력하세요.");
		return;
	} else if (vsCmbVal == "" || vsCmbVal == null) {
		alert("변경할 날짜 타입을 선택하세요.");
		return;
	}
	
	var vnNumber = parseInt(vsNbeVal);
	var vsDateType = vsCmbVal;
	
	/* 동작 실행 */
	momentAdd(vnNumber, vsDateType);
	
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = momentAdd;
}

/*
 * "실행" 버튼(btnMomentSubtract)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnMomentSubtractClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnMomentSubtract = e.control;
	
	var vcDti = app.lookup("dtiSample");
	var vsDtiVal = vcDti.value;
	
	var vcNbe = app.lookup("nbeSubtractNumber");
	var vsNbeVal = vcNbe.value;
	
	var vcCmb = app.lookup("cmbSubtractDateType");
	var vsCmbVal = vcCmb.value;
	
	if (vsDtiVal == "" || vsDtiVal == null) {
		alert("데이트 인풋 컨트롤에 값을 설정해주세요.");
		return;
	} else if (vsNbeVal == "" || vsNbeVal == null) {
		alert("변경할 숫자를 입력하세요.");
		return;
	} else if (vsCmbVal == "" || vsCmbVal == null) {
		alert("변경할 날짜 타입을 선택하세요.");
		return;
	}
	
	var vnNumber = parseInt(vsNbeVal);
	var vsDateType = vsCmbVal;
	
	/* 동작 실행 */
	momentSubtract(vnNumber, vsDateType);
	
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = momentSubtract;
}

/*
 * "실행" 버튼(btnYear)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnYearClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnYear = e.control;
	
	var vcDateInput = app.lookup("dtiSample");
	var vsDateInputValue = vcDateInput.value;
	
	if(vsDateInputValue == "" || vsDateInputValue == null) {
		alert("데이트 인풋의 값을 입력해주세요.");
		return;
	}
	
	/* 동작 실행 */
	getYear();
	
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = getYear;
}

/*
 * "실행" 버튼(btnMonth)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnMonthClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnMonth = e.control;
	
	var vcDateInput = app.lookup("dtiSample");
	var vsDateInputValue = vcDateInput.value;
	
	if(vsDateInputValue == "" || vsDateInputValue == null) {
		alert("데이트 인풋의 값을 입력해주세요.");
		return;
	}
	
	/* 동작 실행 */
	getMonth();
	
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = getMonth;
}

/*
 * "실행" 버튼(btnDate)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnDateClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnDate = e.control;
	
	var vcDateInput = app.lookup("dtiSample");
	var vsDateInputValue = vcDateInput.value;
	
	if(vsDateInputValue == "" || vsDateInputValue == null) {
		alert("데이트 인풋의 값을 입력해주세요.");
		return;
	}
	
	/* 동작 실행 */
	getDate();
	
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = getDate;
}

/*
 * "실행" 버튼(btnHour)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnHourClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnHour = e.control;
	
	var vcDateInput = app.lookup("dtiSample");
	var vsDateInputValue = vcDateInput.value;
	
	if(vsDateInputValue == "" || vsDateInputValue == null) {
		alert("데이트 인풋의 값을 입력해주세요.");
		return;
	}
	
	/* 동작 실행 */
	getHour();
	
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = getHour;
}

/*
 * "실행" 버튼(btnMinute)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnMinuteClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnMinute = e.control;
	
	var vcDateInput = app.lookup("dtiSample");
	var vsDateInputValue = vcDateInput.value;
	
	if(vsDateInputValue == "" || vsDateInputValue == null) {
		alert("데이트 인풋의 값을 입력해주세요.");
		return;
	}
	
	/* 동작 실행 */
	getMinute();
	
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = getMinute;
}

/*
 * "실행" 버튼(btnSecond)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSecondClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnSecond = e.control;
	
	var vcDateInput = app.lookup("dtiSample");
	var vsDateInputValue = vcDateInput.value;
	
	if(vsDateInputValue == "" || vsDateInputValue == null) {
		alert("데이트 인풋의 값을 입력해주세요.");
		return;
	}
	
	/* 동작 실행 */
	getSecond();
	
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = getSecond;
}
