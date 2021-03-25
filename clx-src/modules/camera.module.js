/**
 * 사진을 촬영 합니다. 사진파일의 URI를 전달하는 프로미스 객체가 리턴됩니다.
 * @return {Promise<String, any>}
 */
exports.takePicture = function() {
	return new Promise(function(resolve, reject) {
		if (runningOnDevice()) {
			takePhotoFromCordova(resolve, reject);
		} else {
			takePhotoFromBrowser(resolve, reject);
		}
	});
};

/**
 * 브라우저를 통해 사진파일 선택
 * @param {(String)=>void} onSuccess
 * @param {(any)=>void} onError
 */
function takePhotoFromBrowser(onSuccess, onError) {
	// 파일 선택을 위해 인풋 엘리먼트 만듬.
	var input = document.createElement("input");
	input.type = "file";
	input.style.display = "none";
	document.body.appendChild(input);

	// 사용자가 파일을 선택한 경우에 대한 리스너.
	input.addEventListener("change", function(e) {
		var selectedFile = input.files[0];

		// 파일이 선택된 경우.
		if (selectedFile) {
			// 선택된 파일을 dataURL 형식으로 읽어 들임.
			var fileReader = new FileReader();
			fileReader.addEventListener("load", function() {
				var dataURL = fileReader.result;
				onSuccess(dataURL);
			});
			fileReader.readAsDataURL(selectedFile);
		}
		document.body.removeChild(input);
	});
	input.click();
}

/**
 * 
 * @param {(string)=>void} onSuccess
 * @param {(any)=>void} onError
 */
function takePhotoFromCordova(onSuccess, onError) {
	if (!navigator.camera) {
		onError("카메라 플러그인을 찾을 수 없습니다.");
	}

	navigator.camera.getPicture(onSuccess, onError, {
		targetWidth: 1024,
		targetHeight: 1024,
		qualitiy: 50,
		destinationType: Camera.DestinationType.FILE_URI,
		sourceType: Camera.PictureSourceType.CAMERA,
		encodingType: Camera.EncodingType.JPEG,
		correctOrientation: true
	});
}