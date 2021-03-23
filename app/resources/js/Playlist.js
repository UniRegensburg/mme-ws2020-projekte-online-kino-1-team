/* eslint-env node */

import {sendDeleteNumber, sendDragDropPosition} from "./room.js";

var dragTarget,
playlistSources;

export class Playlist {

  constructor(playlist) {
    let playlistBox = document.querySelector(".playlist-body"),
      playlistTemplate = document.getElementById("playlistTemplate"),
      templateVideo = playlistTemplate.content.querySelector("video"),
      templateP = playlistTemplate.content.querySelector("p");

      playlistSources = [];

    playlist.forEach(element => {
      templateVideo.src = element.src;
      templateP.innerHTML = element.title;
      let clone = document.importNode(playlistTemplate.content, true);
      playlistBox.appendChild(clone);
      playlistSources.push(element.src);

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
      templateP.innerHTML = element.title;
      let clone = document.importNode(playlistTemplate.content, true);
      playlistBox.appendChild(clone);
      playlistSources.push(element.src);

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
  deletePlaylistEl(deleteNumber){
    var allChildElemtsPlaylistBody = document.querySelectorAll("#playlistElement");
    
    allChildElemtsPlaylistBody[deleteNumber].remove();
    playlistSources.splice(deleteNumber, 1);
    console.log("deleted: " + playlistSources);
    }
    
  changeDragDropPosition(dragPosition, dropPosition){
    var allPlaylistElements = document.querySelectorAll("#playlistElement"),
    dragElement = allPlaylistElements[dragPosition],
    dragElementCopy = dragElement.cloneNode(true),
    dropElement = allPlaylistElements[dropPosition];
    dragElement.parentNode.insertBefore(dragElementCopy,dropElement);
    dragElement.remove();
    this.setDragAndDrop();
    this.initDeleteButton();

    let startPlaylist = playlistSources,
        tempPlaylist = [],
        iDragEl = startPlaylist[dragPosition];

      for (let index = 0; index < startPlaylist.length; index++) {
        if (index === dropPosition) {
          tempPlaylist.push(iDragEl);
        }
        if (index !== dragPosition) {
          tempPlaylist.push(startPlaylist[index]);
        }
      }
    playlistSources = tempPlaylist;
  }

  getPlaylistSources(){
    return playlistSources;
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

    iDrag = 0,
    iDrop = 0,
    tempDragTarget = dragTarget,
    tempDropTarget = dropTarget;

  if (dragTarget !== undefined && dragTarget.parentNode !== dropTarget) {

    // get position of drag element
    while (tempDragTarget.previousSibling !== null) {
      if(tempDragTarget.previousSibling.tagName === "LI"){
        iDrag++;
      }
      tempDragTarget = tempDragTarget.previousSibling;
    }
    // get position of drop element
    while (tempDropTarget.previousSibling !== null) {
      if(tempDropTarget.previousSibling.tagName === "LI"){
        iDrop++;
      }
      tempDropTarget = tempDropTarget.previousSibling;
    }
    sendDragDropPosition(iDrag, iDrop);
  }
}

function deletePlaylistObject(event) {
  var el = event.target,
    i = 0,
    tempEl = el.parentNode;

  while (tempEl.previousSibling !== null) {
    if(tempEl.previousSibling.tagName === "LI"){
      i++;
    }
    tempEl = tempEl.previousSibling;
  }
  sendDeleteNumber(i);
}