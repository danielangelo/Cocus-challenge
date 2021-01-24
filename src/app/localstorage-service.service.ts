import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { NoteModel } from "./note.model";

@Injectable({
  providedIn: "root",
})
export class LocalstorageServiceService {
  public note = new BehaviorSubject<NoteModel>({
    id: "",
    title: "",
    description: "",
  });
  constructor() {}

  getNotes() {
    return JSON.parse(localStorage.getItem("notes") || "null");
  }

  setNote(data: NoteModel) {
    const localStorageData = this.getNotes();
    if (localStorageData) {
      localStorageData.push(data);
      localStorage.setItem("notes", JSON.stringify(localStorageData));
    } else {
      localStorage.setItem("notes", JSON.stringify([data]));
    }
    this.note.next(data);
  }
}
