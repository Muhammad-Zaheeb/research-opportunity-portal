const API_URL = "http://127.0.0.1:8000/api/opportunities";


const form = document.getElementById("opportunityForm");
const message = document.getElementById("message");
const opportunitiesList = document.getElementById("opportunitiesList");

const opportunityId = document.getElementById("opportunityId");
const title = document.getElementById("title");
const description = document.getElementById("description");
const researchArea = document.getElementById("research_area");
const facultyName = document.getElementById("faculty_name");
const department = document.getElementById("department");
const requiredSkills = document.getElementById("required_skills");
const availablePositions = document.getElementById("available_positions");
const applicationDeadline = document.getElementById("application_deadline");
const statusField = document.getElementById("status");

const formTitle = document.getElementById("formTitle");
const submitButton = document.getElementById("submitButton");
const cancelButton = document.getElementById("cancelButton");


function showMessage(text, type = "success") {
    message.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show">
            ${text}
            <button
                type="button"
                class="btn-close"
                data-bs-dismiss="alert">
            </button>
        </div>
    `;
}


function escapeHtml(value) {
    const div = document.createElement("div");
    div.textContent = value ?? "";
    return div.innerHTML;
}


async function loadOpportunities() {

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to load opportunities.");
        }

        const opportunities = await response.json();

        displayOpportunities(opportunities);

    } catch (error) {

        showMessage(error.message, "danger");

    }
}


function displayOpportunities(opportunities) {

    if (opportunities.length === 0) {

        opportunitiesList.innerHTML = `
            <div class="empty-state">
                <h5>No research opportunities available</h5>
                <p>Create the first opportunity using the form.</p>
            </div>
        `;

        return;
    }


    opportunitiesList.innerHTML = opportunities.map(opportunity => {

        const isClosed = opportunity.status === "Closed";

        return `
            <div class="card opportunity-card shadow-sm ${
                isClosed ? "closed-card" : ""
            }">

                <div class="card-body">

                    <div class="d-flex justify-content-between align-items-start">

                        <div>

                            <h5 class="card-title mb-1">
                                ${escapeHtml(opportunity.title)}
                            </h5>

                            <p class="text-muted mb-2">
                                ${escapeHtml(opportunity.research_area)}
                                •
                                ${escapeHtml(opportunity.department)}
                            </p>

                        </div>

                        <span class="badge ${
                            isClosed ? "bg-secondary" : "bg-success"
                        } status-badge">

                            ${escapeHtml(opportunity.status)}

                        </span>

                    </div>


                    <p class="card-text">
                        ${escapeHtml(opportunity.description)}
                    </p>


                    <p class="mb-1">
                        <strong>Faculty:</strong>
                        ${escapeHtml(opportunity.faculty_name)}
                    </p>


                    <p class="mb-1">
                        <strong>Positions:</strong>
                        ${opportunity.available_positions}
                    </p>


                    <p class="mb-3">
                        <strong>Deadline:</strong>
                        ${escapeHtml(opportunity.application_deadline)}
                    </p>


                    <div class="d-flex flex-wrap gap-2">

                        <button
                            class="btn btn-sm btn-outline-primary"
                            onclick="viewOpportunity(${opportunity.id})"
                        >
                            View Details
                        </button>


                        <button
                            class="btn btn-sm btn-outline-secondary"
                            onclick="editOpportunity(${opportunity.id})"
                        >
                            Edit
                        </button>


                        ${
                            !isClosed
                                ? `
                                    <button
                                        class="btn btn-sm btn-warning"
                                        onclick="closeOpportunity(${opportunity.id})"
                                    >
                                        Close
                                    </button>
                                `
                                : ""
                        }


                        <button
                            class="btn btn-sm btn-outline-danger"
                            onclick="deleteOpportunity(${opportunity.id})"
                        >
                            Delete
                        </button>

                    </div>

                </div>

            </div>
        `;

    }).join("");
}


async function viewOpportunity(id) {

    try {

        const response = await fetch(`${API_URL}/${id}`);

        if (!response.ok) {
            throw new Error("Opportunity not found.");
        }

        const opportunity = await response.json();

        document.getElementById("detailsTitle").textContent =
            opportunity.title;


        document.getElementById("detailsBody").innerHTML = `

            <div class="row g-3">

                <div class="col-md-6">
                    <span class="detail-label">Opportunity ID</span>
                    <p>${opportunity.id}</p>
                </div>

                <div class="col-md-6">
                    <span class="detail-label">Status</span>
                    <p>${escapeHtml(opportunity.status)}</p>
                </div>

                <div class="col-md-6">
                    <span class="detail-label">Research Area</span>
                    <p>${escapeHtml(opportunity.research_area)}</p>
                </div>

                <div class="col-md-6">
                    <span class="detail-label">Faculty Member</span>
                    <p>${escapeHtml(opportunity.faculty_name)}</p>
                </div>

                <div class="col-md-6">
                    <span class="detail-label">Department</span>
                    <p>${escapeHtml(opportunity.department)}</p>
                </div>

                <div class="col-md-6">
                    <span class="detail-label">Available Positions</span>
                    <p>${opportunity.available_positions}</p>
                </div>

                <div class="col-12">
                    <span class="detail-label">Research Description</span>
                    <p>${escapeHtml(opportunity.description)}</p>
                </div>

                <div class="col-12">
                    <span class="detail-label">Required Skills</span>
                    <p>${escapeHtml(opportunity.required_skills)}</p>
                </div>

                <div class="col-md-6">
                    <span class="detail-label">Application Deadline</span>
                    <p>${escapeHtml(opportunity.application_deadline)}</p>
                </div>

            </div>
        `;


        const modal = new bootstrap.Modal(
            document.getElementById("detailsModal")
        );

        modal.show();

    } catch (error) {

        showMessage(error.message, "danger");

    }
}


async function editOpportunity(id) {

    try {

        const response = await fetch(`${API_URL}/${id}`);

        if (!response.ok) {
            throw new Error("Opportunity not found.");
        }

        const opportunity = await response.json();

        opportunityId.value = opportunity.id;
        title.value = opportunity.title;
        description.value = opportunity.description;
        researchArea.value = opportunity.research_area;
        facultyName.value = opportunity.faculty_name;
        department.value = opportunity.department;
        requiredSkills.value = opportunity.required_skills;
        availablePositions.value = opportunity.available_positions;
        applicationDeadline.value =
            opportunity.application_deadline;
        statusField.value = opportunity.status;


        formTitle.textContent = "Update Opportunity";
        submitButton.textContent = "Update Opportunity";
        cancelButton.classList.remove("d-none");


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    } catch (error) {

        showMessage(error.message, "danger");

    }
}


form.addEventListener("submit", async function(event) {

    event.preventDefault();


    const data = {

        title: title.value.trim(),

        description: description.value.trim(),

        research_area: researchArea.value.trim(),

        faculty_name: facultyName.value.trim(),

        department: department.value.trim(),

        required_skills: requiredSkills.value.trim(),

        available_positions: Number(
            availablePositions.value
        ),

        application_deadline:
            applicationDeadline.value,

        status: statusField.value
    };


    if (
        !data.title ||
        !data.description ||
        !data.research_area ||
        !data.faculty_name ||
        !data.department ||
        !data.required_skills ||
        !data.available_positions ||
        !data.application_deadline
    ) {

        showMessage(
            "Please fill in all required fields.",
            "danger"
        );

        return;
    }


    if (data.available_positions < 1) {

        showMessage(
            "Available positions must be at least 1.",
            "danger"
        );

        return;
    }


    try {

        const id = opportunityId.value;


        const response = await fetch(
            id ? `${API_URL}/${id}` : API_URL,
            {
                method: id ? "PUT" : "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(data)
            }
        );


        const result = await response.json();


        if (!response.ok) {

            throw new Error(
                result.detail || "Operation failed."
            );
        }


        showMessage(
            id
                ? "Research opportunity updated successfully."
                : "Research opportunity created successfully."
        );


        resetForm();

        await loadOpportunities();

    } catch (error) {

        showMessage(error.message, "danger");

    }

});


async function closeOpportunity(id) {

    if (
        !confirm(
            "Are you sure you want to close this opportunity?"
        )
    ) {
        return;
    }


    try {

        const response = await fetch(
            `${API_URL}/${id}`,
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    status: "Closed"
                })
            }
        );


        const result = await response.json();


        if (!response.ok) {

            throw new Error(
                result.detail ||
                "Failed to close opportunity."
            );

        }


        showMessage(
            "Research opportunity closed successfully."
        );


        await loadOpportunities();

    } catch (error) {

        showMessage(error.message, "danger");

    }

}


async function deleteOpportunity(id) {

    if (
        !confirm(
            "Are you sure you want to delete this opportunity?"
        )
    ) {
        return;
    }


    try {

        const response = await fetch(
            `${API_URL}/${id}`,
            {
                method: "DELETE"
            }
        );


        const result = await response.json();


        if (!response.ok) {

            throw new Error(
                result.detail ||
                "Failed to delete opportunity."
            );

        }


        showMessage(
            "Research opportunity deleted successfully."
        );


        await loadOpportunities();

    } catch (error) {

        showMessage(error.message, "danger");

    }

}


function resetForm() {

    form.reset();

    opportunityId.value = "";

    formTitle.textContent =
        "Create Opportunity";

    submitButton.textContent =
        "Create Opportunity";

    cancelButton.classList.add("d-none");

    statusField.value = "Open";

}


cancelButton.addEventListener(
    "click",
    resetForm
);


loadOpportunities();