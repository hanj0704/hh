/************************************************
 * EXBApp.js
 * Created at 2021. 1. 25. 오후 6:31:31.
 *
 * @author ryu
 ************************************************/

var util = createCommonUtil();

var moContentConfig = {
	"preferredHeight" : 890,
	"preferredWidth" : -1,
	"vertical" : {
		"top" : 30,
		"right" : 30,
		"bottom" : 50,
		"left" : 30,
		"spacing" : 10
	},
	"form" : {
		"top" : "30px",
		"right" : "30px",
		"bottom" : "50px",
		"left" : "30px",
		"spacing" : "0px"
	}
}

var mbIsLink = false;
/**
 * 
 * @param {label:String, value:String} poValue
 */
function setShowMenuItemFilter(poValue,appId) {
	var vcTreMn = app.lookup("treMn");
	
	if (poValue == null){
		return;
	}
	
	var vsMnItemVal = poValue.value;
	
	vcTreMn.filterExp = "hasAncestor('" + vsMnItemVal + "') && useYn !='N'";
	vcTreMn.collapseAllItems();
	if(mbIsLink){//링크로 화면은 여는것인지 체크
		mbIsLink = false;
		setTreeItem(appId);
	}else{
		var item = vcTreMn.getChildren();
		var appId;
		for (var i = 0; i < item.length; i++) {
			appId = getAppId(item[i]);
			if (appId != "") {
				break;
			}
		}
		if (appId) {
			setTreeItem(appId);
		} else {
			//
			var vcNvb = app.lookup("nvbStmp");
			var item = vcNvb.findItem({
				"value": poValue.value
			});
			var vsMnItemPath = getMenuItemPath(item);
			app.lookup("bcPth").values = vsMnItemPath;
			// 앱이 존재하지 않는 경우에 대한 처리
			new cpr.core.App.load("exb/com/error/Error404", function(loadedApp) {
				app.lookup("eaCn").app = loadedApp;
				app.lookup("eaCn").ready(function(ea) {});
			});
		}
	}
	
}

/**
 * 
 * @param {String} appId
 */
function setTreeItem(appId){
	var vcTreMn = app.lookup("treMn");
	var voRow  = vcTreMn.dataSet.findFirstRow("appId == '" + appId + "'");
		if (voRow) {
			vcTreMn.focusItem(vcTreMn.getItemByValue(voRow.getValue("value")));
			vcTreMn.selectItemByValue(voRow.getValue("value"));
		}
}

/**
 * 
 * @param {String} appId
 */
function setLinkOpen(appId){
	mbIsLink = true;
	
	//appId로 메누 다시 구성
	var vcTreMn = app.lookup("treMn");
	var voRow  = vcTreMn.dataSet.findUnfilteredFirstRow("appId == '" + appId + "'");
	
	vcTreMn.clearFilter();
	var voItem = vcTreMn.findItem({"value" : voRow.getValue("value")});
	var item = getParent(2,voItem);	
	var voPgConfig = {
			label : item.label,
			value : item.value
		};
//	vcTreMn.filterExp = "hasAncestor('" + item.value + "') && useYn !='N'";
//	vcTreMn.collapseAllItems();
	
	setShowMenuItemFilter(voPgConfig, appId);
	
	//setTreeItem(appId);

}
exports.setLinkOpen = setLinkOpen;

/**
 * 
 * @param {Number} depth 원하는 뎁스
 * @param {cpr.controls.TreeItem} item
 */
function getParent(depth, item){
	var vcTreMn = app.lookup("treMn");
	var _item = item;
	var parentItem;
	while(_item.depth > 0){
		parentItem = vcTreMn.findItem({"value" : _item.parentValue});	
		if(parentItem.depth == depth){
			break;
		}else{
			_item = parentItem;
		}
	}
	return parentItem;

}

/**
 * 
 * @param {cpr.controls.TreeItem} item
 */
function getAppId(item){
   
   var _item = item;
   var depth = _item.children.length;
   var appId = _item.row.getValue("appId");
   if(appId == ""){      
      if (depth > 0) {
         for (var i = 0; i < depth; i++) {
            appId = getAppId(_item.children[i]);
            if(appId != ""){
               return appId;
            }
         }
      }else{
         return appId;
      }      
   }
   return appId;
}

/**
 * 메뉴 아이템을 통해 임베디드 앱에 화면을 표시합니다.
 * @param {cpr.controls.TreeItem} pcItem
 */
function openMenuItem(pcItem) {
	var vsAppId = pcItem.row.getValue("appId");
	
	if (vsAppId != null && vsAppId != ""){
		openMenuItemWithAppId(vsAppId, pcItem);
	}
}


/**
 * 앱 아이디를 통해 임베디드 앱에 화면을 표시합니다.
 * @param {#app} psAppId 앱 아이디
 * @param {cpr.controls.TreeItem} pcItem 메뉴 아이템
 */
function openMenuItemWithAppId(psAppId, pcItem) {
	var vcEaCn = app.lookup("eaCn");
	
	if (psAppId.indexOf("://") != -1){
		window.open(psAppId);
		return;
	}
	
	new cpr.core.App.load(psAppId, function(loadedApp) {
		if (loadedApp){
			vcEaCn.app = loadedApp;
			
			/* 선호 사이즈 설정 */
			vcEaCn.ready(function(ea){
				/* 페이지 공통 레이아웃 처리 */
				var voEaCnAppIns = vcEaCn.getEmbeddedAppInstance();
				var vcEaCnCont = voEaCnAppIns.getContainer();
				
				var voEaCnContLt = vcEaCnCont.getLayout();
				if (voEaCnContLt instanceof cpr.controls.layouts.VerticalLayout){ // 버티컬 레이아웃일 때
					voEaCnContLt.topMargin = moContentConfig.vertical.top;
					voEaCnContLt.rightMargin = moContentConfig.vertical.right;
					voEaCnContLt.bottomMargin = moContentConfig.vertical.bottom;
					voEaCnContLt.leftMargin = moContentConfig.vertical.left;
					voEaCnContLt.spacing = moContentConfig.vertical.spacing;
				} else if (voEaCnContLt instanceof cpr.controls.layouts.FormLayout) { // 폼 레이아웃일 때
					voEaCnContLt.topMargin = moContentConfig.form.top;
					voEaCnContLt.rightMargin = moContentConfig.form.right;
					voEaCnContLt.bottomMargin = moContentConfig.form.bottom;
					voEaCnContLt.leftMargin = moContentConfig.form.left;
					voEaCnContLt.horizontalSpacing = moContentConfig.form.spacing;
					voEaCnContLt.verticalSpacing = moContentConfig.form.spacing;
				}
				
				/* 앱 배경 처리 */
				vcEaCnCont.style.setClasses("bg-gray-200");
				
				/* 앱 타이틀 공통 설정 */
				vcEaCnCont.getAllRecursiveChildren(false).filter(function(each){
					return each instanceof udc.cmn.AppTitle;
				}).forEach(function(each){
					var vsMnItemPath = getMenuItemPath(pcItem);
					app.lookup("bcPth").values = vsMnItemPath;
				});
			});
		} else {
			// 앱이 존재하지 않는 경우에 대한 처리
			new cpr.core.App.load("exb/com/error/Error404", function(loadedApp) {
				vcEaCn.app = loadedApp;
				vcEaCn.ready(function(ea){
				});
			});
		}
	});
}
exports.openMenuItemWithAppId = openMenuItemWithAppId;


/**
 * 특정 메뉴 아이템의 경로를 반환합니다.
 * @param {cpr.controls.TreeItem} pcItem
 * @return {String}
 */
function getMenuItemPath(pcItem) {
	var vaRelatedMenuItems = getRelatedItems(pcItem);
	
	if (vaRelatedMenuItems == null){
		return;
	}
	
	var vaMenuItemPaths = vaRelatedMenuItems.map(function(/* cpr.controls.TreeItem */ item, /* Number */ index){
		return item.label;
	});
	
	return vaMenuItemPaths.join(",");
}


/**
 * 아이템과 연관된 아이템을 얻습니다.
 * @param {cpr.controls.TreeItem} pcItem 기준이 되는 아이템
 * @param {Boolean} pbIncludeSelf 기준이 되는 아이템 포함 여부 (default:true)
 * @return {cpr.controls.TreeItem[]}
 */
function getRelatedItems(pcItem, pbIncludeSelf) {
	var vcTreMn = app.lookup("treMn");
	
	if (pcItem == null){
		return;
	}
	
	var vcSelfItem = pcItem;
	
	var vaRelatedItems = [];
	var vcTmpSelfItem = vcSelfItem;
	
	while(vcTmpSelfItem != null){
		vaRelatedItems.splice(0, 0, vcTmpSelfItem);
		vcTmpSelfItem = vcTmpSelfItem.parentItem;
	}
	
	/* 기준이 되는 아이템을 포함하지 않으면 맨 마지막 아이템을 제거 */
	if (vaRelatedItems.length > 0 && pbIncludeSelf == false){
		vaRelatedItems.pop();
	}
	
	return vaRelatedItems;
}


/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	util.Submit.send(app, "subOnLoad", null, function(pbSuccess) {
		if (pbSuccess){
			var voInitValue = app.getAppProperty("initValue");
			setShowMenuItemFilter(voInitValue);

			util.Control.redraw(app, ["grpHd", "grpBc", "grpAsd", "eaCn"]);
		}	
	});
}


/*
 * 루트 컨테이너에서 screen-change 이벤트 발생 시 호출.
 * 스크린 크기 변경 시 호출되는 이벤트.
 */
function onBodyScreenChange(/* cpr.events.CScreenChangeEvent */ e){
	
}


/*
 * 이미지에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onImgLgClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Image
	 */
	var imgLg = e.control;
	
	location.reload();
}


/*
 * 트리에서 selection-change 이벤트 발생 시 호출.
 * 선택된 Item 값이 저장된 후에 발생하는 이벤트.
 */
function onTreMnSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.Tree
	 */
	var treMn = e.control;
	
	var vaNewSelections = e.newSelection;
	if (vaNewSelections.length == 0){
		return;
	}
	
	var vcMenuItem = vaNewSelections[0];
	
	openMenuItem(vcMenuItem);
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
	
	var vcMnItem = e.item;
	
	if (vcMnItem == null){
		return;
	}
	
	/* 자식 아이템이 있는 경우 아이템 토글 */
	var vaChildMnItems = treMn.getChildren(vcMnItem);
	
	if (vaChildMnItems.length > 0){
		treMn.toggle(vcMnItem);
	}
}


/*
 * 네비게이션 바에서 item-click 이벤트 발생 시 호출.
 * 아이템 클릭시 발생하는 이벤트.
 */
function onNvbStmpItemClick(/* cpr.events.CItemEvent */ e){
	/** 
	 * @type cpr.controls.NavigationBar
	 */
	var nvbStmp = e.control;
	
	var vcMnItem = e.item;
	
	if (vcMnItem.value == "__home__"){
		new cpr.core.App.load("exb/com/main/EXBMain", function(loadedApp){
			loadedApp.createNewInstance().run();
			app.dispose();
		});
		
		return;
	}

	var voPgConfig = {
		label : vcMnItem.label,
		value : vcMnItem.value
	};
	
	setShowMenuItemFilter(voPgConfig);
}


/*
 * 네비게이션 바에서 selection-change 이벤트 발생 시 호출.
 * 선택된 Item 값이 저장된 후에 발생하는 이벤트.
 */
function onNvbStmpSelectionChange(/* cpr.events.CSelectionEvent */ e){
	/** 
	 * @type cpr.controls.NavigationBar
	 */
	var nvbStmp = e.control;
	
	/*
	 * var vaNewSelection = e.newSelection;
	 * if (vaNewSelection.length == 0){
	 * 	return;
	 * }
	 * 
	 * var vcMnItem = vaNewSelection[0];
	 * 
	 * if (vcMnItem.value == "__home__"){
	 * 	new cpr.core.App.load("exb/com/main/EXBMain", function(loadedApp){
	 * 		loadedApp.createNewInstance().run();
	 * 		app.dispose();
	 * 	});
	 * 	
	 * 	return;
	 * }
	 * 
	 * var voPgConfig = {
	 * 	label : vcMnItem.label,
	 * 	value : vcMnItem.value
	 * };
	 * 
	 * setShowMenuItemFilter(voPgConfig);
	 */
}
