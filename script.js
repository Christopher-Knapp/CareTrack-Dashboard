let patients = JSON.parse(localStorage.getItem("patients")) || [
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

// Dashboard Elements

const allPatients = document.getElementById("allPatients");
const totalPatients = document.getElementById("totalPatients");
const followUpsElement = document.getElementById("followUps");

const patientTable = document.querySelector("tbody");

// Update Dashboard

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

// Display Patients

function displayPatients(list = patients) {
  patientTable.innerHTML = "";

  list.forEach((patient) => {
    const index = patients.indexOf(patient);

    const row = document.createElement("tr");

    row.innerHTML = `

      <td>${patient.name}</td>

      <td class="${patient.status.toLowerCase().replace(" ", "-")}">
        ${patient.status}
      </td>

      <td>${patient.program}</td>

      <td class="actions">

        <button 
        class="edit-btn"
        onclick="editPatient(${index})">
        Edit
        </button>


        <button 
        class="delete-btn"
        onclick="deletePatient(${index})">
        Delete
        </button>

      </td>

    `;

    patientTable.appendChild(row);
  });
}

// Search Patients

const searchInput = document.getElementById("searchPatient");

searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm),
  );

  displayPatients(filteredPatients);
});

// Modal

const modal = document.getElementById("patientModal");
const addPatientBtn = document.getElementById("addPatientBtn");
const closeModal = document.getElementById("closeModal");
const patientForm = document.getElementById("patientForm");

addPatientBtn.addEventListener("click", () => {
  modal.style.display = "block";
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

// Add Patient

patientForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const newPatient = {
    name: document.getElementById("patientName").value,

    status: document.getElementById("patientStatus").value,

    program: document.getElementById("patientProgram").value,
  };

  patients.push(newPatient);

  localStorage.setItem("patients", JSON.stringify(patients));

  updateDashboard();

  displayPatients();

  patientForm.reset();

  modal.style.display = "none";
});

// Delete Patient

function deletePatient(index) {
  const confirmDelete = confirm(
    "Are you sure you want to delete this patient?",
  );

  if (confirmDelete) {
    patients.splice(index, 1);

    localStorage.setItem("patients", JSON.stringify(patients));

    updateDashboard();

    displayPatients();
  }
}

// Edit Patient

function editPatient(index) {
  const patient = patients[index];

  const newName = prompt("Patient name:", patient.name);

  const newStatus = prompt("Status:", patient.status);

  const newProgram = prompt("Program:", patient.program);

  if (newName && newStatus && newProgram) {
    patient.name = newName;

    patient.status = newStatus;

    patient.program = newProgram;

    localStorage.setItem("patients", JSON.stringify(patients));

    updateDashboard();

    displayPatients();
  }
}

// Start Dashboard

updateDashboard();

displayPatients();
