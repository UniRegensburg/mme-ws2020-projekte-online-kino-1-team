class Calender {

    clickListenerCalender() {
        let calenderButton = document.querySelector(".calender"),
            closeButton = document.querySelector(".overlay-close"),
            submitButton = document.querySelector(".overlay-submit-button"),
            date = document.querySelector(".overlay-choose-date"),
            time = document.querySelector(".overlay-choose-time"),
            error = document.querySelector(".overlay-input-error");
        calenderButton.addEventListener("click", openLayout);
        closeButton.addEventListener("click", closeOverlay);
        submitButton.addEventListener("click", function(){
            if(date.value !== "" && time.value !== ""){
                readFormInput();
                error.classList.remove("active");                
            }else{
                error.classList.add("active");
            }
        });
    }
}

let overlay = document.querySelector(".overlay"),
    overlayBackground = document.querySelector(".overlay-background");

function openLayout() {
    overlay.classList.add("active");
    overlayBackground.classList.add("active");
}

function closeOverlay() {
    overlay.classList.remove("active");
    overlayBackground.classList.remove("active");
}

function readFormInput() {
    let date = document.querySelector(".overlay-choose-date"),
    time = document.querySelector(".overlay-choose-time"),
    overlayOutput = document.querySelector(".overlay-output");
    overlayOutput.classList.add("active");
    overlayOutput.innerHTML = "Der Raum ist reserviert für den " + date.value + " um " + time.value + " Uhr. <br>" + 
        "Unter der folgenden Url kannst du schon einmal beitreten und alles einstellen: ?08748456148745189? <br><br>" + 
        "Klicke hier, um den Termin in deinem Kalender zu speichern.";
}

export { Calender };