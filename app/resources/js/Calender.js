/* eslint-env browser */

import {CAL_SINGLE} from "./createICal.js";
import {sendDateToServer} from "./index.js";

class Calender {

    clickListenerCalender() {
        let calenderButton = document.querySelector(".calender"),
            closeButton = document.querySelector(".overlay-close"),
            submitButton = document.querySelector(".overlay-submit-button");
        calenderButton.addEventListener("click", openLayout);
        closeButton.addEventListener("click", closeOverlay);
        submitButton.addEventListener("click", submitMeeting); 
    }
}

let overlay = document.querySelector(".overlay"),
    overlayBackground = document.querySelector(".overlay-background"),
    date = document.querySelector(".overlay-choose-date"),
    time = document.querySelector(".overlay-choose-time"),
    url;

function openLayout() {
    overlay.classList.add("active");
    overlayBackground.classList.add("active");
}

function closeOverlay() {
    overlay.classList.remove("active");
    overlayBackground.classList.remove("active");
}

function submitMeeting(){
    let error = document.querySelector(".overlay-input-error"),
    overlayOutputLink = document.querySelector(".overlay-output-link");
    
    if (date.value !== "" && time.value !== "") {
        error.classList.remove("active");
        sendDateToServer();
        overlayOutputLink.classList.add("active");
    } else {
        error.classList.add("active");
    }
}

function readFormInput() {
    let overlayOutputExplanation = document.querySelector(".overlay-output-explanation");
    overlayOutputExplanation.classList.add("active");
    overlayOutputExplanation.innerHTML = "Der Raum ist reserviert für den " + date.value + " um " + time.value + " Uhr. <br>" +
        "Unter der folgenden Url kannst du schon einmal beitreten und alles einstellen: " + window.location.href + url;
}

function addICalInCalender() {
    let dateAndTime = date.value + " " + time.value;
    CAL_SINGLE.addEvent("WatchMates", "Du hast dir diese URL gesichert: " + window.location.href + url, "", dateAndTime, "");
    document.querySelector(".overlay-output-link").addEventListener("click", function () {
        CAL_SINGLE.download("Termin WatchMates");
    });
}

export function getUrlFromIndex(data){
    url = data;
    readFormInput();
    addICalInCalender();
}

export { Calender };