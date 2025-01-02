// Store communication logs in localStorage to persist data
let communicationLogs = JSON.parse(localStorage.getItem('communicationLogs')) || [];

// Function to switch between tabs
function switchTab(tabId) {
    const contents = document.querySelectorAll('.content');
    contents.forEach(content => content.classList.remove('active'));

    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));

    document.getElementById(tabId).classList.add('active');
    document.querySelector(`.tab[onclick="switchTab('${tabId}')"]`).classList.add('active');
}

// Function to log communication
function logCommunication(event) {
    event.preventDefault();

    const company = document.getElementById('selectCompany').value;
    const type = document.getElementById('communicationType').value;
    const date = document.getElementById('communicationDate').value;
    const notes = document.getElementById('communicationNotes').value;

    if (company && type && date) {
        const newLog = { company, type, date, notes };
        communicationLogs.push(newLog);
        localStorage.setItem('communicationLogs', JSON.stringify(communicationLogs));

        alert(`Communication logged for ${company} as ${type} on ${date}. Notes: ${notes}`);
        updateLogTable();
        document.getElementById('communicationActionForm').reset();
    } else {
        alert('Please fill in all required fields.');
    }
}

// Function to update the communication log table
function updateLogTable() {
    const logTableBody = document.getElementById('logTable').getElementsByTagName('tbody')[0];
    logTableBody.innerHTML = '';

    communicationLogs.forEach(log => {
        const row = logTableBody.insertRow();
        row.innerHTML = `
            <td>${log.company}</td>
            <td>${log.type}</td>
            <td>${log.date}</td>
            <td>${log.notes}</td>
        `;
    });
}

// Function to filter report
function filterReport() {
    const company = document.getElementById('companyFilter').value;
    const method = document.getElementById('methodFilter').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    const filteredLogs = communicationLogs.filter(log => {
        return (
            (!company || log.company === company) &&
            (!method || log.type === method) &&
            (!startDate || new Date(log.date) >= new Date(startDate)) &&
            (!endDate || new Date(log.date) <= new Date(endDate))
        );
    });

    displayFilteredLogs(filteredLogs);
}

// Function to display filtered logs
function displayFilteredLogs(filteredLogs) {
    const logTableBody = document.getElementById('filteredLogTable').getElementsByTagName('tbody')[0];
    logTableBody.innerHTML = '';

    filteredLogs.forEach(log => {
        const row = logTableBody.insertRow();
        row.innerHTML = `
            <td>${log.company}</td>
            <td>${log.type}</td>
            <td>${log.date}</td>
            <td>${log.notes}</td>
        `;
    });
}

// Function to download the report
function downloadReport(format) {
    alert(`Downloading report in ${format.toUpperCase()} format.`);
    // Add logic for report generation (CSV, PDF)
}

// Initialize the communication logs on page load
document.addEventListener('DOMContentLoaded', () => {
    updateLogTable();
});
