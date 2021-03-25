document.addEventListener('deviceready', function() {
	cpr.core.App.load("pages/Main",
		function(loadedApp) {
			loadedApp.createNewInstance().run();
		});
});