/************************************************
 * handy.module.js
 * Created at 2021. 2. 4. 오전 11:20:29.
 *
 * @author ryu
 ************************************************/

function Handy() {
}

/**
 * 
 * @param {cpr.core.AppInstance} app
 * @param {#app} psAppId
 */
Handy.prototype.load = function(app, psAppId) {
	var voRtAppIns = app.getRootAppInstance();
	if (voRtAppIns.hasAppMethod("setLinkOpen")){
		voRtAppIns.callAppMethod("setLinkOpen", psAppId);
	}
}

globals.comeInHandy = function() {
	return new Handy();
}