/************************************************
 * SCRIPT_CONTROLS_COMBOBOX_02.js
 * Created at 2021. 3. 5. 오후 1:27:25.
 *
 * @author hee73
 ************************************************/

/*
 * 콤보 박스에서 selection-change 이벤트 발생 시 호출.
 * ComboBox Item을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onCmbTensDigitSelectionChange(/* cpr.events.CSelectionEvent */ e){
	var vcGrd = app.lookup("grdCmbFilter");
	
	var vcCmb = app.lookup("cmbOnesDigit");
	
	var vcDataSet = app.lookup("dsList");
	
	var vnRowIdx = vcGrd.getSelectedRowIndex();
	
	var vsColVal = vcDataSet.getValue(vnRowIdx, "tensDigit");
	
	//해당 조건식으로 콤보박스 필터 적용
	var cmbFilter = vcCmb.setFilter("parent ==" + "'" + vsColVal + "'");
	
	vcCmb.selectItem(0);
	
}

/*
 * "실행" 버튼(btnSetFilter)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSetFilterClick(/* cpr.events.CMouseEvent */ e){
	/* 에디터에 소스표시 */
	var vcAceEditor = app.lookup("ace");
	vcAceEditor.value = onCmbTensDigitSelectionChange;
}




/*
 * 콤보 박스에서 selection-change 이벤트 발생 시 호출.
 * ComboBox Item을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onCmbTensDigitsViewSelectionChange(/* cpr.events.CSelectionEvent */ e){
	var vcCmbView = app.lookup("cmbOnesDigitView");
	
	vcCmbView.selectItem(0);
	
}
