import { Component } from "@angular/core";
import { LocalstorageServiceService } from "../localstorage-service.service";
import { NoteModel } from "../note.model";

@Component({
  selector: "app-notes-list",
  templateUrl: "./notes-list.component.html",
  styleUrls: ["./notes-list.component.scss"],
})
export class NotesListComponent {
  notes: NoteModel[] = [];

  constructor(private localstorageService: LocalstorageServiceService) {
    this.notes = this.localstorageService.getNotes();
    this.localstorageService.onNoteChange.subscribe((note) => {
      this.onNoteMutation(note);
      this.notes = this.localstorageService.getNotes();
    });
  }

  onNoteMutation(note: NoteModel) {
  }

  selectNote(note: NoteModel) {
    this.localstorageService.setNote(note);
  }
}
