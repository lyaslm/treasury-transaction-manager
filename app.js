/** @format */

const transactions = [
  { id: 101, customer: "Alice Johnson", amount: 1500.5, date: "2026-01-10", type: "Credit" },
  { id: 102, customer: "Bob Smith", amount: 320.0, date: "2026-01-12", type: "Debit" },
  { id: 103, customer: "Charlie Brown", amount: 4500.0, date: "2026-01-15", type: "Credit" },
  { id: 104, customer: "Diana Prince", amount: 120.75, date: "2026-01-18", type: "Debit" },
  { id: 105, customer: "Evan Wright", amount: 2300.4, date: "2026-01-20", type: "Credit" },
  { id: 106, customer: "Fiona Gallagher", amount: 750.0, date: "2026-02-01", type: "Debit" },
  { id: 107, customer: "George Clark", amount: 5400.2, date: "2026-02-03", type: "Credit" },
  { id: 108, customer: "Hannah Abbott", amount: 920.1, date: "2026-02-05", type: "Debit" },
  { id: 109, customer: "Ian Malcolm", amount: 3100.0, date: "2026-02-10", type: "Credit" },
  { id: 110, customer: "Julia Roberts", amount: 430.5, date: "2026-02-12", type: "Debit" },
  { id: 111, customer: "Kevin Hart", amount: 1800.0, date: "2026-02-15", type: "Credit" },
  { id: 112, customer: "Laura Croft", amount: 650.25, date: "2026-02-18", type: "Debit" },
  { id: 113, customer: "Michael Bay", amount: 8900.0, date: "2026-02-20", type: "Credit" },
  { id: 114, customer: "Nina Dobrev", amount: 340.6, date: "2026-02-22", type: "Debit" },
  { id: 115, customer: "Oscar Isaac", amount: 1250.0, date: "2026-02-25", type: "Credit" },
  { id: 116, customer: "Paul Rudd", amount: 430.0, date: "2026-03-01", type: "Debit" },
  { id: 117, customer: "Quentin Tarantino", amount: 6700.5, date: "2026-03-02", type: "Credit" },
  { id: 118, customer: "Rachel Green", amount: 210.0, date: "2026-03-05", type: "Debit" },
  { id: 119, customer: "Steve Rogers", amount: 5000.0, date: "2026-03-08", type: "Credit" },
  { id: 120, customer: "Tony Stark", amount: 15000.0, date: "2026-03-10", type: "Credit" },
];

let currentData = [...transactions];

const tableBody = document.getElementById("transactionTableBody");
const sortFieldSelect = document.getElementById("sortField");
const sortAlgoSelect = document.getElementById("sortAlgorithm");
const sortBtn = document.getElementById("sortBtn");
const searchTypeSelect = document.getElementById("searchType");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const resetBtn = document.getElementById("resetBtn");

function renderTable(data) {
  tableBody.innerHTML = "";
  if (data.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="5" style="text-align: center;">No transactions found</td></tr>`;
    return;
  }
  data.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.customer}</td>
            <td>$${item.amount.toFixed(2)}</td>
            <td>${item.date}</td>
            <td>${item.type}</td>
        `;
    tableBody.appendChild(row);
  });
}

// 1. BUBBLE SORT ALGORITHM
function bubbleSort(arr, field) {
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      let valA = arr[j][field];
      let valB = arr[j + 1][field];
      if (valA > valB) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

// 2. QUICK SORT ALGORITHM
function quickSort(arr, field) {
  if (arr.length <= 1) {
    return arr;
  }
  let pivot = arr[arr.length - 1];
  let left = [];
  let right = [];
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i][field] < pivot[field]) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return [...quickSort(left, field), pivot, ...quickSort(right, field)];
}

// Handle Sorting Click
sortBtn.addEventListener("click", () => {
  const field = sortFieldSelect.value;
  const algo = sortAlgoSelect.value;

  if (algo === "bubble") {
    currentData = bubbleSort([...currentData], field);
  } else {
    currentData = quickSort([...currentData], field);
  }
  renderTable(currentData);
});

// 3. LINEAR SEARCH (By Customer Name)
function linearSearch(arr, query) {
  let results = [];
  let lowerQuery = query.toLowerCase();
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].customer.toLowerCase().includes(lowerQuery)) {
      results.push(arr[i]);
    }
  }
  return results;
}

// 4. BINARY SEARCH (By ID - Array must be sorted by ID first)
function binarySearch(arr, idQuery) {
  let sorted = [...arr].sort((a, b) => a.id - b.id);
  let left = 0;
  let right = sorted.length - 1;
  let target = parseInt(idQuery);

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (sorted[mid].id === target) {
      return [sorted[mid]];
    } else if (sorted[mid].id < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return [];
}

// Handle Searching Click
searchBtn.addEventListener("click", () => {
  const type = searchTypeSelect.value;
  const query = searchInput.value.trim();

  if (!query) {
    alert("Please enter a search query!");
    return;
  }

  if (type === "linear") {
    currentData = linearSearch(currentData, query);
  } else {
    currentData = binarySearch(currentData, query);
  }
  renderTable(currentData);
});

// Reset Button
resetBtn.addEventListener("click", () => {
  currentData = [...transactions];
  searchInput.value = "";
  renderTable(currentData);
});

// Initial Render
renderTable(currentData);
