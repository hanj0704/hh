
/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	app.lookup("subList").send();
	
}




/*
 * "실행" 버튼(btnInit)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnInitClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnInit = e.control;
	gridScroll(e);
	
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = gridScroll + "";
	
}


function gridScroll(/* cpr.events.CScrollEvent */ e){
	var grd = e.control;
	
	//스크롤이 발생한 방향 체크
	if(e.axis == cpr.events.ScrollAxis.y){ //스크롤이 세로방향인 경우
		if(e.scrollTop == e.maxScrollTop ){//세로 스크롤이 최하단까지 이동했을 시			
			app.lookup("subList").send();
		}
	}	
}


/*
 * 그리드에서 scroll 이벤트 발생 시 호출.
 * 그리드 디테일 컨텐츠가 스크롤될 때 발생하는 이벤트.
 */
function onGrd1Scroll(/* cpr.events.CScrollEvent */ e){
	/** 
	 * @type cpr.controls.Grid
	 */
	var grd1 = e.control;
	
	//스크롤이 발생한 방향 체크
	if(e.axis == cpr.events.ScrollAxis.y){ //스크롤이 세로방향인 경우
		if(e.scrollTop == e.maxScrollTop ){//세로 스크롤이 최하단까지 이동했을 시			
			app.lookup("subList").send();
		}
	}	
}


/*
 * 서브미션에서 submit-done 이벤트 발생 시 호출.
 * 응답처리가 모두 종료되면 발생합니다.
 */
function onSubListSubmitDone(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var subList = e.control;
	app.lookup("grdRowCount").value =  app.lookup("grd1").getRowCount();
}
