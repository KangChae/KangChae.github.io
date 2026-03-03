const DB_NAME = "ChurchLedgerDB";
const DB_VERSION = 1;
let db;

function initDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = function (e) {
            db = e.target.result;

            db.createObjectStore("organisations", { keyPath: "id" });
            db.createObjectStore("users", { keyPath: "id" });
            db.createObjectStore("wallets", { keyPath: "id" });
            db.createObjectStore("transactions", { keyPath: "id" });
        };

        request.onsuccess = function (e) {
            db = e.target.result;
            resolve();
        };

        request.onerror = reject;
    });
}
