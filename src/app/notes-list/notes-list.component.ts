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
    this.localstorageService.note.subscribe((note) => {
      this.onNoteMutation(note);
      this.notes = this.localstorageService.getNotes();
    });
  }

  onNoteMutation(note: NoteModel) {
    console.log("Incoming note data:");
    console.log(note);
  }
}
