<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>clx to jsp</title>
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
	/* eXBuilder6 화면에서 전송한 파라미터를 jsp 화면에서 받는 메소드이며, jsp에서 선언되어있음 */
	function jspReceiveValueToClx() {
		/* eXBuilder6에서 setPageProperty API를 통해 설정된 변수 판별 */
		if(_ownerApp) {
			/* 해당 변수는 앱 객체이므로, eXBuilder6에서 ID가 'ipbClxToJspValue'인 컨트롤의 value를 jsp에서 ID가 'ipbJspValue'인 태그의 value에 대입 */
			document.getElementById("ipbJspValue").setAttribute("value", _ownerApp.lookup("ipbClxToJspValue").value);
		} else {
			alert("eXBuilder6 화면으로부터 전달받은 app 객체가 존재하지 않습니다.");
		}
	}
	
	var jspFunc = jspReceiveValueToClx;
</script>
<body>
	<input id="ipbJspValue" type="text" placeholder="전달받은 값 확인" readonly="readonly">
	<!-- <button onclick="getOutputText()">jsp로 받아오기</button> -->
</body>
</html>