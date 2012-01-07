function insertText(text) {
	var element = document.activeElement;
	if (!element) return false;
	if (typeof(element.value) == "undefined") return false;
	//check if textarea or input
	var start = element.selectionStart;
	var end = element.selectionEnd;
	if (!start) start = 0;
	if (!end) end = 0;
	var prefix = element.value.substring(0, start);  
    var suffix = element.value.substring(end, element.value.length); 
    element.value = prefix + text + suffix;
    start = start + text.length;
	element.selectionStart = start;
	element.selectionEnd = start;
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
