const params = new URLSearchParams(window.location.search);
const eventId = params.get("id");

let currentEvent = null;

async function loadEventDetails() {

    const response = await fetch(`http://localhost:3000/api/upcoming-events/${eventId}`);
    const event = await response.json();

    console.log(event);

    currentEvent = event;

    document.getElementById("title").innerText = event.event_title;
    document.getElementById("description").innerText = event.event_description;

    document.getElementById("registration_start").innerText =
        "Registration start: " + event.start_date;

    document.getElementById("registration_end").innerText =
        "Registration end: " + event.end_date;

    document.getElementById("event_start").innerText =
        "Event start: " + event.start_date;

    document.getElementById("event_end").innerText =
        "Event end: " + event.end_date;

    document.getElementById("faculty").innerText =
        "Faculty Coordinator: " + event.faculty_contact;

    document.getElementById("student").innerText =
        "Student Coordinator: " + event.student_contact;
}

function registerEvent() {

    if (currentEvent && currentEvent.event_link) {
        window.open(currentEvent.event_link, "_blank");
    }

}

function downloadPDF() {

    if (currentEvent && currentEvent.brochure_url) {

        const link = document.createElement("a");
        link.href = currentEvent.brochure_url;
        link.download = "";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    }

}

loadEventDetails();