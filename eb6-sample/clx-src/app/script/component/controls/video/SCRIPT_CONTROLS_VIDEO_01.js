/************************************************
 * SCRIPT_CONTROLS_VIDEO_01.js
 * Created at 2021. 3. 8. 오후 5:03:17.
 *
 * @author hee73
 ************************************************/

var globalValue1 = " var mnPvTime= 0;//현재 재생 시간을 저장할 전역변수\n"
var globalValue2 = " var mnCrTime	= 0;//현재 재생 시간을 저장할 전역변수\n"
var globalValue3 = " var mnSeekTime	= null;//재생시간을 사용자가 조정했을 때 저장할 전역변수\n\n"

var mnPvTime	= 0;//현재 재생 시간을 저장할 전역변수
var mnCrTime	= 0;//현재 재생 시간을 저장할 전역변수
var mnSeekTime	= null;//재생시간을 사용자가 조정했을 때 저장할 전역변수

/*
 * 비디오에서 timeupdate 이벤트 발생 시 호출.
 * currentTime 속성으로 변경되면 이벤트가 발생합니다. IE,Edge에서 이벤트가 두번 발생 할 수 있습니다. 자세한 내용은 API 도움말 참고.
 */
function onVdoSkipPreventTimeupdate(/* cpr.events.CEvent */ e){
	/** 
	 * @type cpr.controls.Video
	 */
	var vdoSkipPrevent = e.control;
	
	mnPvTime = mnCrTime;
	mnCrTime = vdoSkipPrevent.currentTime;
	
}

/*
 * 비디오에서 seeking 이벤트 발생 시 호출.
 * seek 조작을 시작하면 전송됩니다.
 */
function onVdoSkipPreventSeeking(/* cpr.events.CEvent */ e){
	/** 
	 * @type cpr.controls.Video
	 */
	var vdoSkipPrevent = e.control;
	
	if (mnSeekTime === null && mnPvTime < mnCrTime) {
		mnSeekTime = mnPvTime;
	}
}


/*
 * 비디오에서 seeked 이벤트 발생 시 호출.
 * seek 조작이 완료하면 전송됩니다.
 */
function onVdoSkipPreventSeeked(/* cpr.events.CEvent */ e){
	/** 
	 * @type cpr.controls.Video
	 */
	var vdoSkipPrevent = e.control;
	
	if (mnCrTime > mnSeekTime) {
		//재생하려는 시간이 조작 전 시간보다 이후 일 때 시간을 돌립니다.
		vdoSkipPrevent.currentTime = mnSeekTime;
	}
	mnSeekTime = null;
}


/*
 * "실행" 버튼(btnSkipPrevent)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSkipPreventClick(/* cpr.events.CMouseEvent */ e){
	var video = app.lookup("vdoSkipPrevent");
	video.play();
	
	/* 에디터에 소스표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = globalValue1 + globalValue2 + globalValue3 + onVdoSkipPreventTimeupdate + onVdoSkipPreventSeeking + onVdoSkipPreventSeeked;
	
}
