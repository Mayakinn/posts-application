<script setup lang="ts">
import { ref } from 'vue'
import { type Author } from '@/typings/interface/Author'
import { getAuthors } from '@/api/AuthorService'  

const Authors = ref<Author[]>([])


//This is to be fixed next week, i dont know how interfaces work properly :))))))
//Authors.value = await getAuthors()
console.log(Authors.value)


</script>

<template>
  <div class="Author">
    <h1>This is an Author page</h1>
    <div v-for="author in Authors.values" key="author.id">
        <div >
        </div>

    </div>
  </div>
</template>

<style></style>
