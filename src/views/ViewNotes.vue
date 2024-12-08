<template>
    <div class="notes">
        <AddEditNote
            v-model="newNote"
            ref="addEditNoteRef"
        >
            <template #buttons>
                <button @click="addNote" class="button is-link has-background-success">
                        Add New Note
                </button>
            </template>
        </AddEditNote>
        <progress
        v-if="!storeNotes.notesLoaded"
          class="progress is-small is-success"
          max="100"
        />
        <template v-else>
            <Note v-for="note in storeNotes.notes" :key="note.id" :note="note" />

            <div 
                v-if="!storeNotes.notes.length"
                class="is-size-4 has-text-centered has-text-grey-light is-family-monospace py-6"
            >
                No notes here yet...
            </div>
        </template>
        

    </div>
</template>


<script setup>
/*
    imports
*/
import { ref } from 'vue';
import AddEditNote from '@/components/Notes/AddEditNote.vue';
import Note from '@/components/Notes/Note.vue';
import { useStoreNotes } from '@/stores/storeNote';
import { useWatchCharacters } from '@/use/useWatchCharacters';
/*
    notes
*/

const newNote = ref('')
const addEditNoteRef = ref(null)

/*
    store
*/
const storeNotes = useStoreNotes();


/*
    add note
*/

const addNote = () => {
    storeNotes.addNote(newNote.value);
    newNote.value = "";
    addEditNoteRef.value.focusTextarea();
}

/*
 watch
 */

 useWatchCharacters(newNote)





</script>