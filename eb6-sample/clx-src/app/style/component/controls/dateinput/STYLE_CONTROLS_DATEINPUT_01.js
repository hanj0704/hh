/************************************************
 * STYLE_CONTROLS_DATEINPUT_01.js
 * Created at 2021. 3. 2. 오후 4:09:26.
 *
 * @author ryu
 ************************************************/



/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	var vsCrntDt = moment().format("YYYYMMDD");
	app.lookup("dti1").value = vsCrntDt;
	app.lookup("dti2").value = vsCrntDt;
}
