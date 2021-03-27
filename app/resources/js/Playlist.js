/* eslint-env node */

import { sendDeleteNumber, sendDragDropPosition, changeVideoOnClick } from "./room.js";

var dragTarget,
  playlistSources;

export class Playlist {

  constructor(playlist) {
    playlistSources = [];
    this.addFile(playlist);
    this.setListener();
    this.initDeleteButton();
  }

  addFile(playlist) {
    let playlistBox = document.querySelector(".playlist-body"),
      playlistTemplate = document.getElementById("playlistTemplate");

      playlist.forEach(element => {
        let testClone = document.importNode(playlistTemplate.content, true),
        testImg, testP, fileEnding, testVideo;
        playlistBox.appendChild(testClone);
        testClone = playlistBox.lastChild.previousSibling;
        testVideo = testClone.querySelector("video");
        testImg = testClone.querySelector("img");
        testP = testClone.querySelector("p");
        fileEnding = element.src.split(".").pop();

        testP.innerHTML = element.title;
        if(fileEnding === "png" || fileEnding ==="jpeg" || fileEnding === "jpg"){
          testVideo.remove();
          testImg.src = element.src;
        }
        else if(fileEnding === "mp4"||fileEnding === "mp3"||fileEnding === "wav" ||fileEnding === "webm") {
          testImg.remove();
          testVideo.src = element.src;
        }
        else{
          testClone.remove();
          return;
        }
        playlistSources.push(element.src);
      });

  }
  setListener() {
    let playlistEls = document.querySelectorAll("li");
    playlistEls.forEach(element => {
      element.addEventListener("dragstart", dragStart);
      element.addEventListener("dragover", dragOver);
      element.addEventListener("dragenter", dragEnter);
      element.addEventListener("drop", dragDrop);
      element.addEventListener("click", changeVideoOnClick);
    });
  }

  initDeleteButton() {
    var deleteButtons = document.querySelectorAll(".deleteButtonPlaylist"),
      i;
    for (i = 0; i < deleteButtons.length; i++) {
      deleteButtons[i].addEventListener("click", deletePlaylistObject);
    }
  }

  deletePlaylistEl(deleteNumber) {
    var allChildElemtsPlaylistBody = document.querySelectorAll("#playlistElement");

    allChildElemtsPlaylistBody[deleteNumber].remove();
    playlistSources.splice(deleteNumber, 1);
  }

  changeDragDropPosition(dragPosition, dropPosition) {
    var allPlaylistElements = document.querySelectorAll("#playlistElement"),
      dragElement = allPlaylistElements[dragPosition],
      dragElementCopy = dragElement.cloneNode(true),
      dropElement = allPlaylistElements[dropPosition];
    dragElement.parentNode.insertBefore(dragElementCopy, dropElement);
    dragElement.remove();
    this.setListener();
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

  getPlaylistSources() {
    return playlistSources;
  }

  isVideo(currentTrack){
    var isVideo = false,
    trackFileType = playlistSources[currentTrack].split(".").pop();
    if (trackFileType === "mp4" || trackFileType ==="mp3" || trackFileType ==="wav" || trackFileType ==="webm"){
      isVideo = true;
    }
    return isVideo;
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
  var dropTarget = eventDrop.target.parentNode.parentNode,
    iDrag = 0,
    iDrop = 0,
    tempDragTarget = dragTarget,
    tempDropTarget = dropTarget;
   
  if (dragTarget !== undefined && dragTarget.parentNode !== dropTarget) {

    // get position of drag element
    while (tempDragTarget.previousSibling !== null) {
      if (tempDragTarget.previousSibling.tagName === "LI") {
        iDrag++;
      }
      tempDragTarget = tempDragTarget.previousSibling;
    }
    // get position of drop element
    while (tempDropTarget.previousSibling !== null) {
      if (tempDropTarget.previousSibling.tagName === "LI") {
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
    tempEl = el.parentNode.parentNode;

  while (tempEl.previousSibling !== null) {
    if (tempEl.previousSibling.tagName === "LI") {
      i++;
    }
    tempEl = tempEl.previousSibling;
  }
  sendDeleteNumber(i);
}