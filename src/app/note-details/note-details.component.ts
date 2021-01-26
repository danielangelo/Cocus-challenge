import { Component } from "@angular/core";
import { v4 as uuid } from "uuid";
import { LocalstorageServiceService } from "../localstorage-service.service";

@Component({
  selector: "app-note-details",
  templateUrl: "./note-details.component.html",
  styleUrls: ["./note-details.component.scss"],
})
export class NoteDetailsComponent {
  constructor(private localstorageService: LocalstorageServiceService) { }

  onSave() {
    const { title } = this.localstorageService.getNote();
    if (!title) {
      alert("Please provide a title for the note");
      return;
    }
    this.saveData();
    this.resetInputs();
  }

  createNote() {
    const { id, title, description } = this.localstorageService.getNote();
    return {
      id: id || uuid(),
      title,
      description
    };
  }

  createNewNote() {
    this.resetInputs();
  }

  deleteNote() {
    if (this.localstorageService.getNote().id) {
      this.localstorageService.deleteNote();
    }else{
      alert('There is nothing to delete');
    }
  }

  getNote() {
    return this.localstorageService.getNote();
  }

  private saveData() {
    const noteToAdd = this.createNote();
    this.localstorageService.saveNote(noteToAdd)
  }

  private resetInputs() {
    this.localstorageService.resetNote();
  }
}
