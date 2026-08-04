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
        class="view-btn"
        onclick="viewPatient(${index})">
        View
    </button>

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

const editIndex = document.getElementById("editIndex");

const modalTitle = document.getElementById("modalTitle");

const savePatientBtn = document.getElementById("savePatientBtn");

const detailsPanel = document.getElementById("patientDetails");
const closeDetails = document.getElementById("closeDetails");

const detailsName = document.getElementById("detailsName");
const detailsStatus = document.getElementById("detailsStatus");
const detailsProgram = document.getElementById("detailsProgram");
const detailsDOB = document.getElementById("detailsDOB");
const detailsPhone = document.getElementById("detailsPhone");
const detailsCounselor = document.getElementById("detailsCounselor");
const detailsDiagnosis = document.getElementById("detailsDiagnosis");
const detailsNotes = document.getElementById("detailsNotes");

addPatientBtn.addEventListener("click", () => {
  patientForm.reset();

  editIndex.value = "";

  modalTitle.textContent = "Add New Patient";

  savePatientBtn.textContent = "Save Patient";

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

  const patientData = {
    name: document.getElementById("patientName").value,
    status: document.getElementById("patientStatus").value,
    program: document.getElementById("patientProgram").value,
    dob: document.getElementById("patientDOB").value,
    phone: document.getElementById("patientPhone").value,
    counselor: document.getElementById("patientCounselor").value,
    diagnosis: document.getElementById("patientDiagnosis").value,
    notes: document.getElementById("patientNotes").value,
  };

  if (editIndex.value === "") {
    patients.push(patientData);
  } else {
    patients[editIndex.value] = patientData;
  }

  localStorage.setItem("patients", JSON.stringify(patients));

  updateDashboard();

  displayPatients();

  patientForm.reset();

  editIndex.value = "";

  modalTitle.textContent = "Add New Patient";
  savePatientBtn.textContent = "Save Patient";

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

  document.getElementById("patientName").value = patient.name;
  document.getElementById("patientStatus").value = patient.status;
  document.getElementById("patientProgram").value = patient.program;
  document.getElementById("patientDOB").value = patient.dob || "";
  document.getElementById("patientPhone").value = patient.phone || "";
  document.getElementById("patientCounselor").value = patient.counselor || "";
  document.getElementById("patientDiagnosis").value = patient.diagnosis || "";
  document.getElementById("patientNotes").value = patient.notes || "";

  editIndex.value = index;

  modalTitle.textContent = "Edit Patient";
  savePatientBtn.textContent = "Update Patient";

  modal.style.display = "block";
}
function viewPatient(index) {
  const patient = patients[index];

  detailsName.textContent = patient.name;
  detailsStatus.textContent = patient.status;
  detailsProgram.textContent = patient.program;

  detailsDOB.textContent = patient.dob || "Not entered";
  detailsPhone.textContent = patient.phone || "Not entered";
  detailsCounselor.textContent = patient.counselor || "Christopher";
  detailsDiagnosis.textContent = patient.diagnosis || "Not entered";
  detailsNotes.textContent = patient.notes || "No notes yet.";

  detailsPanel.classList.add("open");
  closeDetails.addEventListener("click", () => {
    detailsPanel.classList.remove("open");
  });
}
// Start Dashboard

updateDashboard();

displayPatients();
