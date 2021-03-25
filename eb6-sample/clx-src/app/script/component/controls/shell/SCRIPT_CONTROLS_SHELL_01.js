/************************************************
 * SCRIPT_SAMPLE_ECHARTS_01.js
 * Created at 2021. 2. 5. 오후 2:35:58.
 *
 * @author SUBBY
 ************************************************/

/**
 * 외부 라이브러리 'eCharts'를 통해 Bar Chart를 구성한다.
 * @param {cpr.events.CUIEvent} e
 */
function shellLoadBar( /* cpr.events.CUIEvent */ e) {
	/** 
	 * @type cpr.controls.UIControlShell
	 */
	var shlEChartsBar = e.control;
	
	var shlContent = e.content;
	
	/* echartsInstance 생성 */
	var shlBarECharts = echarts.init(shlContent);
	
	/* 차트를 구성할 데이터 작성 */
	var chartOption = {
		/* 차트 제목 */
		title: {
			text: 'eCharts - Bar Sample',
			top: 10,
			left: 'center'
		},
		/* 차트 구역 */
		grid: {
			top: 'center',
			right: 'center',
			width: '85%',
			height: '75%'
		},
		/* 툴팁 */
		tooltip: {},
		/* 차트 범례 */
		legend: {
			orient: "vertical",
			top: 10,
			right: 10
		},
		/* x축 */
		xAxis: {
			data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
		},
		/* y축 */
		yAxis: {
			min: 60,
			max: 210
		},
		/* 차트 데이터 */
		series: [{
			name: '철수',
			type: 'bar',
			data: [120, 200, 150, 80, 70, 110, 130],
			itemStyle: {
				color: '#209CFF'
			}
		}, {
			name: '영희',
			type: 'bar',
			data: [180, 140, 170, 90, 110, 80, 130],
			itemStyle: {
				color: '#68E0CF'
			}
		}]
	};
	
	/* echartsInstance에 작성한 데이터로 차트 구성 */
	shlBarECharts.setOption(chartOption);
}

/**
 * 외부 라이브러리 'eCharts'를 통해 Pie Chart를 구성한다.
 * @param {cpr.events.CUIEvent} e
 */
function shellLoadPie( /* cpr.events.CUIEvent */ e) {
	/** 
	 * @type cpr.controls.UIControlShell
	 */
	var shlEChartsPie = e.control;
	
	var shlContent = e.content;
	
	/* echartsInstance 생성 */
	var shlPieECharts = echarts.init(shlContent);
	
	/* 차트를 구성할 데이터 작성 */
	var chartOption = {
		/* 차트 제목 */
		title: {
			text: 'eCharts - Pie Sample',
			top: 10,
			left: 'center'
		},
		/* 차트 구역 */
		grid: {
			top: 'center',
			right: 'center',
			width: '85%',
			height: '75%'
		},
		/* 툴팁 */
		tooltip: {},
		/* 차트 범례 */
		legend: {
			orient: "vertical",
			top: 10,
			right: 10
		},
		/* 차트 데이터 */
		series: [{
			name: '휴대폰 제조사',
			type: 'pie',
			radius: '66%',
			data: [{
					value: 120,
					name: 'Apple',
					itemStyle: {
						color: '#9EFBD3'
					}
				},
				{
					value: 90,
					name: 'LG',
					itemStyle: {
						color: '#66A6FF'
					}
				},
				{
					value: 150,
					name: 'Samsung',
					itemStyle: {
						color: '#30C7EC'
					}
				}
			]
		}]
	};
	
	/* echartsInstance에 작성한 데이터로 차트 구성 */
	shlPieECharts.setOption(chartOption);
}


/**
 * 외부 라이브러리 'eCharts'를 통해 Donut Chart를 구성한다.
 * @param {cpr.events.CUIEvent} e
 */
function shellLoadDonut( /* cpr.events.CUIEvent */ e) {
	/** 
	 * @type cpr.controls.UIControlShell
	 */
	var shlEChartsDonut = e.control;
	
	var shlContent = e.content;
	
	/* echartsInstance 생성 */
	var shlDonutECharts = echarts.init(shlContent);
	
	/* 차트를 구성할 데이터 작성 */
	var chartOption = {
		/* 차트 제목 */
		title: {
			text: 'eCharts - Donut Sample',
			top: 10,
			left: 'center'
		},
		/* 차트 구역 */
		grid: {
			top: 'center',
			right: 'center',
			width: '85%',
			height: '75%'
		},
		/* 툴팁 */
		tooltip: {
			trigger: 'item'
		},
		/* 차트 범례 */
		legend: {
			orient: "vertical",
			top: 10,
			right: 10
		},
		/* 차트 데이터 */
		series: [{
			name: 'SNS',
			type: 'pie',
			radius: ['35%', '70%'],
			avoidLabelOverlap: false,
			label: {
				show: false,
				position: 'center'
			},
			emphasis: {
				label: {
					show: true,
					fontSize: '20',
					fontWeight: 'bold'
				}
			},
			labelLine: {
				show: false
			},
			data: [{
					value: 150,
					name: 'Facebook',
					itemStyle: {
						color: '#66A6FF'
					}
				},
				{
					value: 180,
					name: 'Instagram',
					itemStyle: {
						color: '#30C7EC'
					}
				},
				{
					value: 120,
					name: 'Twitter',
					itemStyle: {
						color: '#89F7FE'
					}
				}
			]
		}]
	};
	
	/* echartsInstance에 작성한 데이터로 차트 구성 */
	shlDonutECharts.setOption(chartOption);
}

/**
 * 외부 라이브러리 'eCharts'를 통해 Area Chart를 구성한다.
 * @param {cpr.events.CUIEvent} e
 */
function shellLoadArea( /* cpr.events.CUIEvent */ e) {
	/** 
	 * @type cpr.controls.UIControlShell
	 */
	var shlEChartsArea = e.control;
	
	var shlContent = e.content;
	
	/* echartsInstance 생성 */
	var shlAreaECharts = echarts.init(shlContent);
	
	/* 차트를 구성할 데이터 작성 */
	var chartOption = {
		/* 차트 제목 */
		title: {
			text: 'eCharts - Area Sample',
			top: 10,
			left: 'center'
		},
		/* 툴팁 */
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'cross',
				label: {
					backgroundColor: '#6a7985'
				}
			}
		},
		/* 차트 범례 */
		legend: {
			data: ['a', 'b', 'c', 'd', 'e'],
			bottom: 10
		},
		/* 차트 구역 */
		grid: {
			left: '3%',
			right: '4%',
			bottom: '13%',
			containLabel: true
		},
		/* x축 */
		xAxis: [{
			type: 'category',
			boundaryGap: false,
			data: ['1', '2', '3', '4', '5', '6', '7']
		}],
		/* y축 */
		yAxis: [{
			type: 'value'
		}],
		/* 차트 데이터에 hover시, 차트 데이터 focus */
		emphasis: {
			focus: 'series'
		},
		/* 차트 데이터 별 색상 */
		color: ['#9EFBD3', '#57E9F2', '#45D4FB', '#30C7EC', '#209CFF'],
		/* 차트 데이터 */
		series: [{
				name: 'a',
				type: 'line',
				stack: 'stack',
				areaStyle: {},
				data: [170, 182, 151, 184, 140, 280, 260]
			},
			{
				name: 'b',
				type: 'line',
				stack: 'stack',
				areaStyle: {},
				data: [270, 232, 241, 284, 340, 380, 360]
			},
			{
				name: 'c',
				type: 'line',
				stack: 'stack',
				areaStyle: {},
				data: [200, 282, 251, 204, 240, 380, 460]
			},
			{
				name: 'd',
				type: 'line',
				stack: 'stack',
				areaStyle: {},
				data: [370, 382, 351, 384, 440, 380, 370]
			},
			{
				name: 'e',
				type: 'line',
				stack: 'stack',
				label: {
					show: true,
					position: 'top'
				},
				areaStyle: {},
				data: [520, 632, 601, 634, 890, 930, 920]
			}
		]
	};
	
	/* echartsInstance에 작성한 데이터로 차트 구성 */
	shlAreaECharts.setOption(chartOption);
}

/**
 * 외부 라이브러리 'eCharts'를 통해 Scatter Chart를 구성한다.
 * @param {cpr.events.CUIEvent} e
 */
function shellLoadScatter( /* cpr.events.CUIEvent */ e) {
	/** 
	 * @type cpr.controls.UIControlShell
	 */
	var shlEChartsScatter = e.control;
	
	var shlContent = e.content;
	
	/* echartsInstance 생성 */
	var shlScatterECharts = echarts.init(shlContent);
	
	/* 차트를 구성할 데이터 작성 */
	var chartOption = {
		/* 차트 제목 */
		title: {
			text: 'eCharts - Scatter Sample',
			top: 10,
			left: 'center',
			/* title fontSize */
			textStyle: {
	            // fontSize: 32
			}
		},
		/* x축 */
		xAxis: {
			scale: true
		},
		/* y축 */
		yAxis: {},
		/* 툴팁 */
		tooltip: {
			showDelay: 0,
			formatter: function(params) {
				return params.seriesName + "(" + params.name + "): " 
					 + params.value[0] + ", " 
					 + params.value[1];
			},
			axisPointer: {
				show: true,
				type: 'cross',
				lineStyle: {
					type: 'dashed',
					width: 1
				}
			}
		},
		/* 차트 범례 */
		legend: {
			data: ['A', 'B', 'C', 'D', 'E'],
			left: 'center',
			bottom: 10
		},
		/* 차트 데이터에 hover시, 차트 데이터 focus */
		emphasis: {
			focus: 'series'
		},
		/* 차트 데이터 */
		series: [{
			symbolSize: 15,
			data: [
				{value: [10.0, 8.04], name: '1'},
				{value: [8.07, 6.95], name: '2'},
				{value: [13.0, 7.58], name: '3'},
				{value: [9.05, 8.81], name: '4'},
				{value: [11.0, 8.33], name: '5'}
			],
			name: 'A',
			type: 'scatter'
		}, {
			symbolSize: 15,
			data: [
				{value: [14.0, 7.66], name: '1'},
				{value: [13.4, 6.81], name: '2'},
				{value: [10.0, 6.33], name: '3'},
				{value: [14.0, 8.96], name: '4'},
				{value: [12.5, 6.82], name: '5'}
			],
			name: 'B',
			type: 'scatter'
		}, {
			symbolSize: 15,
			data: [
				{value: [9.15, 7.20], name: '1'},
				{value: [11.5, 7.20], name: '2'},
				{value: [3.03, 4.23], name: '3'},
				{value: [12.2, 7.83], name: '4'},
				{value: [2.02, 4.47], name: '5'}
			],
			name: 'C',
			type: 'scatter'
		}, {
			symbolSize: 15,
			data: [
				{value: [1.05, 3.33], name: '1'},
				{value: [4.05, 4.96], name: '2'},
				{value: [6.03, 7.24], name: '3'},
				{value: [12.0, 6.26], name: '4'},
				{value: [12.0, 8.84], name: '5'}
			],
			name: 'D',
			type: 'scatter'
		}, {
			symbolSize: 15,
			data: [
				{value: [7.08, 5.82], name: '1'},
				{value: [5.02, 5.68], name: '2'},
				{value: [9.35, 5.15], name: '3'},
				{value: [7.78, 4.39], name: '4'},
				{value: [5.87, 4.91], name: '5'}
			],
			name: 'E',
			type: 'scatter'
		}],
		/* 차트 데이터 별 색상 */
		color: ['#9EFBD3', '#66A6FF', '#30C7EC', '#89F7FE', '#209CFF']
	};
	
	/* echartsInstance에 작성한 데이터로 차트 구성 */
	shlScatterECharts.setOption(chartOption);
}

/*
 * "실행" 버튼(btnShlLoad)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnShlLoadClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var btnShlLoad = e.control;
	
	var shell = app.lookup("shlECharts");
	
	var vsChartType = app.lookup("cmbChartType").value;
	
	shell.userData("vsChartType", vsChartType);
	
	shell.redraw();
}

/*
 * 쉘에서 init 이벤트 발생 시 호출.
 */
function onShlEChartsInit( /* cpr.events.CUIEvent */ e) {
	/** 
	 * @type cpr.controls.UIControlShell
	 */
	var shlECharts = e.control;
	
	if (e.content) {
		var instance = echarts.getInstanceByDom(e.content);
		if (instance) {
			instance.dispose();
		}
	}
}

/*
 * 쉘에서 load 이벤트 발생 시 호출.
 */
function onShlEChartsLoad( /* cpr.events.CUIEvent */ e) {
	/** 
	 * @type cpr.controls.UIControlShell
	 */
	var shlECharts = e.control;
	
	var shell = app.lookup("shlECharts");
	
	var vsChartType = shell.userData("vsChartType");
	
	/* 에디터에 소스 표시 */
	var vcAceEditor = app.lookup("ace2");
	
	if (vsChartType == "bar") {
		shellLoadBar(e);
		vcAceEditor.value = shellLoadBar;
	} else if (vsChartType == "pie") {
		shellLoadPie(e);
		vcAceEditor.value = shellLoadPie;
	} else if (vsChartType == "donut") {
		shellLoadDonut(e);
		vcAceEditor.value = shellLoadDonut;
	} else if (vsChartType == "area") {
		shellLoadArea(e);
		vcAceEditor.value = shellLoadArea;
	} else if (vsChartType == "scatter") {
		shellLoadScatter(e);
		vcAceEditor.value = shellLoadScatter;
	}
}
