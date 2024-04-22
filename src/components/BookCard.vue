<script setup lang="ts">
import { defineProps, computed } from 'vue';

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
  classIndex: number
}>();

const truncatedSynopsis = computed(() => {
  return props.book.synopsis.length > 200 ?
      `${props.book.synopsis.substring(0, 200)}...` :
      props.book.synopsis;
});

const upvoteBook = (book)=> {
  if (book && !book?.upvoted) {
    book.upvotes++;
    book.upvoted = true;
  } else if (book) {
    book.upvotes--;
    book.upvoted = false;
  }
}
</script>

<template>
  <div :class="['shadow-sm card mb-3 p-3', classIndex % 2 === 0 ? 'even' : 'odd']">
    <div class="row g-0">
      <div class="col-12 col-md-2 order-1 order-md-2 text-center text-md-end">
        <a :href="`/book/${book.slug}`" class="card-image">
          <img :src="book.cover" :alt="book.title" class="img-fluid rounded-start" style="width: 100%; height: auto;">
        </a>
      </div>
      <div class="col-12 col-md-10 order-2 order-md-1">
        <div class="card-body">
          <h5 class="card-title">
            <a :href="`/book/${book.slug}`" class="text-decoration-none">{{ book.title }}</a>
          </h5>
          <p><i>{{ book.author }}</i> <span class="d-inline-block ms-3">({{ book.rating }} / 10)</span></p>
          <p class="card-text mt-3">{{ truncatedSynopsis }}</p>
          <p class="card-text" v-if="book.upvoted"><small class="text-success">Upvoted!</small></p>
          <p class="mt-3">
            <a href="javascript:;" @click="upvoteBook(book)" class="me-3" :class="['btn', book.upvoted ? 'btn-outline-primary' : 'btn-primary']">
              {{ book.upvoted ? 'Upvoted' : 'Upvote' }}
            </a>
            upvoted {{ book.upvotes }} times
          </p>
        </div>
      </div>
    </div>
  </div>
</template>