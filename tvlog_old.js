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

export function registerDb(doChanged) {
  onChildAdded(ref(db, "logs/"), doChanged);
}

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
  var now = new Date();
  const time =
    now.toLocaleTimeString("en-GB") +
    `.${now.getMilliseconds().toString().padStart(3, "0")}`;

  var result = "";
  for (var t in text) {
    var item = text[t];
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
  set(ref(db, "logs/" + now.getTime()), {
    time: time,
    text: result,
  });
}

function tvlogclear() {
  remove(ref(db, "logs/"));
}

tvlog("tvLog enable global");
window.tvlog = tvlog;
window.tvlogclear = tvlogclear;
