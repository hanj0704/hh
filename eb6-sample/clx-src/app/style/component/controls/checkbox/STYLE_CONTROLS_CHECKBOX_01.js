/************************************************
 * STYLE_CONTROLS_CHECKBOX_01.js
 * Created at 2021. 2. 2. 오후 1:48:26.
 *
 * @author ryu
 ************************************************/


/*
 * 체크 박스에서 value-change 이벤트 발생 시 호출.
 * CheckBox의 value를 변경하여 변경된 값이 저장된 후에 발생하는 이벤트.
 */
function onCbxTglNmValueChange(/* cpr.events.CValueChangeEvent */ e){
	var vcCbxTglNm = app.lookup("cbxTglNm");
	var vcGrpWrap = vcCbxTglNm.getParent();
	
	var vbChecked = vcCbxTglNm.checked;
	if (vbChecked){
		vcGrpWrap.updateConstraint(vcCbxTglNm, {
			left : "calc(100% - " + vcCbxTglNm.getActualRect().width + "px - 3px)"
		});
		
		/* 토글 상태로 변경 */
		vcGrpWrap.style.addClass("on");
	} else {
		vcGrpWrap.updateConstraint(vcCbxTglNm, {
			left : "3px"
		});
		
		/* 토글 상태 해제 */
		vcGrpWrap.style.removeClass("on");
	}
}


/*
 * 체크 박스에서 value-change 이벤트 발생 시 호출.
 * CheckBox의 value를 변경하여 변경된 값이 저장된 후에 발생하는 이벤트.
 */
function onCbxTglRundValueChange(/* cpr.events.CValueChangeEvent */ e){
	var vbxTglRund = app.lookup("cbxTglRund");
	var vcGrpWrap = vbxTglRund.getParent();
	
	var vbChecked = vbxTglRund.checked;
	if (vbChecked){
		vcGrpWrap.updateConstraint(vbxTglRund, {
			left : "calc(100% - " + vbxTglRund.getActualRect().width + "px - 3px)"
		});
		
		/* 토글 상태로 변경 */
		vcGrpWrap.style.addClass("on");
	} else {
		vcGrpWrap.updateConstraint(vbxTglRund, {
			left : "3px"
		});
		
		/* 토글 상태 해제 */
		vcGrpWrap.style.removeClass("on");
	}
}
