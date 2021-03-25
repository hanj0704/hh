/************************************************
 * eventbus.module.js
 * Created at 2021. 1. 27. 오전 11:07:17.
 *
 * @author ryu
 ************************************************/

/* 앱 인스턴스 Init 이벤트 실행 시에 대한 이벤트 필터 */
cpr.events.EventBus.INSTANCE.addFilter("init", function(e){
	var control = e.control;
	
	if (control instanceof cpr.core.AppInstance){
		/* 아웃풋 컨트롤의 unselectable 속성 제어 */
		control.getContainer().getAllRecursiveChildren(false).filter(function(each){
			return each instanceof cpr.controls.Output;
		}).forEach(function(each){
			each.unselectable = false;
		});
	}
});