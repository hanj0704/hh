/************************************************
 * SCRIPT_CONTORLS_GRID_12.js
 * Created at 2021. 3. 3. 오후 4:57:01.
 *
 * @author hee73
 ************************************************/

/*
 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(/* cpr.events.CEvent */ e){
	var vcGrd = app.lookup("dragAndDropGrd");
	
	setUpGridSource(vcGrd);	
	setupGridTarget(vcGrd);
	
}

function createDragSourceFeedback() {
	var dragSourceFeedback = new cpr.controls.Output();
	dragSourceFeedback.style.css({
		"opacity": "0.8",
		"text-align": "center",
		"color": "black",
		"border-radius": "10px",
		"background": "white",
		"box-shadow": "0px 2px 10px #ddd",
	});
	return dragSourceFeedback;
}
/**
 * 그리드 행 위치를 변경할 소스 행
 */
function setUpGridSource(/* cpr.controls.Grid*/ grid){
	/** @type cpr.controls.Output */
	var dragFeedback;
	/** @type cpr.geometry.Rectangle */
	var feedbackLocation = null;
	
	var dragSource = new cpr.controls.DragSource(grid, {
		onDragStart : function(context){
			var sourceDetail = context.sourceTargetObject;
			if(!sourceDetail) {
				context.cancel();
				return;
			}
			if(sourceDetail.row == null){
				context.cancel();
				return;
			}
			var data = sourceDetail.row.getRowData();
			context.data = { sourceRowIndex: sourceDetail.rowIndex };
			context.cursor = "grabbing";
			dragFeedback = createDragSourceFeedback();
			dragFeedback.value = JSON.stringify(data);
			var startLocation = context.dragStartLocation;
			feedbackLocation = new cpr.geometry.Rectangle(startLocation.x, startLocation.y, 500, 25);
			app.floatControl(dragFeedback, cpr.controls.layouts.XYLayout.createConstraintWithRect(feedbackLocation));
		},
		onDragMove : function(context){
			var newRect = feedbackLocation.getTranslated(context.dragDelta);
			app.floatControl(dragFeedback, cpr.controls.layouts.XYLayout.createConstraintWithRect(newRect));
		},
		onDragEnd: function(context){
			if(dragFeedback) {
				dragFeedback.dispose();
				dragFeedback = null;
			}
		},
		onDragCancel: function(context){
			if(dragFeedback) {
				dragFeedback.style.animateTo({
					"left" : feedbackLocation.left + "px",
					"top" : feedbackLocation.top + "px",
					"opacity" : "0"
				}, 0.3);
				dragFeedback.addEventListener("transitionend", function(e){
					dragFeedback.dispose();
					dragFeedback =null;
				});
			}
		}
	});
}

/**
 * 
 */
function setupGridTarget(/* cpr.controls.Grid*/ grid){
	var dropTarget = new cpr.controls.DropTarget(grid, {
		onDragEnter: function(context){
			
		},
		onDrop: function(context){
			var sourceRowIndex = context.data.sourceRowIndex;
			if(sourceRowIndex == null) {
				return;
			}
			var targetDetail = context.target.detail;
			var targetRowIndex = targetDetail.rowIndex;
			if(targetRowIndex == null) {
				return;
			}
			if(sourceRowIndex != -1 && targetRowIndex != -1 && sourceRowIndex != targetRowIndex){
				var grid = context.target.control;
				var dataSet = grid.dataSet;
				var after =(targetRowIndex < sourceRowIndex) ? false : true;
				dataSet.moveRowIndex(sourceRowIndex, targetRowIndex, after);
				grid.redraw();
			}
		},
		onDragLeave: function(context){},
		onDragIdle: function(context, repeating){},
		onDragMove: function(context){}
	});
}

/*
 * "실행" 버튼(btnDragAndDrop)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnDragAndDropClick(/* cpr.events.CMouseEvent */ e){
	/* 에디터에 소스표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = createDragSourceFeedback + setUpGridSource + setupGridTarget + onBodyInit;
	
}
