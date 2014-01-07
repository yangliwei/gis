/// <reference path="./jsapi_vsdoc10_v34.js" />

dojo.require("esri.map");
//dojo.require("dojo.json");
///dojo.require("dojo._base_fx");
dojo.require("esri.graphic");
dojo.require("esri.toolbars.draw");
dojo.require("esri.dijit.Scalebar");
dojo.require("esri.layers.FeatureLayer");
dojo.require("esri.geometry");
dojo.require("esri.tasks.identify");
dojo.require("esri.tasks.query");
dojo.require("dijit.Menu");
dojo.require("dijit.TooltipDialog");
dojo.require("dijit.layout.ContentPane");
dojo.require("dijit.layout.TabContainer");
//dojo.require("dijit.registry");
//dojo.require("dojo.base.connect");

var projectName = "/thyx";
var map, toolbar, symbol, geomTask, infoTemplate, typhoonPathLayer;
var pointQueryResult, lineDrawResult, mpJson, polyline;
var gis_host = "http://192.168.1.20:6080/arcgis/rest/services/hatc/20131111/MapServer";
//var gis_host = "http://192.168.6.44:6080/arcgis/rest/services/hatc/20130821/MapServer";
var pGeometryService, PolygonSymbol;
var featureLayer_1, featureLayer_2, featureLayer_3, pre_level = 5000000;
//var longitude,latitude;
var imageryPrime;
var shAsPaneGraphicId = "shAsPane";

function init() {
	map = new esri.Map("map", {scale:pre_level,center:[106.63,29.71],logo:false});
	dojo.connect(map, "onLoad", createToolbar);
/*
	var resizeTimer; 
  	dojo.connect(map, 'onLoad', function(theMap) { 
    	dojo.connect(registry.byId('map'), 'resize', function() { 
      		//resize the map if the div is resized 
      		clearTimeout(resizeTimer); 
      		resizeTimer = setTimeout( function() { 
        		map.resize(); 
        		map.reposition(); 
      		}, 500); 
    	}); 
  	});*/ 
	//dojo.connect(map,"onZoomEnd",actionOnZoomEnd);
	
	imageryPrime = new esri.layers.ArcGISDynamicMapServiceLayer(gis_host, {id : "hatc"});
	/*
	var imageryPrime = new esri.layers.ArcGISTiledMapServiceLayer(gis_host, {
		id : "hatc"
	});
	var scalebar = new esri.dijit.Scalebar({
		map : map,
		scalebarUnit : "metric",
		scalebarStyle : "ruler"
		//attachTo : "bottom-left"
		,attachTo : "top-right"
	},dojo.byId("map"));*/
	buildLayers(imageryPrime);
	map.addLayer(imageryPrime);

	//pop_init();
    map.on("extent-change", updateExtent); 

	//����ά������ʾ������ 
	startTyphoon(dojo.byId('pointText').value);
	typhoonPathLayer = new esri.layers.GraphicsLayer();
	map.addLayer(typhoonPathLayer);
	 //*/
	pGeometryService = new esri.tasks.GeometryService("http://192.168.1.20:6080/arcgis/rest/services/Utilities/Geometry/GeometryServer");
	//�����
	PolygonSymbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_DASHDOT, new dojo.Color([255, 0, 0]), 1), new dojo.Color([255, 255, 0, 0.25]));
}
// ��ʾ��������������˵���
function updateExtent() { 
    //var scaleLevel = map.getLevel();
    var scaleLevel = map.getScale();
    console.log("pre zoom level:" + pre_level +"---Current Zoom level: " + scaleLevel);
/*
    if(pre_level == 6 && scaleLevel == 5) {
    	map.removeLayer(featureLayer_1);
    	map.removeLayer(featureLayer_2);
    	map.removeLayer(featureLayer_3);
    } else if(pre_level == 5 && scaleLevel == 6) {
    	map.addLayers([featureLayer_1, featureLayer_2, featureLayer_3]);
    }
*/
    var defineLevel = 2500000; // ��ʾ������ͼ��Ķ��������
    if(pre_level < defineLevel && scaleLevel >= defineLevel) {
    	map.removeLayer(featureLayer_1);
    	map.removeLayer(featureLayer_2);
    	if(existsFFX){
	    	if(featureLayer_3 != undefined){
		  		map.removeLayer(featureLayer_3);
		  	}
    	}
    } else if(pre_level >= defineLevel && scaleLevel < defineLevel) {
    	if(featureLayer_1 == null) {
    		pop_init();
    	}else {
	    	map.addLayers([featureLayer_1, featureLayer_2]);
	    	if(existsFFX){
	    		initFFXLayer();
    			map.addLayers([featureLayer_3]);
    		}
		}
    }
    pre_level = scaleLevel;
} 

function createToolbar(map) {
	toolbar = new esri.toolbars.Draw(map);
	dojo.connect(toolbar, "onDrawEnd", addToMap);
	//executeDrawLine(null);
	dojo.connect(map, "onMouseDown", showCoordinates);
}

dojo.addOnLoad(init);

// ����ӿڣ����ص����ͼλ�õĻ���id��name
function executePointQuery() {
	toolbar.activate(esri.toolbars.Draw.POINT);

	//return (pointQueryResult);
}

// ����ӿڣ������ṩ�Ļ���id��name�ҵ���Ӧ�ĵ�ͼλ��
function executeAPQuery(searchText) {
	map.setScale(500000);
	//create find task with url to map service
	//          findTask = new esri.tasks.FindTask("http://192.168.6.44:6080/arcgis/rest/services/City/Cities/MapServer");
	findTask = new esri.tasks.FindTask(gis_host);

	//create find parameters and define known values
	findParams = new esri.tasks.FindParameters();
	findParams.returnGeometry = true;
	//          findParams.layerIds = [0,1,2];
	findParams.layerIds = [70];
	//����ͼhatc2��70������ͼhatc��71
	//          findParams.searchFields = ["CITY_NAME","NAME","SYSTEM","STATE_ABBR","STATE_NAME"];
	findParams.searchFields = ["ICAO_CODE", "AD_NAME"];

	//set the search text to find parameters
	findParams.searchText = searchText;
	findTask.execute(findParams, showAPResults);
}

// ����ӿڣ������ͼ���߷��ص㼯��
function executeLine2Pos() {
	toolbar.activate(esri.toolbars.Draw.POLYLINE);

	//console.log(lineDrawResult);
	//return (lineDrawResult);
}

// ����ӿڣ����ݵ㼯���ڵ�ͼ����
/*****style:--
 STYLE_DASH The line is made of dashes.
 STYLE_DASHDOT The line is made of a dash-dot pattern.
 STYLE_DASHDOTDOT The line is made of a dash-dot-dot pattern.
 STYLE_DOT The line is made of dots.
 STYLE_LONGDASH Line is constructed of a series of dashes. (As of v3.4)
 STYLE_LONGDASHDOT Line is constructed of a series of short dashes. (As of v3.4)
 STYLE_NULL The line has no symbol.
 STYLE_SHORTDASH Line is constructed of a series of short dashes. (As of v3.4)
 STYLE_SHORTDASHDOT Line is constructed of a dash followed by a dot. (As of v3.4)
 STYLE_SHORTDASHDOTDOT None
 STYLE_SHORTDOT Line is constructed of a series of short dots. (As of v3.4)
 STYLE_SOLID The line is solid.
 ***** color:--
 R, G, B: new dojo.Color([255,0,0])
 R,G,B,A. The "A" value represents transparency where 0.0 is fully transparent and 1.0 has no transparency: new dojo.Color([255,0,0,0.25])
 Hex string: new dojo.Color("#C0C0C0")
 Named string: new dojo.Color("blue")
 ***** width:--
 Width of line symbol in pixels, Default value: 1
 planHeight: �ƻ��еĺ��и߶� 
 */
function executeDrawLine(points, style, color, width, planHeight, lineType) {
	clearShGraphics(lineType);
	//var myJsonStr = '{"points":' + points + ',"spatialReference":({"wkid":4326})}';
	var myJsonStr = '{"points":' + points + '}';
	console.log(myJsonStr);
	//var mpJson ={"points":[[107.51365018929151, 36.68439768107339], [108.61248415359654, 36.739339379288644], [108.48146933477555, 35.927892759494156]],"spatialReference":({" wkid":4326 })};
	mpJson = JSON.parse(myJsonStr);
	//var mpJson = eval(myJsonStr);
	var multipoint = new esri.geometry.Multipoint(mpJson);
	polyline = new esri.geometry.Polyline(map.spatialReference);
	polyline.addPath(multipoint.points);
	//	var polygonGraphic = new esri.Graphic(polyline, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_DASH, new dojo.Color([255, 0, 0]), 1), {
	//		keeper : true
	//	});
	var polygonGraphic = new esri.Graphic(polyline, new esri.symbol.SimpleLineSymbol(style, new dojo.Color(color), width));
	infoTemplate = new esri.InfoTemplate("����", "��������");
	polygonGraphic.setInfoTemplate(infoTemplate);
	map.graphics.add(polygonGraphic);
	//���ߵ�ͬʱ,���ҿ����ͻ.
	preserveCross(lineType);
	map.setExtent(polyline.getExtent().expand(1.5));
	//dojo.connect(map.graphics, "onMouseOver", showTooltip);
	//dojo.connect(map.graphics, "onMouseOut", closeDialog);
/*
	// ��������ѯ
	var params = new esri.tasks.BufferParameters();
	params.distances = [0.03];
    //params.unit = esri.tasks.GeometryService.UNIT_KILOMETER;
	params.outSpatialReference = map.spatialReference;
	params.bufferSpatialReference = map.spatialReference; //new esri.SpatialReference(4326);
	params.geometries = [polyline];
	pGeometryService.buffer(params, buffsuc, function() {
		alert("����")
	});
*/
//	doGetSamples(polyline, planHeight);
	return (polygonGraphic);
}

/*����ӿ�,���ݲ�����ָ���㲿��Ԫ�ؽ�����˸.
 *����1:���ĸ�ͼ����˸
 *����2����ЩԪ����˸.
*/

function flickerElements(chartParam,elementParam){
	//create find task with url to map service
	findTask = new esri.tasks.FindTask(gis_host);

	//create find parameters and define known values
	findParams = new esri.tasks.FindParameters();
	findParams.returnGeometry = true;
	//          findParams.layerIds = [0,1,2];
	findParams.layerIds = [70];
	//����ͼhatc2��70������ͼhatc��71
	//          findParams.searchFields = ["CITY_NAME","NAME","SYSTEM","STATE_ABBR","STATE_NAME"];
	findParams.searchFields = ["ICAO_CODE", "AD_NAME"];

	//set the search text to find parameters
	findParams.searchText = searchText;
	findTask.execute(findParams, showAPResults);
}


// ��������ѯ�ص�
function buffsuc(geometries) {
	if (geometries.length > 0) {
		dojo.forEach(geometries, function(element, index) {
			var graphic = new esri.Graphic(element, PolygonSymbol);
			map.graphics.add(graphic);

		});
		IdentifyQuery(geometries[0]);
		//dojo.connect(map.graphics, "onMouseOver", showTooltip);
		//dojo.connect(map.graphics, "onMouseOut", closeDialog);
	} else {
		alert("û�м����壡");
	}
}

function IdentifyQuery(geometry) {
	var params = new esri.tasks.IdentifyParameters();
	params.tolerance = 5;
	params.returnGeometry = true;
	params.layerIds = [70, 71, 75, 76];
	//params.layerIds = [76];
	params.layerOption = esri.tasks.IdentifyParameters.LAYER_OPTION_ALL;
	params.width = map.width;
	params.height = map.height;
	params.geometry = geometry;
	params.mapExtent = map.extent;
    var IdentifyTask = new esri.tasks.IdentifyTask(gis_host);
	IdentifyTask.execute(params, function(idResults) {
		if (idResults.length > 0) {
            var PointSymbol = new esri.symbol.SimpleMarkerSymbol();
			var lineSymbol = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_DASH, new dojo.Color([255, 0, 0]), 1);
			var polygonSymbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_NONE, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_DASHDOT, new dojo.Color([255, 0, 0]), 2), new dojo.Color([255, 255, 0, 0.25]));

                PointSymbol.style = esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE;
                PointSymbol.setSize(12);
                PointSymbol.setColor(new dojo.Color("#FFFFCC"));
			//var htmls = "<table style=\"width: 100%\">";
			//htmls = htmls + "<tr bgcolor=\"#E0E0E0\"><td>ͼ��</td><td>����</td></tr>";

			for (var i = 0; i < idResults.length; i++) {
				var result = idResults[i];
				var graphic = result.feature;
/*
				var namevalue = result.feature.attributes["name"];
				if (namevalue == null)
					namevalue = result.feature.attributes["NAME"];
				if (i % 2 == 1) {
					htmls = htmls + "<tr bgcolor=\"#E0E0E0\"><td>" + result.layerName + "</td><td>" + namevalue + "</td></tr>";
				} else {
					htmls = htmls + "<tr><td>" + result.layerName + "</td><td>" + namevalue + "</td></tr>";
				}
*/
				switch (graphic.geometry.type) {
					case "point":
						var template = new esri.InfoTemplate();
						template.setTitle(getTextTitle);
						template.setContent(getWindowContent);
						//graphic.setSymbol(PointSymbol);
						graphic.setInfoTemplate(template);
						break;
					case "polyline":
						graphic.setSymbol(lineSymbol);
						break;
					case "polygon":
						graphic.setSymbol(polygonSymbol);
						break;
				}
				map.graphics.add(graphic);
			}
			//htmls = htmls + "</table>";
			//document.getElementById("divShowResult").innerHTML = htmls;
		} else {
			//document.getElementById("divShowResult").innerHTML = "";
		}
	});
}

// ����ӿڣ����ͼ�����л���or�㣬ȡ��ѡ��
function clearGraphic(g) {
	map.graphics.remove(g);
}

// ����ӿڣ����ͼ�����л���or�㣬ȡ��ѡ��
function clearDraw() {
	map.graphics.clear();
	toolbar.deactivate();
}

// ����ӿڣ����ص�ͼ���Ź�����
function hideZoomSlider() {
	map.hideZoomSlider();
}

// ����ӿڣ���ʾ��ͼ���Ź�����
function showZoomSlider() {
	map.showZoomSlider();
}

// ����ӿڣ��ж�����������
function judgeLineInterSects(points) {
	executeDrawLine(points);
	var queryTask = new esri.tasks.QueryTask(gis_host + "/101");
	// Query
	var query = new esri.tasks.Query();
	query.geometry = polyline;
	query.returnGeometry = true;
	query.outFields = ["AS_CODE", "AS_NAME", "AS_TOP_ALT", "AS_BOT_ALT", "AS_TYPE"];
	//query.outSpatialReference = {"wkid":102100};
	query.spatialRelationship = esri.tasks.Query.SPATIAL_REL_INTERSECTS;
	queryTask.execute(query, function(results) {
		var s;
		for (var i = 0, il = results.features.length; i < il; i++) {
			s = "";
			var featureAttributes = results.features[i].attributes;
			for (att in featureAttributes) {
				s = s + att + ":  " + featureAttributes[att] + ";";
			}
			console.log(s);
		}
		//dojo.byId("info").innerHTML = s;
	});
}

/**
 * 111(����),113(������),105(Σ����)
 * ��Ҫ���⼸�����л�ȡ������:
 * ���ݴ������ĵ�����,�ж��Ƿ�Խ����������.
 * ����������������,�򷵻ش������ļ������� ����˸���߱�ɫ����ʾ.
*/
//��ǰΪ��ѯ�������÷���.��ʱ��ͼ��Ӧ���к���,����ҳ��ᱨ��,Ŀǰ��ʵ�ָù��ܴ�֮�����о��쳣�ж�.
function preserveCross(lineType){
	var layerId = getLayerId("T_PA"); 
	var queryTask = new esri.tasks.QueryTask(gis_host + "/" + layerId);
	var str;//[{name:'',code:''},{}...]
	// Query
	var query = new esri.tasks.Query();
	query.geometry = polyline;
	query.returnGeometry = true;
	//query.outFields = ["PA_CODE ", "PA_NAME", "PA_ID"];
	query.outFields = ["PA_CODE "];
	//query.outSpatialReference = {"wkid":102100};
	query.spatialRelationship = esri.tasks.Query.SPATIAL_REL_INTERSECTS;
	removeAreaSpaceConflictData('rs_as',lineType);
	queryTask.execute(query, function(results) {
		var s = "";
		for (var i = 0, il = results.features.length; i < il; i++) {
			var featureAttributes = results.features[i].attributes;
			if(s){
				s+= ";";
			}
			for (att in featureAttributes) {
				s += featureAttributes[att] ;
			}
			/* �ڲ�ѯ���������ҳ����˸*/
			var featureAttributes = results.features[i];
			var polygonSymbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_NONE, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_DASHDOT, new dojo.Color([255, 0, 0]), 2), new dojo.Color([255, 255, 0, 0.25]));
			featureAttributes.setSymbol(polygonSymbol);
			featureAttributes.id = shAsPaneGraphicId + lineType;
			winkElement(featureAttributes);
		}
		if(results.features.length > 0 ){
			addAreaSpaceConflictData("rs_as",lineType,s);
		}
	});
}

// ��ʾ�������Ʋ�ѯ���Ļ�����Ϣ
function showAPResults(results) {
	//symbology for graphics
	var markerSymbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_SQUARE, 15, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 0, 0]), 1), new dojo.Color([0, 255, 0, 0.25]));
	//var lineSymbol = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_DASH, new dojo.Color([255, 0, 0]), 1);
	var lineSymbol = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 0, 0]), 3);

	var polygonSymbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_NONE, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_DASHDOT, new dojo.Color([255, 0, 0]), 2), new dojo.Color([255, 255, 0, 0.25]));

	//find results return an array of findResult.
	//map.graphics.clear();
	var points = new esri.geometry.Multipoint(map.spatialReference);
	//dataForGrid = [];

	//Build an array of attribute information and add each found graphic to the map
	dojo.forEach(results, function(result) {
		var graphic = result.feature;
		
		//dataForGrid.push([result.layerName,result.foundFieldName,result.value]);
		switch (graphic.geometry.type) {
			case "point":
				graphic.setSymbol(markerSymbol);
				points.addPoint(result.feature.geometry);
				//geomTask = graphic; // Ϊ�˷��ظ�ҳ��ĵ����ߣ���ȫ�ֱ�����Ӧ���и��õİ취
				break;
			case "polyline":
				graphic.setSymbol(lineSymbol);
				break;
			case "polygon":
				graphic.setSymbol(polygonSymbol);
				break;
		}
		winkElement(graphic);
		//dojo.publish("executeAPQuery", graphic);
	});

	//map.setExtent(points.getExtent().expand(3));
	var polyline = new esri.geometry.Polyline(map.spatialReference);
	polyline.addPath(points.points);
	//lineSymbol = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_DASH, new dojo.Color([255,0,0]), 2);
	///polygonGraphic = new esri.Graphic(polyline, lineSymbol, { keeper: true });
	///map.graphics.add(polygonGraphic);

	//var polyLayer = new esri.layers.GraphicsLayer({ id: "poly" });
	//polyLayer.add(polygonGraphic);
	//map.addLayer(polyLayer);
	map.setExtent(polyline.getExtent());
	//polyLayer.setOpacity(1);
}


//��ͼ��˸,��ͼjs�������.
function winkElement(serachGraphic){
	//ͼ����˸����.
	var temp = 0;
	//����ͼ����˸.
	setInterval(function(){
					if(temp == 0){
						serachGraphic.show();
						temp = 1;
						//alert("��ʾ");
					}else{
						serachGraphic.hide();
						temp = 0 ;
						//alert("����");
					}
				},500);
	map.graphics.add(serachGraphic);
}

//��ѯ��Ӧ����,����˸�ý���.
function serachThenWink(searchCondition,type){
	clearShGraphics();
	var layerId = getLayerId("T_PA"); 
	var queryTask = new esri.tasks.QueryTask(gis_host + "/" + layerId);
	var query = new esri.tasks.Query();
	//query.geometry = polyline;
	query.returnGeometry = true;
	//query.outFields = ["PA_CODE ", "PA_NAME", "PA_ID"];
	query.where = "PA_CODE = '" + searchCondition + "'"; 
	var polygonSymbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_NONE, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_DASHDOT, new dojo.Color([255, 0, 0]), 2), new dojo.Color([255, 255, 0, 0.25]));
	queryTask.execute(query, function(results) {
		for (var i = 0, il = results.features.length; i < il; i++) {
			var featureAttributes = results.features[i];
			featureAttributes.setSymbol(polygonSymbol);
			featureAttributes.id = shAsPaneGraphicId ;
			winkElement(featureAttributes);
		}
	});
}
// ���ݵ�����
function executePointQueryTask(geometry) {
	//build query task
	queryTask = new esri.tasks.QueryTask(gis_host + "/70");

	//Can listen for onComplete event to process results or can use the callback option in the queryTask.execute method.
	//dojo.connect(queryTask, "onComplete", showResults);

	//build query filter
	query = new esri.tasks.Query();
	query.returnGeometry = true;
	query.outFields = ["ICAO_CODE", "AD_NAME"];
	//When the user clicks on a map, the onClick event returns the event point where the user clicked. The event contains mapPoint (esri.geometry.Point)
	//query.geometry = map.extent.centerAt(geometry).expand(0.1);
	query.geometry = pointToExtent(map, geometry, 50);
	//Execute task
	queryTask.execute(query, showPointMapResults);
}

function showPointMapResults(featureSet) {
	//remove all graphics on the maps graphics layer
	map.graphics.clear();

	var features = featureSet.features;

	//QueryTask returns a featureSet.  Loop through features in the featureSet and add them to the map.
	for (var i = 0, il = features.length; i < il; i++) {
		//Get the current feature from the featureSet.
		//Feature is a graphic
		var graphic = features[0];
		pointQueryResult = graphic.attributes;
		/*
		gislog('searchText', pointQueryResult.ICAO_CODE);
		graphic.setSymbol(symbol);
		 //Set the infoTemplate.
		 graphic.setInfoTemplate(infoTemplate);

		 //Add graphic to the map graphics layer.
		 map.graphics.add(graphic);
		 */
	}
}

function addToMap(geometry) {
	switch (geometry.type) {
		case "point":
			var symbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_SQUARE, 50, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 0, 0]), 1), new dojo.Color([0, 255, 0, 0.25]));
			executePointQueryTask(geometry);
			break;
		case "polyline":
			var symbol = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_DASH, new dojo.Color([255, 0, 0]), 1);
			lineDrawResult = geometry.paths;
			gislog('pointText', lineDrawResult);
			//console.log(lineDrawResult);
			break;
		case "polygon":
			var symbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_NONE, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_DASHDOT, new dojo.Color([255, 0, 0]), 2), new dojo.Color([255, 255, 0, 0.25]));
			break;
		case "extent":
			var symbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_NONE, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_DASHDOT, new dojo.Color([255, 0, 0]), 2), new dojo.Color([255, 255, 0, 0.25]));
			break;
		case "multipoint":
			var symbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_DIAMOND, 20, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([0, 0, 0]), 1), new dojo.Color([255, 255, 0, 0.5]));
			break;
	}
	var graphic = new esri.Graphic(geometry, symbol);
	//var json = geometry.toJson();
	//console.log(json);
	map.graphics.add(graphic);
	//dojo.publish("executeAPQuery", graphic);
}

function showCoordinates(evt) {
	//get mapPoint from event
	var mp = evt.mapPoint;
	//display mouse coordinates
	dojo.byId("info").innerHTML = mp.x + ", " + mp.y;
	/*
	longitude = mp.x;
	latitude = mp.y;
	alert(longitude+","+latitude);*/
}

function pop_init() {
	var template = new esri.InfoTemplate();
	template.setTitle(getTextTitle);
	template.setContent(getTextContent);

	var featureLayer1 = new esri.layers.FeatureLayer(gis_host + "/70", { //("����")
		mode : esri.layers.FeatureLayer.MODE_ONDEMAND,
		//mode : esri.layers.FeatureLayer.MODE_SELECTION,
		infoTemplate : template,
		outFields : ["*"]
	});
	featureLayer_1 = map.addLayer(featureLayer1);
	dojo.connect(featureLayer1, "onMouseOver", showTooltip); 
	dojo.connect(featureLayer1, "onMouseOut", closeDialog);

	var featureLayer2 = new esri.layers.FeatureLayer(gis_host + "/75", { //("����̨")
		mode : esri.layers.FeatureLayer.MODE_ONDEMAND,
		//mode : esri.layers.FeatureLayer.MODE_SELECTION,
		infoTemplate : template,
		outFields : ["*"]
	});
	featureLayer_2 = map.addLayer(featureLayer2);
	dojo.connect(featureLayer2, "onMouseOver", showTooltip); 
	dojo.connect(featureLayer2, "onMouseOut", closeDialog);
/*
	var featureLayer3 = new esri.layers.FeatureLayer(gis_host + "/71", { //("�ر��")
		mode : esri.layers.FeatureLayer.MODE_ONDEMAND,
		//mode : esri.layers.FeatureLayer.MODE_SELECTION,
		infoTemplate : template,
		outFields : ["*"]
	});
	featureLayer_3 = map.addLayer(featureLayer3);
	dojo.connect(featureLayer3, "onMouseOver", showTooltip); 
	dojo.connect(featureLayer3, "onMouseOut", closeDialog);*/
	/*
	 dojo.connect(map, "onClick", function(evt) {
	 var query = new esri.tasks.Query();
	 query.geometry = pointToExtent(map, evt.mapPoint, 10);
	 var deferred = featureLayer.selectFeatures(query, esri.layers.FeatureLayer.SELECTION_NEW);
	 map.infoWindow.setFeatures([deferred]);
	 map.infoWindow.show(evt.mapPoint);
	 });
	 map.infoWindow.resize(180, 275);
	 */
}

function getTextTitle(graphic) {
	closeDialog();
	var content;
	if (graphic.getLayer().layerId == 70) {
		content = graphic.attributes.AD_NAME;
	} else if (graphic.getLayer().layerId == 75) {
		content = graphic.attributes.NV_NAME;
	} else if (graphic.getLayer().layerId == 71) {
		content = graphic.attributes.FX_CODE;
	}
	return content;
}

//�����������̨�ر��ʱ��ʾ������.
//������ʾ������Ϣ,��Ŀǰ��ʾpdf������,���ֻ��ʾ����ͼ��ͼƬ.
//����̨�ر���ṩ����Ϣ��ȫ,��ʱ��Ϊexampleʱ������.����ȫȷ������.
//����ǰ��ͼ��Ŀǰ��Ӧ����ȫ��ȷ,��ͼƬ���������������һһ��Ӧ.
function getTextContent(graphic) {
	closeDialog();
	var content = "<div style='text-align:left;font-size:20px;font-weight:bold'>";
	var adType,icao_code,nodeName,pos;
	if (graphic.getLayer().layerId == 70) {//������ʾ��Ϣ.
		adType = 'AD';//����ʱ��ΪAD.
		//attachType = 'AP';//������Ϊ���ֺ���(AP)�����г������(FP)���������ͼ(DS).
		icao_code = graphic.attributes.ICAO_CODE;//������Ӧ��code.graphic.attributes.ICAO_CODE
		nodeName =  graphic.attributes.AD_NAME;//��������;graphic.attributes.AD_NAME;
		pos = graphic.attributes.AD_ARP_POS;//����
		//content += "<a target='_self' href=http://192.168.18.2:9000/xtms2/images/airport/" + graphic.attributes.ICAO_CODE + "/JCT.pdf><b>��������ͼ</b></a><br/>";
		//content += "<a onclick=controlNode('SAD','"+icao_code+"','"+nodeName+"')><img src='images/gis/1controlNode25.PNG'>��Ϊ��ɻ���</a><br/>";
		//content += "<a onclick=controlNode('TAD','"+icao_code+"','"+nodeName+"')><img src='images/gis/1controlNode25.PNG'>��Ϊ�������</a><br/>";
		content += "<a onclick=showAirPicture('"+adType+"','DS','"+icao_code+"')><img src='images/gis/section.PNG'>�������ͼ</a><br/>";
		content += "<a onclick=showAirPicture('"+adType+"','FP','"+icao_code+"')><img src='images/gis/flyProgram.PNG'>�������г���ͼ</a><br/>";
		content += "<a onclick=showAirPicture('"+adType+"','AP','"+icao_code+"')><img src='images/gis/airportAerial.PNG'>��������ͼ</a><br/>";
	} else if (graphic.getLayer().layerId == 75) {//����̨��ʾ��Ϣ
		//content = graphic.attributes.NV_ID;
		adType = 'NV';//����̨ʱ��ΪNV.
		icao_code = graphic.attributes.NV_CODE;//����̨��Ӧ��code.graphic.attributes.NV_CODE
		nodeName = graphic.attributes.NV_NAME;//����̨��Ӧ������.graphic.attributes.nv_name
		pos = graphic.attributes.NV_POS;//����
		content += "<a onclick=controlNode('18','"+icao_code+"','"+nodeName+"','"+pos+"')><img src='images/gis/skyWayPoint.PNG'>��Ϊ���ߵ�</a><br/>";
		//content += "<a onclick=showAirPicture('"+adType+"','AP','"+icao_code+"')><img src='images/gis/position.PNG'>����̨λ����Ϣ</a><br/>";
		content += "<a onclick=showAirPicture('"+adType+"','AP','"+icao_code+"')><img src='images/gis/navigationAerial.PNG'>����̨����ͼ</a><br/>";
	} else if (graphic.getLayer().layerId == 71) {//�ر����ʾ��Ϣ.
		//content = graphic.attributes.FX_NAME;
		adType = 'FX';//�ر��ʱ��ΪFX.��ʱ����ΪNV
		icao_code = graphic.attributes.FX_CODE;//����̨��Ӧ��code.graphic.attributes.FX_CODE
		nodeName = graphic.attributes.FX_NAME;//����̨��Ӧ������.graphic.attributes.nv_name
		pos = graphic.attributes.FX_POS ;//����
		content += "<a onclick=controlNode('20','"+icao_code+"','"+nodeName+"','"+pos+"')><img src='images/gis/skyWayPoint.PNG'>��Ϊ���ߵ�</a><br/>";
		//content += "<a onclick=showAirPicture('"+adType+"','AP','"+icao_code+"')><img src='images/gis/position.PNG'>�ر��λ����Ϣ</a><br/>";
		content += "<a onclick=showAirPicture('"+adType+"','AP','"+icao_code+"')><img src='images/gis/navigationAerial.PNG'>�ر�㺽��ͼ</a><br/>";
	}
	content += "</div>";
	return content;
	/*
	 var attr = graphic.attributes.qSpecies.replace('"',"");
	 var names=attr.split("::");
	 var commName = dojo.string.trim(names[1].replace('"',""));
	 var hlink = names[0].split(" ");
	 var sciName = hlink[0] + "_" + hlink[1];
	 if(commName == ""){
	 commName = names[0];
	 }
	 return "<b>" + commName + "</b><br /><a target='_blank' href=http://en.wikipedia.org/wiki/" + sciName  +">Wikipedia Entry</a>";
	 */
}

/*����Ϊ�����ϵĵ�
 *typeΪд��������������,valueΪ��Ҫд���ֵ.strΪҳ������ʾ������.
 */
function controlNode(type,value,str,pos){
	var arr = new Array();
	obj = {nvName:str,nvCode:value,nvPos:pos,nvType:type};//�̶���ʽjson.���һ��Ԫ��ȷ���Ƿ�Ϊ��ͼ�������¼�.
	arr.push(obj);
	window.gisWriteNVInfo(arr);
}

/*
function getWindowContent(graphic) {
	//make a tab container
	var tc = new dijit.layout.TabContainer({
		style : "width:100%;height:100%;"
	}, dojo.create("div"));

	//display attribute information
	var cp1 = new dijit.layout.ContentPane({
		title : "����ͼ",
		content : "11111"
	});

	//display a dojo pie chart for the male/female percentage
	var cp2 = new dijit.layout.ContentPane({
		title : "��������ͼ"
	});

	tc.addChild(cp1);
	tc.addChild(cp2);

	//        cp2.set('content', chart.node);
	return tc.domNode;
}
*/
function showTooltip(evt) {
	//$(this).css({cursor:"pointer"});
	dojo.byId("map_container").style.cursor='pointer';
/*	closeDialog();
	var dialog = new dijit.TooltipDialog({
		id : "tooltipDialog",
		content : "<br />�����ʾ�˵�",
		style : "position: absolute; width: 200px; font: normal normal bold 6pt Tahoma;z-index:100"
	});
	dialog.startup();

	dojo.style(dialog.domNode, "opacity", 0.65);
	dijit.placeOnScreen(dialog.domNode, {
		x : evt.pageX,
		y : evt.pageY
	}, ["TL", "BL"], {
		x : 10,
		y : 10
	});*/
}

function closeDialog() {
	dojo.byId("map_container").style.cursor='default';
/*
	var widget = dijit.byId("tooltipDialog");
	if (widget) {
		widget.destroy();
	}*/
}

function pointToExtent(map, point, toleranceInPixel) {
	var pixelWidth = map.extent.getWidth() / map.width;
	var toleraceInMapCoords = toleranceInPixel * pixelWidth;
	return new esri.geometry.Extent(point.x - toleraceInMapCoords, point.y - toleraceInMapCoords, point.x + toleraceInMapCoords, point.y + toleraceInMapCoords, map.spatialReference);
}
		
//��Ҫ����[�������ͣ��������ͣ�ICAO��]
function showAirPicture(adType,attachType,ICAO){
	//hideZoomSlider();
	//map.hidePanArrows();
	//map.hidePanArrows();
	//map.infoWindow.hide();
	var width = parseInt(document.documentElement.clientWidth);
	var height = parseInt(document.documentElement.clientHeight);
	var params = "objectType=" + adType + "&attachmentType=" + attachType + "&ICAO=" + ICAO;
	showDivPDF(width,height,projectName+"/adAction.do?op=getADAttachment&" + params,"frameNaME");
}

function showDivPDF(sD_width,sD_height,sDiv_FrameSrc,sDiv_FrameName){
	var sDwidth = sD_width =='' || sD_width == null ? 300 : sD_width;
	var sDheight =  sD_height =='' || sD_height == null ? 150 : sD_height;
	var sDivFrameSrc = sDiv_FrameSrc;
	var sDivFrameName = sDiv_FrameName =='' || sDiv_FrameName == null ? 'sDiv_iframe' : sDiv_FrameName;

	//��ȡ��Ļ�߶ȺͿ��
	var bWidth = parseInt(document.documentElement.scrollWidth);
	var bHeight = parseInt(document.documentElement.scrollHeight);
	
	//����������ʾdiv
	var sDiv = document.createElement("div");
	sDiv.className = "sDiv";
	sDiv.id="sDiv";
	sDiv.style.zIndex = "99999";
	
	//���õ���div��ʾ��λ��
	var left = (bWidth-sDwidth)/2;
	var top = (bHeight-sDheight)/2 - 130;
	left = 3;
	top = 3;
	sDiv.style.left = left + "px";
	sDiv.style.top = top + "px";
	sDiv.style.position = "absolute";
	
	//���õ���div�ĸ߶ȺͿ��
	sDiv.style.width = sDwidth + "px";
	sDiv.style.height = sDheight + "px";
	
	//��ʽ����
	var sDivContext = document.createElement("div");
	var cDWidth = sDwidth;
	var cDHeight = sDheight;
	
	sDivContext.style.width = cDWidth + "px";
	
	sDivContext.style.height = cDHeight + "px";
	sDiv.appendChild(sDivContext);
	
		//����iframe
		var sDivIframe = document.createElement("iframe");
		sDivIframe.name = sDivFrameName;
		sDivIframe.style.width = cDWidth + "px";
		sDivIframe.style.height = cDHeight + "px";
		sDivIframe.width = cDWidth + "px";
		sDivIframe.height = cDHeight + "px";
		sDivIframe.style.border = "none";
		sDivIframe.src = sDivFrameSrc;
		sDivContext.appendChild(sDivIframe);
	
		//����Ŀ���뵽body��
		//document.body.appendChild(backDiv);
		document.body.appendChild(sDiv);
		sDiv.focus();
}

function shPane(){
	initContentPane();
	var a = document.getElementById("contentPane").style.display;
	if(a == 'none'){
		document.getElementById("contentPane").style.display = "";
	}else{
		document.getElementById("contentPane").style.display = "none";
	}
	closeInfoWindow();
}
