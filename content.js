function insertText(text) {
	var element = document.activeElement;
	if (!element) return false;
	if (typeof(element.value) == "undefined") return false;
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
	return true;
}

chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
	var success = insertText(request.text);
	var response = {};
	response.error = !success;
	sendResponse(response);
  }
);
