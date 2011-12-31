function insertText(text) {
	var element = document.activeElement;
	//check if textarea or input
	var pos = element.selectionStart;
	if (!pos) pos = 0;
	var prefix = element.value.substring(0, pos);  
    var suffix = element.value.substring(pos, element.value.length); 
    element.value = prefix + text + suffix;
    pos = pos + text.length;
	element.selectionStart = pos;
	element.selectionEnd = pos;
	element.focus();
}

chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
	insertText(request.text);
	sendResponse({});
    //alert(document.activeElement + " " + request.numberOfParagraphs + " " + request.paragraphLength);
  }
);
