var pvcnv1 = document.getElementById("preview1");
var pvcnv2 = document.getElementById("preview2");
var pvcnv3 = document.getElementById("preview3");
var pvcnv4 = document.getElementById("preview4");

var pv1 = new jsGraphics(pvcnv1);
var pv2= new jsGraphics(pvcnv2);
var pv3 = new jsGraphics(pvcnv3);
var pv4 = new jsGraphics(pvcnv4);

var cnv1 = document.getElementById("SignCanvas1");
var cnv2 = document.getElementById("SignCanvas2");
var cnv3 = document.getElementById("SignCanvas3");
var cnv4 = document.getElementById("SignCanvas4");

var jg1 = new jsGraphics(cnv1);
var jg2 = new jsGraphics(cnv2);
var jg3 = new jsGraphics(cnv3);
var jg4 = new jsGraphics(cnv4);

var cnvLeft = 0;
var cnvTop = 0;
var cnvLeft1 = parseInt(cnv1.style.left); 	
var cnvTop1 = parseInt(cnv1.style.top);
var cnvLeft2 = parseInt(cnv2.style.left); 	
var cnvTop2 = parseInt(cnv2.style.top);
var cnvLeft3 = parseInt(cnv3.style.left); 	
var cnvTop3 = parseInt(cnv3.style.top);
var cnvLeft4 = parseInt(cnv4.style.left); 	
var cnvTop4 = parseInt(cnv4.style.top);

var StrokeColor = "black";
var StrokeThickness = 2;
var x0 = 0;
var y0 = 0;

jg1.setPrintable(true);
jg2.setPrintable(true);
jg3.setPrintable(true);
jg4.setPrintable(true);

var SubmitData1 = new Array();
var SubmitData2 = new Array();
var SubmitData3 = new Array();
var SubmitData4 = new Array();

var DrawData1  = new Array();
var DrawData2  = new Array();
var DrawData3  = new Array();
var DrawData4  = new Array();

var TempData1 = new Array();
var TempData2 = new Array();
var TempData3 = new Array();
var TempData4 = new Array();


var MouseDown = false;

function SetMouseDown(){
	MouseDown = true;
}
function SetMouseUp(){
	MouseDown = false;
}

var DrawSwitch = false;

function SetDrawOn(){
	DrawSwitch = true;
}
function SetDrawOff(){
	DrawSwitch  = false;
}
var FreehandSwitch = true;
var DrawTool = "Freehand";
function RoundTo(n, d){
	//rounds n to the nearest d
	var i = Math.round(n/d) * d;
	return i;
}

var canvas = "";
var jg = "";
var pv = "";
var pvcanvas = "";
function SetStart(cnv){
	if (cnv == 'SignCanvas1'){
		cnvLeft = cnvLeft1;
		cnvTop = cnvTop1;
		canvas = cnv1;
		pvcanvas = pvcnv1;
		jg = jg1;
		pv = pv1;
	} else if (cnv == "SignCanvas2"){
		cnvLeft = cnvLeft2;
		cnvTop = cnvTop2;
		canvas = cnv2;
		pvcanvas = pvcnv2;
		jg = jg2;
		pv = pv2;
	} else if (cnv == "SignCanvas3"){
		cnvLeft = cnvLeft3;
		cnvTop = cnvTop3;
		canvas = cnv3;
		pvcanvas = pvcnv3;
		jg = jg3;
		pv = pv3;
	} else if (cnv == "SignCanvas4"){
		cnvLeft = cnvLeft4;
		cnvTop = cnvTop4;
		canvas = cnv4;
		pvcanvas = pvcnv4;
		jg = jg4;
		pv = pv4;
	}
	
	switch (canvas.parentNode.id) {
		case 'page2':
			var pageOffset = 971;
			break;
		case 'page3':
			var pageOffset = 971*2;
			break;
		case 'page4':
			var pageOffset = 971*3;
			break;
		case 'page5':
			var pageOffset = 971*4;
			break;
		default:
			var pageOffset = 0;
	}
		x0 = (mousex - cnvLeft);
		y0 = (mousey - cnvTop - pageOffset);	

}

var Xposition = new Array();
var Yposition = new Array();

function GetXY(x,y){
var t = StrokeThickness;
var l = Xposition.length - 1;	//l = last position
var h = Math.sqrt(Math.pow((Xposition[l] - x),2)+Math.pow((Yposition[l] - y),2)) //calc hypotenuse
	if(Xposition.length<2){
		Xposition.push(x);
		Yposition.push(y);
	}
	else {
		if (h>t){
			Xposition.push(x);
			Yposition.push(y);
		}
	}
}
function ClearXY(){
	Xposition = [];
	Yposition = [];
}
function ArrToStr(Arr,s){
	//convert array values to string
	var Str = "";
	for (n = 0; (n < Arr.length); n++)
	 {
		if (n > 0)
		{
			Str += s; // each set of data separated by s
		}
		Str += Arr[n];
	}
 	return Str;
}
function StrToArr(Str,s){
	//converts string to an array
	var Arr  = Str.split(s);
	for (n=0;n<Arr.length;n++){
		Arr[n] = parseInt(Arr[n]);
	}
	return Arr;
}
function AddFreehand(pv,x,y,StrokeColor){
		var X = Xposition;
		var Y = Yposition;
		pv.setColor(StrokeColor);
		pv.setStroke(StrokeThickness);
		if (X.length>1){
			var a = X.length - 2;
			var b = a + 1;
			var x1 = parseInt(X[a]);
			var y1 = parseInt(Y[a]);
			//var x2 = parseInt(X[b]);
			//var y2 = parseInt(Y[b]);
			pv.drawLine(x1,y1,x,y);
			pv.paint();
		}
}

function DrawFreehand(jg,X,Y,StrokeColor){

	jg.setColor(StrokeColor);
	jg.setStroke(StrokeThickness);
	jg.drawPolyline(X,Y);
	jg.paint();

	//store parameters in an array
	var StrX = ArrToStr(X,':');
	var StrY = ArrToStr(Y,':');
	var Parameter = "Freehand" + "|" +  StrX + "|" + StrY + "|" + StrokeColor + "|" + canvas.id ;
	if (jg == jg1){
		DrawData1.push(Parameter);
		document.getElementById("DrawData1").value = DrawData1;
	} else if (jg == jg2){
		DrawData2.push(Parameter);
		document.getElementById("DrawData2").value = DrawData2;
	} else if (jg == jg3){
		DrawData3.push(Parameter);
		document.getElementById("DrawData3").value = DrawData3;
	} else if (jg == jg4){
		DrawData4.push(Parameter);
		document.getElementById("DrawData4").value = DrawData4;
	}
}
function DrawMarker(){
	
	if(DrawSwitch){
	
		switch (canvas.parentNode.id) {
			case 'page2':
				var pageOffset = 971;
				break;
			case 'page3':
				var pageOffset = 971*2;
				break;
			case 'page4':
				var pageOffset = 971*3;
				break;
			case 'page5':
				var pageOffset = 971*4;
				break;
			default:
				var pageOffset = 0;
		}
	
		var x = parseInt(mousex - cnvLeft);	
		var y = parseInt(mousey - cnvTop - pageOffset);
		if(FreehandSwitch){
			DrawFreehand(jg,Xposition,Yposition,StrokeColor);
			ClearXY();
		}
	}
}
function DrawPreview(){

	switch (canvas.parentNode.id) {
		case 'page2':
			var pageOffset = 971;
			break;
		case 'page3':
			var pageOffset = 971*2;
			break;
		case 'page4':
			var pageOffset = 971*3;
			break;
		case 'page5':
			var pageOffset = 971*4;
			break;
		default:
			var pageOffset = 0;
	}

	var x = parseInt(mousex-cnvLeft);
	var y = parseInt(mousey-cnvTop-pageOffset);
	if (MouseDown){
		if(FreehandSwitch){
				GetXY(x,y);
				AddFreehand(pv,x,y,StrokeColor);
		}
	}
}
function RedrawImage(RedrawParameter){
		var DrawingType = RedrawParameter[0];
		if(DrawingType == "Freehand"){
			var X = StrToArr(RedrawParameter[1], ':');
			var Y = StrToArr(RedrawParameter[2], ':');
			StrokeColor = RedrawParameter[3];
			var canvas = RedrawParameter[4];
				if (canvas == 'SignCanvas1'){
					jg = jg1;
				} else if (canvas == 'SignCanvas2'){
					jg = jg2;
				} else if (canvas == 'SignCanvas3'){
					jg = jg3;
				} else if (canvas == 'SignCanvas4'){
					jg = jg4;
				}
			DrawFreehand(jg,X,Y,StrokeColor);
		}
}

function RecallImage(){
	for (i=0; (i < TempData1.length);i++){
		var Parameters = new Array();
		Parameters =  TempData1[i].split("|");
		RedrawImage(Parameters);
	}	
	for (i=0; (i < TempData2.length);i++){
		var Parameters = new Array();
		Parameters =  TempData2[i].split("|");
		RedrawImage(Parameters);
	}
	for (i=0; (i < TempData3.length);i++){
		var Parameters = new Array();
		Parameters =  TempData3[i].split("|");
		RedrawImage(Parameters);
	}
	for (i=0; (i < TempData4.length);i++){
		var Parameters = new Array();
		Parameters =  TempData4[i].split("|");
		RedrawImage(Parameters);
	}	
}

function Clear(jg){
	if (jg == 'SignCanvas1'){
		jg1.clear();
		pv1.clear();
		TempData1 = new Array();
		DrawData1 = new Array();
		SubmitData1 = new Array();
		document.getElementById("TempData1").value = "";
		document.getElementById("DrawData1").value = "";
		document.getElementById("SubmitData1").value = "";
	} else if (jg == 'SignCanvas2'){
		jg2.clear();
		pv2.clear();
		TempData2 = new Array();
		DrawData2 = new Array();
		SubmitData2 = new Array();
		document.getElementById("TempData2").value = "";
		document.getElementById("DrawData2").value = "";
		document.getElementById("SubmitData2").value = "";
	} else if (jg == 'SignCanvas3'){
		jg3.clear();
		pv3.clear();
		TempData3= new Array();
		DrawData3 = new Array();
		SubmitData3 = new Array();
		document.getElementById("TempData3").value = "";
		document.getElementById("DrawData3").value = "";
		document.getElementById("SubmitData3").value = "";
	} else if (jg == 'SignCanvas4'){
		jg4.clear();
		pv4.clear();
		TempData4 = new Array();
		DrawData4 = new Array();
		SubmitData4 = new Array();
		document.getElementById("TempData4").value = "";
		document.getElementById("DrawData4").value = "";
		document.getElementById("SubmitData4").value = "";
	}
	Xposition = new Array();
	Yposition = new Array();
}

function SubmitImage(){
	EncodeData();
}
function EncodeData(){
	var packed1 = "";  // Initialize packed or we get the word 'undefined'
	//Converting image data in array into a string
	for (i = 0; (i < DrawData1.length); i++){
		if (i > 0){
			packed1 += ","; // each set of data separated by comma
		}
		packed1 += escape(DrawData1[i]); 	//'escape' encodes dataset into unicode
	}
	document.getElementById("SubmitData1").value = packed1;  //stores image data into hidden form field

	var packed2 = "";  // Initialize packed or we get the word 'undefined'
	//Converting image data in array into a string
	for (i = 0; (i < DrawData2.length); i++){
		if (i > 0){
			packed2 += ","; // each set of data separated by comma
		}
		packed2 += escape(DrawData2[i]); 	//'escape' encodes dataset into unicode
	}
	document.getElementById("SubmitData2").value = packed2;  //stores image data into hidden form field

	var packed3 = "";  // Initialize packed or we get the word 'undefined'
	//Converting image data in array into a string
	for (i = 0; (i < DrawData3.length); i++){
		if (i > 0){
			packed3 += ","; // each set of data separated by comma
		}
		packed3 += escape(DrawData3[i]); 	//'escape' encodes dataset into unicode
	}
	document.getElementById("SubmitData3").value = packed3;  //stores image data into hidden form field
	
	var packed4 = "";  // Initialize packed or we get the word 'undefined'
	//Converting image data in array into a string
	for (i = 0; (i < DrawData4.length); i++){
		if (i > 0){
			packed4 += ","; // each set of data separated by comma
		}
		packed4 += escape(DrawData4[i]); 	//'escape' encodes dataset into unicode
	}
	document.getElementById("SubmitData4").value = packed4;  //stores image data into hidden form field
}

function DecodeData(){
	var query = document.getElementById("SubmitData1").value;
	var data1 = query.split(',');
	for (i = 0; (i < data1.length); i++){
		data1[i] = unescape(data1[i]);
	}
	TempData1 = data1;
	DrawData1 = new Array();
	document.getElementById("DrawData1").value = document.getElementById("SubmitData1").value;
	document.getElementById("SubmitData1").value = "";
	
	var query = document.getElementById("SubmitData2").value;
	var data2 = query.split(',');
	for (i = 0; (i < data2.length); i++){
		data2[i] = unescape(data2[i]);
	}
	TempData2 = data2;
	DrawData2 = new Array();
	document.getElementById("DrawData2").value = document.getElementById("SubmitData2").value;
	document.getElementById("SubmitData2").value = "";
	
	var query = document.getElementById("SubmitData3").value;
	var data3 = query.split(',');
	for (i = 0; (i < data3.length); i++){
		data3[i] = unescape(data3[i]);
	}
	TempData3 = data3;
	DrawData3 = new Array();
	document.getElementById("DrawData3").value = document.getElementById("SubmitData3").value;
	document.getElementById("SubmitData3").value = "";
	
	var query = document.getElementById("SubmitData4").value;
	var data4 = query.split(',');
	for (i = 0; (i < data4.length); i++){
		data4[i] = unescape(data4[i]);
	}
	TempData4 = data4;
	DrawData4 = new Array();
	document.getElementById("DrawData4").value = document.getElementById("SubmitData4").value;
	document.getElementById("SubmitData4").value = "";	
}

function ReloadImage(){
	DecodeData();
	RecallImage();
}
