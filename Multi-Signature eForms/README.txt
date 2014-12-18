These are the files and instructions needed to create eForms with multiple signature boxes.
You will be able to create any number of signature boxes.
These signatures are signed directly into the boxes with your mouse.
This method requires you to first create the eForm, then add in the signature boxes via editing the HTML.
When you create the eForm, it's a good idea to put input boxes the exact size and position you want
the signature boxes to be, acting as a placeholder.


Upload all of the ".js" files in this folder to OSCAR via the "Upload an image" module in the Admin page.


Next, we need to set up the eForm.
Make sure the following goes in the head of the form:
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

<!-- js graphics scripts -->
<script type="text/javascript" src="${oscar_image_path}jsgraphics.js"></script>
<!-- mousefunction scripts -->
<script type="text/javascript" src="${oscar_image_path}mouse.js"></script>
<!-- freehand signature scripts -->
<script type="text/javascript" src="${oscar_image_path}MultiSignatureScripts.js"></script>

<script type="text/javascript" src="${oscar_image_path}jquery-1.7.1.min.js"></script>
<script type="text/javascript" src="/BC_Demo/share/javascript/eforms/printControl.js"></script>

<script type="text/javascript">
$(document).ready(function(){
	var all_sign = $(".sign_cnv");
	var style = [];
	var left = [];
	var top = [];
	var width = [];
	var height = [];
	
	all_sign.each(function(i){
		$(this).attr("id","SignCanvas"+(i+1))
				.mouseover(function(){SetDrawOn(); show('ClearSignature'+(i+1));})
				.mouseout(function(){SetDrawOff(); hide('ClearSignature'+(i+1));})
				.mousedown(function(){SetMouseDown();SetStart(this.id);})
				.mouseup(function(){SetMouseUp();  DrawMarker();})
				.mousemove(function(){DrawPreview();})
				.before('<input class="hiddendraw" type="hidden">')
				.before('<input class="hiddenbutton" type="button">')
				.before('<div id="preview'+(i+1)+'" style="'+$(this).attr("style")+'; background-color:grey;opacity:0.5;filter:alpha(opacity=50);" class="DoNotPrint"></div>');
	});
	
	all_sign.each(function(i){
		style[i] = $(this).attr('style');
		style[i] = style[i].replace(/ /g,"");
		style[i] = style[i].split(';');
	});
	
	for(i=0; i<style.length; i++) {
		for(j=0; j<style[i].length; j++) {
			if(style[i][j].indexOf("left:") != -1) {left[i] = Number(style[i][j].slice(5,-2));}
			else if(style[i][j].indexOf("top:") != -1) {top[i] = Number(style[i][j].slice(4,-2));}
			else if(style[i][j].indexOf("width:") != -1) {width[i] = Number(style[i][j].slice(6,-2));}
			else if(style[i][j].indexOf("height:") != -1) {height[i] = Number(style[i][j].slice(7,-2));}
		}
	}
	
	var buttons = $(".hiddenbutton");
	buttons.each(function(i){
		$(this).attr("id","ClearSignature"+(i+1))
				.attr("name","ClearSignature"+(i+1))
				.attr("value","Clear Signature"+(i+1))
				.attr("style","position:absolute; display:none; z-index:1; top:"+top[i]+"px; left:"+(left[i]+width[i])+"px; height:25px;")
				.click(function(){Clear('SignCanvas'+(i+1));})
				.mouseover(function(){show(this.id);})
				.mouseout(function(){hide(this.id);});
	});
	
	var draw = $(".hiddendraw");
	draw.each(function(i){
		$(this).attr("id","DrawData"+(i+1))
				.attr("name","DrawData"+(i+1));
	});
	
});
</script>

<script type="text/javascript">
function reorderSignature(){
    document.getElementById('BGImage1').style.zIndex = '-100';
    document.getElementById('BGImage2').style.zIndex = '-101';

    document.getElementById('preview1').style.zIndex = '-90';
    document.getElementById('preview2').style.zIndex = '-91';
    document.getElementById('preview3').style.zIndex = '-92';
</script>

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

For the last script above, you will need as many 'preview' as you have signature boxes.
Make sure these follow the format 'preview1', 'preview2', and so on.

The 'BGImage' refers to the id of the <img> of the background images for each page.
Make sure these match the id's of the <img>'s.
**These numbers are arbitrary, as long as the BGImages are more negative than the previews.
**In the example file, there are no BGImages


In the <body> tag, make sure to include these for onload: "init(); Init_Sig(); reorderSignature();"
i.e. <body onload="init(); Init_Sig(); reorderSignature();">

Find the placeholders for your signature boxes that you created. Replace it with the following
and make sure to copy over the height, left, top, and width.

<div class="sign_cnv" style="position:absolute; left: px; top: px; width: px; height: px;"></div>


Take a look at MultiSignatureExampleForm.html for an example. There are 3 signature boxes in this file.

