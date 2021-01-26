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

  getNotes(order: number = 0) {
    if (order !== 0) {
      return JSON.parse(localStorage.getItem("notes") || "[]").sort(order === 1 ? this.sortAsc : this.sortDsc);
    } else {
      return JSON.parse(localStorage.getItem("notes") || "[]");
    }
  }

  saveNote(data: NoteModel) {
    let localStorageData = [...this.getNotes()];
    const noteToModify = localStorageData.filter((localstorageItem: NoteModel) => localstorageItem.id === data.id)[0];
    if (localStorageData && localStorageData.length > 0) {
      if (noteToModify) {
        localStorageData = localStorageData
          .map((localstorageItem: NoteModel) => {
            if (localstorageItem.id === noteToModify.id) {
              const { title, description } = data;
              return {
                id: localstorageItem.id,
                title,
                description,
              }
            }
            const { id, title, description } = localstorageItem;
            return {
              id,
              title,
              description
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

  deleteNote() {
    const localStorageData = [...this.getNotes()];
    const localStorageIds = localStorageData.map((localstorageItem: NoteModel) => localstorageItem.id);
    const indexToDelete = localStorageIds.indexOf(this.note.id);
    if (indexToDelete !== -1) {
      const deletedNote = localStorageData.splice(indexToDelete, 1)[0];
      localStorage.setItem("notes", JSON.stringify(localStorageData));
      this.resetNote();
      this.onNoteChange.next(deletedNote);
    }
  }

  resetNote() {
    this.note = {
      id: '',
      title: '',
      description: ""
    }
  }

  private sortAsc(firstNote: NoteModel, secondNote: NoteModel) {
    if (firstNote.title < secondNote.title) {
      return -1;
    }
    if (firstNote.title > secondNote.title) {
      return 1;
    }
    return 0;
  }

  private sortDsc(firstNote: NoteModel, secondNote: NoteModel) {
    if (firstNote.title > secondNote.title) {
      return -1;
    }
    if (firstNote.title < secondNote.title) {
      return 1;
    }
    return 0;
  }
}
