/************************************************
 * Main.js
 * Created at 2020. 4. 16. 오전 10:49:46.
 *
 * @author jeeeyul
 ************************************************/

var camera = cpr.core.Module.require("modules/camera");

/*
 * "사진 촬영" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick( /* cpr.events.CMouseEvent */ e) {
	camera.takePicture()
		.then(function(input) {
			runPrintApp(input);
		}).catch(function(e) {
			alert(e);
		});
}

function runPrintApp(imageURL) {
	pushNewApp(app, "pages/Print", "bottom")
		.then(function(input) {
			/** @app examples/Print */
			var printApp = input;
			printApp.callAppMethod("setImageURL", imageURL);
		});
}