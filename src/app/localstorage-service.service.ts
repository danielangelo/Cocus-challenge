import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { NoteModel } from "./note.model";

@Injectable({
  providedIn: "root",
})
export class LocalstorageServiceService {
  private note: NoteModel = {
    id: '',
    title: '',
    description: ''
  };

  public onNoteChange = new BehaviorSubject<NoteModel>(this.note);

  getNotes() {
    return JSON.parse(localStorage.getItem("notes") || "[]");
  }

  saveNote(data: NoteModel) {
    let localStorageData = this.getNotes();
    const existingNote = [...localStorageData].filter((localstorageItem: NoteModel) => localstorageItem.id === data.id);
    if (localStorageData && localStorageData.length > 0) {
      if (existingNote.length > 0) {
        localStorageData = localStorageData
          .filter((localstorageItem: NoteModel) => localstorageItem.id === existingNote[0].id)
          .map((localstorageItem: NoteModel) => {
            return {
              id: localstorageItem.id,
              title: data.title,
              description: data.description
            }
          })
      } else {
        localStorageData.push(data);
      }
      localStorage.setItem("notes", JSON.stringify(localStorageData));
    } else {
      localStorage.setItem("notes", JSON.stringify([data]));
    }
    this.onNoteChange.next(data);
  }

  setNote(data: NoteModel) {
    this.note = JSON.parse(JSON.stringify(data));
  }

  getNote() {
    return this.note;
  }

  resetNote() {
    this.note = {
      id: '',
      title: '',
      description: ""
    }
  }
}
