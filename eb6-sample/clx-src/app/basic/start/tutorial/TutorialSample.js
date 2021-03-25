 /************************************************
 * TutorialSample.js
 * Created at 2021. 2. 1. 오전 11:15:14.
 *
 * @author csj
 ************************************************/

 

/*
 * "샘플 다운로드" 버튼(btnLink)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnLinkClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnLink = e.control;
	location.href = "app/basic/start/tutorial/eduSample.zip";
}
