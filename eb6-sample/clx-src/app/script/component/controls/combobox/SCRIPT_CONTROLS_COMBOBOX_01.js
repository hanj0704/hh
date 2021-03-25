

/*
 * "실행" 버튼(btnInit)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnInitClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnInit = e.control;
	dynamicComboData();
	var vcAce = app.lookup("ace");
	vcAce.value = dynamicComboData + "";
	
}

function dynamicComboData(){
	var vcCombo = app.lookup("cmb1");
	
	//기존 콤보박스에 바인딩 되어있는 데이터셋을 지워줍니다.
	//vcCombo.setItemSet(null);
	//기존 콤보박스에 아이템을 지워줍니다.
	vcCombo.deleteAllItems();
	
	//선행데이터를 세팅한다.
	vcCombo.addItem(new cpr.controls.Item("대한민국", "c01"));
	vcCombo.addItem(new cpr.controls.Item("일본", "c02"));
	vcCombo.addItem(new cpr.controls.Item("중국", "c03"));
	vcCombo.addItem(new cpr.controls.Item("미국", "c04"));
	vcCombo.addItem(new cpr.controls.Item("영국", "c05"));
	
	//첫번째 아이템을 선택한다.
	vcCombo.selectItem(0);
}


/*
 * "실행" 버튼(btnInit2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnInit2Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnInit2 = e.control;
	
	setInit();
	
	var vcAce = app.lookup("ace");
	vcAce.value = setInit + "";
	
}

function setInit(){
	var vcCombo = app.lookup("cmb1");
	var vcDs = app.lookup("dsList");
	//기존에 아이템을 전부 지워준다.
	vcCombo.deleteAllItems();
	//콤보박스를 동적으로 세팅해줍니다.
	vcCombo.setItemSet(vcDs, {
		"label" : "label",
		"value" : "value"
	});
	//콤보박스에 연결된 데이터셋의 처음값으로 돌아갑니다.
	vcCombo.dataSet.revert();
	//콤보박스의 첫번째 값을 선택합니다.
	vcCombo.selectItem(0);
}


/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	
	var combo = app.lookup("cmb1");
	combo.selectItem(0);
	
}


/*
 * "실행" 버튼(btnDeleteCol)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnDeleteColClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnDeleteCol = e.control;
	getData();
	var vcAce = app.lookup("ace");
	vcAce.value = getData + "";
	
}

function getData(){		
	var combo = app.lookup("cmb1");
	
	var voItem = combo.getSelection()[0];
	var data ;
	
	if(voItem.row){ 
		data = voItem.row.getRowData();
	}else{ //선행데이터에 아이템을 추가한겨우
		data = {
			"label" : voItem.label,
			"value" : voItem.value
		}
	}
	var vcVal = app.lookup("lblVal");
	vcVal.value = JSON.stringify(data);
}


/*
 * "실행" 버튼(btnDeleteCol2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnDeleteCol2Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnDeleteCol2 = e.control;
	setItemSet();
	var vcAce = app.lookup("ace");
	vcAce.value = setItemSet + "";
	
}

function setItemSet(){
	var vcCmb1 = app.lookup("cmb1");
	var vcCmb2 = app.lookup("cmb2");
	var vcDataSet = app.lookup(vcCmb2.value);
	
	vcCmb1.deleteAllItems();
	vcCmb1.dataSet.revert();
	vcCmb1.setItemSet(vcDataSet, {
		"label" : "label",
		"value" : "value"
	});
	vcCmb1.selectItem(0);
	
}
