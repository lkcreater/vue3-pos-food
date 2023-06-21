<template>
    <div v-bind="getRootProps()">
        <input v-bind="getInputProps()" />
        <v-sheet
            class="d-flex align-center justify-center flex-wrap text-center mx-auto"
            height="200"
            width="100%" 
            border
            rounded>
            <div>
                <h2 class="text-h4 font-weight-black text-orange">Congratulations!</h2>

                <div class="text-h5 font-weight-medium mb-2" >Drop the files here ...</div>

                <p class="text-body-2 mb-4" v-if="isDragActive">Drop the files here ...</p>
                <p class="text-body-2 mb-4"  v-else>Drag 'n' drop some files here, or click to select files</p>
            </div>
        </v-sheet>
    </div>
</template>

<script setup lang="ts">
    import { FileRejectReason, useDropzone } from "vue3-dropzone";

    function onDrop(acceptFiles: any[], rejectReasons: FileRejectReason[]) {
        console.log(acceptFiles);
        console.log(rejectReasons);
    }

    const { getRootProps, getInputProps, open, isDragActive } = useDropzone({ onDrop });
</script>

<style scoped>

</style>