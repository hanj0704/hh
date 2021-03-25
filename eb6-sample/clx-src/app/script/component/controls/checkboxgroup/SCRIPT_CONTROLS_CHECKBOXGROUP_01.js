/************************************************
 * SCRIPT_CONTROLS_CHECKBOXGROUP_01.js
 * Created at 2021. 3. 8. 오후 2:08:16.
 *
 * @author hee73
 ************************************************/

/**
 * 1.0.2018 이상 버전에서 사용되는 체크박스 전체 선택 함수 입니다.
 * 
 * @param {cpr.controls.CheckBoxGroup} pcCtrl 전체 선택 될 체크박스그룹 컨트롤
 * @param {String} psSelItemVal 선택한 아이템의 value
 * @param {Number} pnAllItemIdx 전체 선택 아이템의 인덱스
 * 
 */
function checkBoxAllChecked(pcCtrl, psSelItemVal, pnAllItemIdx){
	
	var voAllItem = pcCtrl.getItem(pnAllItemIdx); //전체 선택 아이템
	var vbSelectedValue = psSelItemVal == voAllItem.value; //전체 선택을 클릭하였는지 여부를 boolean으로 반환합니다.
	
	//all 아이템이 선택된 상태인지를 반환하여 전체선택 아이템 이외의 아이템이 모두 선택 되었을 때 체크 여부를 결정합니다.
	var vbCheckedAll = pcCtrl.isSelectedByValue(voAllItem.value);
	var voSelectArr = pcCtrl.getSelection();//선택된 아이템 배열
	
	if (vbSelectedValue){
		if (vbCheckedAll) {
			pcCtrl.selectAllItems();
		} else {
			pcCtrl.clearSelection();
		}
	} else if (!vbSelectedValue && pcCtrl.getSelection().length == (pcCtrl.getItemCount() - 1)) {
		if (!vbCheckedAll) {
			pcCtrl.selectAllItems();
		} else {
			voSelectArr.splice(voSelectArr.indexOf(voAllItem), 1);
			pcCtrl.removeSelectionByValue("all");
			pcCtrl.selectItem(voSelectArr);
		}
	}
}



/*
 * 체크 박스 그룹에서 item-click 이벤트 발생 시 호출.
 * 아이템 클릭시 발생하는 이벤트.
 */
function onCbgAllCheckItemClick(/* cpr.events.CItemEvent */ e){
	/** 
	 * @type cpr.controls.CheckBoxGroup
	 */
	var cbgAllCheck = e.control;
	
	var vsSelectedVal = e.item.value;
	
	checkBoxAllChecked(cbgAllCheck, vsSelectedVal, 0);
	
	
}

function clearChecked(){
	var cbgAllChecked = app.lookup("cbgAllChecked");
	cbgAllChecked.clearSelection();
}

/*
 * "실행" 버튼(btnAllChecked)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트
 */
function onBtnAllCheckedClick(/* cpr.events.CMouseEvent */ e){
	
	/* 에디터에 소스표시 */
	var vcAceEditor = app.lookup("ace");
	vcAceEditor.value = checkBoxAllChecked + onCbgAllCheckItemClick;
}


/*
 * "실행" 버튼(btnClearChecked)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnClearCheckedClick(/* cpr.events.CMouseEvent */ e){
	/* 동작 실행 */
	clearChecked();
	
	/* 에디터에 소스표시 */
	var vcAceEditor = app.lookup("ace");
	vcAceEditor.value = clearChecked;
}
