import { Component } from "@angular/core";
import { v4 as uuid } from "uuid";
import { LocalstorageServiceService } from "../localstorage-service.service";

@Component({
  selector: "app-note-details",
  templateUrl: "./note-details.component.html",
  styleUrls: ["./note-details.component.scss"],
})
export class NoteDetailsComponent {
  title: string = "";
  description: string = "";
  constructor(private localstorageService: LocalstorageServiceService) {}

  onSave() {
    if (!this.title) {
      alert("Please provide a title for the note");
      return;
    }
    this.saveData();
    this.resetInputs();
  }

  createNote() {
    return {
      id: uuid(),
      title: this.title,
      description: this.description,
    };
  }

  saveData() {
    const noteToAdd = this.createNote();
    this.localstorageService.setNote(noteToAdd)
  }

  resetInputs() {
    this.title = "";
    this.description = "";
  }
}
