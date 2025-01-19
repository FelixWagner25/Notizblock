let notes = [];
let noteTitles = [];
let trashNotes = [];
let trashNoteTitles = [];
let archiveNotes = [];
let archiveNoteTitles = [];

let notesKey = "notes";
let noteTitlesKey = "note-titles";
let archiveNotesKey = "archive-notes";
let archiveNoteTitlesKey = "archive-note-titles";

function init() {
  let localStorage = getFromLocalStorage();
  if (localStorage != null) {
    let notesLocalStorage = localStorage["notesLocalStorage"];
    let noteTitlesLocalStorage = localStorage["noteTitlesLocalStorage"];

    for (
      let indexNotesLocalStorage = 0;
      indexNotesLocalStorage < notesLocalStorage.length;
      indexNotesLocalStorage++
    ) {
      notes.push(notesLocalStorage[indexNotesLocalStorage]);
      noteTitles.push(noteTitlesLocalStorage[indexNotesLocalStorage]);
    }
  }
  renderNotes();
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

  noteTitles.push(noteTitleInput);
  saveToLocalStroage(noteTitlesKey, noteTitles);
  renderNotes();
  noteTitleInputRef.value = "";
}

function pushToTrash(indexNote) {
  let trashNoteTitle = noteTitles.splice(indexNote, 1);
  let trashNote = notes.splice(indexNote, 1);

  trashNoteTitles.push(trashNoteTitle);
  trashNotes.push(trashNote);
  renderNotes();
  renderTrashNotes();
}

function pushToArchive(indexNote) {
  let archiveNoteTitle = noteTitles.splice(indexNote, 1);
  let archiveNote = notes.splice(indexNote, 1);

  archiveNoteTitles.push(archiveNoteTitle);
  archiveNotes.push(archiveNote);

  renderNotes();
  renderTrashNotes();
  renderArchiveNotes();
}

function pushArchiveToNotes(indexArchiveNote) {
  let noteTitle = archiveNoteTitles.splice(indexArchiveNote, 1);
  let note = archiveNotes.splice(indexArchiveNote, 1);

  noteTitles.push(noteTitle);
  notes.push(note);
  renderArchiveNotes();
  renderNotes();
}

function pushTrashToNotes(indexTrashNote) {
  let noteTitle = trashNoteTitles.splice(indexTrashNote, 1);
  let note = trashNotes.splice(indexTrashNote, 1);

  noteTitles.push(noteTitle);
  notes.push(note);
  renderTrashNotes();
  renderNotes();
}

function pushArchiveToTrash(indexArchiveNote) {
  let trashNoteTitle = archiveNoteTitles.splice(indexArchiveNote, 1);
  let trashNote = archiveNotes.splice(indexArchiveNote, 1);

  trashNoteTitles.push(trashNoteTitle);
  trashNotes.push(trashNote);
  renderArchiveNotes();
  renderTrashNotes();
}

function deleteNote(indexTrashNote) {
  trashNoteTitles.splice(indexTrashNote, 1);
  trashNotes.splice(indexTrashNote, 1);
  renderTrashNotes();
}

function getFromLocalStorage() {
  let notesLocalStorage = JSON.parse(localStorage.getItem(notesKey));
  let noteTitlesLocalStorage = JSON.parse(localStorage.getItem(noteTitlesKey));
  let archiveNotesLocalStorage = JSON.parse(
    localStorage.getItem(archiveNotesKey)
  );
  let archiveNoteTitlesLocalStorage = JSON.parse(
    localStorage.getItem(archiveNoteTitlesKey)
  );

  return {
    notesLocalStorage: notesLocalStorage,
    noteTitlesLocalStorage: noteTitlesLocalStorage,
    archiveNotesLocalStorage: archiveNotesLocalStorage,
    archiveNoteTitlesLocalStorage: archiveNoteTitlesLocalStorage,
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
