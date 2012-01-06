function updateSelected(event, element) {
	var coords = getCoor(event, element);
	var w = coords[0];
	var h = coords[1];
	var rows = element.querySelectorAll(".parrow");
	for (var iy = 0; iy < rows.length; iy++) {
		var cols = rows[iy].querySelectorAll(".parcol");
		for (var ix = 0; ix < cols.length; ix++) {
			if (iy < h && ix < w) {
				cols[ix].style.backgroundColor = "#B4CCED";
			} else {
				cols[ix].style.backgroundColor = "";
			}
		}
	}	
}

function clearSelected(entry) {
	var entries = entry.querySelectorAll(".parcol");
	for (var i = 0; i < entries.length; i++) {
		entries[i].style.backgroundColor = "";
	}
}

function clickSelectedParagraphs(event, element) {
	var coords = getCoor(event, element);
	chrome.extension.getBackgroundPage().insertParagraphs(coords[1], coords[0], handleResponse);
}

function clickSelectedTitle(event, element) {
	var coords = getCoor(event, element);
	chrome.extension.getBackgroundPage().insertTitle(coords[0], handleResponse);
}

function getCoor(event, element) {
	var x = event.x - element.offsetLeft;
	var y = event.y - element.offsetTop;
	var h = Math.ceil(y / 24);
	var w = Math.ceil(x / 48);
	return [w, h];
}

function insertText(text) {
	chrome.extension.getBackgroundPage().insertText(text, handleResponse);
}

function handleResponse(response) {
	if (!response.error) {
		window.close();
	} else {
		document.getElementById("error").innerHTML = "can't insert at the current position";
		window.setTimeout(function() { window.close(); }, 2000);
	}
}

var todayString = chrome.extension.getBackgroundPage().createTodayString();
var yesterdayString = chrome.extension.getBackgroundPage().createYesterdayString();
var tomorrowString = chrome.extension.getBackgroundPage().createTomorrowString();
var randomDateString = chrome.extension.getBackgroundPage().createRandomDateString();
var randomDatePattern = chrome.extension.getBackgroundPage().createRandomDatePattern();
var url = chrome.extension.getBackgroundPage().createURL();
var mail = chrome.extension.getBackgroundPage().createMail();



function toggleOptionInsertIntoPage() {
	var val = chrome.extension.getBackgroundPage().settings.isInsertIntoPage();
	chrome.extension.getBackgroundPage().settings.setInsertIntoPage(!val);
	updateOptionInsertIntoPage();
}

function toggleOptionCopyToClipboard() {
	chrome.extension.getBackgroundPage().settings.setCopyToClipboard(!chrome.extension.getBackgroundPage().settings.isCopyToClipboard());
	updateOptionCopyToClipboard();
}

function updateOptionInsertIntoPage() {
	document.getElementById("optionInsertIntoPage").checked = chrome.extension.getBackgroundPage().settings.isInsertIntoPage();
}

function updateOptionCopyToClipboard() {
	document.getElementById("optionCopyToClipboard").checked = chrome.extension.getBackgroundPage().settings.isCopyToClipboard();
}


