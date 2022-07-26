const URL = "http://bonkab.com:49162/tvlog/_doc";

function tvlog(...text) {
  var result = "";
  for (var t in text) {
    var item = text[t];
    if (typeof text[t] === "object") {
      try {
        item = JSON.stringify(text[t]);
      } catch (e) {
        if (
          e instanceof TypeError &&
          e.message.includes("Converting circular structure to JSON")
        ) {
          item = "{";
          for (var out in text[t]) {
            item += '"' + out + '": ' + '"' + text[t][out] + '",<br />';
          }
          item += "}";
        } else {
          result = e.name + "&emsp;" + e.message.replace(/\n/g, "<br/>&emsp;");
          break;
        }
      }
    }
    result += item + "&emsp;";
  }
  sendPost(result);
  console.log(...text);
}

tvlog("tvLog.js set tvlog global");
window.tvlog = tvlog;

function sendPost(message) {
  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = () => {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200 || httpRequest.status === 201) {
        var result = httpRequest.response;
        console.log(result.message);
      } else {
        alert("Request Error!");
      }
    }
  };

  httpRequest.open("POST", URL, true);
  httpRequest.setRequestHeader("Content-Type", "application/json");

  var now = Date.now();
  httpRequest.send(JSON.stringify({ message: message, "@timestamp": now }));
}
