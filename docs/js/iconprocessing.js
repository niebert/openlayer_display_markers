// OpenLayers Derivative Work http://openlayers.org/
// -------------------------------------------------
// This library is based on the Open Layers Example of Icon Symbolizer
// see Icon Symbolizer: http://openlayers.org/en/latest/examples/icon.html
// Adaption by source by: Engelbert Niehaus
// repository https://www.github.com/niebert/openlayers_viewicons


      var iconStyle = new ol.style.Style({
        image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
          anchor: [0.5, 46],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          src: vIconURL
        }))
      });
 	
 	 var iconFeatureArray = [];
		
	var vIconImage = new ol.style.Icon(/** @type {olx.style.IconOptions} */ 
			({
          		anchor: [0.5, 46],
          		anchorXUnits: 'fraction',
          		anchorYUnits: 'pixels',
          		src: vIconURL
        	})
        );
        	
      for (var i = 0; i < vIconArray.length; i++) {
          var iconRecord = new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.transform(vIconArray[i].geolocation, 'EPSG:4326', 'EPSG:3857')),
            name: vIconArray[i].name 
          });
          var vIconStyle = new ol.style.Style({
       		 image: vIconImage
      	   });
 	      iconRecord.setStyle(vIconStyle)
          iconFeatureArray.push(iconRecord);
      }
      
  	  // Create a c
      var vectorSource = new ol.source.Vector({
        features: iconFeatureArray
      });

      var vectorLayer = new ol.layer.Vector({
        source: vectorSource
      });

		
	  var osm_default =  new ol.layer.Tile({
    	source: new ol.source.OSM()
      });
         
	  // Create Map with OSM Layer osm_default
      var map = new ol.Map({
        layers: [osm_default,vectorLayer],
        target: document.getElementById('map'),
        view: new ol.View({
          center: ol.proj.transform(vMapCenter, 'EPSG:4326', 'EPSG:3857'),
          zoom: vZoom
        })
      });
      var element = document.getElementById('popup');

      var popup = new ol.Overlay({
        element: element,
        positioning: 'bottom-center',
        stopEvent: false,
        offset: [0, -50]
      });
      map.addOverlay(popup);
      
      var vFeature;

      // display popup on click
      map.on('click', function(evt) {
        var feature = map.forEachFeatureAtPixel(evt.pixel,
            function(feature) {
              return feature;
            });
        if (feature) {
          vFeature = feature;
          $(element).popover('destroy');
          popup.setPosition(undefined);
          var coordinates = feature.getGeometry().getCoordinates();
          popup.setPosition(coordinates);
          //setPopupContent(feature);
          setTimeout("setPopupContent(vFeature)",200);
          console.log("Click: "+feature.get('name'));
          //alert(document.getElementById("popup").innerHTML)
        } else {
          $(element).popover('destroy');
 	      popup.setPosition(undefined);
        }
      });
	
	function setPopupContent(feature) {
		$(element).popover({
            'placement': 'top',
            'html': true,
            'content': feature.get('name')
          });
          //alert("Test1");
          $(element).popover('show');          
	}

      // change mouse cursor when over marker
      map.on('pointermove', function(e) {
        if (e.dragging) {
          $(element).popover('destroy');
          return;
        }
        var pixel = map.getEventPixel(e.originalEvent);
        var hit = map.hasFeatureAtPixel(pixel);
        map.getTarget().style.cursor = hit ? 'pointer' : '';
      });
