let notesKey = "notes";
let notesTitlesKey = "note-titles";
let archiveNotesKey = "archive-notes";
let archiveNotesTitlesKey = "archive-note-titles";

let allNotes = {
  notesTitles: ["Obst", "Aufgabe"],
  notes: ["banana", "staubsaugen"],
  archiveNotesTitles: [],
  archiveNotes: [],
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
      allNotes.notes.push(notesLocalStorage[indexNotesLocalStorage]);
      allNotes.notesTitles.push(
        notesTitlesLocalStorage[indexNotesLocalStorage]
      );
    }
  }
  renderNotes();
}

function moveNote(indexNote, startKey, destinationKey) {
  let startKeyTitles = startKey + "Titles";
  let destinationKeyTitles = destinationKey + "Titles";

  let noteTitle = allNotes[startKeyTitles].splice(indexNote, 1)[0];
  let note = allNotes[startKey].splice(indexNote, 1)[0];

  allNotes[destinationKeyTitles].push(noteTitle);
  allNotes[destinationKey].push(note);
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
  for (let indexNote = 0; indexNote < allNotes.notes.length; indexNote++) {
    contentRef.innerHTML += getNoteTemplate(indexNote);
  }
}

function renderTrashNotes() {
  let trashContentRef = document.getElementById("trash-content");

  trashContentRef.innerHTML = "";
  for (
    let indexTrashNote = 0;
    indexTrashNote < allNotes.trashNotes.length;
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
    indexArchiveNote < allNotes.archiveNotes.length;
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

  allNotes.notes.push(noteInput);
  saveToLocalStroage(notesKey, allNotes.notes);
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

  allNotes.notesTitles.push(noteTitleInput);
  saveToLocalStroage(notesTitlesKey, allNotes.notesTitles);
  renderNotes();
  noteTitleInputRef.value = "";
}

function deleteNote(indexTrashNote) {
  allNotes.trashNotesTitles.splice(indexTrashNote, 1);
  allNotes.trashNotes.splice(indexTrashNote, 1);
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
