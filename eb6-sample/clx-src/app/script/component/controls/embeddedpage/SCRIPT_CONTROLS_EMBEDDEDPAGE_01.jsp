<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>jsp to clx</title>
<style type="text/css">
	body {
		text-align: center;
		margin-top: 125px;
	}
	
	#ipbJspValue {
		height: 30px;
	}
</style>
</head>
<script type="text/javascript">
	/* jsp 화면에서 eXBuilder6 화면으로 파라미터를 전송하는 메소드이며, jsp에서 선언되어있음 */
	function jspSendValueToClx() {
		/* eXBuilder6에서 setPageProperty API를 통해 설정된 변수 판별 */
		if(_ownerApp) {
			/* 해당 변수는 앱 객체이므로, eXBuilder6에서 ID가 'lblVal'인 컨트롤의 value에 jsp에서 ID가 'ipbJspValue'인 태그의 value를 대입 */
			_ownerApp.lookup("lblVal").value = document.getElementById("ipbJspValue").value;
		} else {
			alert("eXBuilder6 화면으로부터 전달받은 app 객체가 존재하지 않습니다.");
		}
	}
	
	var jspFunc = jspSendValueToClx;
</script>
<body>
	<input id="ipbJspValue" type="text" placeholder="전달할 값 입력">
	<!-- <button onclick="setAppText()">clx로 보내기</button> -->
</body>
</html>