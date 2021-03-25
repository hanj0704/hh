/************************************************
 * FloatingHeader.module.js
 * Created at 2018. 11. 26. 오전 10:53:58.
 *
 * @author jeeeyul
 ************************************************/

/**
 * 2019-04-24 jeeeyul
 * 이 값이 참이면 플로팅 헤더를 래핑하여 플로팅 탈부착 순간의 렌더링 속도를 높입니다.
 */
var useWrap = true;

/**
 * 버티컬 레이아웃 내에서 플로팅 될 컨트롤을 관리하는 객체입니다.
 * @param {cpr.controls.UIControl} control 플로팅 시킬 컨트롤.
 * @param {cpr.controls.Container} fixContainer 플로팅 고정 기준이 되는 컨테이너, 생략시 컨트롤의 부모.
 */
function FloatingHeader(control, fixContainer, topPosition) {
	if (useWrap) {
		var originalParent = control.getParent();

		var constraint = originalParent.getConstraint(control);
		var originalIndex = originalParent.getChildren().indexOf(control);
		originalParent.removeChild(control);

		var wrap = new cpr.controls.Container();
		var wrappedLayout = new cpr.controls.layouts.VerticalLayout();
		wrappedLayout.spacing = 0;
		wrappedLayout.topMargin = 0;
		wrappedLayout.rightMargin = 0;
		wrappedLayout.bottomMargin = 0;
		wrappedLayout.leftMargin = 0;
		wrappedLayout.scrollable = false;
		wrap.setLayout(wrappedLayout);
		wrap.addChild(control, constraint);

		originalParent.insertChild(originalIndex, wrap, constraint);
	}

	this.control = control;
	this.container = control.getParent();
	this.fixContainer = fixContainer || originalParent;
	this.topPosition = topPosition;

	/** 
	 * 플로팅 된 경우, 원래 자리를 지켜줄 플레이스 홀더 컨트롤.
	 * @type cpr.controls.UIControl
	 */
	this.placeholder = null;

	/**
	 * 컨트롤의 부모.
	 */
	this.parent = control.getParent();

	/**
	 * 원래의 레이아웃 컨스트레인트.
	 */
	this.originalConstraint = this.parent.getConstraint(control);

	/** 현재 플로팅 되어 있는지 여부. */
	this.floating = false;

	/** 원본 스타일 */
	this.originalStyle = null;
}

/**
 * 플로팅 여부를 판단하기위한 컨트롤의 절대 바운즈 위치를 얻습니다.
 * 이미 플로팅 된 경우라면, 플레이스 홀더의 위치가, 플로팅되어 있지 않은 경우 컨트롤의 위치가 반환됩니다.
 */
FloatingHeader.prototype.getTestArea = function() {
	if (this.floating) {
		return this.placeholder.getActualRect();
	} else {
		return this.control.getActualRect();
	}
};

/**
 * 컨트롤을 플로팅 시킵니다.
 * 이미 플로팅 된 경우 아무일도 일어나지 않습니다.
 */
FloatingHeader.prototype.startFloating = function() {
	if (this.floating || this.control.disposed || this.parent.disposed) {
		return false;
	}

	// 원본 스타일 백업.
	this.originalStyle = this.control.style.css();

	// 자식 인덱스.
	var index = this.parent.getChildren().indexOf(this.control);

	// 플레이스 홀더를 위치 시킴.
	this.placeholder = new cpr.controls.Output();
	this.parent.insertChild(index, this.placeholder, {
		height: this.control.getActualRect().height + "px"
	});

	// 부모의 바운즈.
	var parentBounds = this.fixContainer.getActualRect();

	// 플로팅 될 컨트롤의 현재 바운즈.
	var controlBounds = this.control.getActualRect();

	this.control.style.addClass("fixed");
	if (this.control.userAttr("floating-add-class") != null)
		this.control.style.addClass(this.control.userAttr("floating-add-class"));
	if (this.control.userAttr("floating-remove-class") != null)
		this.control.style.removeClass(this.control.userAttr("floating-remove-class"));

	// 컨트롤을 플로팅 시킴.
	this.control.getAppInstance().getRootAppInstance().floatControl(this.control);
	// top위치를 받아 처리 
	var top = parentBounds.top;
	if (this.topPosition != null) top = this.topPosition;
	// 최초 플로팅 된 위치를 잡아줌.
	this.control.style.css({
		position: "fixed",
		top: top + "px",
		left: controlBounds.left + "px",
		width: controlBounds.width + "px",
		height: controlBounds.height + "px",
		clip: "auto"
	});

	this.floating = true;
	return true;
};

/**
 * 플로팅된 컨트롤의 위치를 업데이트합니다. 부모 그룹외의 영역에서 스크롤이나, 윈도 크기가 변경되었을 때 사용됩니다.
 */
FloatingHeader.prototype.updateStyles = function() {
	if (!this.floating || this.control.disposed || this.parent.disposed) {
		return
	}

	var parentBounds = this.fixContainer.getActualRect();
	var controlBounds = this.placeholder.getActualRect();

	var top = parentBounds.top;
	if (this.topPosition != null) {
		top = Math.max(controlBounds.top, this.topPosition);
	}
	this.control.style.css({
		position: "fixed",
		top: top + "px",
		left: controlBounds.left + "px",
		width: controlBounds.width + "px"
	});
};

/**
 * 플로팅을 중단시키고 원래 위치로 복귀 시킵니다.
 */
FloatingHeader.prototype.stopFloating = function() {
	if (!this.floating) {
		return false;
	}
	if (this.parent.disposed) {
		// 플레이스 홀더를 파기 시킵니다.
		this.control.dispose();
		this.placeholder.dispose();
		this.placeholder = null;
		this.floating = false;
		return true;
	}

	// 복귀할 자식 인덱스.
	var index = this.parent.getChildren().indexOf(this.placeholder);

	// 원래 위치에 끼워 넣습니다.
	this.parent.insertChild(index, this.control, this.originalConstraint);

	// 스타일을 원상 복귀 시킵니다.
	if (this.control.userAttr("floating-remove-class") != null)
		this.control.style.addClass(this.control.userAttr("floating-remove-class"));
	this.control.style.removeStyle("top");
	this.control.style.removeStyle("left");
	this.control.style.removeStyle("width");
	this.control.style.removeStyle("height");
	this.control.style.removeClass("fixed");
	this.control.style.removeClass("floatingTop");
	this.control.style.css(this.originalStyle);

	// 플레이스 홀더를 파기 시킵니다.
	this.placeholder.dispose();
	this.placeholder = null;
	this.floating = false;
	return true
};

/**
 * 버티컬 레이아웃을 가진 컨테이너 내에서, "floating-header"라는 사용자 정의 속성 값으로 "true"를 가진 컨트롤들을 플로팅 시키는 역할을 하는 객체입니다.
 * @param {cpr.controls.Container} container 플로팅 헤더를 적용할 컨테이너.
 * @param {cpr.controls.Container} scrollContainer 컨텐츠를 스크롤 시키는 컨테이너, 생략시, 플로팅 헤더를 적용할 컨테이너를 사용함.
 */
function FloatingHeaderVerticalLayout(container, scrollContainer, topPosition) {
	if (container.getLayout() instanceof cpr.controls.layouts.VerticalLayout == false) {
		throw new cpr.exceptions.IllegalArgumentException("버티컬 레이아웃에서만 사용가능 합니다.");
	}
	this.container = container;
	this.scrollContainer = scrollContainer || container;
	this.floatings = new cpr.utils.ObjectMap();
	this.topPosition = topPosition || 0;
	this._handleScroll = this.handleScroll.bind(this);
	this._handleResize = this.handleResize.bind(this);
	this._handleDispose = this.handleDispose.bind(this);
	this.container.addEventListener("dispose", this._handleDispose);
	this._started = false;

};

FloatingHeaderVerticalLayout.prototype.handleDispose = function(e) {
	this.stop();
};

/**
 * 오토 플로팅을 시작합니다.
 */
FloatingHeaderVerticalLayout.prototype.start = function() {
	if (this._started || this.container.disposed) {
		return;
	}

	var control = this.control;
	if (control) {
		if (control instanceof cpr.controls.Container) {
			var children = control.getAllRecursiveChildren(true);

			for (var i = 0; i < children.length; i++) {
				if (children[i].focused) {
					children[i].blur();
				}
			}

		} else if (control.focused) {
			control.blur();
		};
	};

	this.scrollContainer.addEventListener("scroll", this._handleScroll);
	window.addEventListener("scroll", this._handleResize);
	window.addEventListener("resize", this._handleResize);
	window.addEventListener("main-size-changed", this._handleResize); // 2019.1.8 애니메이션 효과 삭제 
	//	cpr.core.NotificationCenter.INSTANCE.subscribe("main-size-changed", this, this._handleResize);
	this._started = true;
};

/**
 * 컨트롤의 플로팅이 시작되었을 때의 콜백.
 * @param {cpr.controls.UIControl} control
 */
FloatingHeaderVerticalLayout.prototype.onstartfloat = function(control) {

};

/**
 * 컨트롤의 플로팅이 종료되었을 때의 콜백.
 * @param {cpr.controls.UIControl} control
 */
FloatingHeaderVerticalLayout.prototype.onstopfloat = function(control) {

};

/**
 * 오토 플로팅을 중단합니다.
 */
FloatingHeaderVerticalLayout.prototype.stop = function() {
	if (!this._started) {
		return
	}

	this.floatings.values().filter(function( /* FloatingHeader */ each) {
		return each.floating;
	}).forEach(function( /* FloatingHeader */ each) {
		each.stopFloating();
	});

	this.container.removeEventListener("scroll", this._handleScroll);
	window.removeEventListener("scroll", this._handleResize);
	window.removeEventListener("resize", this._handleResize);
	cpr.core.NotificationCenter.INSTANCE.unsubcribeAllTopic(this);
	this.floatings.removeAll();
};

/**
 * 윈도우가 리사이즈 된 경우를 처리합니다.
 * @param e
 */
FloatingHeaderVerticalLayout.prototype.handleResize = function(e) {
	var currentHeader = this.findCurrentHeader();
	if (currentHeader) {
		// 플로팅된 컨트롤의 위칠르 업데이트.
		currentHeader.updateStyles();
		cpr.core.DeferredUpdateManager.INSTANCE.update();

		// 클리핑 영역을 업데이트.
		this.updateClipping();
		cpr.core.DeferredUpdateManager.INSTANCE.update();
	}
};

/**
 * 다음 플로팅 헤더와 현재 플로팅 헤더가 겹쳐져 있는 경우, 현재 플로팅 헤더를 위로 밀어 올리고 적절한 클리핑을 적용합니다.
 */
FloatingHeaderVerticalLayout.prototype.updateClipping = function() {
	if (this.container.disposed) {
		return false;
	}

	var currentHeader = this.findCurrentHeader();
	var nextHeader = this.findNextCurrentHeader();
	if (!currentHeader || !nextHeader) {
		return false;
	}

	var parentBounds = this.scrollContainer.getActualRect();
	var offset = parentBounds.top + currentHeader.getTestArea().height;
	var nextBounds = nextHeader.getTestArea();

	var changed = false;
	// 다음 헤더와 현재 헤더가 겹쳐진 경우.
	if (nextBounds.top < offset) {
		var gap = offset - nextBounds.top
		var currentArea = currentHeader.control.getActualRect();

		currentHeader.control.style.css({
			"top": parentBounds.top - gap + "px",
			"clip": "rect(" + [gap + "px", currentArea.width + "px", currentArea.height + "px", "0px"].join(",") + ")"
		});
		changed = true;
	} else {
		if (currentHeader.control.style.css("top") != parentBounds.top + "px") {
			currentHeader.control.style.css({
				"top": parentBounds.top + "px",
				"clip": "auto"
			});
			changed = true;
		}
		if (currentHeader.control.style.css("clip") != "auto") {
			currentHeader.control.style.css({
				"clip": "auto"
			});
		}
	}

	return changed;
}

/**
 * 그룹이 스크롤 되었을 떄의 메인 처리 로직.
 * @param {cpr.events.CUIEvent} e
 */
FloatingHeaderVerticalLayout.prototype.handleScroll = function(e) {
	// 모든 플로팅 헤더를 얻음.
	var allHeaders = this.getAllFloatingHeaders();

	// 현재 플로팅 헤더를 얻음.
	var currentHeader = this.findCurrentHeader();

	// 헤더 관련 변동이 있는지를 나타내는 플래그.
	var changed = false;

	// 현재 스크롤 포지션을 백업 해 둠.
	var backupScroll = e.target.scrollTop;

	// 모든 플로팅 헤더에 대해.
	for (var idx = 0; idx < allHeaders.length; idx++) {
		var each = allHeaders[idx];
		// 현재 헤더 인 경우.
		if (each === currentHeader) {
			// 플로팅을 시작 시킴.
			if (each.startFloating()) {
				changed = true;
				// 플로팅 시작 콜백 호출.
				this.onstartfloat(each.control);
			}
		}

		// 그 밖의 헤더 인 경우.
		else {
			// 플로팅을 중단 시킴.
			if (each.stopFloating()) {
				changed = true;
				// 플로팅 중단 콜백 호출.
				this.onstopfloat(each.control);
			}
		}
	}

	// 크롬의 버그 우회, 컨텐츠가 수정되면, 수정된 컨텐츠를 기준으로 스크롤이 변경됨. 이를 원복 시킴.
	if (changed) {
		cpr.core.DeferredUpdateManager.INSTANCE.update();
		changed = false;
		/** @type HTMLDivElement */
		var scroller = e.target;
		scroller.scrollTop = backupScroll;
	}

	// 현재 활성화된 플로팅 헤더가 있으면 클리핑을 업데이트 함.
	// 다음 플로팅 헤더가 이를 밀어내어 살짝 올라가 클리핑이 걸려야 할 수 있음.
	if (currentHeader && !changed) {

		// 플로팅된 컨트롤의 위칠르 업데이트.
		currentHeader.updateStyles(); // (2019.1.8 스타일도 반영되도록 클리핑시에도 )
		changed = changed || this.updateClipping();
	}

	if (changed) {
		// 변경사항이 있으면 DOM에 즉시 반영 시킴.
		cpr.core.DeferredUpdateManager.INSTANCE.update();
	}

};

/**
 * 플로팅 가능한 모든 헤더를 얻습니다.
 * @return {FloatingHeader[]}
 */
FloatingHeaderVerticalLayout.prototype.getAllFloatingHeaders = function() {

	this.container.getChildren().filter(function( /* cpr.controls.UIControl */ each) {
		return each.userAttr("floating-header") == "true";
	}).forEach((function( /* cpr.controls.UIControl */ each) {
		// 플로팅 헤더가 없는 경우, 새로 만듦.
		if (this.floatings.get(each) == null) {
			this.floatings.put(each, new FloatingHeader(each, this.scrollContainer, this.topPosition));
		}
	}).bind(this));

	return this.floatings.values();
};

/**
 * 현재 플로팅 되어야할 헤더를 얻습니다.
 * @return {FloatingHeader} 
 */
FloatingHeaderVerticalLayout.prototype.findCurrentHeader = function() {
	var parentBounds = this.scrollContainer.getActualRect();
	var headers = this.getAllFloatingHeaders();
	for (var idx = headers.length - 1; idx >= 0; idx--) {
		var eachHeader = headers[idx];
		var testArea = eachHeader.getTestArea();
		
		// useWrap 옵션이 사용중이라면, 컨테이너에 래핑됨으로 인해 아직 렌더링 되지 않아 크기가 0일 수 있음.
		if (testArea.isEmpty() == false && testArea.top < parentBounds.top + this.topPosition) {
			return eachHeader;
		}
	}
	return null;
};

/**
 * 다음 플로팅 헤더를 얻음.
 * @return {FloatingHeader} 
 */
FloatingHeaderVerticalLayout.prototype.findNextCurrentHeader = function() {
	var allFloatingHeaders = this.getAllFloatingHeaders();
	var current = this.findCurrentHeader();
	if (current == null) {
		return null;
	}
	var idx = allFloatingHeaders.indexOf(current);
	if (idx < allFloatingHeaders.length - 1) {
		return allFloatingHeaders[idx + 1];
	} else {
		return null;
	}
};

globals.FloatingHeaderVerticalLayout = FloatingHeaderVerticalLayout;