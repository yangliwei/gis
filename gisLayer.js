
/*��Ҫ��ͼ�㶨��.*/
//��������������ͼ�����
/*
var sJsonStr = [{id:70,showname:'����',name:'AD',childId:[6,7]},
{id:77,showname:'�ϰ���',name:'OB',childId:[38,39]},
{id:76,showname:'����̨',name:'NV',childId:[34,35]},
{id:78,showname:'�����',name:'RP',childId:[46,47]},
{id:71,showname:'һ���ر��',name:'T_FFX',childId:[20,21]},
{id:79,showname:'�����ر��',name:'T_SFX',childId:[52,53]},
{id:80,showname:'�����ر��',name:'T_TFX',childId:[56,57]},
{id:75,showname:'�ļ��ر��',name:'T_FOFX',childId:[28,29]},
{id:73,showname:'�弶�ر��',name:'T_FIFX',childId:[22,23]},
{id:93,showname:'�����ܵ�',name:'T_RW',childId:[66,67]},
{id:91,showname:'��·',name:'T_RO',childId:[64,65]},
{id:92,showname:'����',name:'T_RS',childId:[48,49]},
{id:88,showname:'�������',name:'T_FA',childId:null},
{id:87,showname:'��������',name:'T_CR',childId:null},
{id:96,showname:'ѵ������',name:'T_TR',childId:null},
{id:95,showname:'ת������',name:'T_TP',childId:null},
{id:94,showname:'���볡����',name:'T_SDA',childId:null},
{id:90,showname:'����������',name:'T_IOS',childId:null},
{id:119,showname:'�����鱨��',name:'T_FLCA',childId:[26,27]},
{id:105,showname:'������',name:'T_CICA',childId:[14,15]},
{id:116,showname:'�ն���',name:'T_TCA',childId:[54,55]},
{id:109,showname:'������',name:'T_JCA',childId:[32,33]},
{id:115,showname:'��������',name:'T_SC',childId:[50,51]},
{id:108,showname:'�ȴ�����',name:'T_HL',childId:[30,31]},
{id:104,showname:'��������',name:'T_CCA',childId:[12,13]},
{id:107,showname:'���Ʒ���',name:'T_FCA',childId:[18,19]},
{id:100,showname:'����������',name:'T_ACA',childId:null},
{id:113,showname:'������',name:'T_RA',childId:[42,43]},
{id:106,showname:'Σ����',name:'T_DA',childId:[16,17]},
{id:111,showname:'����',name:'T_PA',childId:[40,41]},
{id:110,showname:'������',name:'T_OA',childId:[36,37]},
{id:101,showname:'���п���',name:'T_AS',childId:[8,9]},
{id:117,showname:'�г�',name:'T_TG',childId:[58,59]}
];
*/
var layerObjects = [{showname:'����',name:'T_AD',childId:null},
{showname:'�ϰ���',name:'T_OB',childId:null},
{showname:'����̨',name:'T_NV',childId:null},
{showname:'�����',name:'T_RP',childId:null},
{showname:'һ���ر��',name:'T_FFX',childId:null},
{showname:'�����ر��',name:'T_SFX',childId:null},
{showname:'�����ر��',name:'T_TFX',childId:null},
{showname:'�ļ��ر��',name:'T_FOFX',childId:null},
{showname:'�弶�ر��',name:'T_FIFX',childId:null},
{showname:'�����ܵ�',name:'T_RW',childId:null},
{showname:'��·',name:'T_RO',childId:null},
{showname:'����',name:'T_RS',childId:null},
{showname:'�������',name:'T_FA',childId:null},
{showname:'��������',name:'T_CR',childId:null},
{showname:'ѵ������',name:'T_TR',childId:null},
{showname:'ת������',name:'T_TP',childId:null},
{showname:'���볡����',name:'T_SDA',childId:null},
{showname:'����������',name:'T_IOS',childId:null},
{showname:'�����鱨��',name:'T_FLCA',childId:null},
{showname:'������',name:'T_CICA',childId:null},
{showname:'�ն���',name:'T_TCA',childId:null},
{showname:'������',name:'T_JCA',childId:null},
{showname:'��������',name:'T_SC',childId:null},
{showname:'�ȴ�����',name:'T_HL',childId:null},
{showname:'��������',name:'T_CCA',childId:null},
{showname:'���Ʒ���',name:'T_FCA',childId:null},
{showname:'����������',name:'T_ACA',childId:null},
{showname:'������',name:'T_RA',childId:null},
{showname:'Σ����',name:'T_DA',childId:null},
{showname:'����',name:'T_PA',childId:null},
{showname:'������',name:'T_OA',childId:null},
{showname:'���п���',name:'T_AS',childId:null},
{showname:'�г�',name:'T_TG',childId:null},
{showname:'����-��',name:'TB_WEATHER_WIND',childId:null},
{showname:'�״���ͼ',name:'T_WEATHER_RADAR',childId:null}
];

/*ҳ���ʼ��ʱ��ͼ��*/
//var commonInitLayer = ['T_AD','T_NV','T_PA','T_DA','T_RA','T_TCA'];

/*ҳ���ʼ��ʱ��ͼ��,����Ա*/
var pilotInitLayer = ['T_AD_ANNOS','T_NV_ANNOS','T_PA','T_DA','T_RA','T_TCA'];

/*ҳ���ʼ��ʱ��ͼ��,�վ�*/
var airmanInitLayer= ['T_AD_ANNOS','T_NV_ANNOS','T_PA','T_DA','T_RA','T_TCA'];

/*ҳ���ͼͼ����п���ʱ��ʾ��ͼ��*/
//var airmanControlLayer = [100,104,105,71,91,92,101,107];
var airmanControlLayer = ['T_FFX','T_RP','T_OB','T_RO','T_RS','T_TG','T_AS','T_JCA','T_SC','T_HL','TB_WEATHER_WIND','T_WEATHER_RADAR'];
/*ҳ���ͼͼ����п���ʱ��ʾ��ͼ��*/
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
  if(role == 3){//�վ�
  	initLayer = airmanInitLayer ; 
  }else{//�ǿվ���ʱ�� ���Ƿ���Աģʽ.
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
  	
  	if(role == 3){//�վ�
  		controlLayer = airmanControlLayer ; 
  	}else{//�ǿվ���ʱ�� ���Ƿ���Աģʽ.
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
	  //����ѡ������ݽ���ɸѡ,����ʾ�����ݸ���json�л�ȡ�����ݽ���ɸѡ����.
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

//ͼ��������ʾͼ��id
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
		var featureLayer3 = new esri.layers.FeatureLayer(gis_host + "/71", { //("�ر��")
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
//�ر�ҳ���е�gis������infowindow;
function closeInfoWindow(){
	map.infoWindow.hide();
}

//���ӵ�ͼ���������.
function hideGraphics(){
	map.graphics.hide();
}

//�������.
//ȥ����˸��ͼ��.���ڿ���ȥ�� ������˸��ͼ��.
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