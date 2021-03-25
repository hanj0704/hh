/************************************************
 * STYLE_CONTROLS_GRID_01.js
 * Created at 2021. 2. 10. 오후 2:59:22.
 *
 * @author ryu
 ************************************************/

function setRowState() {
	var vaGrdIds = ["grdBf", "grdAf", "grdExm"];
	
	for(var idx = 0; idx < vaGrdIds.length; idx++){
		/** @type cpr.controls.Grid */
		var vcGrd = app.lookup(vaGrdIds[idx]);
		var vcDsList = vcGrd.dataSet;
		
		vcGrd.setRowState(1, cpr.data.tabledata.RowState.INSERTED);	
		vcGrd.setRowState(2, cpr.data.tabledata.RowState.UPDATED);	
		vcGrd.setRowState(3, cpr.data.tabledata.RowState.DELETED);	
		vcGrd.selectRows(4);
	}
}

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	setRowState();
}
