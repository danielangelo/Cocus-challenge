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
  sortByOrder: number = 1;
  searchedText: string = '';

  constructor(private localstorageService: LocalstorageServiceService) {
    this.notes = this.localstorageService.getNotes();
    this.localstorageService.onNoteChange.subscribe((note) => {
      this.notes = this.localstorageService.getNotes();
    });
  }

  selectNote(note: NoteModel) {
    this.localstorageService.setNote(note);
  }

  onSort(order: number) {
    if (this.sortByOrder !== order) {
      this.notes = this.localstorageService.getNotes(order);
      this.sortByOrder = order;
    }
  }

  onSearch() {
    this.notes = this.localstorageService.getNotes().filter((note: NoteModel) =>
      note.title.includes(this.searchedText) || note.description.includes(this.searchedText)
    )
  }
}
