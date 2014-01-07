
/*重要的图层定义.*/
//控制显隐的所有图层对象
/*
var sJsonStr = [{id:70,showname:'机场',name:'AD',childId:[6,7]},
{id:77,showname:'障碍物',name:'OB',childId:[38,39]},
{id:76,showname:'导航台',name:'NV',childId:[34,35]},
{id:78,showname:'报告点',name:'RP',childId:[46,47]},
{id:71,showname:'一级地标点',name:'T_FFX',childId:[20,21]},
{id:79,showname:'二级地标点',name:'T_SFX',childId:[52,53]},
{id:80,showname:'三级地标点',name:'T_TFX',childId:[56,57]},
{id:75,showname:'四级地标点',name:'T_FOFX',childId:[28,29]},
{id:73,showname:'五级地标点',name:'T_FIFX',childId:[22,23]},
{id:93,showname:'机场跑道',name:'T_RW',childId:[66,67]},
{id:91,showname:'航路',name:'T_RO',childId:[64,65]},
{id:92,showname:'航线',name:'T_RS',childId:[48,49]},
{id:88,showname:'班机航线',name:'T_FA',childId:null},
{id:87,showname:'空中走廊',name:'T_CR',childId:null},
{id:96,showname:'训练航线',name:'T_TR',childId:null},
{id:95,showname:'转场航线',name:'T_TP',childId:null},
{id:94,showname:'进离场航线',name:'T_SDA',childId:null},
{id:90,showname:'进出空域航线',name:'T_IOS',childId:null},
{id:119,showname:'飞行情报区',name:'T_FLCA',childId:[26,27]},
{id:105,showname:'民航区域',name:'T_CICA',childId:[14,15]},
{id:116,showname:'终端区',name:'T_TCA',childId:[54,55]},
{id:109,showname:'进近区',name:'T_JCA',childId:[32,33]},
{id:115,showname:'管制扇区',name:'T_SC',childId:[50,51]},
{id:108,showname:'等待空域',name:'T_HL',childId:[30,31]},
{id:104,showname:'管制区域',name:'T_CCA',childId:[12,13]},
{id:107,showname:'管制分区',name:'T_FCA',childId:[18,19]},
{id:100,showname:'机场管制区',name:'T_ACA',childId:null},
{id:113,showname:'限制区',name:'T_RA',childId:[42,43]},
{id:106,showname:'危险区',name:'T_DA',childId:[16,17]},
{id:111,showname:'禁区',name:'T_PA',childId:[40,41]},
{id:110,showname:'放油区',name:'T_OA',childId:[36,37]},
{id:101,showname:'飞行空域',name:'T_AS',childId:[8,9]},
{id:117,showname:'靶场',name:'T_TG',childId:[58,59]}
];
*/
var layerObjects = [{showname:'机场',name:'T_AD',childId:null},
{showname:'障碍物',name:'T_OB',childId:null},
{showname:'导航台',name:'T_NV',childId:null},
{showname:'报告点',name:'T_RP',childId:null},
{showname:'一级地标点',name:'T_FFX',childId:null},
{showname:'二级地标点',name:'T_SFX',childId:null},
{showname:'三级地标点',name:'T_TFX',childId:null},
{showname:'四级地标点',name:'T_FOFX',childId:null},
{showname:'五级地标点',name:'T_FIFX',childId:null},
{showname:'机场跑道',name:'T_RW',childId:null},
{showname:'航路',name:'T_RO',childId:null},
{showname:'航线',name:'T_RS',childId:null},
{showname:'班机航线',name:'T_FA',childId:null},
{showname:'空中走廊',name:'T_CR',childId:null},
{showname:'训练航线',name:'T_TR',childId:null},
{showname:'转场航线',name:'T_TP',childId:null},
{showname:'进离场航线',name:'T_SDA',childId:null},
{showname:'进出空域航线',name:'T_IOS',childId:null},
{showname:'飞行情报区',name:'T_FLCA',childId:null},
{showname:'民航区域',name:'T_CICA',childId:null},
{showname:'终端区',name:'T_TCA',childId:null},
{showname:'进近区',name:'T_JCA',childId:null},
{showname:'管制扇区',name:'T_SC',childId:null},
{showname:'等待空域',name:'T_HL',childId:null},
{showname:'管制区域',name:'T_CCA',childId:null},
{showname:'管制分区',name:'T_FCA',childId:null},
{showname:'机场管制区',name:'T_ACA',childId:null},
{showname:'限制区',name:'T_RA',childId:null},
{showname:'危险区',name:'T_DA',childId:null},
{showname:'禁区',name:'T_PA',childId:null},
{showname:'放油区',name:'T_OA',childId:null},
{showname:'飞行空域',name:'T_AS',childId:null},
{showname:'靶场',name:'T_TG',childId:null},
{showname:'气象-风',name:'TB_WEATHER_WIND',childId:null},
{showname:'雷达云图',name:'T_WEATHER_RADAR',childId:null}
];

/*页面初始化时的图层*/
//var commonInitLayer = ['T_AD','T_NV','T_PA','T_DA','T_RA','T_TCA'];

/*页面初始化时的图层,飞行员*/
var pilotInitLayer = ['T_AD_ANNOS','T_NV_ANNOS','T_PA','T_DA','T_RA','T_TCA'];

/*页面初始化时的图层,空军*/
var airmanInitLayer= ['T_AD_ANNOS','T_NV_ANNOS','T_PA','T_DA','T_RA','T_TCA'];

/*页面地图图层进行控制时显示的图层*/
//var airmanControlLayer = [100,104,105,71,91,92,101,107];
var airmanControlLayer = ['T_FFX','T_RP','T_OB','T_RO','T_RS','T_TG','T_AS','T_JCA','T_SC','T_HL','TB_WEATHER_WIND','T_WEATHER_RADAR'];
/*页面地图图层进行控制时显示的图层*/
var pilotControlLayer = ['T_FFX','T_RP','T_OB','T_RO','T_RS','T_TG','T_JCA','T_SC','T_HL','TB_WEATHER_WIND','T_WEATHER_RADAR'];
var initLayer ,visible = [] ,existsFFX = false;

function buildLayers(alllayer){
	if (alllayer.loaded) {
      loadInitLayers();
    } else {
      dojo.connect(alllayer, "onLoad", loadInitLayers);
    }
}

function loadInitLayers(){
	initLayers();
	setVisibleLayerIds();
}

function initLayers() {
  var role ;
  if(document.getElementById("userroleuicode") != null){
  	role = document.getElementById("userroleuicode").value;
  }
  if(role == 3){//空军
  	initLayer = airmanInitLayer ; 
  }else{//非空军的时候 都是飞行员模式.
  	initLayer = pilotInitLayer ; 
  }
  var items = dojo.map(imageryPrime.layerInfos,function(info,index){
  		dojo.forEach(initLayer,function(layerName){
  			if(info.name == layerName || layerName + "_ANNOS" == info.name){
  				visible.push(info.id);
  			}
  		});
  });
}

function initContentPane(){
  	var panecontent = dojo.byId("contentPane").innerHTML;
  	var role ;
	if(document.getElementById("userroleuicode") != null){
	    role = document.getElementById("userroleuicode").value;
	}
  	var controlLayer, infoTempId , infoTempName;
  	
  	if(role == 3){//空军
  		controlLayer = airmanControlLayer ; 
  	}else{//非空军的时候 都是飞行员模式.
  		controlLayer = pilotControlLayer ; 
  	}
  	if(panecontent.trim().length == 0){
  		var items = dojo.map(controlLayer,function(info){
  			infoTempId = getLayerId(info);
  			infoTempName = getLayerName(info) ;
  			return "<input type='checkbox' class='list_item' ' id='" + infoTempId + "' code = '"+info+"' onclick='updateLayerVisibility();' /><label for='" + infoTempId + "'>" + infoTempName + "</label><br/>";
  		});
  		dojo.byId("contentPane").innerHTML = items.join(' ');
  	}
}

function updateLayerVisibility() {
	  var inputs = dojo.query(".list_item"), input;
	  visible = [];
	  existsFFX = false ;
	  initLayers();
	  //根据选择的数据进行筛选,不显示的数据根据json中获取的数据进行筛选过滤.
	  dojo.forEach(inputs,function(input){
	    if (input.checked) {
			if("T_FFX" == input.attributes.code.nodeValue){
				existsFFX = true ;
				var scaleLevel = map.getScale();
				var defineLevel = 2500000;
				
				if(scaleLevel < defineLevel){
					initFFXLayer();
					map.addLayers([featureLayer_3]);
				}
				visible.push(getLayerId(input.attributes.code.nodeValue +"_ANNOS"));
			}else{
				dojo.forEach(imageryPrime.layerInfos,function(info){
					if(input.attributes.code.nodeValue +"_ANNOS" == info.name || input.attributes.code.nodeValue == info.name){
						visible.push(info.id);
					}
				});
			}
	    }
	  });
	  //if there aren't any layers visible set the array to be -1
	  if(visible.length === 0){
	    visible.push(-1);
	  }
	  if(!existsFFX){
	  	if(featureLayer_3 != undefined){
	  		map.removeLayer(featureLayer_3);
	  	}
	  }
	  setVisibleLayerIds();
}

//图层增加显示图层id
function setVisibleLayerIds(){
	imageryPrime.setVisibleLayers(visible);
}

function getLayerId(layerName){
	var layerId ;
	dojo.forEach(imageryPrime.layerInfos,function(info){
		if(layerName == info.name){
			layerId = info.id;
		}
	});
	return layerId ;
}

function getLayerName(layerName){
	var layerShowName;
	dojo.forEach(layerObjects,function(jsonStr){
		if(jsonStr.name == layerName){
			layerShowName = jsonStr.showname;
		}
	});
	return layerShowName;
}

function initFFXLayer(){
	if(featureLayer_3 == undefined || featureLayer_3 == null){
		var template = new esri.InfoTemplate();
		template.setTitle(getTextTitle);
		template.setContent(getTextContent);
		var featureLayer3 = new esri.layers.FeatureLayer(gis_host + "/71", { //("地标点")
			mode : esri.layers.FeatureLayer.MODE_ONDEMAND,
			//mode : esri.layers.FeatureLayer.MODE_SELECTION,
			infoTemplate : template,
			outFields : ["*"]
		});
		featureLayer_3 = map.addLayer(featureLayer3);
		dojo.connect(featureLayer3, "onMouseOver", showTooltip);
		dojo.connect(featureLayer3, "onMouseOut", closeDialog);
	}
}
//关闭页面中的gis弹出的infowindow;
function closeInfoWindow(){
	map.infoWindow.hide();
}

//增加的图层进行隐藏.
function hideGraphics(){
	map.graphics.hide();
}

//对外调用.
//去除闪烁的图层.现在可以去除 禁区闪烁的图层.
function clearShGraphics(lineType){
	var mapGraphic = map.graphics.graphics;
	if(mapGraphic){
		for(var i = map.graphics.graphics.length -1 ; i >=0 ;i--){
			if(mapGraphic[i]){
				if(lineType){
					if(mapGraphic[i].id == "shAsPane" + lineType){
						map.graphics.remove(mapGraphic[i]);
					}
				}else{
					if(mapGraphic[i].id == "shAsPane1" || mapGraphic[i].id == "shAsPane0"){
						map.graphics.remove(mapGraphic[i]);
					}
				}
			}
		}
	}
}