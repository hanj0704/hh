/************************************************
 * UpdatedTitle.js
 * Created at 2021. 2. 1. 오전 9:37:29.
 *
 * @author ryu
 ************************************************/

/*
 * 루트 컨테이너에서 property-change 이벤트 발생 시 호출.
 * 앱의 속성이 변경될 때 발생하는 이벤트 입니다.
 */
function onBodyPropertyChange(/* cpr.events.CPropertyChangeEvent */ e){
	app.lookup("lblUpdDt").redraw();
}
