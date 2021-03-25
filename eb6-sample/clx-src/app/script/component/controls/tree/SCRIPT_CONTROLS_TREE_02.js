
/*
 * "실행" 버튼(btnExpand)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnExpandClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnExpand = e.control;
	
	var ace2 = app.lookup("ace2");
	ace2.value = "" ;
}


/*
 * "실행" 버튼(btnExpand)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnExpandClick2(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnExpand = e.control;
	setAncestor();
	
	var ace2 = app.lookup("ace2");
	ace2.value = "" + setAncestor;
	
}

function setAncestor(){
	
	var vcTreMn = app.lookup("treMn");
	var voItem = vcTreMn.getSelection()[0];
	if(voItem){
		//filterExp , setFilter 동일하게 작동합니다.
		//vcTreMn.filterExp = "hasAncestor('" + voItem.value + "') || value == '"  + voItem.value + "'" ;   
		vcTreMn.setFilter("hasAncestor('" + voItem.value + "') || value == '"  + voItem.value + "'"); 
	}
}


/*
 * "실행" 버튼(btnExpand3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnExpand3Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnExpand3 = e.control;
	setDepth();
	var ace2 = app.lookup("ace2");
	ace2.value = "" + setDepth;
	
}

function setDepth(){
	var vcTreMn = app.lookup("treMn");
	var vnDepth = app.lookup("cmb1").value;
	var voItem = vcTreMn.getSelection()[0];
	//선택한 아이템의 깊이로 필터	
	vcTreMn.setFilter("depth == '" + vnDepth + "'");
}


/*
 * "실행" 버튼(btnExpand2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnExpand2Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnExpand2 = e.control;
	clearFilter();
	var ace2 = app.lookup("ace2");
	ace2.value = clearFilter +  "" ;
	
}

function clearFilter(){
	var vcTreMn = app.lookup("treMn");
	
	vcTreMn.clearFilter();
	
	vcTreMn.redraw();
	
}





/*
 * "실행" 버튼(btnExpand4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnExpand4Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnExpand4 = e.control;
	
	var tre = app.lookup("treMn");
	
	console.log(tre.getItems()[1]);
	console.log(tre.getSelection()[0]);
	//app.lookup("opt1").value = 	tre.getCh	tre.getSelection()[0].depth;
	
}


/*
 * "실행" 버튼(btnExpand5)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnExpand5Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnExpand5 = e.control;
	var vcTreMn = app.lookup("treMn");
	debugger;
	
}
