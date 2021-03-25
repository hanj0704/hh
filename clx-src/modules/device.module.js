/************************************************
 * device.module.js
 * Created at 2020. 4. 16. 오전 11:57:01.
 *
 * @author jeeeyul
 ************************************************/

/**
 * 실제 모바일 기기에서 실행중인지 여부를 반환합니다.
 */
globals.runningOnDevice = function(){
	return typeof window["cordova"] != "undefined";
};