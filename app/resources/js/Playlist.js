/* eslint-env node */

import {sendDeleteNumber} from "./room.js";

var dragTarget;

export class Playlist {

  constructor(playlist) {
    let playlistBox = document.querySelector(".playlist-body"),
      playlistTemplate = document.getElementById("playlistTemplate"),
      templateVideo = playlistTemplate.content.querySelector("video"),
      templateP = playlistTemplate.content.querySelector("p");

    playlist.forEach(element => {
      templateVideo.src = element.src;
      templateP.innerHTML = element.titel;
      let clone = document.importNode(playlistTemplate.content, true);
      playlistBox.appendChild(clone);

    });
    this.setDragAndDrop();
    this.initDeleteButton();
  }

  addFile(playlist) {
    let playlistBox = document.querySelector(".playlist-body"),
      playlistTemplate = document.getElementById("playlistTemplate"),
      templateVideo = playlistTemplate.content.querySelector("video"),
      templateP = playlistTemplate.content.querySelector("p");

    playlist.forEach(element => {
      templateVideo.src = element.src;
      templateP.innerHTML = element.titel;
      let clone = document.importNode(playlistTemplate.content, true);
      playlistBox.appendChild(clone);

    });

  }
  setDragAndDrop() {
    let playlistEls = document.querySelectorAll("li");
    playlistEls.forEach(element => {
      element.addEventListener("dragstart", dragStart);
      element.addEventListener("dragover", dragOver);
      element.addEventListener("dragenter", dragEnter);
      element.addEventListener("drop", dragDrop);
    });
  }
  initDeleteButton() {
    var deleteButtons = document.querySelectorAll(".deleteButtonPlaylist"),
      i;
    for (i = 0; i < deleteButtons.length; i++) {
      deleteButtons[i].addEventListener("click", deletePlaylistObject);
    }
  }
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
    playlistBox = document.querySelector(".playlist-body");
  if (dragTarget !== undefined && dragTarget.parentNode !== dropTarget) {
    playlistBox.insertBefore(dragTarget, dropTarget);
  }

}

function deletePlaylistObject(event) {
  var el = event.target,
    i = 0,
    tempEl = el.parentNode;
  //console.log(tempEl.tagName);
  while (tempEl.previousSibling !== null) {
    if(tempEl.previousSibling.tagName === "LI"){
      i++;
    }
    tempEl = tempEl.previousSibling;
    //console.log(tempEl);
  }
  //console.log(i);
  el.parentNode.remove(el);
  sendDeleteNumber(i);
}
