var jiexiUrL="https://jx.618g.com/?url=";
var result = '';

document.addEventListener('DOMContentLoaded', function() {
	document.querySelector('button').addEventListener('click', onclick, false)
	
	function onclick(){
		chrome.tabs.query({currentWindow: true, active: true},
			function (tabs) {
				request(tabs[0].url);
				setTimeout(function() {
					alert(result);
					chrome.tabs.sendMessage(tabs[0].id,'hi');
				  }, 3000);

			});
	};
}, false);

function request(url){

	const re = new RegExp('url=(.*\.m3u8)');
	let xhr = new XMLHttpRequest();
	xhr.open('GET', jiexiUrL+url);
	xhr.send();
	xhr.onload = function() {
	  if (xhr.status != 200) { // analyze HTTP status of the response
		alert(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
	  } else { // show the result
		alert(`Done, got ${xhr.response.length} bytes`); 
		result = xhr.responseText.match(re)[1];
		// responseText is the server
	  }
	};
	xhr.onerror = function() {
	  alert("Request failed");
	};
}