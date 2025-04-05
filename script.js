let records = [];
let currentId = 1;
let editingRecordId = null;  // Track the record being edited

document.getElementById('crud-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const id = document.getElementById('record-id').value;
  const name = document.getElementById('name').value;
  const date = document.getElementById('date').value;

  if (id) {
    // Update existing record
    updateRecord(id, name, date);
  } else {
    // Add new record
    addRecord(name, date);
  }

  // Clear form fields after action
  document.getElementById('crud-form').reset();
  document.getElementById('record-id').value = '';
  document.getElementById('submit-btn').textContent = 'Add Record';  // Reset button text
  editingRecordId = null;  // Reset editing state
});

function addRecord(name, date) {
  const record = {
    id: currentId++,
    name: name,
    date: date
  };
  records.push(record);
  renderTable();
}

function renderTable() {
  const tableBody = document.querySelector('#records-table tbody');
  tableBody.innerHTML = '';

  records.forEach(record => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${record.id}</td>
      <td>${record.name}</td>
      <td>${record.date}</td>
      <td>
        <button class="edit" onclick="editRecord(${record.id})">Edit</button>
        <button class="delete" onclick="deleteRecord(${record.id})">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

function deleteRecord(id) {
  records = records.filter(record => record.id !== id);
  renderTable();
}

function editRecord(id) {
  const record = records.find(record => record.id === id);
  document.getElementById('record-id').value = record.id;
  document.getElementById('name').value = record.name;
  document.getElementById('date').value = record.date;

  // Change the button text to "Update Record"
  document.getElementById('submit-btn').textContent = 'Update Record';

  // Set the editing state
  editingRecordId = id;
}

function updateRecord(id, name, date) {
  const record = records.find(record => record.id == id); // Ensure type matching
  if (record) {
    record.name = name;
    record.date = date;
    renderTable();
  }
}
