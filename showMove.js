/// <reference path="./jsapi_vsdoc10_v34.js" />

// 动画
Typhoon = {
	current : {}
}
function startTyphoon(points) {
	//clear();
	_parseTyphoon(points);
	//map.setExtent(_getPathListExtent(Typhoon.current.pathList));
	Typhoon.current.moveTally = 0;
	//startMove();
}

function clear() {
	//dojo.byId("typhoonIcon").stop();
	map.graphics.clear();
	typhoonPathLayer.clear();
	Typhoon.current = {};
}

function startMove() {
	//_convertPathList();
	Typhoon.current.moveRunning = true;
	//_moveCurrent();
	showCurrent(Typhoon.current.pathList[Typhoon.current.moveTally].x, Typhoon.current.pathList[Typhoon.current.moveTally].y);
	Typhoon.current.moveTally++;
}

function showCurrent(x, y) {
	map.graphics.remove(thegraphic);
	addPointToMap(new esri.geometry.Point(x, y));
}

function _convertPathList() {
	var convertedPathList = [];
	dojo.forEach(Typhoon.current.pathList, function(index, point) {
		convertedPathList.push(map.toScreen(point));
	});
	Typhoon.current.convertedPathList = convertedPathList;
}

function _parseTyphoon(points) {
	var pathList = [];
	var myJsonStr = '{"points":' + points + '}';
	console.log(myJsonStr);
	//var mpJson ={"points":[[107.51365018929151, 36.68439768107339], [108.61248415359654, 36.739339379288644], [108.48146933477555, 35.927892759494156]],"spatialReference":({" wkid":4326 })};
	var mpJson = JSON.parse(myJsonStr);

	//$.each(points, function(index, result) {
	dojo.forEach(mpJson.points, function(result) {
		//var point = esri.geometry.geographicToWebMercator(new esri.geometry.Point(track.lon, track.lat, new esri.SpatialReference({
		var point = new esri.geometry.Point(result);
		point.attrs = result;
		pathList.push(point);
	})
	Typhoon.current.pathList = pathList;
}

function _getPathListExtent(pathList) {
	var graphics = [];
	dojo.forEach(pathList, function(index, point) {
		var graphic = new esri.Graphic(point);
		graphics.push(graphic);
	})
	var desExtent = esri.graphicsExtent(graphics);
	return desExtent.expand(1.3);
}

function _moveCurrent() {
	if (!Typhoon.current.moveRunning)
		return;
	var start;
	if (Typhoon.current.moveTally == 0) {
		this._createTyphoonIcon(Typhoon.current.pathList[0]);
	} else {
		map.graphics.remove(Typhoon.current.typhoonIcon);
		this._createTyphoonIcon(Typhoon.current.pathList[Typhoon.current.moveTally]);
	}
	if (Typhoon.current.moveTally == (Typhoon.current.pathList.length)) {
		Typhoon.current.moveTally = 0;
	}
	/*
	//先将graphic移动至开始点
//	$('#typhoonIcon').css({
	dojo.byId("typhoonIcon").css({
		top : Typhoon.current.pathList[Typhoon.current.moveTally - 1].y,
		left : Typhoon.current.pathList[Typhoon.current.moveTally - 1].x
	});

	//如果移动到头了就停止 移动，并清楚graphic
	if (Typhoon.current.moveTally == (Typhoon.current.pathList.length - 1)) {
		map.graphics.remove(Typhoon.current.typhoonIcon);
		return;
	}
	//使用jquery的动画，事实的改变graphic的xy坐标
	//_updateTyphoonIcon();
//	$('#typhoonIcon').animate({
	dojo.byId("typhoonIcon").animate({
		top : Typhoon.current.pathList[Typhoon.current.moveTally].y,
		left : Typhoon.current.pathList[Typhoon.current.moveTally].x
	}, {
		duration : 1500,
		step : _updateTyphoonIcon,
		complete : function() {
			if (Typhoon.current.moveTally != (Typhoon.current.pathList.length - 1)) {
				_moveCurrent();
			} else {
				if (Typhoon.repeat) {
					Typhoon.current.moveTally = 0;
					_moveCurrent();
				} else {
					map.graphics.remove(Typhoon.current.typhoonIcon);
					stopMove();
				}
			}
		}
	});
	 */
}

function stopMove() {
	dojo.byId("typhoonIcon").stop();
	Typhoon.current.moveRunning = true;
	Typhoon._moveCurrent();
}

function _updateTyphoonIcon(now, fx) {
	var newPoint = Typhoon.current.typhoonIcon.geometry;
	if (fx.prop == 'left') {
		newPoint.setX(now);

	} else if (fx.prop == 'top') {
		newPoint.setY(now);
	}
	Typhoon.current.typhoonIcon.setGeometry(newPoint);
}

function _createTyphoonIcon(point) {
	var pt = new esri.geometry.Point(point.x, point.y, map.spatialReference);
	var typhoonSymbol = new esri.symbol.PictureMarkerSymbol('icon.PNG', 24, 24);
	Typhoon.current.typhoonIcon = new esri.Graphic(pt, typhoonSymbol);
	map.graphics.add(Typhoon.current.typhoonIcon);
}

function exam1() {
	var handle1;
	var exam2 = function(x) {
		console.log(x);
		dojo.unsubscribe(handle1);
	};
	handle1 = dojo.subscribe("executeAPQuery", this, exam2);
	executeLine2Pos();
}

function actionOnZoomEnd(extent, zoomFactor, anchor, level){
	alert(level);
}

