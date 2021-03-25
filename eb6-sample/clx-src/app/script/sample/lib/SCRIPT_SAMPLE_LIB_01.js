/************************************************
 * SCRIPT_MODULE_POSTNUMBER_01.js
 * Created at 2021. 2. 9. 오전 9:54:54.
 *
 * @author hee73
 ************************************************/

function postCode(){
	new daum.Postcode({
		/* 해당 정보를 받아 처리할 콜백 함수를 정의하는 부분 입니다. */
		oncomplete: function(data){
			/* 팝업에서 검색결과 항목을 클릭했을떄 실행할 코드를 작성하는 부분 */
			var vcPostCode = app.lookup("postCode");
			var vcAddress = app.lookup("address");
			var vcAddressJibun = app.lookup("addressJibun");
			var vcDetailAddress = app.lookup("detailAddress");
			var vcExtraAddress = app.lookup("extraAddress");
			
			// 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var roadAddr = data.roadAddress; // 도로명 주소 변수
            var extraRoadAddr = ''; // 참고 항목 변수

            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                extraRoadAddr += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if(data.buildingName !== '' && data.apartment === 'Y'){
               extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
            }
            // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if(extraRoadAddr !== ''){
                extraRoadAddr = ' (' + extraRoadAddr + ')';
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            vcPostCode.value = data.zonecode;
            vcAddress.value = roadAddr;
            vcAddressJibun.value = data.jibunAddress;
            
            // 참고항목 문자열이 있을 경우 해당 필드에 넣는다.
            if(roadAddr !== ''){
                vcExtraAddress.value = extraRoadAddr;
            } else {
                vcExtraAddress.value = '';
            }

			/*커서를 상세주소 필드로 이동합니다. */
			vcDetailAddress.focus();
			
		}
		
	}).open();
}



/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	// 다음에서 제공하는 통합로딩 url
	var daumApiUrl = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
	// 로드할 스크립트 추가
	if (!document.getElementById('daumApiId')) { // 로드여부 확인		
		var script = document.createElement('script');	
		script.id = 'daumApiId';	
		script.src = daumApiUrl;	
		document.head.appendChild(script);	
	}
}



/*
 * "우편검색" 버튼(btnSearch)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSearchClick(/* cpr.events.CMouseEvent */ e){
		app.lookup("btnPostCode").click();
}


/*
 * "실행" 버튼(btnPostCode)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnPostCodeClick(/* cpr.events.CMouseEvent */ e){	
		/* 동작 실행 */
		postCode();
		
		/* 에디터에 소스 표시 */
		var vcAceEditor = app.lookup("ace2");
		vcAceEditor.value = postCode;
}


/*
 * "확인" 버튼(btnPostCode2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnPostCode2Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnPostCode2 = e.control;
	
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = onBodyLoad;
}
