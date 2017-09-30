  function el(id) {
	return document.getElementById(id);
  };
  //---- Evaluate Link Paramaters ----
  var vLinkParam = new LinkParam();
  vLinkParam.init(document);
  
  // load geoloaction from LinkParameter if available
  if (vLinkParam.exists("mapcenter")) {
	// Callback performed with LinkParameter mapcenter 
	// e.g. index.html?geolocation=-12.213,65.123
	//el("mymapcenter").value = vLinkParam.getValue("mapcenter");
  };
  if (vLinkParam.exists("zoom")) {
	// Callback performed with LinkParameter zoom
	// e.g. index.html?zoom=12 
	//el("myzoom").value = vLinkParam.getValue("zoom");
  };
  if (vLinkParam.exists("jsondata")) {
	// Callback performed with LinkParameter jsondata
	// e.g. index.html?zoom=12 
	// el("myjsondata").value = vLinkParam.getValue("jsondata");
  };
 