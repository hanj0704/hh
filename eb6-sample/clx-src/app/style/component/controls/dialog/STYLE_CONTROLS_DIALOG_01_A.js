/************************************************
 * STYLE_CONTROLS_DIALOG_01_A.js
 * Created at 2021. 2. 4. 오전 11:09:33.
 *
 * @author ryu
 ************************************************/


/*
 * "확인" 버튼(btnSubmit)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSubmitClick(/* cpr.events.CMouseEvent */ e){
	app.close();
}


/*
 * "닫기" 버튼(btnClose)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnCloseClick(/* cpr.events.CMouseEvent */ e){
	app.close();
}
