document.addEventListener('DOMContentLoaded', function() {
    loadExpenses();
    calculateTotal();
});

function addExpense() {
    const expenseName = document.getElementById('expenseName').value;
    const expenseAmount = parseFloat(document.getElementById('expenseAmount').value);

    if (expenseName && !isNaN(expenseAmount)) {
        const expense = {
            name: expenseName,
            amount: expenseAmount.toFixed(2),
        };

        let expenses = getExpenses();
        expenses.push(expense);
        localStorage.setItem('expenses', JSON.stringify(expenses));

        clearForm();
        loadExpenses();
        calculateTotal();
    } else {
        alert('Please enter valid expense details.');
    }
}

function loadExpenses() {
    const expenses = getExpenses();
    const expenseList = document.getElementById('expenseList');
    expenseList.innerHTML = '';

    expenses.forEach((expense, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span1>${expense.name}</span1>
            <span2>₹${expense.amount}</span2>
            <div class = "btn-container">
              <i class="fa-solid fa-pen" onclick="editExpense(${index})"></i>
              <i class="fa-solid fa-trash" onclick="deleteExpense(${index})"></i>
            </div>
        `;
        expenseList.appendChild(li);
    });
}

function editExpense(index) {
    let expenses = getExpenses();
    const editedExpense = expenses[index];

    document.getElementById('expenseName').value = editedExpense.name;
    document.getElementById('expenseAmount').value = editedExpense.amount;

    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));

    loadExpenses();
    calculateTotal();
}

function deleteExpense(index) {
    let expenses = getExpenses();
    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));

    loadExpenses();
    calculateTotal();
}

function calculateTotal() {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const totalExpenseElement = document.getElementById('totalExpense');
    const totalExpense = expenses.reduce((sum, expense) => sum + parseInt(expense.amount), 0);
    totalExpenseElement.textContent = totalExpense;
}

function getExpenses() {
    return JSON.parse(localStorage.getItem('expenses')) || [];
}

function clearForm() {
    document.getElementById('expenseName').value = '';
    document.getElementById('expenseAmount').value = '';
}