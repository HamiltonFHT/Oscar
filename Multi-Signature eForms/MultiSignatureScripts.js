// This file allows for multiple signatures on eForms.
// The id's of all the signature fields in the eForm html must all be consistent and named like below, otherwise this file will not work
//     preview1, preview2, preview3,...
//     SignCanvas1, SignCanvas2,...
//     DrawData1, DrawData2,...
// The divs for each page should have the id "page1", "page2", and so on

// Various variables to store data for each signature
var numSig = 0;
var pvcnv = [];
var pv = [];
var cnv = [];
var jg = [];
var cnvLeftDefault = 0;
var cnvTopDefault = 0;
var cnvLeft = [];
var cnvTop = [];
var StrokeColor = "black";
var StrokeThickness = 2;
var x0 = 0;
var y0 = 0;
var jg = [];
var DrawData = [];
var TempData = [];

function SetVars(){
	var i = 1;
	while (document.getElementById("preview"+i) !== null) {
		numSig++;
		i++;
	}

	for (i = 0; i < numSig; i++) {
		pvcnv[i] = document.getElementById("preview"+(i+1));
		pv[i] = new jsGraphics(pvcnv[i]);
		cnv[i] = document.getElementById("SignCanvas"+(i+1));
		jg[i] = new jsGraphics(cnv[i]);
		cnvLeft[i] = parseInt(cnv[i].style.left);
		cnvTop[i] = parseInt(cnv[i].style.top);
		jg[i].setPrintable(true);
		DrawData[i] = new Array();
		TempData[i] = new Array();
	}
}


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

var cur_canvas = "";
var cur_jg = "";
var cur_pv = "";
var cur_pvcanvas = "";
function SetStart(cur_cnv){
	var index = Number(cur_cnv.slice(-1));
	cnvLeftDefault = cnvLeft[index-1];
	cnvTopDefault = cnvTop[index-1];
	cur_canvas = cnv[index-1];
	cur_pvcanvas = pvcnv[index-1];
	cur_jg = jg[index-1];
	cur_pv = pv[index-1];

	var page = Number(cur_canvas.parentNode.id.slice(-1));
	if (isNaN(page)) {
		page = 1;
	}
	var pageOffset = 971*(page-1);
	
	x0 = (mousex - cnvLeftDefault);
	y0 = (mousey - cnvTopDefault - pageOffset);	

}

var Xposition = new Array();
var Yposition = new Array();

function GetXY(x,y){
	var t = StrokeThickness;
	var l = Xposition.length - 1;	//l = last position
	var h = Math.sqrt(Math.pow((Xposition[l] - x),2)+Math.pow((Yposition[l] - y),2)); //calc hypotenuse
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

function AddFreehand(cur_pv,x,y,StrokeColor){
		var X = Xposition;
		var Y = Yposition;
		cur_pv.setColor(StrokeColor);
		cur_pv.setStroke(StrokeThickness);
		if (X.length>1){
			var a = X.length - 2;
			var b = a + 1;
			var x1 = parseInt(X[a]);
			var y1 = parseInt(Y[a]);
			cur_pv.drawLine(x1,y1,x,y);
			cur_pv.paint();
		}
}

function DrawFreehand(cur_jg,X,Y,StrokeColor){

	cur_jg.setColor(StrokeColor);
	cur_jg.setStroke(StrokeThickness);
	cur_jg.drawPolyline(X,Y);
	cur_jg.paint();

	//store parameters in an array
	var StrX = ArrToStr(X,':');
	var StrY = ArrToStr(Y,':');
	var Parameter = "Freehand" + "|" +  StrX + "|" + StrY + "|" + StrokeColor + "|" + cur_canvas.id ;
	
	var index = Number(cur_jg.cnv.parentNode.id.slice(-1));
	DrawData[index-1].push(Parameter);
	document.getElementById("DrawData"+index).value = DrawData[index-1];
}

function DrawMarker(){
	
	if(DrawSwitch){
		var page = Number(cur_canvas.parentNode.id.slice(-1));
		if (isNaN(page)) {
			page = 1;
		}
		var pageOffset = 971*(page-1);
	
		var x = parseInt(mousex - cnvLeftDefault);	
		var y = parseInt(mousey - cnvTopDefault - pageOffset);
		if(FreehandSwitch){
			DrawFreehand(cur_jg,Xposition,Yposition,StrokeColor);
			ClearXY();
		}
	}
}

function DrawPreview(){
	var page = Number(cur_canvas.parentNode.id.slice(-1));
	if (isNaN(page)) {
		page = 1;
	}
	var pageOffset = 971*(page-1);

	var x = parseInt(mousex-cnvLeftDefault);
	var y = parseInt(mousey-cnvTopDefault-pageOffset);
	if (MouseDown){
		if(FreehandSwitch){
			GetXY(x,y);
			AddFreehand(cur_pv,x,y,StrokeColor);
		}
	}
}

function RedrawImage(RedrawParameter){
		var DrawingType = RedrawParameter[0];
		if(DrawingType == "Freehand"){
			var X = StrToArr(RedrawParameter[1], ':');
			var Y = StrToArr(RedrawParameter[2], ':');
			StrokeColor = RedrawParameter[3];
			var canvasId = RedrawParameter[4];
			cur_canvas = document.getElementById(canvasId);

			var index = Number(canvasId.slice(-1));
			cur_jg = jg[index-1];
			
			DrawFreehand(cur_jg,X,Y,StrokeColor);
		}
}

function RecallImage(){
	for (j=0; j<numSig; j++) {
		var query = document.getElementById("DrawData"+(j+1)).value;
		TempData[j] = query.split(',');
		for (i=0; i < TempData[j].length;i++){
			var Parameters = new Array();
			Parameters =  TempData[j][i].split("|");
			RedrawImage(Parameters);
		}	
	}
}

function Clear(cur_jg){
	var index = Number(cur_jg.slice(-1));
	jg[index-1].clear();
	pv[index-1].clear();
	TempData[index-1] = new Array();
	DrawData[index-1] = new Array();

	document.getElementById("DrawData"+index).value = "";

	Xposition = new Array();
	Yposition = new Array();
}

function Init_Sig() {
	SetVars();
	RecallImage();
}