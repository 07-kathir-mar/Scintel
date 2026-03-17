const API_URL = "http://localhost:3000/api/upcoming-events";
const ACTIVITY_API = "http://localhost:3000/api/activities";

const ASSOCIATION_BATCH_API = "http://localhost:3000/api/association-batches";
const ASSOCIATION_SPECIFIC_API = "http://localhost:3000/api/association-batch/";

const GLORIES_API = "http://localhost:3000/api/glories";

async function loadEvents(){

    const response = await fetch(API_URL);
    const events = await response.json();

    const container = document.getElementById("eventsContainer");

    events.forEach(event => {

        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <div class="image"></div>

            <div class="content">

                <h3>${event.event_title}</h3>

                <p>${event.event_short_description}</p>

                <button onclick="viewDetails(${event.event_id})">
                    View Details
                </button>

                <button onclick="registerEvent('${event.event_link}')">
                    Register
                </button>

            </div>
        `;

        container.appendChild(card);
    });
}

async function loadActivities(){

    const response = await fetch(ACTIVITY_API);
    const batches = await response.json();

    const table = document.getElementById("activitiesContainer");

    batches.forEach(batch => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${batch.batch}</td>
            <td>${batch.activity_count}</td>
            <td>
                <button onclick="viewActivityBatch('${batch.batch}')">
                    View Details
                </button>
            </td>
        `;

        table.appendChild(row);

    });

}

function viewDetails(id){
    window.location.href = `upcomingEventViewDetailPage.html?id=${id}`;
}

function registerEvent(link){
    if(link){
        window.open(link, "_blank");
    }
}

function viewActivityBatch(batch){
    window.location.href = `activityEventPage.html?batch=${batch}`;
}

async function loadAssociationBatches(){

    const response = await fetch(ASSOCIATION_BATCH_API);
    const batches = await response.json();

    const container = document.getElementById("batchTabs");

    batches.forEach(batch => {

        const btn = document.createElement("button");

        btn.innerText = batch.batch_year;

        btn.onclick = () => loadAssociationBatchDetails(batch.batch_year);

        container.appendChild(btn);

    });

    if(batches.length > 0){
        loadAssociationBatchDetails(batches[0].batch_year);
    }
}

async function loadAssociationBatchDetails(year){

    const response = await fetch(ASSOCIATION_SPECIFIC_API + year);
    const data = await response.json();

    const batch = data.batch_info;
    const members = data.members;

    document.getElementById("batchTitle").innerText = batch.title;
    document.getElementById("batchDescription").innerText = batch.description;

    const imageDiv = document.getElementById("batchImage");
    imageDiv.style.backgroundImage = `url(${batch.image_url})`;
    imageDiv.style.backgroundSize = "cover";

    const table = document.getElementById("membersTable");
    table.innerHTML = "";

    members.forEach(member => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${member.name}</td>
            <td>${member.register_number}</td>
            <td>${member.role}</td>
            <td>${year}</td>
        `;

        table.appendChild(row);

    });

}

/* ------------------ GLORIES SECTION ------------------ */

async function loadGlories(){

    const response = await fetch(GLORIES_API);
    const glories = await response.json();

    const container = document.getElementById("gloriesContainer");

    glories.forEach(glory => {

        const card = document.createElement("div");
        card.className = "glory-card";

        card.innerHTML = `
            <div class="glory-image" style="background-image:url(${glory.image_url})"></div>
            <div class="glory-content">
                <h3>${glory.title}</h3>
                <p>${glory.description}</p>
            </div>
        `;

        container.appendChild(card);

    });

}

loadEvents();
loadActivities();
loadAssociationBatches();
loadGlories();