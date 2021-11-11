export default class IndexedDB {
  constructor(dbName, dbVersion) {
    this.db;
    this.dbName = dbName;
    this.dbVersion = dbVersion;
  }

  createDatabase(storeName, keyPath) {
    const request = window.indexedDB.open(this.dbName, this.dbVersion);
    return new Promise((resolve, reject) => {
      request.onerror = function(event) {
        console.log("Problem opening DB.");
        resolve();
      };
      request.onupgradeneeded = function(event) {
        this.db = event.target.result;
        let objectStore = this.db.createObjectStore(storeName, {
          keyPath: keyPath,
          autoIncrement: true,
        });
        objectStore.transaction.oncomplete = function(event) {
          console.log("ObjectStore Created.");
        };
        resolve(this.db);
      };
      request.onsuccess = function(event) {
        this.db = request.result;
        console.log("DB OPENED.");
        this.db.onerror = function(event) {
          console.log("FAILED TO OPEN DB.");
        };
        resolve(this.db);
      };
    }).then((value) => {
      this.db = value;
    });
  }

  insertRecords(records, storeName) {
    if (this.db) {
      const transaction = this.db.transaction(storeName, "readwrite");
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

  getRecordByKey(key, storeName) {
    if (this.db) {
      const transaction = this.db.transaction(storeName, "readonly");
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
  getAllRecord(storeName) {
    const transaction = this.db.transaction(storeName);
    const objectStore = transaction.objectStore(storeName);

    const request = objectStore.openCursor();

    const result = [];

    request.onsuccess = function(event) {
      let cursor = event.target.result;
      if (cursor) {
        let key = cursor.key;
        let value = cursor.value;
        console.log(key, value);
        result.push(cursor.value);
        cursor.continue();
      } else {
        console.log("No more data");
      }
    };

    return new Promise((resolve, reject) => {
      transaction.oncomplete = function(event) {
        resolve(result);
      };
    });
  }

  updateRecord(record, storeName) {
    if (this.db) {
      const transaction = this.db.transaction(storeName, "readwrite");
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
  deleteRecordByKey(key, storeName) {
    if (this.db) {
      const delete_transaction = this.db.transaction(storeName, "readwrite");
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
}
