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
  <button onclick="moveNote(${indexNote},'notes','archiveNotes')">A</button>
  <button onclick="moveNote(${indexNote},'notes','trashNotes')">x</button>
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
  <button onclick="moveNote(${indexTrashNote},'trashNotes','notes')" >N</button>
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
  <button onclick="moveNote(${indexArchiveNote},'archiveNotes','notes')">N</button>
  <button onclick="moveNote(${indexArchiveNote},'archiveNotes', 'trashNotes')">x</button>
  </div>
  </div>
    `;
}
