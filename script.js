let notes = ["banana", "staubsaugen"];
let notesTitles = ["Obst", "Aufgabe"];
let trashNotes = [];
let trashNotesTitles = [];
let archiveNotes = [];
let archiveNotesTitles = [];

let notesKey = "notes";
let notesTitlesKey = "note-titles";
let archiveNotesKey = "archive-notes";
let archiveNotesTitlesKey = "archive-note-titles";

let allNotes = {
  notesTitles: ["Obst", "Aufgabe"],
  notes: ["banana", "staubsaugen"],
  archivNotesTitles: [],
  archivNotes: [],
  trashNotesTitles: [],
  trashNotes: [],
};

function init() {
  let localStorage = getFromLocalStorage();
  if (localStorage.notesLocalStorage != null) {
    let notesLocalStorage = localStorage["notesLocalStorage"];
    let notesTitlesLocalStorage = localStorage["notesTitlesLocalStorage"];

    for (
      let indexNotesLocalStorage = 0;
      indexNotesLocalStorage < notesLocalStorage.length;
      indexNotesLocalStorage++
    ) {
      notes.push(notesLocalStorage[indexNotesLocalStorage]);
      notesTitles.push(notesTitlesLocalStorage[indexNotesLocalStorage]);
    }
  }
  renderNotes();
}

function moveNote(indexNote, startKey, destinationKey) {
  let noteTitle = allNotes[startKey + "Titles"].splice(indexNote, 1);
  let note = allNotes.startKey.splice(indexNote, 1);

  allNotes[destinationKey + "Titles"].push(noteTitle);
  allNotes.destinationKey.push(note);
  renderAllNotes();
}

function renderAllNotes() {
  renderNotes();
  renderArchiveNotes();
  renderTrashNotes();
}

function renderNotes() {
  let contentRef = document.getElementById("content");

  contentRef.innerHTML = "";
  for (let indexNote = 0; indexNote < notes.length; indexNote++) {
    contentRef.innerHTML += getNoteTemplate(indexNote);
  }
}

function renderTrashNotes() {
  let trashContentRef = document.getElementById("trash-content");

  trashContentRef.innerHTML = "";
  for (
    let indexTrashNote = 0;
    indexTrashNote < trashNotes.length;
    indexTrashNote++
  ) {
    trashContentRef.innerHTML += getTrashNoteTemplate(indexTrashNote);
  }
}

function renderArchiveNotes() {
  let archiveContentRef = document.getElementById("archive-content");

  archiveContentRef.innerHTML = "";
  for (
    let indexArchiveNote = 0;
    indexArchiveNote < archiveNotes.length;
    indexArchiveNote++
  ) {
    archiveContentRef.innerHTML += getArchiveNoteTemplate(indexArchiveNote);
  }
}

function addNote() {
  let noteInputRef = document.getElementById("note-input");
  let noteInput = noteInputRef.value;
  let noteTitleInputRef = document.getElementById("note-title");
  let noteTitleInput = noteTitleInputRef.value;

  if (noteInput == "" || noteTitleInput == "") {
    return;
  }

  notes.push(noteInput);
  saveToLocalStroage(notesKey, notes);
  renderNotes();
  noteInputRef.value = "";
}

function addNoteTitle() {
  let noteTitleInputRef = document.getElementById("note-title");
  let noteTitleInput = noteTitleInputRef.value;
  let noteInputRef = document.getElementById("note-input");
  let noteInput = noteInputRef.value;

  if (noteTitleInput == "") {
    return;
  }

  notesTitles.push(noteTitleInput);
  saveToLocalStroage(notesTitlesKey, notesTitles);
  renderNotes();
  noteTitleInputRef.value = "";
}

function pushToTrash(indexNote) {
  let trashNoteTitle = notesTitles.splice(indexNote, 1);
  let trashNote = notes.splice(indexNote, 1);

  trashNotesTitles.push(trashNoteTitle);
  trashNotes.push(trashNote);
  renderNotes();
  renderTrashNotes();
}

function pushToArchive(indexNote) {
  let archiveNoteTitle = notesTitles.splice(indexNote, 1);
  let archiveNote = notes.splice(indexNote, 1);

  archiveNotesTitles.push(archiveNoteTitle);
  archiveNotes.push(archiveNote);

  renderNotes();
  renderTrashNotes();
  renderArchiveNotes();
}

function pushArchiveToNotes(indexArchiveNote) {
  let noteTitle = archiveNotesTitles.splice(indexArchiveNote, 1);
  let note = archiveNotes.splice(indexArchiveNote, 1);

  notesTitles.push(noteTitle);
  notes.push(note);
  renderArchiveNotes();
  renderNotes();
}

function pushTrashToNotes(indexTrashNote) {
  let noteTitle = trashNotesTitles.splice(indexTrashNote, 1);
  let note = trashNotes.splice(indexTrashNote, 1);

  notesTitles.push(noteTitle);
  notes.push(note);
  renderTrashNotes();
  renderNotes();
}

function pushArchiveToTrash(indexArchiveNote) {
  let trashNoteTitle = archiveNotesTitles.splice(indexArchiveNote, 1);
  let trashNote = archiveNotes.splice(indexArchiveNote, 1);

  trashNotesTitles.push(trashNoteTitle);
  trashNotes.push(trashNote);
  renderArchiveNotes();
  renderTrashNotes();
}

function deleteNote(indexTrashNote) {
  trashNotesTitles.splice(indexTrashNote, 1);
  trashNotes.splice(indexTrashNote, 1);
  renderTrashNotes();
}

function getFromLocalStorage() {
  let notesLocalStorage = JSON.parse(localStorage.getItem(notesKey));
  let notesTitlesLocalStorage = JSON.parse(
    localStorage.getItem(notesTitlesKey)
  );
  let archiveNotesLocalStorage = JSON.parse(
    localStorage.getItem(archiveNotesKey)
  );
  let archiveNotesTitlesLocalStorage = JSON.parse(
    localStorage.getItem(archiveNotesTitlesKey)
  );

  return {
    notesLocalStorage: notesLocalStorage,
    notesTitlesLocalStorage: notesTitlesLocalStorage,
    archiveNotesLocalStorage: archiveNotesLocalStorage,
    archiveNotesTitlesLocalStorage: archiveNotesTitlesLocalStorage,
  };
}

function saveToLocalStroage(key, item) {
  localStorage.setItem(key, JSON.stringify(item));
}

function deleteLocalStorage(key) {
  localStorage.removeItem(key);
}

function clearNotebook() {}

// -> Notizen archivieren
