

/*
 * 파일 인풋에서 value-change 이벤트 발생 시 호출.
 * FileInput의 value를 변경하여 변경된 값이 저장된 후에 발생하는 이벤트.
 */
function onFileInputValueChange(/* cpr.events.CValueChangeEvent */ e){
	/** 
	 * @type cpr.controls.FileInput
	 */
	var fileInput = e.control;
	getImage();
	var vcAce = app.lookup("ace2");
	vcAce.value = getImage + ""; 
}

function getImage(){
	
	var vcFileInput = app.lookup("fileInput");//파일인풋 컨트롤
	
	var vcImage = app.lookup("img1"); //이미지 컨트롤

	var vsFtype = vcFileInput.file.type; //선택된 파일 타입

	//필요에 따라 파일인풋의 선택된 파일이 이미지인 경우에만 다음의 동작을 수행합니다.
	if (vsFtype.split("/")[0] == "image") {

		var voReader = new FileReader();

		voReader.onload = function(event) {
			vcImage.src = event.target.result;
		}
		
		voReader.readAsDataURL(vcFileInput.file);

	};
	
}


/*
 * "실행" 버튼(btnCallPageMethod)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnCallPageMethodClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnCallPageMethod = e.control;
	
	app.lookup("fileInput").openFileChooser();
}

