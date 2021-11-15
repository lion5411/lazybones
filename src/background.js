import IndexedDB from "./scripts/IndexedDB";

const DB_NAME = "alarmDB";
const DB_VERSION = 1;
const STORE_NAME_ALARM_CONTENT = "alarm_content";
const KEY_PATH_ALARM_CONTENT = "alarmId";

let idb = new IndexedDB(DB_NAME, DB_VERSION);

chrome.runtime.onInstalled.addListener((event) => {
  console.log("application installed", event);
  idb.createDatabase(STORE_NAME_ALARM_CONTENT, KEY_PATH_ALARM_CONTENT);
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log("Hello from the background", request, sender);
  switch (request.action) {
    case "INSERT":
      idb
        .insertRecords(request.records, STORE_NAME_ALARM_CONTENT)
        .then((res) => {
          sendResponse(res);
        });
      break;
    case "SELECT_BY_KEY":
      idb.getRecordByKey(request.key, STORE_NAME_ALARM_CONTENT).then((res) => {
        sendResponse(res);
      });
      break;
    case "SELECT_ALL":
      idb.getAllRecord(STORE_NAME_ALARM_CONTENT).then((res) => {
        sendResponse(res);
      });
      break;
    case "DELETE":
      idb.deleteRecordByKey(request.key, STORE_NAME_ALARM_CONTENT);
      break;
    case "UPDATE":
      idb.updateRecord(request.records, STORE_NAME_ALARM_CONTENT);
      break;

    default:
      break;
  }
});
