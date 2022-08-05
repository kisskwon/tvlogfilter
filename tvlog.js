const URL = "http://bonkab.com:49162/tvlog/_doc";

function getCircularReplacer() {
  const cache = new WeakSet();
  return (k, v) => {
    if (typeof v === "object" && v != null) {
      if (cache.has(v)) return;
      cache.add(v);
    }
    return v;
  };
}

function tvlog(...text) {
  var result = "";
  for (var t in text) {
    if (result) {
      result += " | ";
    }
    var item = text[t];
    if (typeof item === "object") {
      item = JSON.stringify(item, getCircularReplacer());
    }
    result += item;
  }
  sendPost(result);
  console.log("[tvlog]", result);
}

function sendPost(message) {
  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = () => {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200 || httpRequest.status === 201) {
        var result = httpRequest.response;
        console.log(result);
      } else {
        alert("Request Error!");
      }
    }
  };

  httpRequest.open("POST", URL, true);
  httpRequest.setRequestHeader("Content-Type", "application/json");
  httpRequest.send(
    JSON.stringify({ message: message, "@timestamp": Date.now() })
  );
}

tvlog("tvLog enable global");
window.tvlog = tvlog;
