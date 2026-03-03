document.addEventListener("DOMContentLoaded", async () => {
    await initDB();
    seedIfEmpty();
});

function navigate(screenId) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    document.getElementById(screenId).classList.add("
}

function loadDashboard() {
    const tx = db.transaction("transactions", "readonly");
    const store = tx.objectStore("transactions");
    const request = store.getAll();

    request.onsuccess = function () {
        const transactions = request.result;

        let total = 0;
        let income = 0;
        let expense = 0;

        const now = new Date();
        const month = now.getMonth();
        const year = now.getFullYear();

        transactions.forEach(t => {
            total += t.type === "income" ? t.amount : -t.amount;

            const d = new Date(t.date);
            if (d.getMonth() === month && d.getFullYear() === year) {
                if (t.type === "income") income += t.amount;
                else expense += t.amount;
            }
        });

        document.getElementById("totalBalance").innerText = total.toFixed(2);
        document.getElementById("monthIncome").innerText = income.toFixed(2);
        document.getElementById("monthExpense").innerText = expense.toFixed(2);
    };
}

function seedIfEmpty() {
    const tx = db.transaction("users", "readonly");
    const store = tx.objectStore("users");
    const request = store.getAll();

    request.onsuccess = function () {
        if (request.result.length === 0) {
            const tx2 = db.transaction(["organisations", "users", "wallets"], "readwrite");

            tx2.objectStore("organisations").add({
                id: "org1",
                name: "Youth Ministry"
            });

            tx2.objectStore("users").add({
                id: "user1",
                organisationId: "org1",
                name: "Admin",
                role: "treasurer",
                pin: "1234"
            });

            tx2.objectStore("wallets").add({
                id: "wallet1",
                organisationId: "org1",
                name: "Main Cash",
                openingBalance: 0
            });
        }
    };
}
