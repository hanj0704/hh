/************************************************
 * AppTitle.js
 * Created at 2020. 11. 11. 오후 2:35:56.
 *
 * @author ryu
 ************************************************/


/**
 * 동적으로 태그 아이템을 생성합니다.
 */
function createTagItems() {
	var vsTags = app.getAppProperty("tags");
	var vaTagItems = vsTags.split(",");
	
	var vcGrpTagBox = app.lookup("grpTagBx");
	
	/* 태그 박스 내 컨트롤 초기화 */
	vcGrpTagBox.removeAllChildren(true);
	
	/* 동적으로 태그 아이템 생성 */
	vaTagItems.forEach(function(each){
		var vcTagItem = new cpr.controls.Output();
		
		vcTagItem.value = "#" + each;
		vcTagItem.tooltip = each;
		
		vcTagItem.style.setClasses("tag-item");
		
		vcGrpTagBox.addChild(vcTagItem, {
			autoSize : "both"
		});
	});
}


/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	var voHostAppIns = app.getHostAppInstance();
	
	/* 자동으로 앱 타이틀 및 앱 ID 지정 */
	var vsAppTitle = voHostAppIns.app.title;
	var vsAppId = voHostAppIns.app.id;
	
	app.setAppProperties({
		"title" : vsAppTitle,
		"appId" : vsAppId
	});
	
	app.lookup("lblAppTtl").redraw();
	app.lookup("lblAppId").redraw();
}


/*
 * 루트 컨테이너에서 property-change 이벤트 발생 시 호출.
 * 앱의 속성이 변경될 때 발생하는 이벤트 입니다.
 */
function onBodyPropertyChange(/* cpr.events.CPropertyChangeEvent */ e){
	if (e.property == "tags"){
		createTagItems();
	}
}
