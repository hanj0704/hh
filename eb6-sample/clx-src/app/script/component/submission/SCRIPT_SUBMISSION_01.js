
/*
 * 서브미션에서 before-submit 이벤트 발생 시 호출.
 * 통신을 시작하기전에 발생합니다.
 */
function onSub1BeforeSubmit(/* cpr.events.CSubmissionEvent */ e){
	/** 
	 * @type cpr.protocols.Submission
	 */
	var sub1 = e.control;
	//서브미션 보내기 전에 서브미션 타입이 json인 경우 
	if(sub1.mediaType == "application/json"){
		sub1.setRequestEncoder(_requestEncoder);
    	sub1.setResponseDecoder(_responseDecoder);
	}
	
}


/**
 * 
 * @param {cpr.protocols.Submission} submission
 * @param {Object} reqData
 */
function _requestEncoder(/* cpr.protocols.Submission */ submission,/* Object */ reqData) {
   var _app = submission.getAppInstance();
   
   var vsFormatType = submission.userAttr("format-type");
   
   var reqDataObj = reqData["data"];
   
   var obj = {};
   
   for (var key in reqDataObj) {
      
      var vsDataYn = _app.lookup(key).userAttr("payload");
      var vsDataType = _app.lookup(key).type;
      if(vsDataType == "datamap"){
          obj[key] = reqDataObj[key];        
      }
   }
   
   return {"content" : obj};
   
}


/**
 * @private
 * @param {cpr.protocols.Submission} submission
 * @param {Object} reqData
 */
function _responseDecoder(/* cpr.protocols.Submission */ submission, /* Object */ resData) {
   var _app = submission.getAppInstance();
   
   var resDataObj = JSON.parse(resData);
   
   var voProtocolJson = {};
   
   for (var key in resDataObj) {
      for (var subKey in resDataObj[key]) {
         voProtocolJson[subKey] = resDataObj[key][subKey];
      }
   }
   
   return {contentType : "application/json", content : voProtocolJson};
}




/*
 * "실행" 버튼(btnInit3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnInit3Click(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnInit3 = e.control;
	
	var ace2 = app.lookup("ace2");
	
	ace2.value = onSub1BeforeSubmit + _requestEncoder + _responseDecoder + "";
	
}
