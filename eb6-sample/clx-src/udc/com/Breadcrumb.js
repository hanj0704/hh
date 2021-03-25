/************************************************
 * Breadcrumb.js
 * Created at 2020. 4. 24. 오전 9:24:24.
 *
 * @author ryu
 ************************************************/

/************************************************
 * 공통 모듈 선언
 ************************************************/
var util = createCommonUtil();

/************************************************
 * 전역 변수 선언
 ************************************************/

/************************************************
 * 사용자 정의 함수
 ************************************************/


/**
 * 브래드크럼블을 동적으로 생성합니다.
 */
function createBreadcrumbs() {
	var vcGrpBc = app.getContainer();
	
	var vsBcVal = app.getAppProperty("values");
	var vsDelimiter = app.getAppProperty("delimiter");
	
	if (vsBcVal == null || vsBcVal == ""){
		return;
	}
	
	/* 브래드크럼블 초기화 */
	vcGrpBc.removeAllChildren(true);
	
	var vaBcVals = vsBcVal.split(vsDelimiter);
	vaBcVals.forEach(function(/* String */ each){
		var vcBc = new cpr.controls.Output();

		vcBc.value = each;
		vcBc.style.setClasses(["breadcrumb-item"]);
		
		vcGrpBc.addChild(vcBc, {
			height: "25px",
			autoSize: "width"
		});		
	});
}

/************************************************
 * 컨트롤 이벤트
 ************************************************/

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
}


/*
 * Body에서 property-change 이벤트 발생 시 호출.
 * 앱의 속성이 변경될 때 발생하는 이벤트 입니다.
 */
function onBodyPropertyChange(/* cpr.events.CPropertyChangeEvent */ e){
	createBreadcrumbs();
}
