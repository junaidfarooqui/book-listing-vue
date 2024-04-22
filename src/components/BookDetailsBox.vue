<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  book: {
    slug: string;
    author: string;
    title: string;
    cover: string;
    rating: string;
    synopsis: string;
    upvoted: boolean;
    upvotes: number;
  };
}>();

const upvoteBook = (book) => {
  if (book && !book.upvoted) {
    book.upvotes++;
    book.upvoted = true;
  } else if (book) {
    book.upvotes--;
    book.upvoted = false;
  }
}

console.log('props:', props.book)

</script>

<template>
  <div class="col-12 col-md-6">
    <h1>{{ book.title }}</h1>
    <h5 class="text-secondary">{{ book.author }}</h5>
  </div>
  <div class="col-12 col-md-6 text-start text-md-end">
    <a href="javascript:;" @click="upvoteBook(book)" class="me-3 btn-upvote" :class="['btn', book.upvoted ? 'btn-outline-primary' : 'btn-primary']">
      {{ book.upvoted ? 'Upvoted' : 'Upvote' }}
    </a>
    upvoted {{ book.upvotes }} times
  </div>
  <div class="col-12 text-center my-3">
    <img :src="book.cover" :alt="book.title" class="img-fluid rounded mb-3 book-image">
  </div>
  <div class="col-12">
    <h3>Synopsis</h3>
    <p class="mb-3">{{ book.synopsis }}</p>
    <p><strong>Rating: ({{ book.rating }} / 10)</strong></p>
    <p v-if="book.upvoted" class="mt-3 text-success">This book has been upvoted!</p>
  </div>
</template>