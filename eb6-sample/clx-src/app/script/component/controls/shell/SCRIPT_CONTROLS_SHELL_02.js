/************************************************
 * d3charts.js
 * Created at 2021. 2. 9. 오전 11:34:49.
 *
 * @author SUBBY
 ************************************************/

/**
 * 외부 라이브러리 'd3'를 통해 Bar Chart를 구성합니다.
 * @param {cpr.events.CUIEvent} e
 */
function shellLoadD3Bar( /* cpr.events.CUIEvent */ e) {
	var shlD3Chart = e.control;
	
	var shlContent = e.content;
	
	var xmlns = "http://www.w3.org/2000/svg";
	var svgElem = document.createElementNS(xmlns, "svg");
	svgElem.setAttributeNS(null, "width", "100%");
	svgElem.setAttributeNS(null, "height", "100%");
	svgElem.setAttribute("id", "svgElem");
	svgElem.style.display = "block";
	
	shlContent.appendChild(svgElem);
	
	var jsonData = [{
		"name": "A",
		"value": 120,
		"color": "#5487B1",
		"color2": "#C6E3A7"
	}, {
		"name": "B",
		"value": 80,
		"color": "#63A1AF",
		"color2": "#ADD7A8"
	}, {
		"name": "C",
		"value": 110,
		"color": "#7AB8AA",
		"color2": "#93CAA8"
	}, {
		"name": "D",
		"value": 160,
		"color": "#93CAA8",
		"color2": "#7AB8AA"
	}, {
		"name": "E",
		"value": 140,
		"color": "#ADD7A8",
		"color2": "#63A1AF"
	}, {
		"name": "F",
		"value": 180,
		"color": "#C6E3A7",
		"color2": "#5487B1"
	}];
	
	var width = svgElem.getBoundingClientRect().width;
	var height = svgElem.getBoundingClientRect().height;
	var margin = { top: 100, right: 20, left: 40, bottom: 30 };
	
	var svg = d3.select("svg#svgElem")
				.attr("text-anchor", "middle");
	
	var gridWidth = width - margin.left - margin.right;
	var gridHeight = height - margin.top - margin.bottom;
	
	/* 차트 제목 */
	svg.append("text")
	   .attr("id", "title")
	   .attr("transform", "translate(" + (width / 2) + ", " + (margin.top / 2) + ")")
	   .attr("font-size", "32px")
	   .text("D3 Bar Chart Example");
	
	var svgG = svg.append("g")
				  .attr("id", "chartG")
				  .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");
	
	var xScale = d3.scaleBand()
				   .domain(jsonData.map(function(d) { return d.name; }))
				   .range([0, gridWidth])
				   .padding(0.5);
	
	var yScale = d3.scaleLinear()
				   .domain([40, 200])
				   .range([(gridHeight + margin.bottom), 0]);
	
	svgG.selectAll("text")
		.data(jsonData)
		.enter()
		.append("text")
		.text(function(d) { return d.value; })
		.attr("id", "rectVal")
		.attr("font-size", "12px")
		.attr("font-weight", "bold")
		.attr("x", function(d, i) { return xScale(d.name) + xScale.bandwidth() / 2; })
		.attr("y", function(d, i) { return yScale(d.value) - (margin.bottom + 5); });
	
	svgG.selectAll("rect")
		.data(jsonData)
		.enter()
		.append("rect")
		.attr("x", function(d) { return xScale(d.name); })
		.attr("y", function(d) { return yScale(d.value) - margin.bottom; })
		.attr("width", xScale.bandwidth())
		.attr("height", function(d) { return (gridHeight + margin.bottom) - yScale(d.value); })
		.attr("fill", function(d) { return d.color; });
	
	svgG.append("g")
		.attr("id", "xAxisG")
		.attr("transform", "translate(0, " + gridHeight + ")")
		.call(d3.axisBottom(xScale))
		.selectAll("text")
		.attr("transform", "translate(0, 0)");
	
	svgG.append("g")
		.attr("id", "yAxisG")
		.attr("transform", "translate(0, " + (-margin.bottom) + ")")
		.call(d3.axisLeft(yScale));
}

/**
 * 외부 라이브러리 'd3'를 통해 Pie Chart를 구성합니다.
 * @param {cpr.events.CUIEvent} e
 */
function shellLoadD3Pie( /* cpr.events.CUIEvent */ e) {
	var shlD3Chart = e.control;
	
	var shlContent = e.content;
	
	var xmlns = "http://www.w3.org/2000/svg";
	var svgElem = document.createElementNS(xmlns, "svg");
	svgElem.setAttributeNS(null, "width", "100%");
	svgElem.setAttributeNS(null, "height", "100%");
	svgElem.setAttribute("id", "svgElem");
	svgElem.style.display = "block";
	
	shlContent.appendChild(svgElem);
	
	var jsonData = [{
		"name": "A",
		"value": 120,
		"color": "#5487B1",
		"color2": "#C6E3A7"
	}, {
		"name": "B",
		"value": 80,
		"color": "#63A1AF",
		"color2": "#ADD7A8"
	}, {
		"name": "C",
		"value": 110,
		"color": "#7AB8AA",
		"color2": "#93CAA8"
	}, {
		"name": "D",
		"value": 160,
		"color": "#93CAA8",
		"color2": "#7AB8AA"
	}, {
		"name": "E",
		"value": 140,
		"color": "#ADD7A8",
		"color2": "#63A1AF"
	}, {
		"name": "F",
		"value": 180,
		"color": "#C6E3A7",
		"color2": "#5487B1"
	}];
	
	var width = svgElem.getBoundingClientRect().width;
	var height = svgElem.getBoundingClientRect().height;
	var margin = { top: 100, right: 20, left: 40, bottom: 30 };
	
	var svg = d3.select("svg#svgElem")
				.attr("text-anchor", "middle");
	
	/* 차트 제목 */
	svg.append("text")
	   .attr("id", "title")
	   .attr("transform", "translate(" + (width / 2) + ", " + (margin.top / 2) + ")")
	   .attr("font-size", "32px")
	   .text("D3 Pie Chart Example");
	
	/* 안쪽, 바깥쪽 반지름 값 설정 */
	var arc = d3.arc().innerRadius(0).outerRadius(Math.min(width, height) / 2.5);
	
	/* 차트의 값을 나타낼 위치 설정 */
	var arcLabel = (function() {
		var radius = Math.min(width, height) / 2.5 * 0.8;
		return d3.arc().innerRadius(radius).outerRadius(radius);
	})();
	
	/* 파이 차트 구성 */
	var pie = d3.pie()
				.sort(null)
				.value(function(b) { return b.value; });
	
	var arcs = pie(jsonData);
	
	var g = svg.append("g")
			   .attr("id", "pieG")
			   .attr("transform", "translate(" + (width / 2) + ", " + (height / 1.7) + ")");
	
	/* 파이 차트의 각 영역 */
	g.selectAll("path")
	 .data(arcs)
	 .enter()
	 .append("path")
	 .attr("fill", function(d) { return d.data.color2; })
	 .attr("stroke", "white")
	 .attr("d", arc)
	 .append("title")
	 .text(function(d) { return d.data.name + ": " + d.data.value; });
	
	/* 파이 차트의 각 영역 별 값을 나타냄 */
	var text = g.selectAll("text")
				.data(arcs)
				.enter()
				.append("text")
				.attr("transform", function(d) { return "translate(" + arcLabel.centroid(d) + ")" })
				.attr("dy", "0.35em");
	
	text.append("tspan")
		.attr("x", 0)
		.attr("y", "-0.7em")
		.style("font-weight", "bold")
		.text(function(d) { return d.data.name; });
	
	text.filter(function(d) { return d.endAngle - d.startAngle > 0.25; })
		.append("tspan")
		.attr("x", 0)
		.attr("y", "0.7em")
		.attr("fill-opacity", "0.7")
		.text(function(d) { return d.data.value; });
}

/**
 * 외부 라이브러리 'd3'를 통해 Donut Chart를 구성합니다.
 * @param {cpr.events.CUIEvent} e
 */
function shellLoadD3Donut( /* cpr.events.CUIEvent */ e) {
	var shlD3Chart = e.control;
	
	var shlContent = e.content;
	
	var xmlns = "http://www.w3.org/2000/svg";
	var svgElem = document.createElementNS(xmlns, "svg");
	svgElem.setAttributeNS(null, "width", "100%");
	svgElem.setAttributeNS(null, "height", "100%");
	svgElem.setAttribute("id", "svgElem");
	svgElem.style.display = "block";
	
	shlContent.appendChild(svgElem);
	
	var jsonData = [{
		"name": "A",
		"value": 120,
		"color": "#5487B1",
		"color2": "#C6E3A7"
	}, {
		"name": "B",
		"value": 80,
		"color": "#63A1AF",
		"color2": "#ADD7A8"
	}, {
		"name": "C",
		"value": 110,
		"color": "#7AB8AA",
		"color2": "#93CAA8"
	}, {
		"name": "D",
		"value": 160,
		"color": "#93CAA8",
		"color2": "#7AB8AA"
	}, {
		"name": "E",
		"value": 140,
		"color": "#ADD7A8",
		"color2": "#63A1AF"
	}, {
		"name": "F",
		"value": 180,
		"color": "#C6E3A7",
		"color2": "#5487B1"
	}];
	
	var width = svgElem.getBoundingClientRect().width;
	var height = svgElem.getBoundingClientRect().height;
	var margin = { top: 100, right: 20, left: 40, bottom: 30 };
	
	var svg = d3.select("svg#svgElem")
				.attr("text-anchor", "middle");
	
	/* 차트 제목 */
	svg.append("text")
	   .attr("id", "title")
	   .attr("transform", "translate(" + (width / 2) + ", " + (margin.top / 2) + ")")
	   .attr("font-size", "32px")
	   .text("D3 Donut Chart Example");
	
	/* 안쪽, 바깥쪽 반지름 값 설정 */
	var arc = d3.arc().innerRadius(75).outerRadius(Math.min(width, height) / 2.5);
	
	/* 차트의 값을 나타낼 위치 설정 */
	var arcLabel = (function() {
		var radius = Math.min(width, height) / 2.5 * 0.8;
		return d3.arc().innerRadius(radius).outerRadius(radius);
	})();
	
	/* 파이 차트 구성 */
	var pie = d3.pie()
				.sort(null)
				.value(function(b) { return b.value; });
	
	var arcs = pie(jsonData);
	
	var g = svg.append("g")
			   .attr("id", "firstG")
			   .attr("transform", "translate(" + (width / 2) + ", " + (height / 1.7) + ")");
	
	/* 파이 차트의 각 영역을 구분하는 선 */
	g.selectAll("path")
	 .data(arcs)
	 .enter()
	 .append("path")
	 .attr("fill", function(d) { return d.data.color; })
	 .attr("stroke", "white")
	 .attr("d", arc)
	 .append("title")
	 .text(function(d) { return d.data.name + ": " + d.data.value; });
	
	/* 파이 차트의 각 영역 별 값을 나타냄 */
	var text = g.selectAll("text")
				.data(arcs)
				.enter()
				.append("text")
				.attr("transform", function(d) { return "translate(" + arcLabel.centroid(d) + ")" })
				.attr("dy", "0.35em");
	
	text.append("tspan")
		.attr("x", 0)
		.attr("y", "-0.7em")
		.style("font-weight", "bold")
		.text(function(d) { return d.data.name; });
	
	text.filter(function(d) { return d.endAngle - d.startAngle > 0.25; })
		.append("tspan")
		.attr("x", 0)
		.attr("y", "0.7em")
		.attr("fill-opacity", "0.7")
		.text(function(d) { return d.data.value; });
}

/**
 * 외부 라이브러리 'd3'를 통해 Area Chart를 구성합니다.
 * @param {cpr.events.CUIEvent} e
 */
function shellLoadD3Area( /* cpr.events.CUIEvent */ e) {
	var shlD3Chart = e.control;
	
	var shlContent = e.content;
	
	var xmlns = "http://www.w3.org/2000/svg";
	var svgElem = document.createElementNS(xmlns, "svg");
	svgElem.setAttributeNS(null, "width", "100%");
	svgElem.setAttributeNS(null, "height", "100%");
	svgElem.setAttribute("id", "svgElem");
	svgElem.style.display = "block";
	
	shlContent.appendChild(svgElem);
	
	var jsonData = [{
		"date": "2021-02-11",
		"value": 120,
		"color": "#5487B1",
		"color2": "#C6E3A7"
	}, {
		"date": "2021-02-12",
		"value": 80,
		"color": "#63A1AF",
		"color2": "#ADD7A8"
	}, {
		"date": "2021-02-13",
		"value": 110,
		"color": "#7AB8AA",
		"color2": "#93CAA8"
	}, {
		"date": "2021-02-14",
		"value": 160,
		"color": "#93CAA8",
		"color2": "#7AB8AA"
	}, {
		"date": "2021-02-15",
		"value": 140,
		"color": "#ADD7A8",
		"color2": "#63A1AF"
	}, {
		"date": "2021-02-16",
		"value": 180,
		"color": "#C6E3A7",
		"color2": "#5487B1"
	}];
	
	jsonData.forEach(function(each) {
		each.date = d3.timeParse("%Y-%m-%d")(each.date);
	});
	
	var width = svgElem.getBoundingClientRect().width;
	var height = svgElem.getBoundingClientRect().height;
	var margin = { top: 100, right: 20, left: 40, bottom: 30 };
	
	var svg = d3.select("svg#svgElem")
				.attr("text-anchor", "middle");
	
	var gridWidth = width - margin.left - margin.right;
	var gridHeight = height - margin.top - margin.bottom;
	
	/* 차트 제목 */
	svg.append("text")
	   .attr("id", "title")
	   .attr("transform", "translate(" + (width / 2) + ", " + (margin.top / 2) + ")")
	   .attr("font-size", "32px")
	   .text("D3 Area Chart Example");
	
	var svgG = svg.append("g")
				  .attr("id", "chartG")
				  .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");
	
	var xScale = d3.scaleTime()
				   .domain(d3.extent(jsonData, function(d) { return d.date; }))
				   .range([0, gridWidth]);
	
	var yScale = d3.scaleLinear()
				   .domain([0, 200])
				   .range([(gridHeight), 0]);
	
	var area = d3.area()
				 .x(function(d) { return xScale(d.date); })
				 .y0(yScale(0))
				 .y1(function(d) { return yScale(d.value); });
	
	svgG.append("path")
		.datum(jsonData)
		.attr("fill", "#CCE5DF")
		.attr("stroke", "#69B3A2")
		.attr("stroke-width", "1")
		.attr("d", area);
	
	svgG.append("g")
		.attr("id", "xAxisG")
		.attr("transform", "translate(0, " + gridHeight + ")")
		.call(d3.axisBottom(xScale)
				.ticks(5))
		.selectAll("text");
	
	svgG.append("g")
		.attr("id", "yAxisG")
		.call(d3.axisLeft(yScale));
	
	svgG.selectAll("circle")
		.data(jsonData)
		.enter()
		.append("circle")
		.attr("fill", "skyblue")
		.attr("stroke", "none")
		.attr("cx", function(d) { return xScale(d.date); })
		.attr("cy", function(d) { return yScale(d.value); })
		.attr("r", 3);
}

/**
 * 외부 라이브러리 'd3'를 통해 Scatter Chart를 구성합니다.
 * @param {cpr.events.CUIEvent} e
 */
function shellLoadD3Scatter( /* cpr.events.CUIEvent */ e) {
	var shlD3Chart = e.control;
	
	var shlContent = e.content;
	
	var xmlns = "http://www.w3.org/2000/svg";
	var svgElem = document.createElementNS(xmlns, "svg");
	svgElem.setAttributeNS(null, "width", "100%");
	svgElem.setAttributeNS(null, "height", "100%");
	svgElem.setAttribute("id", "svgElem");
	svgElem.style.display = "block";
	
	shlContent.appendChild(svgElem);
	
	var jsonData = [{
			"x": 1.9,
			"y": 1.5,
			"color": "#66A6FF"
		}, {
			"x": 2.2,
			"y": 2.2,
			"color": "#66A6FF"
		}, {
			"x": 2.4,
			"y": 1.8,
			"color": "#66A6FF"
		}, {
			"x": 2.5,
			"y": 2.1,
			"color": "#66A6FF"
		}, {
			"x": 2.7,
			"y": 1.7,
			"color": "#66A6FF"
		}, {
			"x": 2.5,
			"y": 1.9,
			"color": "#30C7EC"
		}, {
			"x": 2.6,
			"y": 2.2,
			"color": "#30C7EC"
		}, {
			"x": 2.7,
			"y": 2.1,
			"color": "#30C7EC"
		}, {
			"x": 2.8,
			"y": 1.8,
			"color": "#30C7EC"
		}, {
			"x": 3.1,
			"y": 2.8,
			"color": "#30C7EC"
		}, {
			"x": 3.1,
			"y": 2.2,
			"color": "#209CFF"
		}, {
			"x": 3.2,
			"y": 2.7,
			"color": "#209CFF"
		}, {
			"x": 3.3,
			"y": 2.3,
			"color": "#209CFF"
		}, {
			"x": 3.4,
			"y": 2.4,
			"color": "#209CFF"
		}, {
			"x": 3.5,
			"y": 2.6,
			"color": "#209CFF"
		}
	];
	
	var width = svgElem.getBoundingClientRect().width;
	var height = svgElem.getBoundingClientRect().height;
	var margin = { top: 100, right: 20, left: 40, bottom: 30 };
	
	var svg = d3.select("svg#svgElem")
				.attr("text-anchor", "middle");
	
	var gridWidth = width - margin.left - margin.right;
	var gridHeight = height - margin.top - margin.bottom;
	
	/* 차트 제목 */
	svg.append("text")
	   .attr("id", "title")
	   .attr("transform", "translate(" + (width / 2) + ", " + (margin.top / 2) + ")")
	   .attr("font-size", "32px")
	   .text("D3 Scatter Chart Example");
	
	var svgG = svg.append("g")
				  .attr("id", "chartG")
				  .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");
	
	var xScale = d3.scaleLinear()
				   .domain([d3.min(jsonData, function(d) { return d.x *0.9; }), d3.max(jsonData, function(d) { return d.x * 1.05; })])
				   .range([0, gridWidth]);
	
	svgG.append("g")
		.attr("id", "xAxis")
		.attr("transform", "translate(0, " + gridHeight + ")")
		.call(d3.axisBottom(xScale)
				.tickSize(-gridHeight)
				.ticks(10))
		.select(".domain").remove();
	
	var yScale = d3.scaleLinear()
				   .domain([d3.min(jsonData, function(d) { return d.y *0.9; }), d3.max(jsonData, function(d) { return d.y * 1.05; })])
				   .range([gridHeight, 0]).nice();
	
	svgG.append("g")
		.attr("id", "yAxis")
		.call(d3.axisLeft(yScale)
				.tickSize(-gridWidth)
				.ticks(10))
		.select(".domain").remove();
	
	svgG.selectAll(".tick line")
		.attr("stroke", "#EBEBEB");
	
	svgG.append("g")
		.selectAll("dot")
		.data(jsonData)
		.enter()
		.append("circle")
		.attr("cx", function(d) { return xScale(d.x); })
		.attr("cy", function(d) { return yScale(d.y); })
		.attr("r", 8)
		.style("fill", function(d) { return d.color; });
}

/*
 * 쉘에서 init 이벤트 발생 시 호출.
 */
function onShlD3ChartsInit( /* cpr.events.CUIEvent */ e) {
	/** 
	 * @type cpr.controls.UIControlShell
	 */
	var shlD3Charts = e.control;
	
	var shlContent = e.content;
	
	if (shlContent) {
		while (shlContent.firstChild) {
			shlContent.removeChild(shlContent.firstChild);
		}
	}
}

/*
 * 쉘에서 load 이벤트 발생 시 호출.
 */
function onShlD3ChartsLoad( /* cpr.events.CUIEvent */ e) {
	/** 
	 * @type cpr.controls.UIControlShell
	 */
	var shlD3Charts = e.control;
	
	var shl = app.lookup("shlD3Charts");
	
	var vsChartType = shl.userData("vsChartType");
	
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace2");
	
	if (vsChartType == "bar") {
		shellLoadD3Bar(e);
		vcAceEditor.value = shellLoadD3Bar;
	} else if (vsChartType == "pie") {
		shellLoadD3Pie(e);
		vcAceEditor.value = shellLoadD3Pie;
	} else if (vsChartType == "donut") {
		shellLoadD3Donut(e);
		vcAceEditor.value = shellLoadD3Donut;
	} else if (vsChartType == "area") {
		shellLoadD3Area(e);
		vcAceEditor.value = shellLoadD3Area;
	} else if (vsChartType == "scatter") {
		shellLoadD3Scatter(e);
		vcAceEditor.value = shellLoadD3Scatter;
	}
}
/*
 * "실행" 버튼(btnShellLoad)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnShellLoadClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnShellLoad = e.control;
	
	var vsChartType = app.lookup("cmbChartType").value;
	
	var shl = app.lookup("shlD3Charts");
	
	shl.userData("vsChartType", vsChartType);
	
	shl.redraw();
}
