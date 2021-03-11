import {CAL_SINGLE} from "./createICal.js";

class Calender {

    clickListenerCalender() {
        let calenderButton = document.querySelector(".calender"),
            closeButton = document.querySelector(".overlay-close"),
            submitButton = document.querySelector(".overlay-submit-button"),
            date = document.querySelector(".overlay-choose-date"),
            time = document.querySelector(".overlay-choose-time"),
            error = document.querySelector(".overlay-input-error"),
            overlayOutputLink = document.querySelector(".overlay-output-link");
        calenderButton.addEventListener("click", openLayout);
        closeButton.addEventListener("click", closeOverlay);
        submitButton.addEventListener("click", function () {
            if (date.value !== "" && time.value !== "") {
                readFormInput();
                error.classList.remove("active");
                addICalInCalender();
                overlayOutputLink.classList.add("active");
            } else {
                error.classList.add("active");
            }
        });
    }
}

let overlay = document.querySelector(".overlay"),
    overlayBackground = document.querySelector(".overlay-background"),
    date = document.querySelector(".overlay-choose-date"),
    time = document.querySelector(".overlay-choose-time");

function openLayout() {
    overlay.classList.add("active");
    overlayBackground.classList.add("active");
}

function closeOverlay() {
    overlay.classList.remove("active");
    overlayBackground.classList.remove("active");
}

function readFormInput() {
    let overlayOutputExplanation = document.querySelector(".overlay-output-explanation");
    overlayOutputExplanation.classList.add("active");
    overlayOutputExplanation.innerHTML = "Der Raum ist reserviert für den " + date.value + " um " + time.value + " Uhr. <br>" +
        "Unter der folgenden Url kannst du schon einmal beitreten und alles einstellen: ?08748456148745189?";
}

function addICalInCalender() {
    let dateAndTime = date.value + " " + time.value;
    CAL_SINGLE.addEvent("WatchMates", "Du hast dir diese URL gesichert: ?50510113210471455121?", "", dateAndTime, "");
    document.querySelector(".overlay-output-link").addEventListener("click", function () {
        CAL_SINGLE.download("Termin WatchMates");
    });
}

export { Calender };