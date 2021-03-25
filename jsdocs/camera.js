// 코도바 카메라 API 컨텐트 어시스트 데이터.
var Camera = {
	DestinationType: {
		DATA_URL: 0,
		FILE_URI: 1,
		NATIVE_URI: 2
	},
	MediaType: {
		PICTURE: 0,
		VIDEO: 1,
		ALLMEDIA: 2
	},
	PictureSourceType : {
		PHOTOLIBRARY: 0,
		CAMERA: 1,
		SAVEDPHOTOALBUM: 2
	},
	EncodingType : {
		JPEG :0,
		PNG: 1
	},
	Direction : {
		BACK: 0,
		FRONT: 1
	}
};

Navigator.prototype.camera = {
	getPicture: function(onSuccess, onError) {}
};