const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const API_URL = `http://localhost:3000/api/activities/event/${id}`;

async function loadActivity(){

    const response = await fetch(API_URL);
    const event = await response.json();

    document.getElementById("title").innerText = event.title;
    document.getElementById("description").innerText = event.description;

    document.getElementById("participants").innerText = event.participants;

    document.getElementById("resourcePerson").innerText =
        event.resource_person_name + " - " + event.resource_person_description;

    document.getElementById("winner").innerText =
        event.winner_name + " - " + event.winner_description;

    document.getElementById("testimonial").innerText =
        event.testimonials_name + " (" + event.testimonials_class + ") - " + event.testimonials_feedback;

}

loadActivity();