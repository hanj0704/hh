/************************************************
 * AreaTitle.js
 * Created at 2021. 2. 1. 오전 9:45:54.
 *
 * @author ryu
 ************************************************/

/**
 * 특수한 문자인 '`'로 문자가 감싸졌는지에 대하여 반환합니다.
 * @param {String} psValue
 */
function checkVisibleTarget(psValue) {
	var vnChars = psValue.length;
	
	var vsFirstChar = psValue.substr(0, 1);
	var vsLastChar = psValue.substr(vnChars - 1, 1);
	
	if (vsFirstChar === "`" && vsLastChar === "`"){
		return true;
	}
	
	return false;
}

/*
 * 루트 컨테이너에서 before-draw 이벤트 발생 시 호출.
 * 그룹 컨텐츠가 그려지기 직전에 호출되는 이벤트 입니다. 내부 컨텐츠를 동적으로 구성하기위한 용도로만 사용됩니다.
 */
function onBodyBeforeDraw(/* cpr.events.CUIEvent */ e){
	//XXX 리펙토링 필요한지 살펴보기
	var vcGrpPrnt = app.getHost().getParent();
	var vaAreaChildren = vcGrpPrnt.getChildren();

	/* 바로 아래 영역 내에서 숨김 표시(`)되어 있는 텍스트가 포함되는 경우 상위 컨테이너 숨김 */
	var vaOptDescs = vaAreaChildren.filter(function(each){
		return each instanceof cpr.controls.Output;
	});
	
	vaOptDescs.forEach(function(each){
		var vsOptDescVal = each.value;
		
		//var vbExamMark = /^`.*`$/gs.test(vsOptDescVal);
		var vbExamMark = checkVisibleTarget(vsOptDescVal);
		if (vbExamMark == true){
			cpr.core.DeferredUpdateManager.INSTANCE.asyncExec(function(){
				each.getParent().visible = false;
			});
		}
	});
	
	/* 참조 영역 내에서 숨김 표시(`)되어 있는 텍스트가 포함되는 경우 상위 컨테이너 숨김 */
	var vaRefCards = vaAreaChildren.filter(function(each){
		return each.style.hasClass("ref-card");
	});
	
	vaRefCards.forEach(function(/* cpr.controls.Container */ each){
		var vaRefCardDesc = each.getChildren().filter(function(each){
			return each.style.hasClass("ref-title") == false && (each instanceof cpr.controls.Output || each instanceof cpr.controls.HTMLSnippet);
		}).forEach(function(/* cpr.controls.Output */ each){
			var vsOptDescVal = each.value;
		
			//var vbExamMark = /^`.*`$/gs.test(vsOptDescVal);
			var vbExamMark = checkVisibleTarget(vsOptDescVal);
			if (vbExamMark == true){
				cpr.core.DeferredUpdateManager.INSTANCE.asyncExec(function(){
					each.getParent().visible = false;
				});
			}
		});
	});
}
