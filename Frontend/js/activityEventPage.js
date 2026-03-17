const params = new URLSearchParams(window.location.search);
const batch = params.get("batch");

const API_URL = `http://localhost:3000/api/activities/batch/${batch}`;

document.getElementById("batchTitle").innerText = batch + " Activities";

async function loadActivities(){

    const response = await fetch(API_URL);
    const events = await response.json();

    const container = document.getElementById("eventsContainer");

    events.forEach(event => {

        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <div class="image"></div>

            <h3>${event.title}</h3>

            <p>${event.description}</p>

            <button onclick="viewActivity(${event.activity_id})">
                View Details
            </button>
        `;

        container.appendChild(card);

    });

}

function viewActivity(id){

    window.location.href = `activitySpecficEventPage.html?id=${id}`;

}

loadActivities();