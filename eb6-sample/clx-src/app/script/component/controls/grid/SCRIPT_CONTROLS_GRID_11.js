

/*
 * "실행" 버튼(btnInit2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnInit2Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnInit2 = e.control;	
	setVisible();
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = setVisible + "";
}

/**
 * 그리드 컬럼 visible 처리
 */
function setVisible(){
	var grd = app.lookup("grdLayout");
	var combo = app.lookup("cmbIndex");
	var combo1 = app.lookup("cmbVisible")
	grd.columnVisible( parseInt(combo.value) , combo1.value == "true" ? true : false);
}


/*
 * "실행" 버튼(btnInit3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnInit3Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnInit3 = e.control;
	setColumnLayout();
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = setColumnLayout + "";
}

function setColumnLayout(){
	
	var vcCmbType = app.lookup("cmbLayout");
	var vcGrd = app.lookup("grdLayout");	
	
	var layout = localStorage.getItem("grdLayout_" + vcCmbType.value);
	if (layout != null) {
		var grd1 = app.lookup("grdLayout");
		//그리드 레이아웃 정보를 세팅합니다
		grd1.setColumnLayout(JSON.parse(layout));
	}
	
	app.lookup("grdLayout").redraw();
	
}


/*
 * "실행" 버튼(btnInit)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnInitClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnInit = e.control;
	getColumnLayout();
	
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = getColumnLayout + "";
}

/**
 * 스토리지에 그리드 레아아웃 저장
 */
function getColumnLayout(){
	var vcCmbType = app.lookup("cmbType");
	var vcGrd = app.lookup("grdLayout");	
	
	//그리드 레이아웃 정보를 반환합니다.
	var vcGrdLayout = vcGrd.getColumnLayout();
	
	//스토리지에 그리드 레이아웃을 저장
	localStorage.setItem( "grdLayout_" + vcCmbType.value , JSON.stringify(vcGrdLayout));		
	alert("스토리지에 저장되었습니다.")
}



/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	
	localStorage.clear();
	
}


/*
 * "실행" 버튼(btnInit4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnInit4Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnInit4 = e.control;
	initGrid();
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = initGrid + "";
	
}

function initGrid(){
	var vcGrd = app.lookup("grdLayout");
	//그리드 초기 설정 정보를 반환합니다. 
	var vcGrdInit = vcGrd.getInitConfig();
	//그리드 초기 설정으로 세팅합니다.
	vcGrd.init(vcGrdInit);
	
}
