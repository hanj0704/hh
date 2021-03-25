/************************************************
 * SCRIPT_CONTROLS_EMBEDDEDAPP_01.js
 * Created at 2021. 2. 3. 오전 9:24:19.
 *
 * @author SUBBY
 ************************************************/

/**
 * 임베디드 앱이 준비된 후 처리할 작업을 등록합니다.
 * @param {String} vsInitValue 넘겨줄 값
 * @param {String} vsLoadAppPath 호출할 화면 경로
 */
function ready(vsInitValue, vsLoadAppPath) {
	var vcEmbeddedApp = app.lookup("sampleEmbeddedApp");
	
	var voEmbeddedAppInstance = vcEmbeddedApp.getEmbeddedAppInstance();
	
	/* 이미 임베디드 앱에 호출된 앱이 있다면 호출된 앱을 닫습니다. */
	if (voEmbeddedAppInstance != null) {
		voEmbeddedAppInstance.dispose();
	}
	
	/* ready API를 통해 넘겨줄 값을 설정합니다. */
	vcEmbeddedApp.ready(function() {
		vcEmbeddedApp.initValue = vsInitValue;
	});
	
	/* load API를 통해 해당하는 앱을 호출합니다. */
	cpr.core.App.load(vsLoadAppPath, function(loadedApp) {
		vcEmbeddedApp.app = loadedApp;
	});
}

/**
 * 임베디드 앱에 화면을 호출합니다.
 * @param {String} vsLoadAppPath
 */
function load(vsLoadAppPath) {
	var vcEmbeddedApp = app.lookup("sampleEmbeddedApp");
	
	/* App의 load API를 사용하여 매개변수로 받은 화면 경로값으로 임베디드 앱에 화면을 호출합니다. */
	cpr.core.App.load(vsLoadAppPath, function(loadedApp) {
		vcEmbeddedApp.app = loadedApp;
	});
}

/**
 * 임베디드 앱에 호출된 화면을 닫습니다.
 */
function dispose() {
	var vcEmbeddedApp = app.lookup("sampleEmbeddedApp");
	
	/* 임베디드 앱의 인스턴스를 가져옵니다. */
	var voEmbeddedAppInstance = vcEmbeddedApp.getEmbeddedAppInstance();
	
	/* 임베디드 앱에 호출된 화면을 제거합니다. */
	voEmbeddedAppInstance.dispose();
}

/*
 * "실행" 버튼(btnReady)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnReadyClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnReady = e.control;
	
	var vsInitValue = app.lookup("ipbInitValue").value;
	
	var vsLoadAppURI = "app/script/component/controls/embeddedapp/SCRIPT_CONTROLS_EMBEDDEDAPP_01_D";
	
	if(vsInitValue == null || vsInitValue == "") {
		alert("전달할 값을 입력해주세요.");
		return;
	}
	
	/* 동작 실행 */
	ready(vsInitValue, vsLoadAppURI);
	
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = ready;
}

/*
 * "실행" 버튼(btnLoad)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnLoadClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnLoad = e.control;
	
	var vsSelectPage = app.lookup("cmbSelectPage").value;
	
	/* 선택한 화면이 없으므로 if문을 통해 메서드를 빠져나옵니다. */
	if (vsSelectPage == null || vsSelectPage == "") {
		alert("화면을 먼저 선택하세요.");
		return;
	}
	
	var vsLoadAppURI = vsSelectPage;
	
	/* 동작 실행 */
	load(vsLoadAppURI);
	
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = load;
}

/*
 * "실행" 버튼(btnDispose)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnDisposeClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnDispose = e.control;
	
	var voEmbeddedAppInstance = app.lookup("sampleEmbeddedApp").getEmbeddedAppInstance();
	
	/* 임베디드 앱의 앱인스턴스가 null이면 호출된 앱이 없거나 이미 닫았으므로 if문을 통해 메서드를 빠져나옵니다. */
	if (voEmbeddedAppInstance == null) {
		alert("임베디드 앱에 호출된 앱이 없습니다.");
		return;
	}
	
	/* 동작 실행 */
	dispose();
	
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = dispose;
}
