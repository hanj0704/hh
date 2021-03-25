/************************************************
 * PropView.js
 * Created at 2021. 2. 1. 오전 10:07:41.
 *
 * @author ryu
 ************************************************/

/**
 * 각 컨트롤의 물리명 및 논리명
 */
var moCtrlNm = {
	"control" : {
		"accordion": "아코디언",
		"audio": "오디오",
		"button": "버튼",
		"calendar": "캘린더",
		"checkbox": "체크박스",
		"checkboxgroup": "체크박스 그룹",
		"combobox": "콤보박스",
		"container": "그룹",
		"dateinput": "데이트인풋",
		"dialog": "다이얼로그",
		"embeddedapp": "임베디드 앱",
		"embeddedpage": "임베디드 페이지",
		"fileinput": "파일인풋",
		"fileupload": "파일업로드",
		"grid": "그리드",
		"htmlobject": "HTML오브젝트",
		"htmlsnippet": "HTML스니펫",
		"image": "이미지",
		"inputbox": "인풋박스",
		"linkedcombobox": "링크드 콤보박스",
		"linkedlistbox": "링크드 리스트박스",
		"listbox": "리스트박스",
		"maskeditor": "마스크에디터",
		"menu": "메뉴",
		"mdifolder": "MDI폴더",
		"navigationbar": "네비게이션바",
		"notifier": "알림",
		"numbereditor": "넘버에디터",
		"output": "아웃풋",
		"pageindexer": "페이지 인덱서",
		"progress": "프로그레스",
		"radiobutton": "라디오버튼",
		"searchinput": "서치 인풋",
		"slider": "슬라이더",
		"tabfolder": "탭 폴더",
		"textarea": "텍스트에리어",
		"tree": "트리",
		"treecell": "트리셀",
		"video": "비디오"
	},
	"cell" : {
		"group" : "그리드 그룹",
		"headerCell" : "그리드 헤더 셀",
		"detailCell" : "그리드 디테일 셀",
		"footerCell" : "그리드 푸터 셀"
	}
}


/**
 * 활성화될 탭 아이템과 비활성화될 탭 아이템을 구분하여 표시합니다.
 */
function setTabItemFilter() {
	var vcDsPropVw = app.lookup("dsPropVw");
	var vcTfPropVw = app.lookup("tfPropVw");
	
	/* 표시 가능한 속성 뷰 탭 확인 */
	var vaPropTabItems = vcDsPropVw.getUnfilteredDistinctValues("PROP_SJ", function(dataRow){
		var vsAppProp = app.getAppProperty("filterCondition");
		return dataRow.getValue("CTRL_NM") == vsAppProp;
	});
	
	/* 표시 가능한 속성 뷰 탭 아이템만 화면 상에 표시 */
	var vaTabItems = vcTfPropVw.getTabItems();
	for(var idx = 0; idx < vaTabItems.length; idx++){
		var vcEachTabItem = vaTabItems[idx];
		var vsTabItemTxt = vcEachTabItem.text;
		if (vaPropTabItems.indexOf(vsTabItemTxt) == -1){
			vcEachTabItem.visible = false;
		}
	}
	
	/* 표시 되고 있는 탭 아이템 중 가장 첫번째 탭 아이템 확인하여 선택 */
	var vaVisibleTabItem = vaTabItems.filter(function(each){
		return each.visible == true;
	});
	
	if (vaVisibleTabItem.length > 0){
		vcTfPropVw.setSelectedTabItem(vaVisibleTabItem[0]);
	}
}


/*
 * 루트 컨테이너에서 property-change 이벤트 발생 시 호출.
 * 앱의 속성이 변경될 때 발생하는 이벤트 입니다.
 */
function onBodyPropertyChange(/* cpr.events.CPropertyChangeEvent */ e){
	if (e.property == "dataset"){
		var vcDsTrgt = e.newValue;
		if (vcDsTrgt instanceof cpr.data.DataSet){
			var vcDsPropVw = app.lookup("dsPropVw"); 
			vcDsTrgt.copyToDataSet(vcDsPropVw);
			vcDsPropVw.setRowStateAll(cpr.data.tabledata.RowState.UNCHANGED);
		}
	}
}


/*
 * 탭 폴더에서 selection-change 이벤트 발생 시 호출.
 * Tab Item을 선택한 후에 발생하는 이벤트.
 */
function onTfPropVwSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.TabFolder
	 */
	var tfPropVw = e.control;
	
	var vcTabItem = e.newSelection;
	/** @type cpr.controls.Container */
	var vcGrpCn = vcTabItem.content;
	
	/** @type cpr.controls.Grid */
	var vcGrdProp = vcGrpCn.getChildren()[0];
	
	vcGrdProp.filter("CTRL_NM == '" + app.getAppProperty("filterCondition") + "' && PROP_SJ == '" + vcTabItem.text + "'");
}


/*
 * 루트 컨테이너에서 before-draw 이벤트 발생 시 호출.
 * 그룹 컨텐츠가 그려지기 직전에 호출되는 이벤트 입니다. 내부 컨텐츠를 동적으로 구성하기위한 용도로만 사용됩니다.
 */
function onBodyBeforeDraw(/* cpr.events.CUIEvent */ e){
	app.lookup("lblCptn").value = moCtrlNm[app.getAppProperty("filterType")][app.getAppProperty("filterCondition")];
	setTabItemFilter();
}
