/************************************************
 * EXBMain.js
 * Created at 2021. 1. 25. 오후 5:38:09.
 *
 * @author ryu
 ************************************************/

/**
 * 헤더 플로팅 타겟
 * @type FloatingHeaderVerticalLayout
 */
var floatHeader;

/**
 * 다음 페이지로 화면을 이동합니다.
 * @param {cpr.controls.Item} pcItem
 */
function navigate(pcItem) {
	/** @type String */
	var vsAppId = pcItem.row.getValue("appId");
	
	if (vsAppId.indexOf("://") != -1){
		window.open(vsAppId);
	} else {
		var voPgConfig = {
			label : pcItem.label,
			value : pcItem.value
		};
	
		new cpr.core.App.load("exb/com/main/EXBApp", function(loadedApp){
			var voLoadedAppIns = loadedApp.createNewInstance().run();
			voLoadedAppIns.setAppProperty("initValue", voPgConfig);
			app.dispose();
		});
	}
}


/**
 * 사용 가능한 메뉴만 메인으로 표시합니다.
 * 컬럼의 useYn 값에 따라 표시 여부가 결정됩니다. (N인 경우 표시 되지 않음)
 */
function createMenuAreas() {
	var vaRtMnItems = getChildrenMenuItems();
	vaRtMnItems = vaRtMnItems.filter(function(each){
		return each.row.getValue("useYn") != "N";
	});
	
	for(var idx = 0; idx < vaRtMnItems.length; idx++){
		var vcMnItem = vaRtMnItems[idx];
		
		/* 메뉴 에어리어 */
		var vcGrpMnArea = createMenuAreaPart();
		
		app.lookup("grpCn").addChild(vcGrpMnArea, {
			autoSize : "height"
		});
		
		/* 메뉴 타이틀 */
		vcGrpMnArea.addChild(createMenuTitlePart(vcMnItem), {
			autoSize : "height"
		});
		
		/* 서브 메뉴 레퍼 */
		vcGrpMnArea.addChild(createSubMenuWrapPart(vcMnItem), {
			autoSize : "height"
		});
	}
}


/**
 * 메뉴의 큰 영역을 동적으로 생성합니다.
 */
function createMenuAreaPart() {
	var vcGrpMnArea = new cpr.controls.Container();
	
	var voGrpMnAreaLt = new cpr.controls.layouts.VerticalLayout();
	voGrpMnAreaLt.spacing = 20;
	vcGrpMnArea.setLayout(voGrpMnAreaLt);
	
	return vcGrpMnArea;
}

/**
 * 메뉴의 큰 영역에 해당하는 타이틀을 생성합니다.
 * @param {cpr.controls.TreeItem} pcItem
 */
function createMenuTitlePart(pcItem) {
	var vcLblMnTtl = new cpr.controls.Output();
	vcLblMnTtl.value = pcItem.label;
	vcLblMnTtl.style.addClass("h3");
	
	return vcLblMnTtl;
}


/**
 * 메뉴의 작은 영역에 해당하는 영역을 동적으로 생성합니다.
 * @param {cpr.controls.TreeItem} pcItem
 */
function createSubMenuWrapPart(pcItem) {
	var vaSubMnItems = getChildrenMenuItems(pcItem);

	vaSubMnItems = vaSubMnItems.filter(function(each){
		return each.row.getValue("useYn") != "N";
	});
	
	var vcGrpSubMnWrap = new cpr.controls.Container();
	var voGrpSubMnWrapLt = new cpr.controls.layouts.FormLayout();
	voGrpSubMnWrapLt.scrollable = false;
	
	var vaFrmCols = vaSubMnItems.map(function(each){
		return "400px";
	});
	
	voGrpSubMnWrapLt.setColumns(vaFrmCols);
	voGrpSubMnWrapLt.setRows(["1fr"]);
	
	voGrpSubMnWrapLt.horizontalSpacing = "10px";
	
	vcGrpSubMnWrap.setLayout(voGrpSubMnWrapLt);
	
	var vcDsStMn = app.lookup("dsMn");
	for(var idx = 0; idx < vaSubMnItems.length; idx++){
		var vcMnItem = vaSubMnItems[idx];
		
		/* 서브 메뉴 에어리어 */
		var vcGrpSubMnArea = new cpr.controls.Container();
		var voGrpSubMnAreaLt = new cpr.controls.layouts.VerticalLayout();
		
		voGrpSubMnAreaLt.spacing = 50;
		voGrpSubMnAreaLt.topMargin = 20;
		voGrpSubMnAreaLt.rightMargin = 20;
		voGrpSubMnAreaLt.bottomMargin = 20;
		voGrpSubMnAreaLt.leftMargin = 20;
		vcGrpSubMnArea.setLayout(voGrpSubMnAreaLt);
		
		vcGrpSubMnArea.style.addClass("card");
		
		vcGrpSubMnWrap.addChild(vcGrpSubMnArea, {
			colIndex : idx,
			rowIndex : 0
		});

		/* 서브 메뉴 에어리어 타이틀 */
		var vcLblSubMnTtl = new cpr.controls.Output();
		vcLblSubMnTtl.value = vcMnItem.label;
		vcLblSubMnTtl.style.addClass("h4");
		
		vcGrpSubMnArea.addChild(vcLblSubMnTtl, {
			autoSize : "height"
		});
		
		/* 서브 메뉴 */
		var vcLbxSubMn = new cpr.controls.ListBox();
		
		vcLbxSubMn.setItemSet(vcDsStMn, {
			label: "label",
			value: "value",
			tooltip: "label"
		});
		
		vcLbxSubMn.setFilter("parent == '" + vcMnItem.value + "' && useYn != 'N'");
		vcLbxSubMn.style.addClass("menu-list");
		
		vcLbxSubMn.addEventListener("selection-change", function(e){
			var vaSelectedItem = e.newSelection;
			
			if (vaSelectedItem.length > 0){
				navigate(vaSelectedItem[0]);
			}
		});
		
		vcGrpSubMnArea.addChild(vcLbxSubMn, {
			autoSize : "height"
		});
	}
	
	return vcGrpSubMnWrap;
}


/**
 * 특정 아이템의 바로 아래 자식 아이템을 얻습니다.
 * @param {cpr.controls.TreeItem} pcItem
 * @return {cpr.controls.TreeItem[]}
 */
function getChildrenMenuItems(pcItem) {
	var vcTreTmp = app.lookup("treTmp");
	
	var vaMenuItems = vcTreTmp.getChildren(pcItem);
	
	return vaMenuItems;
}

/**
 * 재귀적으로 트리 아이템의 자식을 찾습니다.
 * @param {cpr.controls.TreeItem} pcItem 기준이 되는 트리 아이템
 * @param {Boolean} pbIncludeSelf 기준이 되는 트리 아이템의 자신 및 부모 아이템 포함 여부
 */
function getAllRecursiveChildrenMenuItems(pcItem, pbIncludeSelf) {
	if (pcItem == null){
		return;
	}
	
	/** @type cpr.controls.TreeItem[] */
	var vaAllRecursiveItems = [];
	
	var vcTreTmp = app.lookup("treTmp");
	
	/* 부모를 포함하여 트리 필터 (기존 필터 조건 유지) */
	vcTreTmp.setTreeFilter("hasAncestor('" + pcItem.value + "')");
	var vaAllRecursiveItems = vcTreTmp.getItems();
	
	/* 필터 제거 (기존 필터 조건 유지) */
	vcTreTmp.setTreeFilter(null);
	
	if (pbIncludeSelf == null || pbIncludeSelf === false){
		vaAllRecursiveItems = vaAllRecursiveItems.filter(function(each){
			return each.hasAncestor(pcItem.value);
		});
	}
	
	return vaAllRecursiveItems;
}


/*
 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(/* cpr.events.CEvent */ e){
	app.lookup("subOnLoad").send().then(function(){
		createMenuAreas();
		
		app.lookup("grpCn").redraw();
	});
}


/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	/* 메인 헤더 플로팅 */
	floatHeader = new FloatingHeaderVerticalLayout(app.lookup("grpHdWrap"), app.getContainer());
	
	floatHeader.onstartfloat = function(/* cpr.controls.Container */ control) {
		control.style.addClass("floating-header");
		
	}
	
	floatHeader.onstopfloat = function(/* cpr.controls.Container */ control) {
		control.style.removeClass("floating-header");
	}
	
	floatHeader.start();
}
