/************************************************
 * Login.js
 * Created at 2020. 11. 24. 오전 11:02:31.
 *
 * @author ryu
 ************************************************/


/************************************************
 * 사용자 정의 함수
 ************************************************/

/**
 * 쿠키를 설정합니다.
 * @param {String} psName 쿠키명
 * @param {String} psValue 쿠키값
 * @param {Number} pnExpireDate 쿠키만료일
 */
function setCookie(psName, psValue, pnExpireDate) {
	var voTd = new Date();
	voTd.setDate(voTd.getDate() + parseInt(pnExpireDate));
	document.cookie = psName + "=" + escape(psValue) + ";path=/;expires=" + voTd.toGMTString() + ";";
}


/**
 * 쿠키를 가져옵니다.
 * @param {String} psName 쿠키명
 */
function getCookie(psName) {
	var vsCookie = document.cookie + ";";
	
	var vaItems = vsCookie.split("");
	var vaItemInfo = null;
	vaItems.forEach(function(each){
		vaItemInfo = each.split("=");
		if (psName == vaItemInfo[0].trim()){
			return unescape(vaItemInfo[1]);
		}
	});
}


/**
 * 쿠키를 삭제합니다
 * @param {String} psName 쿠키명
 */
function deleteCookie(psName) {
	var vsExpireDate = new Date();
	vsExpireDate.setDate(vsExpireDate.getDate() - 1);
	document.cookie = psName + "= " + "; expires=" + vsExpireDate.toGMTString() + "; path=/";
}

/************************************************
 * 앱 인스턴스 이벤트 (AppInstance)
 ************************************************/

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	/* 쿠키 설정에 따른 아이디 자동 완성 및 포커스 설정 */
	var vsUsrEm = getCookie("eb-login-id");
	
	var vcIpbEm = app.lookup("ipbEm");
	var vcIpbPw = app.lookup("ipbPw");
	
	if (vsUsrEm != null && vsUsrEm != ""){
		vcIpbEm.value = vsUsrEm;
		app.lookup("cbxRmAcc").checked = true;

		vcIpbPw.focus();
	} else {
		vcIpbEm.focus();
	}
}


/************************************************
 * 로그인 박스 영역 이벤트 (Login Box)
 ************************************************/

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
 * 인풋 박스에서 value-change 이벤트 발생 시 호출.
 * 변경된 value가 저장된 후에 발생하는 이벤트.
 */
function onIpbEmValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.InputBox
	 */
	var ipbEm = e.control;
	
	//TODO 아이디 체크 로직을 작성하십시오.
}


/*
 * 인풋 박스에서 value-change 이벤트 발생 시 호출.
 * 변경된 value가 저장된 후에 발생하는 이벤트.
 */
function onIpbPwValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.InputBox
	 */
	var ipbPw = e.control;
	
	//TODO 비밀번호 체크 로직을 작성하십시오.
}


/*
 * 인풋 박스에서 keydown 이벤트 발생 시 호출.
 * 사용자가 키를 누를 때 발생하는 이벤트.
 */
function onIpbEmKeydown(/* cpr.events.CKeyboardEvent */ e){
	/** 
	 * @type cpr.controls.InputBox
	 */
	var ipbEm = e.control;
	
	if (e.keyCode == cpr.events.KeyCode.ENTER){
		app.lookup("btnLgIn").click();
	}
}


/*
 * 인풋 박스에서 keydown 이벤트 발생 시 호출.
 * 사용자가 키를 누를 때 발생하는 이벤트.
 */
function onIpbPwKeydown(/* cpr.events.CKeyboardEvent */ e){
	/** 
	 * @type cpr.controls.InputBox
	 */
	var ipbPw = e.control;
	
	if (e.keyCode == cpr.events.KeyCode.ENTER){
		app.lookup("btnLgIn").click();
	}
}


/*
 * "Forgot your password?" 아웃풋(lblFrgtPw)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onLblFrgtPwClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Output
	 */
	var lblFrgtPw = e.control;
	
	//TODO 비밀번호 찾기 페이지로 이동하는 로직을 작성하십시오.
}


/*
 * 체크 박스에서 value-change 이벤트 발생 시 호출.
 * CheckBox의 value를 변경하여 변경된 값이 저장된 후에 발생하는 이벤트.
 */
function onCbxRmAccValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.CheckBox
	 */
	var cbxRmAcc = e.control;
	
}


/*
 * "Log In" 버튼(btnLgIn)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnLgInClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnLgIn = e.control;
	
	//TODO 아이디 또는 비밀번호에 대한 Validate를 체크하는 로직을 작성하십시오.
	
	/* 계정 기억 여부에 따라 쿠키 설정 */
	var vcCbxRmAcc = app.lookup("cbxRmAcc");
	
	if (vcCbxRmAcc.checked){
		var vsUsrEm = app.lookup("ipbEm").value;
		setCookie("eb-login-id", vsUsrEm, 30); // 한 달 동안 쿠키 유지
	} else {
		deleteCookie("eb-login-id");
	}
	
	/* 메인 페이지로 이동 (SPA 방식) */
	new cpr.core.App.load("app/com/main/Main", function(loadedApp) {
		loadedApp.createNewInstance().run();
		app.dispose();
	});
}


/*
 * "Sign Up" 아웃풋(lblRgstr)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onLblRgstrClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Output
	 */
	var lblRgstr = e.control;
	
	//TODO 회원가입 페이지로 이동하는 로직을 작성하십시오.
}
