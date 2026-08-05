// Patient Data
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

// Get Table

const patientTable = document.getElementById("patientTable");

// Display Patients

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

     <td class="actions">

  <button class="view-btn">
    View
  </button>

  <button class="edit-btn">
    Edit
  </button>

  <button class="delete-btn">
    Delete
  </button>

</td>
    `;

    patientTable.appendChild(row);
  });
}

// Load Patients

displayPatients();

// Search Patients

const searchInput = document.getElementById("searchPatient");

searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm),
  );

  patientTable.innerHTML = "";

  filteredPatients.forEach((patient) => {
    const row = document.createElement("tr");

    row.innerHTML = `

      <td>${patient.name}</td>

      <td class="${patient.status.toLowerCase().replace(" ", "-")}">
        ${patient.status}
      </td>

      <td>${patient.program}</td>


      <td class="actions">

        <button class="view-btn">
          View
        </button>

        <button class="edit-btn">
          Edit
        </button>

        <button class="delete-btn">
          Delete
        </button>

      </td>

    `;

    patientTable.appendChild(row);
  });
});
// Patient Modal

const modal = document.getElementById("patientModal");
const addPatientBtn = document.getElementById("addPatientBtn");
const closeModal = document.getElementById("closeModal");
const patientForm = document.getElementById("patientForm");

addPatientBtn.addEventListener("click", () => {
  patientForm.reset();

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
// Save New Patient

patientForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const newPatient = {
    name: document.getElementById("patientName").value,

    status: document.getElementById("patientStatus").value,

    program: document.getElementById("patientProgram").value,
  };

  patients.push(newPatient);

  localStorage.setItem("patients", JSON.stringify(patients));

  displayPatients();

  patientForm.reset();

  modal.style.display = "none";
});
