<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import BookCard from '../components/BookCard.vue';

interface Book {
  title: string;
  synopsis: string;
}

const books = ref([]);
const searchQuery = ref('');
const currentPage = ref(1);
const booksPerPage = 5;

onMounted(async () => {
  const response = await axios.get('http://localhost:3000/books');
  books.value = response.data.books;
});

const filteredBooks = computed(() => {
  return books.value?.filter((book: Book) =>
      book.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      book.synopsis.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const totalPages = computed(() => {
  return Math.ceil(filteredBooks.value.length / booksPerPage);
});

const paginatedBooks = computed(() => {
  const startIndex = (currentPage.value - 1) * booksPerPage;
  return filteredBooks.value.slice(startIndex, startIndex + booksPerPage);
});

const previousPage = ()=> {
  if (currentPage.value > 1) currentPage.value--;
}

const nextPage = ()=> {
  if (currentPage.value < totalPages.value) currentPage.value++;
}
</script>

<template>
  <div class="home">
    <div class="search-bar mb-3">
      <input type="text" v-model="searchQuery" class="form-control" placeholder="Search books..." />
    </div>
    <h1 class="mb-3">Top books of all the time</h1>
    <div class="book-list">
      <BookCard
          v-for="(book, index) in paginatedBooks"
          :key="index"
          :book="book"
          :classIndex="index"
      />
    </div>

    <nav aria-label="Page navigation">
      <ul class="pagination">
        <li @click="previousPage" :disabled="currentPage <= 1" class="page-item"><a class="page-link" href="javascript:;">Previous</a></li>
        <li class="page-item"><a class="page-link" href="javascript:;">{{ currentPage }} of {{ totalPages }}</a></li>
        <li @click="nextPage" :disabled="currentPage >= totalPages" class="page-item"><a class="page-link" href="javascript:;">Next</a></li>
      </ul>
    </nav>

  </div>
</template>