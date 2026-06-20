const salaryInput =
document.getElementById("salaryInput");

const saveSalaryBtn =
document.getElementById("saveSalary");

const salaryAmount =
document.getElementById("salaryAmount");

const spentAmount =
document.getElementById("spentAmount");

const remainingAmount =
document.getElementById("remainingAmount");

const expenseForm =
document.getElementById("expenseForm");

const expenseList =
document.getElementById("expenseList");

let salary =
Number(localStorage.getItem("salary")) || 0;

let expenses =
JSON.parse(localStorage.getItem("expenses")) || [];

saveSalaryBtn.addEventListener("click", () => {

    salary = Number(salaryInput.value);

    localStorage.setItem(
        "salary",
        salary
    );

    updateDashboard();
});

expenseForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const name =
    document.getElementById("expenseName").value;

    const amount =
    Number(document.getElementById("expenseCost").value);

    const expense = {
        id: Date.now(),
        name,
        amount
    };

    expenses.push(expense);

    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );

    expenseForm.reset();

    renderExpenses();

    updateDashboard();
});

function renderExpenses(){

    expenseList.innerHTML = "";

    expenses.forEach(expense => {

        const row =
        document.createElement("tr");

        row.innerHTML = `
            <td>${expense.name}</td>
            <td>₹${expense.amount}</td>

            <td>
                <button
                class="delete-btn"
                onclick="deleteExpense(${expense.id})">
                Delete
                </button>
            </td>
        `;

        expenseList.appendChild(row);
    });
}

function deleteExpense(id){

    expenses = expenses.filter(
        expense => expense.id !== id
    );

    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );

    renderExpenses();

    updateDashboard();
}

function updateDashboard(){

    const totalSpent =
    expenses.reduce(
        (sum,expense) =>
        sum + expense.amount,
        0
    );

    const remaining =
    salary - totalSpent;

    salaryAmount.textContent =
    `₹${salary}`;

    spentAmount.textContent =
    `₹${totalSpent}`;

    remainingAmount.textContent =
    `₹${remaining}`;
}

renderExpenses();
updateDashboard();