<template>
    <div class="modal is-active p-2">
        <div class="modal-background"></div>
        <div class="modal-card" ref="modalDelete">
            <header class="modal-card-head">
                <p class="modal-card-title">Delete Note?</p>
                <button class="delete" aria-label="close" @click="closeModal">

                </button>
            </header>
            <section class="modal-card-body">
                Are you sure you want to delete this note?

            </section>
            <footer class="modal-card-foot is-justify-content-flex-end">
                <div class="buttons">
                    <button @click="closeModal" class="button">
                        Cancel
                    </button>
                    <button class="button is-danger" @click="storeNotes.deleteNote(noteId)">Delete</button>
                </div>
            </footer>
        </div>
    </div>
</template>


<script setup>

/*
    imports
*/
import { onClickOutside } from '@vueuse/core';
import { onMounted, onUnmounted, ref } from 'vue';
import { useStoreNotes } from '@/stores/storeNote';
/*
    props
*/
const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    },
    noteId: {
        type: String,
        required: true
    }
})

/*
 emit
 */

const emit = defineEmits(['update:modelValue'])

/*
 close modal
*/

const closeModal = () => {
    emit('update:modelValue', false)
}

/*
    click outside
*/

const modalDelete = ref(null);

onClickOutside(modalDelete, closeModal)

/*
 keyboard control
*/

const handleKeyboard = e => {
    console.log('close it')
    if (e.key === 'Escape') closeModal()
}

onMounted(() => document.addEventListener('keyup', handleKeyboard))

onUnmounted(() => document.removeEventListener('keyup', handleKeyboard))

/*
    store
*/

const storeNotes = useStoreNotes();


</script>