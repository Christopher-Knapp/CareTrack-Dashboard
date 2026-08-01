const patients = [
  {
    name: "Sarah Jones",
    status: "Follow Up",
    program: "Outpatient",
  },
  {
    name: "John Smith",
    status: "Active",
    program: "Residential",
  },
  {
    name: "Mike Brown",
    status: "Discharged",
    program: "Aftercare",
  },
];

// Select dashboard elements
const allPatients = document.getElementById("allPatients");
const totalPatients = document.getElementById("totalPatients");
const followUpsElement = document.getElementById("followUps");
const patientTable = document.querySelector("tbody");

// Calculate patient statistics
const total = patients.length;

const activePatients = patients.filter(
  (patient) => patient.status === "Active",
).length;

const followUps = patients.filter(
  (patient) => patient.status === "Follow Up",
).length;

const dischargedPatients = patients.filter(
  (patient) => patient.status === "Discharged",
).length;

// Update dashboard numbers
// Update dashboard numbers
allPatients.textContent = total;
totalPatients.textContent = activePatients;
followUpsElement.textContent = followUps;
// Add patients to table
function displayPatients() {
  patientTable.innerHTML = "";

  patients.forEach((patient) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${patient.name}</td>
      <td class="${patient.status.toLowerCase().replace(" ", "-")}">
        ${patient.status}
      </td>
      <td>${patient.program}</td>
    `;

    patientTable.appendChild(row);
  });
}

// Console check
console.log("Total Patients:", total);
console.log("Active Patients:", activePatients);
console.log("Follow Ups:", followUps);
console.log("Discharged:", dischargedPatients);

function updateDashboard() {
  const total = patients.length;

  const activePatients = patients.filter(
    (patient) => patient.status === "Active",
  ).length;

  const followUps = patients.filter(
    (patient) => patient.status === "Follow Up",
  ).length;

  allPatients.textContent = total;
  totalPatients.textContent = activePatients;
  followUpsElement.textContent = followUps;
}
// Run function
updateDashboard();
displayPatients();
