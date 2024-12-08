import { defineStore } from "pinia";
import { db } from "@/js/firebase";
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, setDoc, updateDoc } from "firebase/firestore";
import { useStoreAuth } from "./storeAuth";
let notesCollectionRef ;
let notesCollectionQuery ;
let getNotesSnapshot = null;



export const useStoreNotes = defineStore('storeNote', {
    state: () => {
        return {
            notes: [],
            notesLoaded: true
        }
    },
    actions: {
        init(){
            const storeAuth = useStoreAuth();
            console.log(storeAuth.user.id);
            notesCollectionRef = collection(db, "users",storeAuth.user.id,'notes');
            notesCollectionQuery = query(notesCollectionRef, orderBy("date", "desc"));
            this.getNotes()
        },
        async getNotes() {
            this.notesLoaded = false;

            getNotesSnapshot =   onSnapshot(notesCollectionQuery, (querySnapshot) => {
                let notes = [];
                querySnapshot.forEach((doc) => {
                    let note = {
                        id: doc.id,
                        content: doc.data().content,
                        date: doc.data().date
                    }
                   notes.push(note)
                })
                this.notes = notes;
                this.notesLoaded = true;   
            })
        }
        ,
        async addNote(newNoteContent) {
            let currentDate = new Date().getTime(),
                date = currentDate.toString()

            await addDoc(notesCollectionRef, {
                content: newNoteContent,
                date
            })
        },
        async deleteNote(idToDelete) {
            await deleteDoc(doc(notesCollectionRef, idToDelete));
        },
        async updateNote(id, content) {
            await updateDoc(doc(notesCollectionRef,id), {
                content
              });
          
        },
        clearNotes(){
            this.notes = []
            if(getNotesSnapshot) getNotesSnapshot
        },
    },
    getters: {
        getNoteContent: (state) => {
            return (id) => {
                return state.notes.filter(note => note.id === id)[0].content
            }
        },
        totalNotesCount: (state) => {
            return state.notes.length
        },
        totalCharactersCount: (state) => {
            let count = 0;
            state.notes.forEach(note => count += note.content.length)
            return count;
        }
    }
})