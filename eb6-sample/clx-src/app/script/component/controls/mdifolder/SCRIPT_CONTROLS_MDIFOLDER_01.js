/************************************************
 * SCRIPT_CONTROLS_MDIFOLDER_01.js
 * Created at 2021. 2. 3. 오전 9:24:45.
 *
 * @author SUBBY
 ************************************************/

/**
 * appID를 통해 MDI 폴더의 TabItem을 선택하여 보여줍니다.
 * @param {cpr.controls.TabItem}
 */
function setSelectedTabItem(vcTabItem) {
	var vcSampleMDIFolder = app.lookup("sampleMDIFolder");
	
	/* 찾은 tabItem으로 선택하여 보여줍니다. */
	vcSampleMDIFolder.setSelectedTabItem(vcTabItem);
}

/**
 * App으로 된 TabItem을 추가합니다.
 * @param {String} vsAppId
 */
function addItemWithApp(vsAppId) {
	var vcSampleMDIFolder = app.lookup("sampleMDIFolder");
	
	/* MDI 폴더에 App을  추가합니다. */
	vcSampleMDIFolder.addItemWithApp(vsAppId);
}

/**
 * TabItem을 제거합니다.
 * @param {cpr.controls.TabItem} vcTabItem
 */
function removeTabItem(vcTabItem) {
	var vcSampleMDIFolder = app.lookup("sampleMDIFolder");
	
	/* 찾은 tabItem을 제거합니다. */
	vcSampleMDIFolder.removeTabItem(vcTabItem);
}

/*
 * "실행" 버튼(btnFindAppId)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnFindAppIdClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnFindAppId = e.control;
	
	var vcSampleMDIFolder = app.lookup("sampleMDIFolder");
	
	var vsAppId = app.lookup("cmbFindAppId").value;
	
	/* appID를 통해 tabItem을 찾습니다. */
	var vcTabItem = vcSampleMDIFolder.findItemWithAppID(vsAppId);
	
	if(vcTabItem == null) {
		alert("MDI 폴더에 없는 App 입니다.");
		return;
	}
	
	/* 동작 실행 */
	setSelectedTabItem(vcTabItem);
	
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = setSelectedTabItem;
}

/*
 * "실행" 버튼(btnAddAppId)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnAddAppIdClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnAddAppId = e.control;
	
	var vcSampleMDIFolder = app.lookup("sampleMDIFolder");
	
	var vcCmbAdd = app.lookup("cmbAddAppId");
	
	var vsAppId = vcCmbAdd.value;
	
	var vcTabItem = vcSampleMDIFolder.findItemWithAppID(vsAppId);
	
	if (vcTabItem != null) {
		alert("추가되어있는 App 입니다.");
		return;
	}
	
	/* 동작 실행 */
	addItemWithApp(vsAppId);
	
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = addItemWithApp;
}

/*
 * "실행" 버튼(btnRemoveAppId)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnRemoveAppIdClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnRemoveAppId = e.control;
	
	var vcSampleMDIFolder = app.lookup("sampleMDIFolder");
	
	var vsAppId = app.lookup("cmbRemoveAppId").value;
	
	/* appID를 통해 tabItem을 찾습니다. */
	var vcTabItem = vcSampleMDIFolder.findItemWithAppID(vsAppId);
	
	if (vcTabItem == null) {
		alert("MDI 폴더에 제거되었거나 없는 App 입니다.");
		return;
	}
	
	/* 동작 실행 */
	removeTabItem(vcTabItem);
	
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = removeTabItem;
}
