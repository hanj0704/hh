/************************************************
 * STYLE_CONTROLS_GRID_03.js
 * Created at 2021. 3. 3. 오후 4:07:37.
 *
 * @author ryu
 ************************************************/

var handy = comeInHandy();

/*
 * "그리드 그룹핑 샘플 바로보기" 버튼(btnLink)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnLinkClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnLink = e.control;
	
	handy.load(app, "app/script/component/controls/grid/SCRIPT_CONTROLS_GRID_12");
	
}
