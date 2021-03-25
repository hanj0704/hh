/************************************************
 * MobileLayout.module.js
 * Created at 2020. 4. 17. 오전 10:07:59.
 *
 * @author jeeeyul
 ************************************************/

cpr.core.App.addHook({
	onCreate: function(app, exports) {
		app.getContainer().style.css({
			"position": "absolute",
			"left": "0px",
			"top": "0px"
		});
	}
});

/**
 * @param {cpr.core.AppInstance} current
 * @param {#app} appId
 * @param {"top" | "right" | "bottom" | "left" } direction?
 * @return {Promise<cpr.core.AppInstance>}
 */
globals.pushNewApp = function(app, appId, direction) {
	direction = direction || "right";

	var appearingTransform;
	var disappearingTransform;

	switch (direction) {
		case "right":
			appearingTransform = "translate3d(100%, 0px, 0px)";
			disappearingTransform = "translate3d(-100%, 0px, 0px)"
			break;

		case "left":
			appearingTransform = "translate3d(-100%, 0px, 0px)";
			disappearingTransform = "translate3d(100%, 0px, 0px)"
			break;

		case "bottom":
			appearingTransform = "translate3d(0px, 100%, 0px)";
			disappearingTransform = "translate3d(0px, -100%, 0px)"
			break;

		case "top":
			appearingTransform = "translate3d(0px, -100%, 0px)";
			disappearingTransform = "translate3d(0px, 100%, 0px)"
			break;
	}

	return new Promise(function(resolve, reject) {
		cpr.core.App.load(appId, function(loadedApp) {
			if (!loadedApp) {
				return reject("앱을 로드하지 못했습니다: " + appId);
			}

			var newAppInstance = loadedApp.createNewInstance();
			newAppInstance.run(null, function() {
				resolve(newAppInstance);
				newAppInstance.getContainer().style.animateFrom({
					"transform": appearingTransform
				});
				app.getContainer().addEventListenerOnce("transitionend", function() {
					app.dispose();;
				});
				app.getContainer().style.animateTo({
					"transform": disappearingTransform
				});
			});
		});
	});
}