var dragTarget;

class Playlist {

  constructor(playlist) {
    let playlistBox = document.querySelector(".playlistBox"),
      playlistTemplate = document.getElementById("playlistTemplate"),
      templateImg = playlistTemplate.content.querySelector("img"),
      templateP = playlistTemplate.content.querySelector("p");

    playlist.forEach(element => {
      templateImg.src = element.poster;
      templateP.innerHTML = element.titel;
      let clone = document.importNode(playlistTemplate.content, true);
      playlistBox.appendChild(clone);

    });
    setDragAndDrop();
  }
  
  addFile(playlist){
    let playlistBox = document.querySelector(".playlistBox"),
      playlistTemplate = document.getElementById("playlistTemplate"),
      templateImg = playlistTemplate.content.querySelector("img"),
      templateP = playlistTemplate.content.querySelector("p");

    playlist.forEach(element => {
      templateImg.src = element.poster;
      templateP.innerHTML = element.titel;
      let clone = document.importNode(playlistTemplate.content, true);
      playlistBox.appendChild(clone);

    });
  }
}

function setDragAndDrop() {
  let playlistEls = document.querySelectorAll("li");
  playlistEls.forEach(element => {
    element.addEventListener("dragstart", dragStart);
    element.addEventListener("dragover", dragOver);
    element.addEventListener("dragenter", dragEnter);
    element.addEventListener("drop", dragDrop);
  });

}

function dragStart(eventStart) {
  dragTarget = eventStart.target;
}

function dragOver(eventOver) {
  eventOver.preventDefault();
}

function dragEnter(eventEnter) {
  eventEnter.preventDefault();
}

function dragDrop(eventDrop) {
  var dropTarget = eventDrop.target.parentNode,
    playlistBox = document.querySelector(".playlistBox");
    if(dragTarget.parentNode !== dropTarget){
      playlistBox.insertBefore(dragTarget, dropTarget);
    }
  
}

export default Playlist;