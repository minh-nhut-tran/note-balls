<template>
    <div class="edit-note">
       <AddEditNote
          v-model="noteContent"
          ref="addEditNoteRef"
          bgColor="link"
          placeholder="Edit note..."
          label="Edit Note"
        >
            <template #buttons>

                <button 
                    @click="$router.back()"
                    class="button is-link is-light mr-2"
                >
                    Cancel
                </button>

                <button 
                    @click="handleSaveClicked"
                    class="button is-link has-background-link"
                    :disabled="!noteContent"
                >
                    Save Note
                </button>
            </template>
        </AddEditNote>
    </div>
</template>

<script setup>

    /*
        imports 
    */
    import { useStoreNotes } from '@/stores/storeNote';
    import AddEditNote from '@/components/Notes/AddEditNote.vue';
    import { ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router';

    /*
        store note
    */
    const storeNotes = useStoreNotes();

    /*
        router
    */
    const route = useRoute()
    const router = useRouter()

    /*
        note
    */
    const noteContent = ref('')

    noteContent.value = storeNotes.getNoteContent(route.params.id)

    /*
        save clicked
    */
    
    const handleSaveClicked = () => {
        storeNotes.updateNote(route.params.id,noteContent.value);
        router.push('/')
        
    }
    


</script>


