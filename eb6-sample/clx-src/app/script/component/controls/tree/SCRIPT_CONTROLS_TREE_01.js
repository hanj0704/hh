

/*
 * "실행" 버튼(btnMoveCol2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnMoveCol2Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnMoveCol2 = e.control;
	
	var vcTreMn = app.lookup("treMn");
	
	vcTreMn.getSelection().forEach(function(each){
		vcTreMn.deleteItem(each);
	});
}


/*
 * "실행" 버튼(btnExpand)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnExpandClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnExpand = e.control;
	treeExpand();
	var ace2 = app.lookup("ace2");
	ace2.value = "" + treeExpand;
}

function treeExpand(){
	//트리 컨트롤을 가져옵니다.
	var vcTreMn = app.lookup("treMn");
	//모든 아이템을 펼칩니다.
	vcTreMn.expandAllItems();	
}




/*
 * "실행" 버튼(btnCol)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnColClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnCol = e.control;
	
	treCollapse();
	var ace2 = app.lookup("ace2");
	ace2.value = "" + treCollapse;
	
}

function treCollapse(){
	var vcTreMn = app.lookup("treMn");
	//모든 아이템을 접습니다.
	vcTreMn.collapseAllItems(); 
}


/*
 * "실행" 버튼(btnLine)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnLineClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnLine = e.control;
	showLine();
	var ace2 = app.lookup("ace2");
	ace2.value = "" + showLine;
}

function showLine(){
	
	var vcTreMn = app.lookup("treMn");
	//트리 라인속성을 true로 변경해줍니다.
	vcTreMn.showLines = app.lookup("cbxLine").value;
	//트리를 다시 그려줍니다.
	vcTreMn.redraw();
}



/*
 * "실행" 버튼(btnAdd)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnAddClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnAdd = e.control;
	treeAddItem();
	var ace2 = app.lookup("ace2");
	ace2.value = "" + treeAddItem;
	
}

function treeAddItem(){
	var vcTreMn = app.lookup("treMn");
	
	var vaSlct = vcTreMn.getSelection();
	
	var vsPrntVal = "";
	if (vaSlct.length > 0){
		vsPrntVal = vaSlct[0].value;
	}
	//아이템을 하나 생성합니다.
	var vcNewItem = new cpr.controls.TreeItem("새로 추가된 아이템", "New" + moment().format("hhmmss")+Math.floor(Math.random()*1000), vsPrntVal);
	//아이템을 추가합니다.
	vcTreMn.addItem(vcNewItem);
	
}

/*
 * "실행" 버튼(btnDel)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnDelClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnDel = e.control;
	treDelItem();
	var ace2 = app.lookup("ace2");
	ace2.value = "" + treDelItem;
}

function treDelItem(){
	var vcTreMn = app.lookup("treMn");
	//선택된 아이템
	var vaSlctItem = vcTreMn.getSelection()[0];	
	//아이템을 삭제합니다.
	vcTreMn.deleteItem(vaSlctItem);
	
}


/*
 * "실행" 버튼(btnDel2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnDel2Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnDel2 = e.control;
	
	selectItem();
	var ace2 = app.lookup("ace2");
	ace2.value = "" + selectItem;
	
	
}

function selectItem(){
	var vcTreMn = app.lookup("treMn");
	var vsLabelVal = app.lookup("ipbLabelVal").value;
	//아이템을 선택합니다.
	vcTreMn.selectItemByLabel(vsLabelVal);
	//선택한 아이템을 포커스합니다.
	if(vcTreMn.getSelection()[0]){
		vcTreMn.focusItem(vcTreMn.getSelection()[0]);
	}
}


/*
 * "실행" 버튼(btnDel3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnDel3Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnDel3 = e.control;
	disPlayExp();
	var ace2 = app.lookup("ace2");
	ace2.value = "" + disPlayExp;
}

function disPlayExp(){
	var vcTreMn = app.lookup("treMn");
	var cbxDsply = app.lookup("cbxDsply");
	//체크 여부 판단
	if (cbxDsply.checked){
		vcTreMn.displayExp = " label + ' [value =' + value + ', parentValue =' +  parent + ']' ";
	} else {
		vcTreMn.displayExp = "";
	}
	
	vcTreMn.redraw();
}



/*
 * 트리에서 item-click 이벤트 발생 시 호출.
 * 아이템 클릭시 발생하는 이벤트.
 */
function onTreMnItemClick(/* cpr.events.CItemEvent */ e){
	/** 
	 * @type cpr.controls.Tree
	 */
	var treMn = e.control;
	
	var item = e.item;
	
	app.lookup("lblVal").value = JSON.stringify(e.item.row.getRowData());
}


/*
 * "실행" 버튼(btn1)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn1Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btn1 = e.control;
	var ace2 = app.lookup("ace2");
	ace2.value = "" + onTreMnItemClick;
	
}
