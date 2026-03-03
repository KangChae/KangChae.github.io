let currentUser = null;

async function unlock() {
    const pin = document.getElementById("pinInput").value;

    const tx = db.transaction("users", "readonly");
    const store = tx.objectStore("users");
    const request = store.getAll();

    request.onsuccess = function () {
        const users = request.result;
        const user = users.find(u => u.pin === pin);

        if (user) {
            currentUser = user;
            document.getElementById("lockScreen").classList.remove("active");
            document.getElementById("mainApp").classList.remove("hidden");
            loadDashboard();
        } else {
            alert("Incorrect PIN");
        }
    };
}

function logout() {
    location.reload();
}
