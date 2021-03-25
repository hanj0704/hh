
/*
 * "확인" 버튼(btnPostCode2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnPostCode2Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnPostCode2 = e.control;
	
	getValue();
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace2");
	
	vcAceEditor.value = getValue + "";
	
}

function getValue(){
	var vsOpt = app.lookup("txa1");
	//에디터에 입력한 값을 가져옵니다.( CKEDITOR.instances.div아이디.getData() )
	vsOpt.value = $('#summernote').summernote('code');
}


/*
 * 쉘에서 init 이벤트 발생 시 호출.
 */
function onShl1Init(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type cpr.controls.UIControlShell
	 */
	var shl1 = e.control;
	
	if(e.content) {
		e.preventDefault();
	}	
   
}


/*
 * 쉘에서 load 이벤트 발생 시 호출.
 */
function onShl1Load(/* cpr.events.CUIEvent */ e){
	/** 
	 * @type cpr.controls.UIControlShell
	 */
	var shl1 = e.control;
	var content = e.content;
	shl1.registerComponent("Editor", content);
	//에디터를 넣어줄 div 생성
	var editorDiv = document.createElement("div")
	editorDiv.id = "summernote";
	editorDiv.style.height = "100%";
	editorDiv.style.width = "100%";
	//생성한 에디터를 쉘 영역안에 넣어준다.
	content.appendChild(editorDiv);
	
	$('#summernote').summernote({
        placeholder: 'Hello stand alone ui',
        tabsize: 2,
        height: 120,
        toolbar: [
          ['style', ['style']],
          ['font', ['bold', 'underline', 'clear']],
          ['color', ['color']],
          ['para', ['ul', 'ol', 'paragraph']],
          ['table', ['table']],
          ['insert', ['link', 'picture', 'video']],
          ['view', ['fullscreen', 'codeview', 'help']]
        ]
      });
}


/*
 * "확인" 버튼(btnPostCode3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnPostCode3Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnPostCode3 = e.control;
	
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace2");
	vcAceEditor.value = onShl1Load + "";
	
}
