/************************************************
 * Print.js
 * Created at 2020. 4. 17. 오전 10:06:36.
 *
 * @author jeeeyul
 ************************************************/

/**
 * @param {String} url
 */
exports.setImageURL = function(url) {
	app.getContainer().style.css({
		"background-image": "url(" + encodeURI(url) + ")"
	});
}

/*
 * "다시 찍기" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick( /* cpr.events.CMouseEvent */ e) {
	pushNewApp(app, "pages/Main", "top");
}

/*
 * "인쇄" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2( /* cpr.events.CMouseEvent */ e) {
	alert("인쇄하였습니다.");
}