import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.0/firebase-app.js";
import {
  getDatabase,
  onChildAdded,
  ref,
  remove,
  set,
} from "https://www.gstatic.com/firebasejs/9.8.0/firebase-database.js";

// TODO: Replace with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhLYAsHBgYocUD3vHoZgQ29g53Eqt2UTY",
  authDomain: "tvlog-60808.firebaseapp.com",
  databaseURL: "https://tvlog-60808-default-rtdb.firebaseio.com",
  projectId: "tvlog-60808",
  storageBucket: "tvlog-60808.appspot.com",
  messagingSenderId: "369661099366",
  appId: "1:369661099366:web:cd4eec29ac57e95458dca7",
  measurementId: "G-8N45TQNLQK",
};

const app = initializeApp(firebaseConfig);

// Get a reference to the database service
export const db = getDatabase(app);

function tvlog(...text) {
  var now = new Date();
  const time =
    now.toLocaleTimeString("en-GB") +
    `.${now.getMilliseconds().toString().padStart(3, "0")}`;

  var result = "";
  for (var t in text) {
    var item = text[t];
    if (typeof text[t] === "object") {
      try {
        item = JSON.stringify(text[t]);
      } catch (e) {
        console.log(e);
        if (
          e instanceof TypeError &&
          e.message.includes("Converting circular structure to JSON")
        ) {
          result = "{";
          for (var out in text[t]) {
            result += '"' + out + '": ' + '"' + text[t][out] + '",<br />';
          }
          result += "}";
        } else {
          result = e.name + "&emsp;" + e.message.replace(/\n/g, "<br/>&emsp;");
        }
        break;
      }
    }
    result += item + "&emsp;";
  }
  set(ref(db, "logs/" + now.getTime()), {
    time: time,
    text: result,
  });
  console.log(...text);
}
tvlog("tvLog.js set tvlog global");
window.tvlog = tvlog;

function tvlogclear() {
  remove(ref(db, "logs/"));
}
window.tvlogclear = tvlogclear;

export function registerDb(doChanged) {
  onChildAdded(ref(db, "logs/"), doChanged);
}
