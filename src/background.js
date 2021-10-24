let db = null;
const DB_NAME = "alarmDB";
const DB_VERSION = 1;
const STORE_NAME_ALARM_CONTENT = "alarm_content";
const KEY_PATH_ALARM_CONTENT = "alarm_id";

function createDatabase(dbName, dbVersion, storeName, keyPath) {
  const request = window.indexedDB.open(dbName, dbVersion);

  request.onerror = function(event) {
    console.log("Problem opening DB.");
  };
  request.onupgradeneeded = function(event) {
    db = event.target.result;
    let objectStore = db.createObjectStore(storeName, {
      keyPath: keyPath,
      autoIncrement: true,
    });
    objectStore.transaction.oncomplete = function(event) {
      console.log("ObjectStore Created.");
    };
  };
  request.onsuccess = function(event) {
    db = event.target.result;
    console.log("DB OPENED.");
    db.onerror = function(event) {
      console.log("FAILED TO OPEN DB.");
    };
  };
}

chrome.runtime.onInstalled.addListener((event) => {
  console.log("application installed", event);
  createDatabase(
    DB_NAME,
    DB_VERSION,
    STORE_NAME_ALARM_CONTENT,
    KEY_PATH_ALARM_CONTENT
  );
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log("Hello from the background", request, sender);
  sendResponse(sender);
  switch (request.action) {
    case "INSERT":
      insertRecords(request.records, STORE_NAME_ALARM_CONTENT);
      break;
    case "SELECT_BY_KEY":
      break;
    case "SELECT_ALL":
      break;
    case "DELETE":
      break;
    case "UPDATE":
      break;

    default:
      break;
  }
});

function insertRecords(records, storeName) {
  if (db) {
    const transaction = db.transaction(storeName, "readwrite");
    const objectStore = transaction.objectStore(storeName);
    return new Promise((resolve, reject) => {
      transaction.oncomplete = function() {
        console.log("ALL INSERT TRANSACTIONS COMPLETE.");
        resolve(true);
      };
      transaction.onerror = function() {
        console.log("PROBLEM INSERTING RECORDS.");
        resolve(false);
      };
      records.forEach((data) => {
        let request = objectStore.add(data);
        request.onsuccess = function() {
          console.log("Added: ", data);
        };
      });
    });
  }
}

function getRecordByKey(key, storeName) {
  if (db) {
    const transaction = db.transaction(storeName, "readonly");
    const objectStore = transaction.objectStore(storeName);
    return new Promise((resolve, reject) => {
      transaction.oncomplete = function() {
        console.log("ALL GET TRANSACTIONS COMPLETE.");
      };
      transaction.onerror = function() {
        console.log("PROBLEM GETTING RECORDS.");
      };
      let request = objectStore.get(key);
      request.onsuccess = function(event) {
        resolve(event.target.result);
      };
    });
  }
}
function getAllRecord(storeName) {
  const transaction = db.transaction(storeName);
  const objectStore = transaction.objectStore(storeName);

  const request = objectStore.openCursor();

  request.onsuccess = function() {
    let cursor = request.result;
    if (cursor) {
      let key = cursor.key;
      let value = cursor.value;
      console.log(key, value);
      cursor.continue();
    } else {
      console.log("No more data");
    }
  };
}

function updateRecord(record, storeName) {
  if (db) {
    const transaction = db.transaction(storeName, "readwrite");
    const objectStore = transaction.objectStore(storeName);
    return new Promise((resolve, reject) => {
      transaction.oncomplete = function() {
        console.log("ALL PUT TRANSACTIONS COMPLETE.");
        resolve(true);
      };
      transaction.onerror = function() {
        console.log("PROBLEM UPDATING RECORDS.");
        resolve(false);
      };
      objectStore.put(record);
    });
  }
}
function deleteRecordByKey(key, storeName) {
  if (db) {
    const delete_transaction = db.transaction(storeName, "readwrite");
    const objectStore = delete_transaction.objectStore(storeName);
    return new Promise((resolve, reject) => {
      delete_transaction.oncomplete = function() {
        console.log("ALL DELETE TRANSACTIONS COMPLETE.");
        resolve(true);
      };
      delete_transaction.onerror = function() {
        console.log("PROBLEM DELETE RECORDS.");
        resolve(false);
      };
      objectStore.delete(key);
    });
  }
}
