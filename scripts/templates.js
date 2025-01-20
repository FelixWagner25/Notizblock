function getNoteTemplate(indexNote) {
  return `
  <div class="note">
  <b>${notesTitles[indexNote]}</b>
  <br/>
  <br/>
  <br/>  
  <p>+ ${notes[indexNote]}</p>
  <br/>
  <br/>
  <br/>
  <div class="note-btn-div">
  <button onclick="pushToArchive(${indexNote})">A</button>
  <button onclick="pushToTrash(${indexNote})">x</button>
  </div>
  </div>
  `;
}

function getTrashNoteTemplate(indexTrashNote) {
  return `
  <div class="note">
  <b>${trashNotesTitles[indexTrashNote]}</b>
  <br/>
  <br/>
  <br/>  
  <p>+ ${trashNotes[indexTrashNote]}</p>
  <br/>
  <br/>
  <br/>
  <div class="note-btn-div">
  <button onclick="pushTrashToNotes(${indexTrashNote})" >N</button>
  <button onclick="deleteNote(${indexTrashNote})">x</button>
  </div>
  </div>
  `;
}

function getArchiveNoteTemplate(indexArchiveNote) {
  return `
  <div class="note">
  <b>${archiveNotesTitles[indexArchiveNote]}</b>
  <br/>
  <br/>
  <br/>  
  <p>+ ${archiveNotes[indexArchiveNote]}</p>
  <br/>
  <br/>
  <br/>
  <div class="note-btn-div">
  <button onclick="pushArchiveToNotes(${indexArchiveNote})">N</button>
  <button onclick="pushArchiveToTrash(${indexArchiveNote})">x</button>
  </div>
  </div>
    `;
}
